import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { NextUiProvider } from "./providers/NextUiProvider";

import { siteConfig } from "@/config/site";
import { fontSans, poppins } from "@/config/fonts";

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
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          poppins.variable,
        )}
      >
        <NextUiProvider
          themeProps={{ attribute: "class", defaultTheme: "dark" }}
        >
          <main className=" flex-grow">{children}</main>
        </NextUiProvider>
      </body>
    </html>
  );
}
