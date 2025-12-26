/**
 * Shared Gathering Page
 *
 * This page displays a shared gathering with the exact design language
 * of the mobile app, including gathering details, host info, and a button
 * to join via the Gruby app.
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Design System v2.0: Charcoal for primary
const BRAND_COLOR = '#222222';

interface GatheringData {
  id: string;
  title: string;
  description?: string;
  hostDisplayName: string;
  hostPhotoURL?: string;
  startTime: string;
  location: {
    city?: string;
    state?: string;
    address?: string;
  };
  type: string;
  maxParticipants: number;
  currentParticipants: number;
  coverImageUrl?: string;
  isPrivate?: boolean;
}

export default function SharedGatheringPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const gatheringId = params.id as string;
  const [gatheringData, setGatheringData] = useState<GatheringData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGatheringData = async () => {
      try {
        // Try to fetch from API first
        const response = await fetch(`/api/gathering/${gatheringId}`);

        if (response.ok) {
          const data = await response.json();
          setGatheringData(data);
        } else {
          // Fallback to URL-encoded data
          const dataParam = searchParams.get('data');
          if (dataParam) {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            setGatheringData(decoded);
          } else {
            setError('Gathering not found');
          }
        }
      } catch (err) {
        // Try URL-encoded data as fallback
        const dataParam = searchParams.get('data');
        if (dataParam) {
          try {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            setGatheringData(decoded);
          } catch (parseErr) {
            setError('Unable to load gathering');
          }
        } else {
          setError('Unable to load gathering');
        }
      } finally {
        setLoading(false);
      }
    };

    if (gatheringId) {
      fetchGatheringData();
    }
  }, [gatheringId, searchParams]);

  const handleOpenInApp = () => {
    if (!gatheringData) return;

    // Create deep link to open app with gathering
    const deepLink = `gruby://gathering/${gatheringData.id}`;

    // Try to open app
    window.location.href = deepLink;

    // Fallback: redirect to app store if app not installed
    setTimeout(() => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);

      if (isIOS) {
        window.location.href = 'https://apps.apple.com/app/gruby';
      } else if (isAndroid) {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.gruby.app';
      } else {
        alert('Please download the Gruby app to join this gathering.');
      }
    }, 500);
  };

  const handleSharePage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gatheringData?.title || 'Gathering',
          text: `${gatheringData?.hostDisplayName} is hosting "${gatheringData?.title}"! Join us on Gruby.`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      potluck: 'Potluck',
      dinner_party: 'Dinner Party',
      cooking_event: 'Cooking Event',
      food_share: 'Food Share',
      meal_prep: 'Meal Prep',
      cooking_class: 'Cooking Class',
    };
    return labels[type] || 'Gathering';
  };

  const getSpotsLeft = () => {
    if (!gatheringData) return 0;
    return Math.max(0, gatheringData.maxParticipants - gatheringData.currentParticipants);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading gathering...</p>
        </div>
      </div>
    );
  }

  if (error || !gatheringData) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <h1 style={styles.errorTitle}>Gathering Not Found</h1>
          <p style={styles.errorText}>{error || 'This gathering may have been cancelled or is no longer available.'}</p>
        </div>
      </div>
    );
  }

  const spotsLeft = getSpotsLeft();
  const isFull = spotsLeft === 0;

  return (
    <>
      <div style={styles.container}>
        {/* Header with Logo */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.logoContainer}>
              <Image
                src="/GrubyLogo.svg"
                alt="Gruby"
                width={120}
                height={32}
                priority
                style={styles.logo}
              />
            </div>
            <p style={styles.sharedByText}>
              {gatheringData.hostDisplayName} invited you to a gathering
            </p>
          </div>
        </header>

        {/* Hero Image */}
        {gatheringData.coverImageUrl && (
          <div style={styles.heroContainer}>
            <img
              src={gatheringData.coverImageUrl}
              alt={gatheringData.title}
              style={styles.heroImage}
            />
            <div style={styles.heroOverlay} />
          </div>
        )}

        {/* Gathering Info */}
        <div style={styles.content}>
          {/* Type Badge */}
          <div style={styles.typeBadge}>
            <span style={styles.typeBadgeText}>{getTypeLabel(gatheringData.type)}</span>
          </div>

          {/* Title */}
          <h1 style={styles.title}>{gatheringData.title}</h1>

          {/* Host Info */}
          <div style={styles.hostRow}>
            <img
              src={gatheringData.hostPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(gatheringData.hostDisplayName)}&background=504944&color=fff&size=48`}
              alt={gatheringData.hostDisplayName}
              style={styles.hostAvatar}
            />
            <div>
              <p style={styles.hostedBy}>Hosted by</p>
              <p style={styles.hostName}>{gatheringData.hostDisplayName}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div style={styles.infoRow}>
            <div style={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <p style={styles.infoLabel}>{formatDate(gatheringData.startTime)}</p>
              <p style={styles.infoValue}>{formatTime(gatheringData.startTime)}</p>
            </div>
          </div>

          {/* Location */}
          {(gatheringData.location.city || gatheringData.location.address) && (
            <div style={styles.infoRow}>
              <div style={styles.infoIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <p style={styles.infoLabel}>
                  {gatheringData.location.city}
                  {gatheringData.location.state ? `, ${gatheringData.location.state}` : ''}
                </p>
                {!gatheringData.isPrivate && gatheringData.location.address && (
                  <p style={styles.infoValue}>{gatheringData.location.address}</p>
                )}
              </div>
            </div>
          )}

          {/* Guests */}
          <div style={styles.infoRow}>
            <div style={styles.infoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div>
              <p style={styles.infoLabel}>{gatheringData.currentParticipants} going</p>
              <p style={isFull ? styles.infoValueFull : styles.infoValue}>
                {isFull ? 'Event is full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
              </p>
            </div>
          </div>

          {/* Description */}
          {gatheringData.description && (
            <div style={styles.descriptionSection}>
              <h2 style={styles.sectionTitle}>About this gathering</h2>
              <p style={styles.description}>{gatheringData.description}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={styles.actionSection}>
          <button
            onClick={handleSharePage}
            style={styles.shareButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F7F7F7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 6.667a2.5 2.5 0 1 0-1.875-2.4L7.5 7.5a2.5 2.5 0 1 0 0 3.333l5.625 3.233a2.5 2.5 0 1 0 .625-1.733l-5.625-3.233a2.5 2.5 0 0 0 0-1.667l5.625-3.233A2.5 2.5 0 0 0 15 6.667z"
                stroke="#717171"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={styles.shareButtonText}>Share</span>
          </button>

          <button
            onClick={handleOpenInApp}
            style={isFull ? styles.joinButtonDisabled : styles.joinButton}
            disabled={isFull}
            onMouseEnter={(e) => {
              if (!isFull) e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              if (!isFull) e.currentTarget.style.opacity = '1';
            }}
          >
            <span style={styles.joinButtonText}>
              {isFull ? 'Event Full' : 'Join in Gruby App'}
            </span>
            {!isFull && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
    paddingBottom: 'max(40px, env(safe-area-inset-bottom))',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #F0F0F0',
    borderTop: `3px solid ${BRAND_COLOR}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '15px',
    color: '#717171',
    fontWeight: '500',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '40px',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    marginBottom: '12px',
  },
  errorText: {
    fontSize: '15px',
    color: '#717171',
    lineHeight: '22px',
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #EBEBEB',
    paddingTop: '24px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  headerContent: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },
  logo: {
    height: 'auto',
    width: 'auto',
  },
  sharedByText: {
    fontSize: '15px',
    color: '#717171',
    margin: 0,
    fontWeight: '500',
    textAlign: 'center',
  },
  heroContainer: {
    position: 'relative',
    width: '100%',
    height: '240px',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80px',
    background: 'linear-gradient(transparent, rgba(255,255,255,0.8))',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px 20px',
  },
  typeBadge: {
    display: 'inline-block',
    backgroundColor: '#F5F5F5',
    borderRadius: '8px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '6px',
    paddingBottom: '6px',
    marginBottom: '12px',
  },
  typeBadgeText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#717171',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
    marginBottom: '20px',
    lineHeight: '34px',
  },
  hostRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #F0F0F0',
  },
  hostAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '24px',
    objectFit: 'cover',
  },
  hostedBy: {
    fontSize: '13px',
    color: '#717171',
    margin: 0,
    marginBottom: '2px',
  },
  hostName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#222222',
    margin: 0,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '14px',
    marginBottom: '16px',
  },
  infoIcon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },
  infoLabel: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#222222',
    margin: 0,
    marginBottom: '2px',
  },
  infoValue: {
    fontSize: '14px',
    color: '#717171',
    margin: 0,
  },
  infoValueFull: {
    fontSize: '14px',
    color: '#DC2626',
    margin: 0,
    fontWeight: '500',
  },
  descriptionSection: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #F0F0F0',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#222222',
    margin: 0,
    marginBottom: '12px',
  },
  description: {
    fontSize: '15px',
    color: '#555555',
    margin: 0,
    lineHeight: '24px',
  },
  actionSection: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    paddingTop: '24px',
    borderTop: '1px solid #EBEBEB',
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
  },
  shareButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#FFFFFF',
    color: '#222222',
    border: '1px solid #DDDDDD',
    borderRadius: '12px',
    padding: '14px 20px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  },
  shareButtonText: {
    color: '#222222',
  },
  joinButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: BRAND_COLOR,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
  joinButtonDisabled: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: '#CCCCCC',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'not-allowed',
  },
  joinButtonText: {
    color: '#FFFFFF',
  },
};
