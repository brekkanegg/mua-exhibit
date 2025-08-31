import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { R2_BUCKET_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "242 Days of Somewhere",
    description: "2025.10.12(일) 12:00–15:00, 양재시민의숲 야외예식장",
    icons: { icon: "/elephant.svg" },

    // Open Graph metadata for social media sharing
    openGraph: {
        title: "242 Days of Somewhere",
        description: "2025년 10월 12일 일요일 오후 12시, 사진전에 초대합니다.",
        url: "https://mua-exhibit.pages.dev",
        siteName: "242 Days of Somewhere",
        images: [
            {
                url: `${R2_BUCKET_URL}/poster_small.jpg`,
                width: 1040,
                height: 690,
                alt: "242 Days of Somewhere - Exhibition Preview",
            },
        ],
        locale: "ko_KR",
        type: "website",
    },

    // Twitter Card metadata
    twitter: {
        card: "summary_large_image",
        title: "242 Days of Somewhere",
        description: "2025년 10월 12일 일요일 낮 12시, 양재시민의숲 야외예식장",
        images: [`${R2_BUCKET_URL}/poster_small.jpg`],
    },

    // Additional metadata
    metadataBase: new URL("https://mua-exhibit.pages.dev"), // Replace with your actual domain
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
