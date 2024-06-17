import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import "mapbox-gl/dist/mapbox-gl.css";

import { Providers } from "@/providers/providers";

import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";
import { Header } from "@/screens/navbar/index";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={clsx(
          "h-full min-h-screen font-sans antialiased bg-grayRoot",
          fontMono.variable
        )}
      >
        <ReduxProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <div className="min-h-screen h-full relative flex flex-col items-center justify-between">
              <Header />
              <main className="container">{children}</main>
              <Footer />
            </div>
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
