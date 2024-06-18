import "@/styles/globals.css";
import clsx from "clsx";
import "mapbox-gl/dist/mapbox-gl.css";

import { Providers } from "@/providers/providers";

import { fontMono } from "@/config/fonts";
import { Header } from "@/screens/navbar/index";
import { Footer } from "@/screens/footer";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logistic KG - Ваш надежный партнер по грузоперевозкам",
  description:
    "Logistic KG предоставляет качественные услуги по грузоперевозкам и логистике. Мы предлагаем надежные решения для доставки грузов по всей стране.",
  keywords:
    "грузоперевозки, логистика, доставка грузов, транспортные услуги, Logistic KG, логистические услуги, перевозка грузов",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
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
