"use client";
import { Analytics } from '@vercel/analytics/react';
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/toaster"
const inter = Inter({ subsets: ["latin"] });
import Script from 'next/script';
import {NextUIProvider} from "@nextui-org/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark'>
      <head>
        {/* Google Ad Sense */}
        {process.env.NODE_ENV === "production" && (
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8125987319233050" crossOrigin="anonymous"></Script>
        )}
      </head>
      

      <body className={inter.className}>
        <AuthContextProvider>
          <NextUIProvider>
            <Navbar />
            {children}
            <Toaster />
          </NextUIProvider>
          <Analytics />
        </AuthContextProvider>
      </body>
    </html>
  );
}
