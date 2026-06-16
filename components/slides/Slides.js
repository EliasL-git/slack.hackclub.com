import { useState, useEffect, useCallback } from 'react'

const F = "'Phantom Sans', system-ui, sans-serif"
const Z = "'Zarathustra', Georgia, serif"

const slideData = [
  {
    id: 'age',
    title: 'Hack Club is only for people aged 13-18',
    description: null,
    primaryButton: { label: 'I am 13-18', action: 'next' },
    secondaryButton: { label: "I'm a different age", action: 'down' },
    downSlide: { id: 'age-info', type: 'content', content: 'age-info' }
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    description: 'Hack Club is different from other online spaces - we will hold you to high standards that take effort to follow.',
    primaryButton: { label: 'I know and will follow the code', action: 'next' },
    secondaryButton: { label: 'Read the code', action: 'down' },
    downSlide: { id: 'conduct-content', type: 'fetch' }
  },
  {
    id: 'slack',
    title: 'We use Slack',
    description: (
      <p style={{ margin: 0 }}>
        Slack is our online platform. If you don&apos;t know how to use it, we have written guides and{' '}
        <strong>living humans</strong> who will help you.
      </p>
    ),
    primaryButton: { label: 'Join Hack Club', action: 'auth' },
    secondaryButton: { label: 'Help with Slack', action: 'down' },
    downSlide: { id: 'slack-help', type: 'content', content: 'slack-guide' }
  }
]

function BtnArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BtnArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M8 1V15M8 15L15 8M8 15L1 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ---------- Buttons ----------

function PrimaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="slide-btn-primary"
      style={{
        fontFamily: F,
        fontWeight: 700,
        fontSize: 'clamp(16px, 2vw, 20px)',
        color: 'white',
        background: '#ec3750',
        border: 'none',
        borderRadius: 9999,
        padding: '14px 48px',
        cursor: 'pointer',
        minWidth: 400,
        textAlign: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'background 0.2s ease, transform 0.15s ease',
      }}
    >
      {children} <BtnArrow />
    </button>
  )
}

function SecondaryBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="slide-btn-secondary"
      style={{
        fontFamily: F,
        fontWeight: 600,
        fontSize: 'clamp(15px, 1.8vw, 18px)',
        color: 'var(--foreground)',
        background: 'transparent',
        border: '2px solid var(--border)',
        borderRadius: 9999,
        padding: '12px 48px',
        cursor: 'pointer',
        minWidth: 400,
        textAlign: 'center',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'all 0.15s ease',
      }}
    >
      {children} <BtnArrowDown />
    </button>
  )
}

// ---------- Slide Content ----------

function SlideContent({ slide, onAction }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', maxWidth: 720, margin: '0 auto', padding: 32 }}>
      <h1
        style={{
          fontFamily: Z,
          fontWeight: 400,
          fontSize: 'clamp(36px, 5vw, 52px)',
          lineHeight: 1.05,
          color: 'var(--foreground)',
          margin: '0 0 24px',
        }}
      >
        {slide.title}
      </h1>
      {slide.description && (
        <p style={{ fontFamily: F, fontSize: 18, color: 'var(--muted)', margin: '0 0 32px', lineHeight: 1.4, maxWidth: 500 }}>
          {slide.description}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <PrimaryBtn onClick={() => onAction(slide.primaryButton.action)}>
          {slide.primaryButton.label}
        </PrimaryBtn>
        {slide.secondaryButton && (
          <SecondaryBtn onClick={() => onAction(slide.secondaryButton.action)}>
            {slide.secondaryButton.label}
          </SecondaryBtn>
        )}
      </div>
    </div>
  )
}

// ---------- Down slide content panels ----------

function AgeInfoContent() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontFamily: Z, fontWeight: 400, fontSize: 28, color: 'var(--foreground)', margin: '0 0 16px' }}>
        Not 13-18?
      </h2>
      <p style={{ fontFamily: F, fontSize: 16, color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 12px' }}>
        If you&apos;re over 18, check out our partner organization,{' '}
        <a href="https://github.com/education/students" target="_blank" rel="noopener noreferrer" style={{ color: '#ec3750', textDecoration: 'underline' }}>
          GitHub Education
        </a>.
      </p>
      <p style={{ fontFamily: F, fontSize: 16, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
        If you&apos;re under 13, we&apos;ll be waiting for you on your birthday!
      </p>
    </div>
  )
}

function SlackGuideContent() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontFamily: Z, fontWeight: 400, fontSize: 28, color: 'var(--foreground)', margin: '0 0 16px' }}>
        How Slack works
      </h2>
      <div style={{ fontFamily: F, fontSize: 16, color: 'var(--muted)', lineHeight: 1.6 }}>
        <p style={{ margin: '0 0 16px' }}>
          Welcome! Our Slack can be intimidating, but that&apos;s because there is so much happening. We care about you, and wrote this guide to help you.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          <strong style={{ color: 'var(--foreground)' }}>Channels:</strong> Channels are to Slack what food is to a restaurant. The whole point! When you want to talk about something, you find the channel with other people who want to talk about it, or if that channel doesn&apos;t exist, you make your own.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          <strong style={{ color: 'var(--foreground)' }}>DMs:</strong> You can also DM individual users or groups of users.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          <strong style={{ color: 'var(--foreground)' }}>Search:</strong> The search bar at the top of your Slack is how you find channels to join, find people to DM, and look up messages. It has a lot of hidden functions; for example you can search in a specific channel for a specific message on a specific day.
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: 'var(--foreground)' }}>The Sidebar:</strong> Once you join a channel or start a DM, it lives in your sidebar. You can play around and reorganize it in the way that makes sense to you.
        </p>
      </div>
    </div>
  )
}

function ConductContent({ content, loading, error }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2 style={{ fontFamily: Z, fontWeight: 400, fontSize: 28, color: 'var(--foreground)', margin: '0 0 16px' }}>
        Code of Conduct
      </h2>
      {loading && <p style={{ fontFamily: F, color: 'var(--muted)' }}>Loading...</p>}
      {error && (
        <div>
          <p style={{ fontFamily: F, color: 'var(--muted)', marginBottom: 8 }}>Could not load the Code of Conduct.</p>
          <a href="https://hackclub.com/conduct/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F, color: '#ec3750' }}>
            Read it on hackclub.com →
          </a>
        </div>
      )}
      {content && (
        <div
          style={{ fontFamily: F, fontSize: 15, color: 'var(--muted)', lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}

// ---------- Down Slide Panel ----------

function DownSlideContent({ slide, onUp, conductData }) {
  const renderContent = () => {
    if (slide.type === 'content') {
      if (slide.content === 'age-info') return <AgeInfoContent />
      if (slide.content === 'slack-guide') return <SlackGuideContent />
    }
    if (slide.type === 'fetch') {
      return <ConductContent content={conductData.content} loading={conductData.loading} error={conductData.error} />
    }
    return null
  }

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', width: '100vw' }}>
      <div style={{
        background: 'linear-gradient(180deg, rgba(236,55,80,0.04) 60%, rgba(236,55,80,0.40) 100%)',
        height: '15vh',
        minHeight: 80,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 16,
      }}>
        <button
          onClick={onUp}
          className="slide-up-btn"
          style={{
            fontFamily: F,
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--foreground)',
            background: 'var(--nav-bg)',
            border: '1px solid var(--border)',
            borderRadius: 9999,
            padding: '10px 24px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.15s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: 'rotate(180deg)' }}>
            <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>
      <div style={{ flex: 1, background: 'var(--background)', width: '100vw', overflowY: 'auto' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(24px, 4vw, 40px)' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

// ---------- Main Slides Component ----------

const Slides = ({ isOpen, onClose }) => {
  const [currentX, setCurrentX] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [slideDirection, setSlideDirection] = useState('right')
  const [conductData, setConductData] = useState({ content: null, loading: false, error: null })

  const updateUrl = useCallback((x, y) => {
    const path = `/join${x > 0 ? `/${x + 1}` : ''}${y > 0 ? '/info' : ''}`
    window.history.pushState({ x, y, slides: true }, '', path)
  }, [])

  const navigateTo = useCallback((x, y, direction) => {
    setSlideDirection(direction)
    setCurrentX(x)
    setCurrentY(y)
    updateUrl(x, y)
  }, [updateUrl])

  const handleAction = useCallback((action) => {
    switch (action) {
      case 'next':
        if (currentX < slideData.length - 1) navigateTo(currentX + 1, 0, 'right')
        break
      case 'prev':
        if (currentX > 0) navigateTo(currentX - 1, 0, 'left')
        else onClose()
        break
      case 'down':
        navigateTo(currentX, 1, 'down')
        break
      case 'up':
        navigateTo(currentX, 0, 'up')
        break
      case 'auth':
        window.location.href = 'https://auth.hackclub.com/slack'
        break
    }
  }, [currentX, navigateTo, onClose])

  const handleBack = useCallback(() => {
    if (currentY > 0) handleAction('up')
    else if (currentX > 0) handleAction('prev')
    else onClose()
  }, [currentX, currentY, handleAction, onClose])

  useEffect(() => {
    if (!isOpen) return
    const handlePopState = (event) => {
      if (event.state?.slides) {
        const { x, y } = event.state
        const direction = x < currentX ? 'left' : x > currentX ? 'right' : y < currentY ? 'up' : 'down'
        setSlideDirection(direction)
        setCurrentX(x)
        setCurrentY(y)
      } else {
        onClose()
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, handleAction, onClose])

  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ x: 0, y: 0, slides: true }, '', '/join')
      setCurrentX(0)
      setCurrentY(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && currentY === 0) handleAction('next')
      if (e.key === 'ArrowLeft' && currentY === 0) handleAction('prev')
      if (e.key === 'ArrowDown' && slideData[currentX]?.downSlide && currentY === 0) handleAction('down')
      if (e.key === 'ArrowUp' && currentY > 0) handleAction('up')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentX, currentY, handleAction, onClose])

  useEffect(() => {
    if (currentY === 1 && slideData[currentX]?.downSlide?.type === 'fetch') {
      const controller = new AbortController()
      setConductData({ content: null, loading: true, error: null })
      fetch('/api/conduct', { signal: controller.signal })
        .then((res) => { if (!res.ok) throw new Error(); return res.text() })
        .then((html) => setConductData({ content: html, loading: false, error: null }))
        .catch((err) => { if (err.name !== 'AbortError') setConductData({ content: null, loading: false, error: true }) })
      return () => controller.abort()
    }
  }, [currentX, currentY])

  if (!isOpen) return null

  const isDownSlide = currentY > 0
  const currentSlide = slideData[currentX]
  const downSlide = currentSlide?.downSlide

  const animName = slideDirection === 'right' ? 'slideFromRight'
    : slideDirection === 'left' ? 'slideFromLeft'
    : slideDirection === 'down' ? 'slideFromBottom'
    : slideDirection === 'up' ? 'slideFromTop' : 'slideFromRight'

  return (
    <div className="slides-root" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, overflow: 'hidden',
      background: 'var(--background)',
    }}>
      {!isDownSlide && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(236,55,80,0.04) 60%, rgba(236,55,80,0.50) 100%)',
          zIndex: 0,
        }} />
      )}

      {/* Back button */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute', top: 16, left: 16, zIndex: 10,
          fontFamily: F, fontWeight: 600, fontSize: 15,
          color: 'var(--foreground)',
          background: 'var(--nav-bg)',
          border: '1px solid var(--border)',
          borderRadius: 9999,
          padding: '8px 18px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#ec3750'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#ec3750' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--nav-bg)'; e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: 'rotate(180deg)' }}>
          <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
        </svg>
        <span>Back</span>
      </button>

      {/* Dot indicators */}
      {!isDownSlide && (
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 10 }}>
          {slideData.map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i === currentX ? '#ec3750' : 'var(--border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      )}

      {/* Slide content */}
      <div
        key={`${currentX}-${currentY}`}
        style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1,
        }}
        className={`slides-anim slides-anim-${animName}`}
      >
        {isDownSlide && downSlide ? (
          <DownSlideContent slide={downSlide} onUp={() => handleAction('up')} conductData={conductData} />
        ) : (
          <SlideContent slide={currentSlide} onAction={handleAction} />
        )}
      </div>

      <style>{`
        .slides-anim { animation: ${animName} 0.35s ease-out forwards; }
        @keyframes slideFromRight { from { opacity: 0; transform: translateX(100%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideFromLeft { from { opacity: 0; transform: translateX(-100%); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideFromBottom { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideFromTop { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }
        .slide-btn-primary:hover { background: #ff8c37 !important; transform: scale(1.03); }
        .slide-btn-secondary:hover { border-color: #ec3750 !important; color: #ec3750 !important; }
        .slide-up-btn:hover { background: #ec3750 !important; color: white !important; border-color: #ec3750 !important; }
        @media (max-width: 767px) {
          .slide-btn-primary, .slide-btn-secondary { min-width: 280px !important; width: calc(100vw - 64px) !important; padding: 12px 24px !important; }
        }
      `}</style>
    </div>
  )
}

export default Slides