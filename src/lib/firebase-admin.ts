/**
 * Firebase Admin SDK initialization for Next.js
 * This connects to the same Firebase project as the mobile app
 */

import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

let isInitialized = false;

/**
 * Initialize Firebase Admin SDK (lazy initialization for build compatibility)
 */
function initializeFirebaseAdmin() {
  if (isInitialized) return;
  
  if (!getApps().length) {
    try {
      // Load credentials from environment variables (production-safe)
      const projectId = process.env.FIREBASE_PROJECT_ID;
      const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!projectId || !clientEmail || !privateKey) {
        throw new Error('Missing Firebase environment variables. Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY');
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });

      console.log('Firebase Admin initialized successfully with env vars');
      isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error);
      throw error;
    }
  } else {
    isInitialized = true;
  }
}

/**
 * Get Firestore database instance (initializes Firebase if needed)
 */
export function getDb() {
  initializeFirebaseAdmin();
  return admin.firestore();
}

/**
 * Get Auth instance (initializes Firebase if needed)
 */
export function getAuth() {
  initializeFirebaseAdmin();
  return admin.auth();
}

/**
 * Get Storage instance (initializes Firebase if needed)
 */
export function getStorage() {
  initializeFirebaseAdmin();
  return admin.storage();
}

/**
 * Get Messaging instance for FCM push notifications (initializes Firebase if needed)
 */
export function getMessaging() {
  initializeFirebaseAdmin();
  return admin.messaging();
}

// Legacy exports for backward compatibility
export const db = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    return getDb()[prop as keyof admin.firestore.Firestore];
  }
});

export const auth = new Proxy({} as admin.auth.Auth, {
  get(_target, prop) {
    return getAuth()[prop as keyof admin.auth.Auth];
  }
});

export const storage = new Proxy({} as admin.storage.Storage, {
  get(_target, prop) {
    return getStorage()[prop as keyof admin.storage.Storage];
  }
});

export default admin;
