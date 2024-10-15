import type { Metadata } from "next";
import Header from "./components/header";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
          <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Header/>
          <SignedOut>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
          
            {children}
          </body>
      </html>
    </ClerkProvider>
  );
}

//! Fonts:
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

//! Metadata:
export const metadata: Metadata = {
  title: "YourSpace_",
  description: "Another Social Media site noone asked for",
};
