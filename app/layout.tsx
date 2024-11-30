import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sideabar from "@/components/Sideabar";
import { Toaster } from "sonner";
import ThemeProviderWrapper from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "Zen Notes",
  description: "Zen Notes is a simple note-taking app that helps you focus on what matters.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="h-dvh max-h-dvh overflow-hidden">
          <ThemeProviderWrapper>
            <Header/>
            <div className="flex min-h-screen">
              <Sideabar/>

              <div className="flex-1 p-4 bg-background overflow-y-auto h-[calc(100dvh-5rem)]">
                {children}
              </div>
            </div>

            <Toaster position="top-center" richColors closeButton duration={10000}/>
          </ThemeProviderWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
