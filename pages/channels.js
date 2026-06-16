import Meta from '@hackclub/meta'
import Head from 'next/head'
import { useState, useMemo } from 'react'
import channels from '../channels.json'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'

const F = "'Phantom Sans', system-ui, sans-serif"
const Z = "'Zarathustra', Georgia, serif"

const getTypeLabel = (type) => {
  if (type === 'us-state') return 'US State'
  if (type === 'island') return 'Island'
  if (type === 'indian-state') return 'Indian State'
  if (type === 'country') return 'Country'
  return type
}

const GridCard = ({ channel }) => (
  <a
    href={channel.url}
    target="_blank"
    rel="noopener noreferrer"
    className="channel-card-grid"
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '12px 20px',
      width: '100%',
      background: 'var(--surface)',
      borderRadius: 9999,
      border: '2px solid var(--border)',
      boxSizing: 'border-box',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
    }}
  >
    <span
      style={{
        fontFamily: F,
        fontWeight: 700,
        fontSize: '0.9rem',
        color: 'var(--ink)',
        lineHeight: 1.3,
      }}
    >
      #{channel.channel}
    </span>
    <span
      style={{
        fontFamily: F,
        fontSize: '0.7rem',
        color: 'var(--muted)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {getTypeLabel(channel.type)}
    </span>
  </a>
)

const ListCard = ({ channel }) => (
  <a
    href={channel.url}
    target="_blank"
    rel="noopener noreferrer"
    className="channel-card-list"
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      width: '100%',
      background: 'transparent',
      borderRadius: 8,
      border: 'none',
      boxSizing: 'border-box',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background 0.12s ease',
    }}
  >
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 6,
        background: 'var(--surface)',
        color: 'var(--muted)',
        fontWeight: 700,
        fontSize: '0.85rem',
        flexShrink: 0,
      }}
    >
      #
    </span>
    <span
      style={{
        fontFamily: F,
        fontWeight: 600,
        fontSize: '0.95rem',
        color: 'var(--foreground)',
        lineHeight: 1.3,
      }}
    >
      {channel.channel.replace(/-/g, ' ')}
    </span>
    <span
      style={{
        fontFamily: F,
        fontSize: '0.65rem',
        color: 'var(--muted)',
        fontWeight: 500,
        marginLeft: 'auto',
        opacity: 0.7,
      }}
    >
      {getTypeLabel(channel.type)}
    </span>
  </a>
)

const FilterChip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className="filter-chip"
    style={{
      padding: '8px 20px',
      borderRadius: 9999,
      border: '2px solid',
      borderColor: active ? 'var(--red)' : 'var(--border)',
      background: active ? '#ec3750' : 'transparent',
      color: active ? 'white' : 'var(--foreground)',
      fontWeight: 600,
      fontSize: '0.85rem',
      cursor: 'pointer',
      fontFamily: F,
      transition: 'all 0.15s ease',
    }}
  >
    {children}
  </button>
)

const ChannelsPage = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [layout, setLayout] = useState('grid')

  const filtered = useMemo(() => {
    return channels.filter((c) => {
      const matchesSearch =
        c.channel.toLowerCase().includes(search.toLowerCase()) ||
        c.match.toLowerCase().includes(search.toLowerCase())
      const matchesFilter =
        filter === 'all' ||
        (filter === 'country' && c.type === 'country') ||
        (filter === 'us-state' && c.type === 'us-state') ||
        (filter === 'indian-state' && c.type === 'indian-state') ||
        (filter === 'island' && c.type === 'island')
      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  const counts = useMemo(() => ({
    all: channels.length,
    country: channels.filter((c) => c.type === 'country').length,
    'us-state': channels.filter((c) => c.type === 'us-state').length,
    'indian-state': channels.filter((c) => c.type === 'indian-state').length,
    island: channels.filter((c) => c.type === 'island').length
  }), [])

  const Card = layout === 'grid' ? GridCard : ListCard

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Meta
        as={Head}
        name="Regional Channels – Hack Club Slack"
        description="Browse all regional Hack Club Slack channels by country and US state."
      />
      <ForceTheme theme="light" />
      <Nav />

      {/* Hero */}
      <section
        className="channels-hero"
        style={{
          paddingTop: 'clamp(7rem, 12vw, 8rem)',
          paddingBottom: 'clamp(3rem, 5vw, 4rem)',
          paddingLeft: 'clamp(1.5rem, 4vw, 3rem)',
          paddingRight: 'clamp(1.5rem, 4vw, 3rem)',
          textAlign: 'center',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(236,55,80,0.04) 60%, rgba(236,55,80,0.40) 100%)',
        }}
      >
        <h1
          style={{
            fontFamily: Z,
            fontWeight: 400,
            fontSize: 'clamp(52px, 12vw, 90px)',
            lineHeight: 0.92,
            color: 'var(--foreground)',
            margin: 0,
            marginBottom: 16,
          }}
        >
          Regional Channels
        </h1>
        <p
          style={{
            fontFamily: F,
            fontSize: 20,
            color: 'var(--foreground)',
            margin: 0,
            marginBottom: 12,
            lineHeight: 1.2,
          }}
        >
          Find your local community on Slack
        </p>
        <p
          style={{
            fontFamily: F,
            fontSize: '0.9rem',
            color: 'var(--muted)',
            margin: 0,
          }}
        >
          {channels.length} channels &middot; {counts.country} countries &middot; {counts['us-state']} US states
        </p>
      </section>

      {/* Search + Filter */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
        <div
          style={{
            background: 'var(--surface)',
            borderRadius: 16,
            padding: 'clamp(1.25rem, 3vw, 1.75rem)',
            border: '1px solid var(--border)',
            borderTop: '6px solid var(--red)',
            marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--muted)',
                pointerEvents: 'none',
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              placeholder="Search channels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                fontSize: '1rem',
                borderRadius: 12,
                border: '2px solid var(--border)',
                padding: '12px 14px 12px 42px',
                fontFamily: F,
                background: 'var(--background)',
                color: 'var(--foreground)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Toggle + Filter chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
              All
            </FilterChip>
            <FilterChip active={filter === 'country'} onClick={() => setFilter('country')}>
              Countries ({counts.country})
            </FilterChip>
            <FilterChip active={filter === 'us-state'} onClick={() => setFilter('us-state')}>
              US States ({counts['us-state']})
            </FilterChip>
            <FilterChip active={filter === 'island'} onClick={() => setFilter('island')}>
              Islands ({counts.island})
            </FilterChip>
            <FilterChip active={filter === 'indian-state'} onClick={() => setFilter('indian-state')}>
              Indian States ({counts['indian-state']})
            </FilterChip>

            <button
              onClick={() => setLayout(layout === 'grid' ? 'list' : 'grid')}
              className="layout-toggle"
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 9999,
                border: '2px solid var(--border)',
                background: 'transparent',
                color: 'var(--foreground)',
                fontFamily: F,
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              aria-label={`Switch to ${layout === 'grid' ? 'list' : 'grid'} view`}
            >
              {layout === 'grid' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.7 }}>
                  <rect x="3" y="3" width="8" height="8" rx="1"/>
                  <rect x="13" y="3" width="8" height="8" rx="1"/>
                  <rect x="3" y="13" width="8" height="8" rx="1"/>
                  <rect x="13" y="13" width="8" height="8" rx="1"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ opacity: 0.7 }}>
                  <rect x="3" y="4" width="18" height="4" rx="1"/>
                  <rect x="3" y="10" width="18" height="4" rx="1"/>
                  <rect x="3" y="16" width="18" height="4" rx="1"/>
                </svg>
              )}
              {layout === 'grid' ? 'Grid' : 'List'}
            </button>
          </div>
        </div>

        {/* Results */}
        <p
          style={{
            color: 'var(--muted)',
            fontSize: '0.9rem',
            marginBottom: 16,
            fontWeight: 500,
            fontFamily: F,
          }}
        >
          {filtered.length === 0
            ? 'No channels found'
            : `Showing ${filtered.length} channel${filtered.length !== 1 ? 's' : ''}`}
        </p>

        {filtered.length > 0 ? (
          layout === 'grid' ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 10,
              }}
            >
              {filtered.map((channel) => (
                <Card key={channel.id} channel={channel} />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {filtered.map((channel) => (
                <Card key={channel.id} channel={channel} />
              ))}
            </div>
          )
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--muted)' }}>
            <p style={{ fontSize: '1.15rem', fontWeight: 600, fontFamily: F, margin: '0 0 8px' }}>
              No channels match &quot;{search}&quot;
            </p>
            <p style={{ fontSize: '0.95rem', fontFamily: F, margin: 0 }}>
              Try a different search term
            </p>
          </div>
        )}

        {/* Back */}
        <div style={{ textAlign: 'center', marginTop: 'clamp(3rem, 5vw, 4rem)', marginBottom: '1rem' }}>
          <a
            href="/"
            className="back-link"
            style={{
              fontFamily: F,
              color: 'var(--foreground)',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 24px',
              borderRadius: 9999,
              border: '1.5px solid var(--border)',
              background: 'var(--nav-bg)',
              transition: 'all 0.15s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ transform: 'rotate(180deg)' }}>
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
            Back to Slack
          </a>
        </div>
      </div>

      <Footer />

      <style>{`
        .channel-card-grid:hover {
          border-color: var(--red) !important;
          box-shadow: 0 0 0 3px rgba(236, 55, 80, 0.15) !important;
        }
        .channel-card-list:hover {
          background: var(--surface) !important;
        }
        .filter-chip:hover {
          border-color: #ec3750 !important;
        }
        .layout-toggle:hover {
          border-color: #ec3750 !important;
          color: #ec3750 !important;
        }
        .back-link:hover {
          background: #ec3750 !important;
          color: white !important;
          border-color: #ec3750 !important;
        }
        @media (max-width: 767px) {
          .channel-card-grid { padding: 10px 14px !important; }
          .channel-card-list { padding: 6px 10px !important; }
        }
      `}</style>
    </div>
  )
}

export default ChannelsPage