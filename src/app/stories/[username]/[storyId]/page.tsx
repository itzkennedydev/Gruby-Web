/**
 * Story Viewer Page
 *
 * This page displays a shared story with options to:
 * 1. Open in the Gruby app (if installed)
 * 2. Download the app (if not installed)
 *
 * Works like Instagram/Snapchat story sharing - shows a preview
 * with "Open in App" functionality via Universal Links.
 *
 * Privacy: Stories from private accounts are not shown to web viewers.
 * Users must follow private accounts in the app to view their stories.
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/firebase-admin';
import StoryViewer from './StoryViewer';
import PrivateAccountView from './PrivateAccountView';

interface StoryData {
  id: string;
  userId: string;
  userDisplayName: string;
  userAvatarUrl?: string;
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
  title?: string;
  createdAt: { _seconds: number };
  expiresAt: { _seconds: number };
  views: number;
  likes: number;
}

interface UserProfile {
  isPublic?: boolean;
  displayName?: string;
  photoURL?: string;
}

interface PageProps {
  params: Promise<{
    username: string;
    storyId: string;
  }>;
}

// Fetch user profile to check privacy settings
async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const db = getDb();
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return null;
    }

    return userDoc.data() as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

// Fetch story data from Firebase
async function getStory(storyId: string): Promise<StoryData | null> {
  try {
    const db = getDb();
    const storyDoc = await db.collection('stories').doc(storyId).get();

    if (!storyDoc.exists) {
      return null;
    }

    const data = storyDoc.data() as StoryData;

    // Check if story has expired
    const now = Date.now() / 1000;
    if (data.expiresAt && data.expiresAt._seconds < now) {
      return null;
    }

    return {
      ...data,
      id: storyDoc.id,
    };
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
}

// Generate dynamic metadata for social sharing (Open Graph)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username, storyId } = await params;
  const story = await getStory(storyId);

  if (!story) {
    return {
      title: 'Story Not Found - Gruby',
      description: 'This story may have expired or been deleted.',
    };
  }

  const title = story.title || `${story.userDisplayName}'s Story`;
  const description = story.caption || `Watch ${story.userDisplayName}'s story on Gruby`;
  const imageUrl = story.imageUrl || story.videoUrl || 'https://gruby.app/GrubyLogo.svg';

  return {
    title: `${title} - Gruby`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Gruby',
      images: imageUrl ? [{ url: imageUrl, width: 1080, height: 1920 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    // App deep link for iOS/Android
    other: {
      'al:ios:url': `gruby://stories/${storyId}`,
      'al:ios:app_store_id': '6755449783',
      'al:ios:app_name': 'Gruby',
      'al:android:url': `gruby://stories/${storyId}`,
      'al:android:package': 'com.grubyapp.android',
      'al:android:app_name': 'Gruby',
    },
  };
}

export default async function StoryPage({ params }: PageProps) {
  const { username, storyId } = await params;
  const story = await getStory(storyId);

  if (!story) {
    notFound();
  }

  // Check if user's account is private
  const userProfile = await getUserProfile(story.userId);
  const isPrivateAccount = userProfile?.isPublic === false;

  // For private accounts, show a private account view instead of the story
  if (isPrivateAccount) {
    return (
      <PrivateAccountView
        userDisplayName={story.userDisplayName}
        userAvatarUrl={story.userAvatarUrl}
        storyId={storyId}
      />
    );
  }

  // Pass story data to client component
  return (
    <StoryViewer
      story={{
        id: story.id,
        userId: story.userId,
        userDisplayName: story.userDisplayName,
        userAvatarUrl: story.userAvatarUrl,
        imageUrl: story.imageUrl,
        videoUrl: story.videoUrl,
        caption: story.caption,
        title: story.title,
        views: story.views,
        likes: story.likes,
        createdAt: story.createdAt._seconds * 1000,
        expiresAt: story.expiresAt._seconds * 1000,
      }}
      username={username}
      storyId={storyId}
    />
  );
}
