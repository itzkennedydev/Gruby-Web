/**
 * Story Not Found Page
 *
 * Displayed when a story has expired or doesn't exist.
 */

'use client';

import Image from 'next/image';

// Design System v2.0: Brand Red for primary
const BRAND_COLOR = '#ff1e00'; // Primary - brand color
const APP_STORE_URL = 'https://apps.apple.com/app/gruby/id6755449783';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.grubyapp.android';

export default function StoryNotFound() {
  const handleGetApp = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      window.location.href = APP_STORE_URL;
    } else if (isAndroid) {
      window.location.href = PLAY_STORE_URL;
    } else {
      window.open(APP_STORE_URL, '_blank');
    }
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.content}>
          <Image
            src="/GrubyLogo.svg"
            alt="Gruby"
            width={120}
            height={32}
            priority
          />

          <div style={styles.iconContainer}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#CCCCCC" strokeWidth="2" />
              <path d="M12 7V12L15 15" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <h1 style={styles.title}>Story Unavailable</h1>
          <p style={styles.description}>
            This story may have expired or been deleted. Stories on Gruby are only available for 24 hours.
          </p>

          <button onClick={handleGetApp} style={styles.button}>
            <span style={styles.buttonText}>Open Gruby</span>
          </button>

          <a href="https://gruby.app" style={styles.link}>
            Learn more about Gruby
          </a>
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
          background-color: #FFFFFF;
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
  },
  content: {
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  iconContainer: {
    marginTop: '20px',
    marginBottom: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
  },
  description: {
    fontSize: '15px',
    color: '#717171',
    lineHeight: '22px',
    margin: 0,
  },
  button: {
    width: '100%',
    backgroundColor: BRAND_COLOR,
    border: 'none',
    borderRadius: '12px',
    padding: '16px 24px',
    cursor: 'pointer',
    marginTop: '12px',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: '700',
  },
  link: {
    color: BRAND_COLOR,
    fontSize: '14px',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
