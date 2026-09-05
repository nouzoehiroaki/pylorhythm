import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

const GA_ID = 'G-QL8TNE1QF0'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}