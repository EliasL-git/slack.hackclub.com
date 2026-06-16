import Head from 'next/head'
import Meta from '@hackclub/meta'
import { ThemeUIProvider } from 'theme-ui'
import { Provider as BalancerProvider } from 'react-wrap-balancer'
import '../styles/globals.css'

// Minimal theme-ui theme to satisfy the Slides component
// Visual styling is handled by our CSS variables and inline styles
const minimalTheme = {
  useColorSchemeMediaQuery: false,
  colors: {
    text: 'var(--foreground)',
    background: 'var(--background)',
    primary: '#ec3750',
    secondary: '#ff8c37',
    muted: 'var(--muted)',
    accent: '#ec3750',
    paper: 'var(--surface)',
    snow: 'var(--background)',
    smoke: 'var(--border)',
    slate: 'var(--muted)',
    steel: 'var(--foreground)',
    red: '#ec3750',
    orange: '#ff8c37',
    sunken: 'var(--surface)',
    darkless: '#1f1f27',
    darker: '#17171d',
    black: '#17171d',
  },
  fonts: {
    body: 'var(--font-phantom)',
    heading: 'var(--font-phantom)',
    monospace: 'monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    limit: 0.92,
    tight: 1.1,
    body: 1.5,
    heading: 1.2,
  },
  sizes: {
    narrow: 640,
    copy: 720,
    copyPlus: 800,
    wide: 1024,
  },
  text: {
    title: {
      fontFamily: 'var(--font-zarathustra)',
      fontWeight: 400,
      lineHeight: 0.92,
    },
    headline: {
      fontFamily: 'var(--font-phantom)',
      fontWeight: 700,
      lineHeight: 1.1,
    },
    subheadline: {
      fontFamily: 'var(--font-phantom)',
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },
  cards: {
    translucent: {
      background: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.25)',
      borderRadius: 16,
      padding: 32,
      backdropFilter: 'blur(12px)',
    },
  },
  radii: {
    default: 8,
    extra: 16,
    circle: 99999,
  },
  shadows: {
    card: '0 4px 12px rgba(0, 0, 0, 0.08)',
    elevated: '0 8px 24px rgba(0, 0, 0, 0.12)',
    text: '0 2px 12px rgba(0,0,0,0.15)',
  },
  util: {
    gx: (from, to) => `linear-gradient(135deg, ${from}, ${to})`,
  },
}

const App = ({ Component, pageProps }) => (
  <ThemeUIProvider theme={minimalTheme}>
    <Meta as={Head}>
      <meta
        name="google-site-verification"
        content="7zE7h5foPaxIcnv5Frq6BkcUb9-3UzVc8q3P_cexf9I"
      />
    </Meta>
    <BalancerProvider>
      <Component {...pageProps} />
    </BalancerProvider>
  </ThemeUIProvider>
)

export default App