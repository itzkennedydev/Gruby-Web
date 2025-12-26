/**
 * Admin Notifications API
 * Send push notifications and manage notification history
 */

import { NextRequest } from 'next/server';
import { withAdminAuth, createSuccessResponse, createErrorResponse, AdminContext } from '@/lib/admin-middleware';
import { getDb, getMessaging } from '@/lib/firebase-admin';

// POST - Send a push notification
async function postHandler(req: NextRequest, context: AdminContext) {
  try {
    const body = await req.json();
    const { title, body: notificationBody, userId, data } = body;

    if (!title || !notificationBody) {
      return createErrorResponse('Title and body are required', 400);
    }

    const db = getDb();
    const messaging = getMessaging();

    let sentCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    // Create notification record
    const notification = {
      title,
      body: notificationBody,
      data: data || {},
      type: 'admin',
      targetUserId: userId || null,
      isBroadcast: !userId,
      createdAt: new Date(),
      createdBy: context.email,
      status: 'pending',
      sentCount: 0,
      failedCount: 0,
    };

    const docRef = await db.collection('adminNotifications').add(notification);

    if (userId) {
      // Send to specific user
      const userDoc = await db.collection('users').doc(userId).get();

      if (!userDoc.exists) {
        await docRef.update({ status: 'failed', error: 'User not found' });
        return createErrorResponse('User not found', 404);
      }

      // Check userPushTokens collection first (where mobile app saves tokens)
      const tokenDoc = await db.collection('userPushTokens').doc(userId).get();
      const tokenData = tokenDoc.data();

      // Fall back to users collection fields if not in userPushTokens
      const userData = userDoc.data();
      const fcmToken = tokenData?.token || userData?.fcmToken || userData?.expoPushToken || userData?.pushToken;

      if (!fcmToken) {
        await docRef.update({ status: 'failed', error: 'User has no push token' });
        return createErrorResponse('User has no push token registered', 400);
      }

      try {
        // Send via FCM
        await messaging.send({
          token: fcmToken,
          notification: {
            title,
            body: notificationBody,
          },
          data: {
            type: 'admin',
            notificationId: docRef.id,
            ...data,
          },
          apns: {
            payload: {
              aps: {
                sound: 'default',
                badge: 1,
              },
            },
          },
          android: {
            priority: 'high',
            notification: {
              sound: 'default',
              priority: 'high',
            },
          },
        });

        sentCount = 1;

        // Also save to user's notifications collection
        await db.collection('users').doc(userId).collection('notifications').add({
          title,
          body: notificationBody,
          type: 'admin',
          read: false,
          createdAt: new Date(),
        });
      } catch (fcmError: any) {
        failedCount = 1;
        errors.push(fcmError.message);
        console.error('FCM send error:', fcmError);
      }
    } else {
      // Broadcast to all users with push tokens (Expo or FCM)
      // Query the userPushTokens collection (where mobile app saves tokens)
      const tokensSnapshot = await db.collection('userPushTokens')
        .limit(500) // Limit for safety
        .get();

      const tokens: string[] = [];
      const userIds: string[] = [];

      // Get tokens from userPushTokens collection
      tokensSnapshot.docs.forEach(doc => {
        const data = doc.data();
        const token = data.token;
        if (token && typeof token === 'string' && token.length > 10) {
          tokens.push(token);
          userIds.push(doc.id);
        }
      });

      // Also check users collection for any tokens saved there (legacy support)
      if (tokens.length === 0) {
        const usersSnapshot = await db.collection('users')
          .limit(500)
          .get();

        usersSnapshot.docs.forEach(doc => {
          const data = doc.data();
          const token = data.expoPushToken || data.fcmToken || data.pushToken;
          if (token && typeof token === 'string' && token.length > 10 && !tokens.includes(token)) {
            tokens.push(token);
            userIds.push(doc.id);
          }
        });
      }

      if (tokens.length === 0) {
        await docRef.update({ status: 'failed', error: 'No users with push tokens found' });
        return createErrorResponse('No users with push tokens found. Users need to enable notifications in the app.', 400);
      }

      // Check if tokens are Expo tokens (start with ExponentPushToken)
      const expoTokens = tokens.filter(t => t.startsWith('ExponentPushToken'));
      const fcmTokens = tokens.filter(t => !t.startsWith('ExponentPushToken'));

      // Send to Expo tokens using Expo Push API
      if (expoTokens.length > 0) {
        try {
          const expoResponse = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              expoTokens.map(token => ({
                to: token,
                title,
                body: notificationBody,
                sound: 'default',
                data: {
                  type: 'admin_broadcast',
                  notificationId: docRef.id,
                  ...data,
                },
              }))
            ),
          });

          const expoResult = await expoResponse.json();

          if (Array.isArray(expoResult.data)) {
            expoResult.data.forEach((result: any, idx: number) => {
              if (result.status === 'ok') {
                sentCount++;
              } else {
                failedCount++;
                if (result.message) {
                  errors.push(`Expo ${idx}: ${result.message}`);
                }
              }
            });
          } else if (expoResult.data?.status === 'ok') {
            sentCount = expoTokens.length;
          } else {
            failedCount = expoTokens.length;
            errors.push(expoResult.data?.message || 'Expo push failed');
          }
        } catch (expoError: any) {
          console.error('Expo push error:', expoError);
          failedCount += expoTokens.length;
          errors.push(`Expo: ${expoError.message}`);
        }
      }

      // Send to FCM tokens using Firebase
      if (fcmTokens.length > 0) {
        try {
          const response = await messaging.sendEachForMulticast({
            tokens: fcmTokens,
            notification: {
              title,
              body: notificationBody,
            },
            data: {
              type: 'admin_broadcast',
              notificationId: docRef.id,
              ...data,
            },
            apns: {
              payload: {
                aps: {
                  sound: 'default',
                },
              },
            },
            android: {
              priority: 'high',
              notification: {
                sound: 'default',
              },
            },
          });

          sentCount += response.successCount;
          failedCount += response.failureCount;

          // Collect errors
          response.responses.forEach((resp, idx) => {
            if (!resp.success && resp.error) {
              errors.push(`FCM ${idx}: ${resp.error.message}`);
            }
          });
        } catch (fcmError: any) {
          console.error('FCM multicast error:', fcmError);
          failedCount += fcmTokens.length;
          errors.push(`FCM: ${fcmError.message}`);
        }
      }
    }

    // Update notification record with results
    await docRef.update({
      status: failedCount === 0 && sentCount > 0 ? 'sent' : sentCount > 0 ? 'partial' : 'failed',
      sentCount,
      failedCount,
      errors: errors.slice(0, 10), // Keep first 10 errors
      completedAt: new Date(),
    });

    // Log the action
    await db.collection('adminLogs').add({
      level: sentCount > 0 ? 'info' : 'error',
      message: userId
        ? `Push notification sent to user ${userId}`
        : `Broadcast notification sent to ${sentCount} users (${failedCount} failed)`,
      source: 'admin-notifications',
      metadata: {
        notificationId: docRef.id,
        title,
        userId: userId || 'broadcast',
        sentCount,
        failedCount,
      },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: sentCount > 0
        ? `Notification sent successfully to ${sentCount} device(s)`
        : 'Failed to send notification',
      notificationId: docRef.id,
      target: userId || 'broadcast',
      sentCount,
      failedCount,
      errors: errors.slice(0, 5),
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return createErrorResponse('Failed to send notification', 500);
  }
}

// GET - List recent admin notifications
async function getHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);

  const db = getDb();

  try {
    const snapshot = await db.collection('adminNotifications')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
      completedAt: doc.data().completedAt?.toDate?.()?.toISOString() || doc.data().completedAt,
    }));

    return createSuccessResponse({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return createErrorResponse('Failed to fetch notifications', 500);
  }
}

// DELETE - Remove a notification from history
async function deleteHandler(req: NextRequest, context: AdminContext) {
  const { searchParams } = new URL(req.url);
  const notificationId = searchParams.get('id');

  if (!notificationId) {
    return createErrorResponse('Notification ID is required', 400);
  }

  const db = getDb();

  try {
    const docRef = db.collection('adminNotifications').doc(notificationId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return createErrorResponse('Notification not found', 404);
    }

    await docRef.delete();

    // Log the action
    await db.collection('adminLogs').add({
      level: 'info',
      message: `Deleted notification ${notificationId}`,
      source: 'admin-notifications',
      metadata: { notificationId },
      timestamp: new Date(),
      userId: context.userId,
      userEmail: context.email,
    });

    return createSuccessResponse({
      message: 'Notification deleted successfully',
      notificationId,
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    return createErrorResponse('Failed to delete notification', 500);
  }
}

export const POST = withAdminAuth(postHandler);
export const GET = withAdminAuth(getHandler);
export const DELETE = withAdminAuth(deleteHandler);
