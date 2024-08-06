import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sideabar from "@/components/Sideabar";

export const metadata: Metadata = {
  title: "Zen Notes",
  description: "Zen Notes is a simple note-taking app that helps you focus on what matters.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-dvh max-h-dvh overflow-hidden">
          <Header/>
          <div className="flex min-h-screen">
            <Sideabar/>

            <div className="flex-1 p-4 bg-gray-100 overflow-y-auto h-[calc(100dvh-5rem)]">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
