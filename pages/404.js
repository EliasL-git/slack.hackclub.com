import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'

const F = "'Phantom Sans', system-ui, sans-serif"
const Z = "'Zarathustra', Georgia, serif"

const NotFoundPage = () => (
  <>
    <Meta as={Head} title="404" />
    <ForceTheme theme="light" />
    <main
      id="main"
      tabIndex={-1}
      style={{ background: 'var(--background)', minHeight: '100vh' }}
    >
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(236,55,80,0.40) 60%, rgba(236,55,80,0.04) 100%)',
        }}
      >
        <Nav />

        {/* Content veil overlay */}
        <div
          aria-hidden="true"
          className="notfound-veil"
        />

        <div
          style={{
            position: 'relative',
            zIndex: 3,
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'clamp(120px, 18vh, 170px) 20px clamp(72px, 10vh, 120px)',
          }}
        >
          <img
            src="/404/dinobox.svg"
            alt=""
            style={{
              width: 'clamp(96px, 14vw, 160px)',
              height: 'auto',
              display: 'block',
              opacity: 0.85,
            }}
          />

          <p
            style={{
              margin: '18px 0 0',
              fontFamily: Z,
              fontWeight: 400,
              fontSize: 'clamp(48px, 7vw, 84px)',
              color: 'var(--foreground)',
              lineHeight: 1.08,
            }}
          >
            404!
          </p>

          <p
            style={{
              margin: '8px 0 0',
              fontFamily: F,
              fontWeight: 500,
              fontSize: 'clamp(24px, 4.2vw, 48px)',
              color: 'var(--foreground)',
              lineHeight: 1.08,
            }}
          >
            We couldn&apos;t find this page.
          </p>

          <p
            style={{
              margin: '14px 0 0',
              fontFamily: F,
              fontSize: 'clamp(16px, 1.7vw, 22px)',
              maxWidth: 620,
              color: 'var(--muted)',
              lineHeight: 1.28,
            }}
          >
            Try heading back to the homepage to find what you are looking for.
          </p>

          <div
            style={{
              marginTop: 'clamp(26px, 4.8vh, 42px)',
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href="/"
              className="go-home-btn"
              style={{
                fontFamily: F,
                fontSize: 22,
                textDecoration: 'none',
                borderRadius: 9999,
                padding: '11px 24px',
                lineHeight: 1,
                color: 'var(--cream)',
                background: 'var(--ink)',
              }}
            >
              Go home
            </a>
          </div>
        </div>

        <style>{`
          .notfound-veil {
            position: absolute;
            inset: 0;
            z-index: 2;
            background:
              radial-gradient(circle at top, rgba(255, 246, 235, 0.08), transparent 36%),
              linear-gradient(180deg, rgba(255, 246, 235, 0.18) 10%, rgba(255, 246, 235, 0.68) 42%, rgba(255, 246, 235, 0.94) 100%);
            pointer-events: none;
          }
          html.dark .notfound-veil {
            background:
              radial-gradient(circle at top, rgba(23, 23, 29, 0.08), transparent 36%),
              linear-gradient(180deg, rgba(23, 23, 29, 0.18) 10%, rgba(23, 23, 29, 0.68) 42%, rgba(23, 23, 29, 0.94) 100%);
          }
          .go-home-btn { transition: background-color 160ms ease; }
          .go-home-btn:hover { background: #ec3750; }
          @media (prefers-reduced-motion: reduce) {
            .go-home-btn { transition: none; }
          }
        `}</style>
      </section>

      <Footer />
    </main>
  </>
)

export default NotFoundPage