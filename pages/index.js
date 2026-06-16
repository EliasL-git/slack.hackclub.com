'use client'

import Meta from '@hackclub/meta'
import Head from 'next/head'
import { useState, useRef, useCallback } from 'react'
import channels from '../channels.json'
import { thousands } from '../lib/members'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import Slides from '../components/slides/Slides'

const F = 'var(--font-phantom)'
const Z = 'var(--font-zarathustra)'

function BtnArrowSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const ChannelName = ({ children, href }) => (
  <span
    style={{
      fontWeight: 500,
      color: '#1264a3',
      fontSize: '1.1rem',
      backgroundColor: '#e8f5fa',
      border: '1px solid rgba(18, 100, 163, 0.1)',
      padding: '0.1em 0.4em',
      borderRadius: 6,
      display: 'inline-block',
      lineHeight: 1.4,
      textDecoration: href ? 'none' : undefined,
      transition: 'all 0.2s ease-in-out',
    }}
    onMouseEnter={(e) => {
      if (href) {
        e.currentTarget.style.backgroundColor = '#c9e5f2'
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(18, 100, 163, 0.15)'
      }
    }}
    onMouseLeave={(e) => {
      if (href) {
        e.currentTarget.style.backgroundColor = '#e8f5fa'
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }
    }}
  >
    {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#1264a3', textDecoration: 'none' }}>{children}</a> : children}
  </span>
)

const GuideItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.25rem 0.5rem',
          fontWeight: 600,
          fontSize: '1.5rem',
          color: 'var(--foreground)',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: F,
          textAlign: 'left',
          borderRadius: 8,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#ec3750'; e.currentTarget.style.background = 'rgba(236, 55, 80, 0.05)' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--foreground)'; e.currentTarget.style.background = 'none' }}
      >
        {title}
        <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--muted)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease, color 0.2s ease' }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s ease',
        }}
      >
        <div style={{
          overflow: 'hidden',
          fontSize: '1.15rem',
          paddingBottom: isOpen ? '1.5rem' : 0,
          paddingTop: isOpen ? '0.5rem' : 0,
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          transition: 'padding 0.3s ease',
          color: 'var(--muted)',
          lineHeight: 1.6,
        }}>
          {children}
        </div>
      </div>
    </div>
  )
}

const Card = ({ children, sx, ...props }) => (
  <div
    style={{
      background: 'var(--surface)',
      borderRadius: 16,
      padding: 'clamp(1.5rem, 3vw, 2rem)',
      border: '1px solid var(--border)',
      borderTop: '6px solid #ec3750',
      transition: 'all 0.25s ease-in-out',
      ...sx,
    }}
    {...props}
  >
    {children}
  </div>
)

const MakeFigure = (props) => (
  <figure
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      margin: '1rem 0',
    }}
  >
    <img
      src={props.imgUrl}
      alt={props.imgDesc}
      loading="lazy"
      style={{ height: '22.5rem', maxWidth: '100%', objectFit: 'contain' }}
    />
    <figcaption style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{props.imgDesc}</figcaption>
  </figure>
)

const TimelineItem = ({ version, date, children, isLast }) => (
  <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      position: 'relative',
      paddingBottom: isLast ? 0 : '2.5rem',
    }}
  >
    {!isLast && (
      <div
        style={{
          position: 'absolute',
          left: '11px',
          top: '24px',
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, #ec3750, #ff8c37)',
          zIndex: 0,
        }}
      />
    )}
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
        border: '4px solid var(--background)',
        boxShadow: '0 0 0 2px rgba(236, 55, 80, 0.2)',
        flexShrink: 0,
        zIndex: 1,
        marginTop: '4px',
      }}
    />
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontWeight: 700,
            color: 'white',
            background: '#ec3750',
            padding: '0.1rem 0.6rem',
            borderRadius: 20,
            fontSize: '0.85rem',
            letterSpacing: '0.02em',
          }}
        >
          {version}
        </span>
        <span style={{ fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 500 }}>
          {date}
        </span>
      </div>
      <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
        {children}
      </p>
    </div>
  </div>
)

const SlackPage = () => {
  const [openGuide, setOpenGuide] = useState(null)
  const [slidesOpen, setSlidesOpen] = useState(false)
  const [countryChannel, setCountryChannel] = useState(null)
  const [stateChannel, setStateChannel] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState(null)

  const applyCountryChannel = (countryName, countryCode, regionName = null) => {
    if (!countryName) return false
    const country = countryName.toLowerCase().replace(/[\s-]+/g, '-')
    const countryMatch = channels.find(
      (c) => c.type === 'country' && (country.includes(c.match) || c.match.includes(country))
    )
    if (!countryMatch) return false

    setCountryChannel({ name: countryName, code: countryCode, channel: countryMatch })

    if (countryCode === 'US' && regionName) {
      const region = regionName.toLowerCase().replace(/[\s-]+/g, '-')
      const stateMatch = channels.find(
        (c) => c.type === 'us-state' && (region.includes(c.match) || c.match.includes(region))
      )
      if (stateMatch) setStateChannel({ name: regionName, channel: stateMatch })
    }
    return true
  }

  const getBrowserTimezone = () => {
    if (typeof window === 'undefined') return null
    return window.Intl?.DateTimeFormat?.().resolvedOptions?.().timeZone || null
  }

  const lookupLocation = async (url) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Location lookup failed.')
    const data = await res.json()
    if (data.error) throw new Error(data.reason || data.error || 'Location lookup failed.')
    const matched = applyCountryChannel(data.country_name, data.country_code, data.region)
    if (!matched) throw new Error('Location lookup failed.')
    return matched
  }

  const lookupIpLocation = () => lookupLocation('/api/geo')
  const lookupBrowserLocation = async () => {
    const timezone = getBrowserTimezone()
    if (!timezone) throw new Error('Your browser does not expose a timezone.')
    return lookupLocation(`/api/geo?timezone=${encodeURIComponent(timezone)}`)
  }

  const handleGeolocate = async () => {
    setGeoLoading(true)
    setGeoError(null)
    const isLocalhost =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '::1'

    try {
      await lookupBrowserLocation()
    } catch (browserError) {
      if (!isLocalhost) {
        try {
          await lookupIpLocation()
          return
        } catch {}
      }
      setGeoError(
        browserError.message === 'Browser geolocation is unavailable.'
          ? 'Your browser does not expose location data.'
          : browserError.message
      )
    } finally {
      setGeoLoading(false)
    }
  }

  const handleGuideToggle = (index) => {
    setOpenGuide(openGuide === index ? null : index)
  }

  const handleJoinClick = () => setSlidesOpen(true)
  const handleSlidesClose = useCallback(() => {
    setSlidesOpen(false)
    window.history.pushState(null, '', '/')
  }, [])

  return (
    <div
      style={{
        background: 'var(--background)',
        minHeight: '100vh',
      }}
    >
      <Meta
        as={Head}
        name="Join our Slack"
        description={`The Hack Club Slack is a community of ${thousands}k+ high school hackers around the world. Chat, meet new friends, code together, share your work.`}
        image="https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/02020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.jpeg"
      />
      <ForceTheme theme="light" />
      <Nav />
      <Slides isOpen={slidesOpen} onClose={handleSlidesClose} />
      <Header onJoinClick={handleJoinClick} />

      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gap: '2rem',
          maxWidth: 900,
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Guide Section */}
        <Card>
          <h2
            style={{
              fontFamily: Z,
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              margin: '0 0 1.5rem',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ff8c37, #ec3750)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            New? Read this first!
          </h2>

          <GuideItem
            title="How Slack works"
            isOpen={openGuide === 0}
            onToggle={() => handleGuideToggle(0)}
          >
            <p>Welcome! Our Slack can be intimidating, but that's because there is so much happening. We care about you, and wrote this guide to help you.</p>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--foreground)' }}>Channels</h3>
              <p>The best place to meet new people and have interesting conversations. When you want to talk about something, you find the channel with other people who want to talk about it, or if that channel doesn't exist, you make your own!</p>
              <MakeFigure imgUrl="/slack-channel.gif" imgDesc="A GIF showing channels in Slack" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--foreground)' }}>DMs</h3>
              <p>You can also DM individual users or groups of users. This is another way to connect with members of our community!</p>
              <MakeFigure imgUrl="/slack-dms.gif" imgDesc="A GIF showing how the DMs section looks like in Slack" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--foreground)' }}>Search</h3>
              <p>The search bar at the top of your Slack is how you find channels to join, find people to DM, and look up messages. It has so many hidden functions; for example you can search in a specific channel or DM for a specific message on a specific day!</p>
              <MakeFigure imgUrl="/slack-search.gif" imgDesc="A GIF showing the search bar in Slack" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--foreground)' }}>The Sidebar</h3>
              <p>Once you join a channel or start a DM, it lives in your sidebar. You can play around and reorganize it in the way that makes sense to you.</p>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
                <MakeFigure imgUrl="/default-slack-sidebar.png" imgDesc="How the Slack sidebar looks by default" />
                <MakeFigure imgUrl="/slack-sidebar-small-icons.png" imgDesc="Slack sidebar with small icons enabled" />
                <MakeFigure imgUrl="/slack-sidebar-all-items-enabled.png" imgDesc="Slack sidebar with all icons enabled" />
                <MakeFigure imgUrl="/slack-sidebar-all-items-disabled.png" imgDesc="Slack sidebar with most icons disabled" />
                <MakeFigure imgUrl="/slack-sidebar-preferences.png" imgDesc="Options for the slack sidebar" />
              </div>
            </div>
          </GuideItem>

          <GuideItem
            title="Where to start"
            isOpen={openGuide === 1}
            onToggle={() => handleGuideToggle(1)}
          >
            <p><strong>As a new user, you're put into a special welcome channel for new users</strong> who joined around the same time as you. This is overseen by our Gardeners - teen hackers who volunteer to help new users. Don't be shy: ask them a question (they don't bite.)! It's also a good place to make friends with other new users, and do fun things organized by the Special Activities Division.</p>
            <p>Other than your welcome channel, here are some core channels:</p>
            <p><ChannelName href="https://hackclub.enterprise.slack.com/archives/C0710J7F4U9">#ysws</ChannelName> - At Hack Club, the #1 activity is making things! "You Ship, We Ship" is a challenge where you make something and you get a prize in return! (sounds fun right). Make what? Get what? There are lots of different YSWS, offering different prizes for different kinds of projects. Browse <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0710J7F4U9">#ysws</ChannelName> to find a challenge and get started.</p>
            <p>Once you find a YSWS you like, join its channel. Many YSWS also have a help channel. Join that, too.</p>
            <p>Here are more key channels:</p>
            <ul>
              <li><ChannelName href="https://hackclub.enterprise.slack.com/archives/C0EA9S0A0">#code</ChannelName> - A channel to get help with code</li>
              <li><ChannelName href="https://hackclub.enterprise.slack.com/archives/C6C026NHJ">#hardware</ChannelName> - A channel to get help with hardware projects</li>
              <li><ChannelName href="https://hackclub.enterprise.slack.com/archives/C01504DCLVD">#scrapbook</ChannelName> - A channel to show off your work in progress, and be amazed by others doing the same!</li>
            </ul>
            <p>Want more information about Slack? Read the <a href="https://readme.hackclub.com/slack" style={{ color: '#ec3750', textDecoration: 'underline' }}>readme</a>!</p>
          </GuideItem>

          <GuideItem
            title="Being good"
            isOpen={openGuide === 2}
            onToggle={() => handleGuideToggle(2)}
          >
            <p>Hack Club is special, because we insist on making it that way. We will hold you to higher standards than most other online spaces.</p>
            <p>Our <a href="https://hackclub.com/conduct/" style={{ color: '#ec3750', textDecoration: 'underline' }}>Code of Conduct</a> is short because we expect you to read it, know it, and follow it.</p>
            <p>If you want to report misconduct, send a DM to <ChannelName href="https://hackclub.slack.com/app_redirect?app=A07K4T4FMAS">@shroud</ChannelName>, which reports it to the Fire Department, our moderation team.</p>
          </GuideItem>
        </Card>

        {/* Slack Highlights */}
        <Card>
          <h2
            style={{
              fontFamily: Z,
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              margin: '0 0 1.5rem',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ff8c37, #ec3750)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Slack Highlights
          </h2>
          {countryChannel ? (
            <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.5 }}>
              Hey, it looks like you're from
              {stateChannel ? ` ${stateChannel.name}, ${countryChannel.code}` : ` ${countryChannel.name}`}
              ! Join fellow hack clubbers in{' '}
              <ChannelName href={countryChannel.channel.url}>
                #{countryChannel.channel.channel}
              </ChannelName>
              {stateChannel && (
                <> and <ChannelName href={stateChannel.channel.url}>#{stateChannel.channel.channel}</ChannelName></>
              )}
            </p>
          ) : (
            <>
              <button
                onClick={handleGeolocate}
                disabled={geoLoading}
                style={{
                  fontFamily: F,
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'white',
                  background: 'linear-gradient(135deg, #ff8c37, #ec3750)',
                  border: '2px solid white',
                  borderRadius: 16,
                  padding: '16px 24px',
                  cursor: geoLoading ? 'default' : 'pointer',
                  opacity: geoLoading ? 0.7 : 1,
                  display: 'inline-block',
                  transition: 'all 0.125s ease-in-out',
                  lineHeight: 1.2,
                }}
                onMouseEnter={(e) => {
                  if (!geoLoading) {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 0 0 2px white'
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ec3750, #ff8c37)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ff8c37, #ec3750)'
                }}
              >
                {geoLoading ? 'Looking up\u2026' : (
                  <>
                    Find your regional channel
                    <br />
                    <span style={{ fontSize: 14, fontWeight: 400 }}>(uses your browser timezone when available)</span>
                  </>
                )}
              </button>
              {geoError && (
                <p style={{ color: '#ec3750', fontSize: 14, marginTop: 8, fontWeight: 'bold' }}>
                  {geoError}
                </p>
              )}
            </>
          )}
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.5, marginTop: 24 }}>
            Feel like sharing something random from your life? Check out{' '}
            <ChannelName href="https://hackclub.enterprise.slack.com/archives/C0AL2BXLB7V">#self</ChannelName>
          </p>
          <a
            href="/channels"
            style={{
              display: 'inline-block',
              marginTop: 12,
              color: '#ec3750',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
          >
            Browse all regional channels <BtnArrowSvg />
          </a>
        </Card>

        {/* Changelog */}
        <Card>
          <h2
            style={{
              fontFamily: Z,
              fontWeight: 400,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              margin: '0 0 2rem',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ff8c37, #ec3750)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Changelog
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TimelineItem version="v1.3.0" date="March 16 2026">
              Country and US state channel suggestions based on your location
            </TimelineItem>
            <TimelineItem version="v1.2.0" date="March 10 2026">
              <a href="https://news.hackclub.com" style={{ color: '#ec3750', textDecoration: 'underline' }}>Slacker News</a> and Prometheus launched
            </TimelineItem>
            <TimelineItem version="v1.1.0" date="January 27 2026">
              slides added to onboarding flow
            </TimelineItem>
            <TimelineItem version="v1.0.0" date="January 16 2026" isLast>
              slack.hackclub.com launched
            </TimelineItem>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

export default SlackPage