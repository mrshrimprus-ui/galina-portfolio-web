import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
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
      images: [{ url: new URL("/og.png", baseUrl).toString(), width: 1672, height: 943 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Galina Chumak — Senior Product Designer",
      description: "Мобильные и веб-продукты для B2C и B2B.",
      images: [new URL("/og.png", baseUrl).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
