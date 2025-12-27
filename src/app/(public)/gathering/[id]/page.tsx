/**
 * Shared Gathering Page
 *
 * Airbnb-inspired design with:
 * - Full-width hero image with overlay
 * - Floating header with logo
 * - Card-based info sections
 * - Sticky action bar
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Design System: Warm charcoal for primary
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
  safety?: {
    ageRating?: string;
    contentWarnings?: string[];
    customContentWarning?: string;
    customContentWarningEmoji?: string;
  };
}

// Content warning display info
const CONTENT_WARNING_INFO: Record<string, { label: string; emoji: string }> = {
  alcohol: { label: 'Alcohol', emoji: '🍺' },
  loud_music: { label: 'Loud Music', emoji: '🔊' },
  flashing_lights: { label: 'Flashing Lights', emoji: '💡' },
  pets_present: { label: 'Pets Present', emoji: '🐾' },
  late_night: { label: 'Late Night', emoji: '🌙' },
  allergens: { label: 'Allergens', emoji: '⚠️' },
  custom: { label: 'Custom', emoji: '📝' },
};

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
        const response = await fetch(`/api/gathering/${gatheringId}`);

        if (response.ok) {
          const data = await response.json();
          setGatheringData(data);
        } else {
          const dataParam = searchParams.get('data');
          if (dataParam) {
            const decoded = JSON.parse(decodeURIComponent(dataParam));
            setGatheringData(decoded);
          } else {
            setError('Gathering not found');
          }
        }
      } catch (err) {
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

    const deepLink = `gruby://gathering/${gatheringData.id}`;
    window.location.href = deepLink;

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
          text: `Join "${gatheringData?.title}" on Gruby`,
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

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      potluck: '🍲',
      dinner_party: '🍽️',
      cooking_event: '👨‍🍳',
      food_share: '🥗',
      meal_prep: '📦',
      cooking_class: '📚',
    };
    return icons[type] || '🍴';
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
          <div style={styles.errorIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h1 style={styles.errorTitle}>Gathering Not Found</h1>
          <p style={styles.errorText}>
            {error || 'This gathering may have been cancelled or is no longer available.'}
          </p>
          <a href="/" style={styles.errorLink}>
            Go to Gruby.app
          </a>
        </div>
      </div>
    );
  }

  const spotsLeft = getSpotsLeft();
  const isFull = spotsLeft === 0;

  return (
    <>
      <div style={styles.container}>
        {/* Floating Header */}
        <header className="floating-header" style={styles.floatingHeader}>
          <Image
            src="/GrubyLogo.svg"
            alt="Gruby"
            width={90}
            height={24}
            priority
          />
          <button
            onClick={handleSharePage}
            style={styles.headerShareButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 6.667a2.5 2.5 0 1 0-1.875-2.4L7.5 7.5a2.5 2.5 0 1 0 0 3.333l5.625 3.233a2.5 2.5 0 1 0 .625-1.733l-5.625-3.233a2.5 2.5 0 0 0 0-1.667l5.625-3.233A2.5 2.5 0 0 0 15 6.667z"
                stroke="#222222"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </header>

        {/* Hero Image */}
        <div className="hero-container" style={styles.heroContainer}>
          {gatheringData.coverImageUrl ? (
            <img
              src={gatheringData.coverImageUrl}
              alt={gatheringData.title}
              style={styles.heroImage}
            />
          ) : (
            <div style={styles.heroPlaceholder}>
              <span style={styles.heroPlaceholderIcon}>{getTypeIcon(gatheringData.type)}</span>
            </div>
          )}
          <div style={styles.heroGradient} />
        </div>

        {/* Content */}
        <div className="content-wrapper" style={styles.contentWrapper}>
          {/* Type Badge with Content Warnings */}
          <div style={styles.typeBadgeRow}>
            <div style={styles.typeBadge}>
              <span style={styles.typeBadgeIcon}>{getTypeIcon(gatheringData.type)}</span>
              <span style={styles.typeBadgeText}>{getTypeLabel(gatheringData.type)}</span>
            </div>
            {gatheringData.safety?.contentWarnings && gatheringData.safety.contentWarnings.length > 0 && (
              <div style={styles.warningsInline}>
                {gatheringData.safety.contentWarnings.map((warning) => {
                  const info = warning === 'custom'
                    ? {
                        emoji: gatheringData.safety?.customContentWarningEmoji || '⚠️',
                        label: gatheringData.safety?.customContentWarning || 'Custom Warning'
                      }
                    : CONTENT_WARNING_INFO[warning] || { emoji: '⚠️', label: warning };
                  return (
                    <div key={warning} style={styles.warningBadgeInline}>
                      <span style={styles.warningEmoji}>{info.emoji}</span>
                      <span style={styles.warningLabelInline}>{info.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="title" style={styles.title}>{gatheringData.title}</h1>

          {/* Host Card */}
          <div className="info-card" style={styles.infoCard}>
            <div style={styles.hostRow}>
              <img
                src={gatheringData.hostPhotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(gatheringData.hostDisplayName)}&background=504944&color=fff&size=56`}
                alt={gatheringData.hostDisplayName}
                className="host-avatar"
                style={styles.hostAvatar}
              />
              <div style={styles.hostInfo}>
                <p style={styles.hostLabel}>Hosted by</p>
                <p style={styles.hostName}>{gatheringData.hostDisplayName}</p>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="info-card" style={styles.infoCard}>
            {/* Date & Time */}
            <div style={styles.detailRow}>
              <div style={styles.detailIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div style={styles.detailContent}>
                <p style={styles.detailPrimary}>{formatDate(gatheringData.startTime)}</p>
                <p style={styles.detailSecondary}>{formatTime(gatheringData.startTime)}</p>
              </div>
            </div>

            {/* Location */}
            {(gatheringData.location.city || gatheringData.location.address) && (
              <div style={styles.detailRow}>
                <div style={styles.detailIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div style={styles.detailContent}>
                  <p style={styles.detailPrimary}>
                    {gatheringData.location.city}
                    {gatheringData.location.state ? `, ${gatheringData.location.state}` : ''}
                  </p>
                  {!gatheringData.isPrivate && gatheringData.location.address && (
                    <p style={styles.detailSecondary}>{gatheringData.location.address}</p>
                  )}
                </div>
              </div>
            )}

            {/* Guests */}
            <div style={{...styles.detailRow, borderBottom: 'none', paddingBottom: 0}}>
              <div style={styles.detailIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div style={styles.detailContent}>
                <p style={styles.detailPrimary}>{gatheringData.currentParticipants} going</p>
                <p style={isFull ? styles.detailSecondaryFull : styles.detailSecondary}>
                  {isFull ? 'Event is full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
                </p>
              </div>
              {!isFull && (
                <div style={styles.spotsIndicator}>
                  <span style={styles.spotsNumber}>{spotsLeft}</span>
                  <span style={styles.spotsLabel}>left</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {gatheringData.description && (
            <div className="info-card" style={styles.infoCard}>
              <h2 style={styles.sectionTitle}>About this gathering</h2>
              <p style={styles.description}>{gatheringData.description}</p>
            </div>
          )}

        </div>

        {/* Bottom Padding for Fixed Button */}
        <div style={styles.bottomPadding} />

        {/* Sticky Action Bar */}
        <div className="sticky-action-bar" style={styles.stickyActionBar}>
          <div className="action-bar-content" style={styles.actionBarContent}>
            <div style={styles.actionBarInfo}>
              <p style={styles.actionBarTitle}>
                {isFull ? 'Event is full' : `${spotsLeft} spot${spotsLeft !== 1 ? 's' : ''} left`}
              </p>
              <p style={styles.actionBarSubtitle}>{formatDate(gatheringData.startTime)}</p>
            </div>
            <button
              onClick={handleOpenInApp}
              className="join-button"
              style={isFull ? styles.joinButtonDisabled : styles.joinButton}
              disabled={isFull}
              onMouseEnter={(e) => {
                if (!isFull) e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                if (!isFull) e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isFull ? 'Full' : 'Join in App'}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #F7F7F7;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design - Tablet (768px+) */
        @media (min-width: 768px) {
          .hero-container {
            height: 360px !important;
          }
          .content-wrapper {
            max-width: 680px !important;
            padding: 0 32px !important;
          }
          .info-card {
            padding: 24px !important;
          }
          .title {
            font-size: 32px !important;
            line-height: 40px !important;
          }
          .host-avatar {
            width: 64px !important;
            height: 64px !important;
          }
          .sticky-action-bar {
            padding: 20px 32px !important;
          }
          .action-bar-content {
            max-width: 680px !important;
          }
        }

        /* Responsive Design - Desktop (1024px+) */
        @media (min-width: 1024px) {
          .hero-container {
            height: 420px !important;
            width: 100% !important;
            border-radius: 0 !important;
          }
          .content-wrapper {
            max-width: 720px !important;
            padding: 0 40px !important;
            margin-top: -60px !important;
          }
          .info-card {
            padding: 28px !important;
            border-radius: 20px !important;
          }
          .title {
            font-size: 36px !important;
            line-height: 44px !important;
          }
          .floating-header {
            padding: 16px 40px !important;
          }
          .action-bar-content {
            max-width: 720px !important;
          }
          .join-button {
            padding: 16px 36px !important;
            font-size: 16px !important;
          }
        }

        /* Large Desktop (1280px+) - Full width hero per user request */
        @media (min-width: 1280px) {
          .hero-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            height: 480px !important;
            border-radius: 0 !important;
          }
          .content-wrapper {
            max-width: 800px !important;
          }
          .action-bar-content {
            max-width: 800px !important;
          }
        }
      `}</style>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#F7F7F7',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '16px',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
  },
  errorIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#222222',
    marginBottom: '12px',
    margin: 0,
  },
  errorText: {
    fontSize: '15px',
    color: '#717171',
    lineHeight: '22px',
    marginBottom: '24px',
  },
  errorLink: {
    fontSize: '15px',
    fontWeight: '600',
    color: BRAND_COLOR,
    textDecoration: 'none',
  },
  floatingHeader: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    backgroundColor: 'transparent',
  },
  headerShareButton: {
    width: '36px',
    height: '36px',
    borderRadius: '18px',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  heroContainer: {
    position: 'relative',
    width: '100%',
    height: '280px',
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  heroPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #4a4a4a 100%)`,
  },
  heroPlaceholderIcon: {
    fontSize: '64px',
    opacity: 0.5,
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(to top, #F7F7F7 0%, transparent 100%)',
  },
  contentWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 20px',
    marginTop: '-40px',
    position: 'relative',
    zIndex: 10,
  },
  typeBadgeRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  typeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    paddingLeft: '12px',
    paddingRight: '14px',
    paddingTop: '8px',
    paddingBottom: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  warningsInline: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
    gap: '6px',
  },
  warningBadgeInline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: '#FEF3C7',
    borderRadius: '16px',
    padding: '6px 10px',
  },
  warningLabelInline: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#92400E',
  },
  typeBadgeIcon: {
    fontSize: '16px',
  },
  typeBadgeText: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#222222',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#222222',
    margin: 0,
    marginBottom: '20px',
    lineHeight: '34px',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '16px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
  },
  hostRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  hostAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '28px',
    objectFit: 'cover',
  },
  hostInfo: {
    flex: 1,
  },
  hostLabel: {
    fontSize: '13px',
    color: '#717171',
    margin: 0,
    marginBottom: '2px',
  },
  hostName: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#222222',
    margin: 0,
  },
  detailRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: '1px solid #F0F0F0',
  },
  detailIcon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: '2px',
  },
  detailContent: {
    flex: 1,
  },
  detailPrimary: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#222222',
    margin: 0,
    marginBottom: '2px',
  },
  detailSecondary: {
    fontSize: '14px',
    color: '#717171',
    margin: 0,
  },
  detailSecondaryFull: {
    fontSize: '14px',
    color: '#DC2626',
    margin: 0,
    fontWeight: '500',
  },
  spotsIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: '12px',
    padding: '8px 14px',
  },
  spotsNumber: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2E7D32',
    lineHeight: '1',
  },
  spotsLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#2E7D32',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  sectionTitle: {
    fontSize: '17px',
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
  warningsList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },
  warningBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#FEF3C7',
    borderRadius: '20px',
    padding: '8px 14px',
  },
  warningEmoji: {
    fontSize: '16px',
  },
  warningLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#92400E',
  },
  bottomPadding: {
    height: '100px',
  },
  stickyActionBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTop: '1px solid #EBEBEB',
    padding: '16px 20px',
    paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
    zIndex: 100,
  },
  actionBarContent: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  actionBarInfo: {
    flex: 1,
  },
  actionBarTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#222222',
    margin: 0,
    marginBottom: '2px',
  },
  actionBarSubtitle: {
    fontSize: '13px',
    color: '#717171',
    margin: 0,
  },
  joinButton: {
    backgroundColor: BRAND_COLOR,
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    whiteSpace: 'nowrap',
  },
  joinButtonDisabled: {
    backgroundColor: '#CCCCCC',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'not-allowed',
    whiteSpace: 'nowrap',
  },
};
