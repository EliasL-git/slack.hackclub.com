'use client'

import { useState, useEffect } from 'react'
import { getLiveCount, formatted as defaultFormatted } from '../../lib/members'

function WaveDivider() {
  return (
    <div
      className="wave-container"
      style={{
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        lineHeight: 0,
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 1920 22"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 22, display: 'block', marginBottom: -8 }}
      >
        <path
          d="M0,18 C40,18 40,2 80,2 C120,2 120,18 160,18 C200,18 200,2 240,2 C280,2 280,18 320,18 C360,18 360,2 400,2 C440,2 440,18 480,18 C520,18 520,2 560,2 C600,2 600,18 640,18 C680,18 680,2 720,2 C760,2 760,18 800,18 C840,18 840,2 880,2 C920,2 920,18 960,18 C1000,18 1000,2 1040,2 C1080,2 1080,18 1120,18 C1160,18 1160,2 1200,2 C1240,2 1240,18 1280,18 C1320,18 1320,2 1360,2 C1400,2 1400,18 1440,18 C1480,18 1480,2 1520,2 C1560,2 1560,18 1600,18 C1640,18 1640,2 1680,2 C1720,2 1720,18 1760,18 C1800,18 1800,2 1840,2 C1880,2 1880,18 1920,18"
          fill="none"
          style={{ stroke: 'var(--background)' }}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <svg
        viewBox="0 0 1920 40"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 40, display: 'block' }}
      >
        <path
          d="M0,40 L0,27 C40,27 40,8 80,8 C120,8 120,27 160,27 C200,27 200,8 240,8 C280,8 280,27 320,27 C360,27 360,8 400,8 C440,8 440,27 480,27 C520,27 520,8 560,8 C600,8 600,27 640,27 C680,27 680,8 720,8 C760,8 760,27 800,27 C840,27 840,8 880,8 C920,8 920,27 960,27 C1000,27 1000,8 1040,8 C1080,8 1080,27 1120,27 C1160,27 1160,8 1200,8 C1240,8 1240,27 1280,27 C1320,27 1320,8 1360,8 C1400,8 1400,27 1440,27 C1480,27 1480,8 1520,8 C1560,8 1560,27 1600,27 C1640,27 1640,8 1680,8 C1720,8 1720,27 1760,27 C1800,27 1800,8 1840,8 C1880,8 1880,27 1920,27 L1920,40 Z"
          style={{ fill: 'var(--background)' }}
        />
      </svg>
    </div>
  )
}

function MemberBadge() {
  const [count, setCount] = useState(defaultFormatted)

  useEffect(() => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    getLiveCount(controller.signal)
      .then(data => setCount(data.formatted))
      .catch(() => {})
      .finally(() => clearTimeout(timeout))
    return () => {
      controller.abort()
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(236,55,80,0.08)',
        border: '1px solid rgba(236,55,80,0.12)',
        borderRadius: 9999,
        padding: '4px 16px',
        marginBottom: 16,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#2eb67d',
          boxShadow: '0 0 6px #2eb67d',
        }}
      />
      <span
        style={{
          color: 'var(--foreground)',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.03em',
          fontFamily: "'Phantom Sans', system-ui, sans-serif",
        }}
      >
        {count} hackers online
      </span>
    </div>
  )
}

export default function SlackHeader({ onJoinClick }) {
  return (
    <section
      className="slack-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(236,55,80,0.04) 60%, rgba(236,55,80,0.40) 100%)',
      }}
    >
      <div
        className="hero-center"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10,
          paddingTop: 80,
          paddingBottom: 100,
          gap: 0,
        }}
      >
        <MemberBadge />

        <h1
          style={{
            fontFamily: "'Zarathustra', Georgia, serif",
            fontSize: 'clamp(52px, 12vw, 90px)',
            fontWeight: 'normal',
            lineHeight: 0.92,
            color: 'var(--foreground)',
            margin: 0,
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          Where hackers<br />
          hang out on{' '}
          <span
            style={{
              background:
                'repeating-linear-gradient(105deg, #ec3750 0%, #ff8c37 16%, #f1c40f 32%, #33d6a6 48%, #338eda 64%, #a633d6 80%, #ec3750 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Slack
          </span>
        </h1>

        <p
          style={{
            fontFamily: "'Phantom Sans', system-ui, sans-serif",
            fontWeight: 'normal',
            fontSize: 20,
            color: 'var(--foreground)',
            margin: 0,
            marginBottom: 32,
            lineHeight: 1.2,
            textAlign: 'center',
            maxWidth: 'min(600px, calc(100vw - 64px))',
          }}
        >
          Hack Clubbers hang out on our Slack. Join up to make friends, find projects, and have fun.
        </p>

        <button
          onClick={onJoinClick}
          className="hero-join-btn"
          style={{
            fontFamily: "'Phantom Sans', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 22,
            color: 'white',
            background: '#ec3750',
            border: 'none',
            borderRadius: 9999,
            padding: '14px 40px',
            cursor: 'pointer',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          Join Hack Club
        </button>

        <p
          style={{
            fontFamily: "'Phantom Sans', system-ui, sans-serif",
            fontStyle: 'italic',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: 1.35,
            color: 'var(--foreground)',
            margin: 0,
            marginTop: 10,
            padding: '10px 16px',
            maxWidth: 'min(680px, calc(100vw - 48px))',
            background: 'var(--nav-bg)',
            border: '1px solid var(--border)',
            borderRadius: 9999,
            boxShadow: '0 10px 28px rgba(23, 23, 29, 0.08)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            pointerEvents: 'auto',
            textAlign: 'center',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            columnGap: 4,
          }}
        >
          <span style={{ color: 'var(--foreground)' }}>
            For all teens aged 13–18. By joining, you agree to our
          </span>
          <a
            href="https://hackclub.com/conduct/"
            style={{
              color: '#ec3750',
              textDecoration: 'underline',
              textUnderlineOffset: 2,
              whiteSpace: 'nowrap',
            }}
          >
            code of conduct.
          </a>
        </p>
      </div>

      <WaveDivider />

      <style>{`
        @media (max-width: 1023px) {
          .hero-center { padding-left: 24px; padding-right: 24px; }
        }
        .hero-join-btn {
          transition: background 0.4s ease, color 0.4s ease;
        }
        .hero-join-btn:hover {
          background: #ff8c37 !important;
        }
        @keyframes teens-gradient {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .slack-hero h1 span {
          animation: teens-gradient 6s linear infinite;
        }
        @media (max-width: 767px) {
          .wave-container { overflow: hidden !important; }
          .wave-container svg { width: 300% !important; margin-left: -100% !important; }
        }
      `}</style>
    </section>
  )
}