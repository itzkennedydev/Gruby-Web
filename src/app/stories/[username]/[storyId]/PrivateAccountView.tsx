/**
 * Private Account View Component
 *
 * Displays when a story belongs to a private account.
 * Shows the user's info and prompts to open/download the app
 * to view the story if they follow this user.
 */

'use client';

import Image from 'next/image';
import { Lock } from 'lucide-react';

const BRAND_COLOR = '#ff1e00';
const APP_STORE_URL = 'https://apps.apple.com/in/app/gruby/id6755449783';

interface PrivateAccountViewProps {
  userDisplayName: string;
  userAvatarUrl?: string;
  storyId: string;
}

export default function PrivateAccountView({
  userDisplayName,
  userAvatarUrl,
  storyId,
}: PrivateAccountViewProps) {
  // Try to open the app via deep link
  const handleOpenApp = () => {
    const deepLink = `gruby://stories/${storyId}`;
    window.location.href = deepLink;

    // If app doesn't open, redirect to app store after 1.5s
    setTimeout(() => {
      handleGetApp();
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
      window.open(APP_STORE_URL, '_blank');
    }
  };

  return (
    <>
      <div style={styles.container}>
        {/* Background */}
        <div style={styles.background} />

        {/* Content */}
        <div style={styles.content}>
          {/* User Avatar */}
          <div style={styles.avatarContainer}>
            {userAvatarUrl ? (
              <Image
                src={userAvatarUrl}
                alt={userDisplayName}
                width={100}
                height={100}
                style={styles.avatar}
              />
            ) : (
              <div style={styles.avatarPlaceholder}>
                {userDisplayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div style={styles.lockBadge}>
              <Lock size={16} color="#FFFFFF" />
            </div>
          </div>

          {/* User Name */}
          <h1 style={styles.displayName}>{userDisplayName}</h1>

          {/* Private Account Message */}
          <div style={styles.privateMessage}>
            <Lock size={18} color="#717171" style={{ marginRight: 8 }} />
            <span style={styles.privateText}>This Account is Private</span>
          </div>

          <p style={styles.description}>
            Follow this account in the Gruby app to see their stories and posts.
          </p>

          {/* Action Buttons */}
          <div style={styles.buttonContainer}>
            <button onClick={handleOpenApp} style={styles.primaryButton}>
              <Image
                src="/GrubyLogo.svg"
                alt="Gruby"
                width={80}
                height={24}
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
              />
              <span style={styles.buttonText}>Open in Gruby</span>
            </button>

            <button onClick={handleGetApp} style={styles.secondaryButton}>
              <span style={styles.secondaryButtonText}>Get the Gruby App</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 24px',
    maxWidth: '400px',
    textAlign: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: '24px',
  },
  avatar: {
    borderRadius: '50%',
    border: '3px solid #333333',
  },
  avatarPlaceholder: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#333333',
    border: '3px solid #444444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: '40px',
    fontWeight: '700',
  },
  lockBadge: {
    position: 'absolute',
    bottom: '4px',
    right: '4px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#333333',
    border: '2px solid #000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayName: {
    color: '#FFFFFF',
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    letterSpacing: '-0.5px',
  },
  privateMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '10px 20px',
    borderRadius: '20px',
    marginBottom: '16px',
  },
  privateText: {
    color: '#AAAAAA',
    fontSize: '14px',
    fontWeight: '500',
  },
  description: {
    color: '#717171',
    fontSize: '15px',
    lineHeight: '22px',
    margin: '0 0 32px 0',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '280px',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: BRAND_COLOR,
    border: 'none',
    borderRadius: '14px',
    padding: '14px 24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'opacity 0.2s',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: 'none',
    borderRadius: '14px',
    padding: '14px 24px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '600',
  },
};
