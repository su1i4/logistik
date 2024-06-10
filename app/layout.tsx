import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "@/providers/providers";

import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";
import { Navbar } from "@/screens/navbar/index";
import { Footer } from "@/screens/footer";
import { ReduxProvider } from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased bg-grayRoot",
          fontMono.variable
        )}
      >
        <ReduxProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="relative flex flex-col items-center">
              <Navbar />
              <main className="container">{children}</main>
              <Footer />
            </div>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
