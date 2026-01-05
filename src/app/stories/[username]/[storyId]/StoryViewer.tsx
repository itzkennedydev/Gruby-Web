/**
 * Story Viewer Client Component
 *
 * Displays the story preview and handles opening the app
 * or redirecting to app stores.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

// Design System v2.0: Brand Red for primary
const BRAND_COLOR = '#ff1e00'; // Primary - brand color
const APP_STORE_URL = 'https://apps.apple.com/app/gruby/id6755449783';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.grubyapp.android';

interface StoryViewerProps {
  story: {
    id: string;
    userId: string;
    userDisplayName: string;
    userAvatarUrl?: string;
    imageUrl?: string;
    videoUrl?: string;
    caption?: string;
    title?: string;
    views: number;
    likes: number;
    createdAt: number;
    expiresAt: number;
  };
  username: string;
  storyId: string;
}

export default function StoryViewer({ story, username, storyId }: StoryViewerProps) {
  const [isAppOpening, setIsAppOpening] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Calculate time remaining until expiry
  const getTimeRemaining = useCallback(() => {
    const now = Date.now();
    const remaining = story.expiresAt - now;

    if (remaining <= 0) return 'Expired';

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes}m remaining`;
  }, [story.expiresAt]);

  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  // Update time remaining every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 60000);

    return () => clearInterval(interval);
  }, [getTimeRemaining]);

  // Format the posted time
  const formatPostedTime = () => {
    const now = Date.now();
    const diff = now - story.createdAt;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return 'Yesterday';
  };

  // Try to open the app via Universal Link
  const handleOpenApp = () => {
    setIsAppOpening(true);

    // The web URL itself acts as a Universal Link
    // When clicked on mobile with app installed, iOS/Android will intercept
    // and open the app directly
    const webUrl = `https://gruby.app/stories/${username}/${storyId}`;

    // For browsers that don't support Universal Links or app not installed,
    // we need a fallback
    const deepLink = `gruby://stories/${storyId}`;

    // Try deep link first (works on mobile browsers)
    window.location.href = deepLink;

    // If app doesn't open within 1.5 seconds, show fallback
    setTimeout(() => {
      setIsAppOpening(false);
      setShowFallback(true);
    }, 1500);
  };

  // Redirect to appropriate app store
  const handleGetApp = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = APP_STORE_URL;
    } else if (isAndroid) {
      window.location.href = PLAY_STORE_URL;
    } else {
      // Desktop - show both options or default to iOS
      window.open(APP_STORE_URL, '_blank');
    }
  };

  return (
    <>
      <div style={styles.container}>
        {/* Story Preview */}
        <div style={styles.storyContainer}>
          {/* Background blur (if image available) */}
          {story.imageUrl && (
            <div style={styles.backgroundBlur}>
              <Image
                src={story.imageUrl}
                alt=""
                fill
                style={{ objectFit: 'cover', filter: 'blur(30px) brightness(0.5)' }}
                priority
              />
            </div>
          )}

          {/* Story Content */}
          <div style={styles.storyContent}>
            {/* Header - User info */}
            <div style={styles.storyHeader}>
              <div style={styles.userInfo}>
                {story.userAvatarUrl ? (
                  <Image
                    src={story.userAvatarUrl}
                    alt={story.userDisplayName}
                    width={40}
                    height={40}
                    style={styles.avatar}
                  />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    {story.userDisplayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={styles.userDetails}>
                  <span style={styles.displayName}>{story.userDisplayName}</span>
                  <span style={styles.timeAgo}>{formatPostedTime()}</span>
                </div>
              </div>
              <span style={styles.expiryBadge}>{timeRemaining}</span>
            </div>

            {/* Story Media */}
            <div style={styles.mediaContainer}>
              {story.videoUrl ? (
                <video
                  src={story.videoUrl}
                  style={styles.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={story.imageUrl}
                />
              ) : story.imageUrl ? (
                <Image
                  src={story.imageUrl}
                  alt={story.title || 'Story'}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              ) : (
                <div style={styles.noMedia}>
                  <span style={styles.noMediaText}>Story Preview</span>
                </div>
              )}
            </div>

            {/* Caption */}
            {story.caption && (
              <div style={styles.captionContainer}>
                <p style={styles.caption}>{story.caption}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Section */}
        <div style={styles.actionSection}>
          <div style={styles.actionContent}>
            <Image
              src="/GrubyLogo.svg"
              alt="Gruby"
              width={100}
              height={28}
              priority
            />

            <p style={styles.actionText}>
              View the full story and interact with {story.userDisplayName} on Gruby
            </p>

            <button
              onClick={handleOpenApp}
              style={styles.openAppButton}
              disabled={isAppOpening}
            >
              <span style={styles.buttonText}>
                {isAppOpening ? 'Opening...' : 'Open in Gruby'}
              </span>
            </button>

            {showFallback && (
              <button
                onClick={handleGetApp}
                style={styles.getAppButton}
              >
                <span style={styles.getAppText}>Get the Gruby App</span>
              </button>
            )}

            {/* Stats */}
            <div style={styles.stats}>
              <span style={styles.stat}>{story.views} views</span>
              <span style={styles.statDot}>•</span>
              <span style={styles.stat}>{story.likes} likes</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #000000;
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
  },
  storyContainer: {
    position: 'relative',
    flex: 1,
    maxHeight: '70vh',
    overflow: 'hidden',
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  storyContent: {
    position: 'relative',
    zIndex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  storyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    paddingTop: 'max(16px, env(safe-area-inset-top))',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    borderRadius: '50%',
    border: '2px solid #FFFFFF',
  },
  avatarPlaceholder: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: BRAND_COLOR,
    border: '2px solid #FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: '600',
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '13px',
  },
  expiryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '500',
    padding: '6px 12px',
    borderRadius: '20px',
  },
  mediaContainer: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  noMedia: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  noMediaText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '16px',
  },
  captionContainer: {
    padding: '16px 20px',
    paddingBottom: '24px',
  },
  caption: {
    color: '#FFFFFF',
    fontSize: '15px',
    lineHeight: '22px',
    margin: 0,
  },
  actionSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    padding: '32px 24px',
    paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
  },
  actionContent: {
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  actionText: {
    color: '#717171',
    fontSize: '15px',
    textAlign: 'center',
    lineHeight: '22px',
    margin: 0,
  },
  openAppButton: {
    width: '100%',
    backgroundColor: BRAND_COLOR,
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
  },
  getAppButton: {
    width: '100%',
    backgroundColor: 'transparent',
    border: `2px solid ${BRAND_COLOR}`,
    borderRadius: '12px',
    padding: '14px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  getAppText: {
    color: BRAND_COLOR,
    fontSize: '16px',
    fontWeight: '600',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  stat: {
    color: '#999999',
    fontSize: '13px',
  },
  statDot: {
    color: '#CCCCCC',
    fontSize: '13px',
  },
};
