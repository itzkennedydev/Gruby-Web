/**
 * Story Viewer Client Component
 *
 * Displays the story preview and handles opening the app
 * or redirecting to app stores.
 */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Design System v2.0: Brand Red for primary
const BRAND_COLOR = '#ff1e00'; // Primary - brand color
const APP_STORE_URL = 'https://apps.apple.com/in/app/gruby/id6755449783';

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

  // Track story view on mount
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch('/api/stories/view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storyId }),
        });
      } catch (error) {
        // Silently fail - view tracking is not critical
        console.error('Failed to track story view:', error);
      }
    };

    trackView();
  }, [storyId]);

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
      alert('Gruby for Android is coming soon! Currently available on iOS.');
    } else {
      // Desktop - show both options or default to iOS
      window.open(APP_STORE_URL, '_blank');
    }
  };

  return (
    <>
      <div style={styles.container}>
        {/* Full-screen story background */}
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

        {/* Story Media - Full screen */}
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
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <div style={styles.noMedia}>
              <span style={styles.noMediaText}>Story Preview</span>
            </div>
          )}
        </div>

        {/* Top gradient overlay */}
        <div style={styles.topGradient} />

        {/* Bottom gradient overlay */}
        <div style={styles.bottomGradient} />

        {/* Header - User info */}
        <div style={styles.storyHeader}>
          <div style={styles.userInfo}>
            {story.userAvatarUrl ? (
              <Image
                src={story.userAvatarUrl}
                alt={story.userDisplayName}
                width={44}
                height={44}
                style={styles.avatar}
              />
            ) : (
              <div style={styles.avatarPlaceholder}>
                {story.userDisplayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={styles.userDetails}>
              <div style={styles.nameAndStats}>
                <span style={styles.displayName}>{story.userDisplayName}</span>
                <span style={styles.inlineStats}>
                  <span style={styles.inlineStat}>{story.views} views</span>
                  <span style={styles.statDot}>•</span>
                  <span style={styles.inlineStat}>{story.likes} likes</span>
                </span>
              </div>
              <span style={styles.timeAgo}>{formatPostedTime()}</span>
            </div>
          </div>
        </div>

        {/* Caption overlay at bottom */}
        {story.caption && (
          <div style={styles.captionOverlay}>
            <p style={styles.caption}>{story.caption}</p>
          </div>
        )}

        {/* Bottom action bar */}
        <div style={styles.bottomBar}>
          <button
            onClick={handleOpenApp}
            style={styles.openAppButton}
            disabled={isAppOpening}
          >
            <Image
              src="/GrubyLogo.svg"
              alt="Gruby"
              width={80}
              height={24}
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
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
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  mediaContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '150px',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '250px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  storyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    paddingTop: 'max(16px, env(safe-area-inset-top))',
    zIndex: 10,
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
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: BRAND_COLOR,
    border: '2px solid #FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: '700',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  nameAndStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  inlineStats: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  inlineStat: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: '13px',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  timeAgo: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '13px',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  },
  captionOverlay: {
    position: 'absolute',
    bottom: '180px',
    left: 0,
    right: 0,
    padding: '0 20px',
    zIndex: 10,
  },
  caption: {
    color: '#FFFFFF',
    fontSize: '15px',
    lineHeight: '22px',
    margin: 0,
    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    zIndex: 10,
  },
  openAppButton: {
    width: '100%',
    maxWidth: '320px',
    backgroundColor: BRAND_COLOR,
    border: 'none',
    borderRadius: '14px',
    padding: '14px 24px',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
  },
  getAppButton: {
    width: '100%',
    maxWidth: '320px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderRadius: '14px',
    padding: '14px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  getAppText: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
  },
  statDot: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '13px',
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
};
