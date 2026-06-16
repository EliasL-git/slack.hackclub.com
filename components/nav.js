'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { ThemeToggle } from './ThemeToggle'

const ease = 'cubic-bezier(0.23, 1, 0.32, 1)'

const navLinks = [
  { label: 'Join', href: '/' },
  { label: 'Clubs', href: 'https://hackclub.com/clubs' },
  { label: 'Fiscal Sponsorship', href: 'https://hackclub.com/hcb' },
  { label: 'Hackathons', href: 'https://hackclub.com/hackathons' },
  { label: 'Toolbox', href: 'https://toolbox.hackclub.com' },
  { label: 'Donors', href: 'https://hackclub.com/philanthropy' },
]

function HackClubLogo() {
  return (
    <svg fill="none" height="184" viewBox="0 0 526 184" width="526" xmlns="http://www.w3.org/2000/svg" style={{ height: 48, width: 'auto', display: 'block' }}>
      <path d="m55.8921 11.7637c.0707-.1618.164-.2888.3102-.388 3.6278-2.46232 56.3447-35.6439 181.2237 24.2345 117.958 56.5607 236.902-9.6296 258.275-22.8628.709-.4385 1.896.6899 1.516 1.4308l-21.482 41.816c-.339.6589.125 1.4434.865 1.4536 5.587.0776 25.068.3014 46.883.0118.905-.012 1.419 1.0178.761 1.6389-14.653 13.8257-118.058 108.5995-199.244 108.5995-87.574 0-135-20.455-191-35.924-55.1431-15.232-81.6821-20.342-115.4217-14.74-.7277.121-1.3436-.555-1.1416-1.264l13.0633-45.8711z" fill="#ec3750"/>
      <g fill="#fff" stroke="#fff" strokeMiterlimit="10" strokeWidth="0.25">
        <path d="m83.681 33.1134c-1.3288 7.5138-3.8793 20.4209-9.2407 37.1005-11.136 26.6026 7.856 22.2635 13.2943 11.2109 3.2234-6.1032 6.5386-12.726 6.5386-12.726l17.0678 6.5435s-1.374 7.7724-2.779 14.2029c-5.362 16.6798 10.269 14.6768 14.592 2.355 1.924-6.3367 10.891-32.7944 13.364-46.7858 3.728-8.9535-9.032-17.1278-14.805-2.6602-3.086 5.3259-8.097 16.9897-8.097 16.9897s-14.0882-5.2053-14.2559-5.7702c-.5501-1.4346 1.1759-5.1346 1.2519-8.596-.8581-23.9457-15.1445-21.9696-16.931-11.8643z"/>
        <path d="m158.883 51.7621c4.344-8.648 9.332-10.0984 13.041-9.7043 1.6.1324 3.776 3.3868 5.44 6.5129 5.448 20.5877-4.315 58.4523-6.041 60.9953-5.942 9.598-16.368 7.783-12.408-2.586 1.85-6.299 3.831-12.0251 3.831-12.0251l-13.496-1.507c-10.605 20.6021-20.14 11.9761-14.645 3.076 5.878-10.4263 18.401-33.2526 24.278-44.7618zm-4.461 26.48 13.304 2.2707s3.695-23.4265-.46-20.9551z"/>
        <path d="m227.586 72.5188c1.761-4.9617-1.9-16.1816-14.69-14.3105-18.525.1335-24.934 32.5917-24.934 32.5917s-3.079 15.72 1.78 26.434c4.416 10.33 15.128 10.363 17.208 10.625 12.159-3.656 7.995-11.757 5.916-12.018-2.647-.135-6.238.299-9.138-2.066-4.917-3.963-4.041-14.0223-2.973-19.4326 2.515-9.0989 8.05-27.1676 16.875-22.7463 5.296 6.7676 9.012 3.6588 9.956.9227z"/>
        <path d="m239.769 71.6846c-3.257 9.9471.827 20.4238-7.318 39.3594-1.942 4.625-6.705 13.107-7.269 14.311-4.512 8.548 4.65 13.586 14.742-1.349 2.445-3.418 5.138-12.161 5.138-12.161l4.391-.493s3.836 16.881 4.719 24.113c.944 6.979 13.306 10.949 13.486-2.748-.441-4.695-2.077-11.042-5.155-19.105 0 0-2.011-5.905-3.956-6.672 0 0 13.794-13.7181 15.109-19.0421 1.377-5.576-1.135-9.4525-11.921-.3541-10.785 9.0995-12.038 12.0124-12.038 12.0124s2.565-11.4711 2.309-20.1601c.937-9.192-9.419-15.8836-12.237-7.7115z"/>
        <path d="m309.24 88.9685c-4.628 4.5878-7.54 13.2005-7.215 26.2315.645 19.451 8.704 30.626 22.464 28.401 13.76-2.226 10.52-12.154 9.252-12.483-1.014-.263-1.269-1.43-6.911.692-5.644 2.121-9.893-.356-13.45-8.989-2.35-5.842-3.624-17.191.621-23.53 1.268-1.8764 2.472-2.3917 3.106-2.7788 2.536-1.547 5.136-.0478 5.581.3425 7.106 5.1433 8.497-.5566 5.957-5.6217-5.013-7.0817-11.672-8.5286-19.405-2.2645z"/>
        <path d="m340 89.2622c-.067-7.3833 7.556-13.075 10.236 3.4348 3.31 10.668 2.468 31.296 4.056 33.206s13.41-.756 16.611-1.833c3.2-1.077 9.098.337 7.765 3.543-1.079 3.271-4.13 3.582-4.765 3.966-.636.383-27.356 8.304-28.348 3.031-.992-5.274-1.055-7.701-2.055-16.682-1-8.982-3.432-21.2814-3.5-28.6658z"/>
        <path d="m372.043 82.6536c-.58-5.3377 4.863-8.5989 8.069-2.8677 2.435 4.4428 5.264 23.7381 9.24 31.8511 2.18 3.285 6.663 3.877 8.776.863 2.495-4.557.695-15.9411-.847-25.0747-1.092-4.375-2.35-7.7192-2.287-10.1622.956-8.2259 7.554-6.2767 10.633 2.1541 2.566 9.3945 5.24 24.5718 3.899 29.9678-1.278 5.138-2.62 11.627-9.28 13.214-1.729.381-16.138 2.457-21.206-13.309-4.878-16.5368-6.417-21.2987-6.997-26.6364z"/>
        <path d="m417.228 65.0324c8.861-5.3565 15.509-7.1942 20.702-5.3188 3.04 1.8678 5.006 7.0007 4.186 11.42-.947 3.8422-2.529 6.9772-2.529 6.9772 5.256.5298 9.105 5.7759 10.105 12.6419 1 6.8661-5.468 13.3283-17.496 17.3283-4.052 1.141-8.357 1.127-8.548-.283-.129-2.757-10.341-35.6004-10.341-35.6004-.319-1.9882-1.396-4.1699 3.921-7.1652zm3.675 5.8433 4.439 10.3958s10.762-4.3247 9.492-10.097c-1.269-5.7713-8.042-2.3322-13.931-.2988zm5.963 18.4112s3.046 12.7621 2.92 12.1851c-.065-.833 15.69-3.971 12.33-12.1851-3.362-8.2131-15.25 0-15.25 0z"/>
      </g>
      <path d="m56.2741 6.96607s1.0366-1.19259 2.9957-.94409 1.4758 2.50907.7379 3.98192c-.7379 1.4729-19.3248 39.5841-32.7765 82.5725-13.4516 42.9886-12.4231 88.9236-12.4231 91.4236h-14.79826305c-.20170095-4.5 2.60182305-47.749 17.41156305-91.4236 14.8098-43.675 36.89-84.09239 38.8527-85.61033z" fill="#d98b51"/>
    </svg>
  )
}

export default function Nav({ invertColors = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuState, setMenuState] = useState('closed')
  const [mounted, setMounted] = useState(false)
  const closeTimer = useRef(null)
  const openFrame = useRef(null)

  const clearHandles = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    if (openFrame.current) cancelAnimationFrame(openFrame.current)
    closeTimer.current = null
    openFrame.current = null
  }, [])

  const openMenu = useCallback(() => {
    clearHandles()
    if (menuState === 'open' || menuState === 'opening') return
    setMenuState('opening')
    openFrame.current = requestAnimationFrame(() => {
      setMenuState('open')
      openFrame.current = null
    })
  }, [clearHandles, menuState])

  const closeMenu = useCallback(() => {
    clearHandles()
    if (menuState === 'closed' || menuState === 'closing') return
    setMenuState('closing')
    closeTimer.current = setTimeout(() => {
      setMenuState('closed')
      closeTimer.current = null
    }, 240)
  }, [clearHandles, menuState])

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuState === 'closed') return
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [closeMenu, menuState])

  useEffect(() => () => { clearHandles() }, [clearHandles])

  const isOpen = menuState === 'opening' || menuState === 'open'
  const inv = invertColors && !scrolled
  const txt = inv ? '#fff6eb' : '#17171d'
  const btnTxt = inv ? '#17171d' : '#ffffff'
  const navBg = scrolled || isOpen ? 'var(--nav-bg)' : 'transparent'
  const mobBg = inv ? 'rgba(23, 23, 29, 0.96)' : 'var(--nav-bg)'
  const mobBorder = scrolled || isOpen ? '1px solid var(--border)' : '1px solid transparent'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 32,
          paddingRight: 'clamp(16px, 4vw, 55px)',
          height: 80,
          zIndex: 1100,
          background: navBg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: mobBorder,
          transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
        }}
      >
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <HackClubLogo />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: "'Phantom Sans', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  color: txt,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {mounted && <ThemeToggle />}

          <a
            href="#"
            className="dark-btn"
            style={{
              fontFamily: "'Phantom Sans', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              textDecoration: 'none',
              borderRadius: 9999,
              height: 44,
              paddingLeft: 20,
              paddingRight: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              color: btnTxt,
              background: txt,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Join the community
          </a>

          <button
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: 40,
              height: 40,
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: 8,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
            }}
            onClick={() => (isOpen ? closeMenu() : openMenu())}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 26,
                  height: 3,
                  background: txt,
                  borderRadius: 2,
                  transform:
                    i === 0 && isOpen
                      ? 'translateY(8px) rotate(45deg)'
                      : i === 1 && isOpen
                        ? 'scaleX(0)'
                        : i === 2 && isOpen
                          ? 'translateY(-8px) rotate(-45deg)'
                          : 'none',
                  opacity: i === 1 && isOpen ? 0 : 1,
                  transition: `transform 220ms ${ease}, opacity 220ms ${ease}`,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {!inv && <div className="lg-hidden" style={{ height: 80, flexShrink: 0 }} aria-hidden="true" />}

      {menuState !== 'closed' && (
        <div
          id="mobile-nav-menu"
          data-state={menuState}
          aria-hidden={!isOpen}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1090,
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'stretch',
            background: mobBg,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden',
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: `opacity 240ms ${ease}, visibility 0ms linear ${isOpen ? '0ms' : '240ms'}`,
          }}
        >
          <div className="mobile-nav-panel" style={{
            width: '100%',
            minHeight: '100%',
            padding: '104px 32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderTop: mobBorder,
            transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -14px, 0)',
            transition: `transform 240ms ${ease}`,
          }}>
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-nav-item"
                style={{
                  fontFamily: "'Phantom Sans', system-ui, sans-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  color: txt,
                  textDecoration: 'none',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                  transition: `transform 240ms ${ease}, opacity 180ms ease-out`,
                  transitionDelay: isOpen ? `${40 + i * 25}ms` : '0ms',
                }}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              onClick={closeMenu}
              className="dark-btn mobile-nav-item"
              style={{
                fontFamily: "'Phantom Sans', system-ui, sans-serif",
                fontSize: 20,
                color: btnTxt,
                textDecoration: 'none',
                background: txt,
                borderRadius: 9999,
                padding: '10px 24px',
                textAlign: 'center',
                marginTop: 4,
                display: 'block',
                fontWeight: 400,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
                transition: `transform 240ms ${ease}, opacity 180ms ease-out`,
                transitionDelay: isOpen ? `${40 + navLinks.length * 25}ms` : '0ms',
              }}
            >
              Join the community
            </a>
            <div className="mobile-nav-item" style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 8,
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, 12px, 0)',
              transition: `transform 240ms ${ease}, opacity 180ms ease-out`,
              transitionDelay: isOpen ? `${40 + (navLinks.length + 1) * 25}ms` : '0ms',
            }}>
              {mounted && <ThemeToggle />}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .nav-links-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .lg-hidden { display: none !important; }
        }
        .dark-btn {
          transition: background 0.4s ease, color 0.4s ease;
        }
        .dark-btn:hover {
          background: #ec3750 !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-nav-panel, .mobile-nav-item {
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}