"use client";

import { QueryProvider } from "@/app/providers/query-provider";
import ThemeProvider from "@/app/providers/theme-provider";
import { AppProvider } from "@/app/providers/app-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { checkIfLogged } from "@/app/utils";

function Layout({ children }: { children: React.JSX.Element }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname(); 
  
  useEffect(() => {
    if (pathname === "/login") {
      setIsAuthenticated(true); // Allow login page to render
      return;
    }
  
    if (checkIfLogged()) {
      setIsAuthenticated(true);
    } else {
      router.push("/login");
    }
  }, [router,pathname]);

  if (isAuthenticated === null) return null; // Prevent rendering until auth check is done

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
