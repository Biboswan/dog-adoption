"use client";

import { QueryProvider } from "@/app/providers/query-provider";
import ThemeProvider from "@/app/providers/theme-provider";
import { AppProvider } from "./providers/app-provider";

function Layout({ children }: { children: React.JSX.Element }) {
  return (
      <QueryProvider>
        <ThemeProvider>
        <AppProvider>
          {children}
          </AppProvider>
        </ThemeProvider>
      </QueryProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.JSX.Element;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
