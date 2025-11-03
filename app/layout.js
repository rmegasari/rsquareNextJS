import "./globals.css";
import Script from "next/script";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";
import { SiteProvider } from "@/contexts/SiteContext";

export const metadata = {
  title: {
    default: "RSQUARE - Template Premium Google Sheets",
    template: "%s | RSQUARE",
  },
  description:
    "Temukan koleksi template Google Sheets premium dari RSQUARE untuk meningkatkan produktivitas dan menghemat waktu.",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2279334852517386');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2279334852517386&ev=PageView&noscript=1" alt="facebook pixel" />
            `,
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        <SiteProvider>
          <ScrollRevealProvider />
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}
