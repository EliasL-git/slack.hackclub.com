import Document, { Html, Head, Main, NextScript } from 'next/document'

const themesrc = `(function(){try{var s=localStorage.getItem('hc-site-theme'),t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'),r=document.documentElement;if(t==='dark')r.classList.add('dark');r.style.colorScheme=t;}catch(_){}})();`

const org = {
  '@context': 'http://schema.org',
  '@type': 'Organization',
  name: 'Hack Club',
  url: 'https://hackclub.com/',
  logo: 'https://hackclub.com/social.png',
  sameAs: [
    'https://twitter.com/hackclub',
    'https://github.com/hackclub',
    'https://www.youtube.com/c/HackClubHQ',
    'https://www.instagram.com/starthackclub'
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'team@hackclub.com',
      contactType: 'customer support',
      url: 'https://hackclub.com/'
    }
  ]
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="format-detection" content="telephone=no" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
          />
          <link rel="icon" href="/favicon.png" />
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: themesrc }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument