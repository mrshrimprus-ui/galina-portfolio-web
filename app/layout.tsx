import SiteFooter from "./projects/components/SiteFooter";
import type { Metadata } from "next";
import "./globals.css";
import RussianTypography from "./components/RussianTypography";
import GlobalCursor from "./components/GlobalCursor";
import YandexMetrika from "./components/YandexMetrika";
import CookieConsent from "./components/CookieConsent";
import ProjectPageTransition from "./components/ProjectPageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://galinachumak.ru"),
  title: "Galina Chumak — Senior Product Designer",
  description:
    "Портфолио продуктового дизайнера Галины Чумак: мобильные и веб-продукты для B2C и B2B.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Galina Chumak — Senior Product Designer",
    description: "Мобильные и веб-продукты для B2C и B2B.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 943,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galina Chumak — Senior Product Designer",
    description: "Мобильные и веб-продукты для B2C и B2B.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('galina-chumak-theme');document.documentElement.dataset.theme=theme==='light'?'light':'dark'}catch(e){}})();`,
          }}
        />
      </head>

      <body>
        <GlobalCursor />
        <RussianTypography />
        <YandexMetrika />
        {children}
        <ProjectPageTransition />
        <SiteFooter />
        <CookieConsent />

</body>
    </html>
  );
}
