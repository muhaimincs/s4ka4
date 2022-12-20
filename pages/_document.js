/* eslint-disable @next/next/no-img-element */
import { Html, Head, Main, NextScript } from 'next/document'
import BLOG from '@/blog.config'
import CJK from '@/lib/cjk'

const yandexMetricaScript = `
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(91773769, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });`

export default function Document () {
  return (
    <Html
      lang={BLOG.lang}
      className={BLOG.appearance === 'dark' ? 'dark' : undefined}
    >
      <Head>
        <script dangerouslySetInnerHTML={{ __html: yandexMetricaScript }} />
        {BLOG.font && BLOG.font === 'serif'
          ? (
          <>
            <link
              rel="preload"
              href="/fonts/SourceSerif.var.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/SourceSerif-Italic.var.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          </>
            )
          : (
          <>
            <link
              rel="preload"
              href="/fonts/IBMPlexSansVar-Roman.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/IBMPlexSansVar-Italic.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          </>
            )}

        {['zh', 'ja', 'ko'].includes(
          BLOG.lang.slice(0, 2).toLocaleLowerCase()
        ) && (
          <>
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              as="style"
              href={`https://fonts.googleapis.com/css2?family=Noto+${
                BLOG.font === 'serif' ? 'Serif' : 'Sans'
              }+${CJK()}:wght@400;500;700&display=swap`}
            />
            <link
              rel="stylesheet"
              href={`https://fonts.googleapis.com/css2?family=Noto+${
                BLOG.font === 'serif' ? 'Serif' : 'Sans'
              }+${CJK()}:wght@400;500;700&display=swap`}
            />
            <noscript>
              <link
                rel="stylesheet"
                href={`https://fonts.googleapis.com/css2?family=Noto+${
                  BLOG.font === 'serif' ? 'Serif' : 'Sans'
                }+${CJK()}:wght@400;500;700&display=swap`}
              />
            </noscript>
          </>
        )}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon.png"></link>
        <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="/feed"></link>
        {BLOG.appearance === 'auto'
          ? (
          <>
          <meta name="theme-color" content={BLOG.lightBackground} media="(prefers-color-scheme: light)"/>
          <meta name="theme-color" content={BLOG.darkBackground} media="(prefers-color-scheme: dark)"/>
          </>
            )
          : (
          <meta name="theme-color" content={BLOG.appearance === 'dark' ? BLOG.darkBackground : BLOG.lightBackground} />
            )
        }
        <meta name="yandex-verification" content={BLOG.seo.yandexSiteVerification} />
      </Head>
      <body className="bg-day dark:bg-night">
        <Main />
        <NextScript />
        <noscript><div><img src="https://mc.yandex.ru/watch/91773769" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
      </body>
    </Html>
  )
}
