import type React from "react"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { GridBackground } from "@/components/grid-background"
import ScrollToTop from "@/components/scroll-to-top"

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-space",
})

export const metadata = {
    title: "AutoTech | Vehicle Customization Platform",
    description: "Advanced vehicle customization and configuration platform for automotive enthusiasts",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="scroll-smooth dark" suppressHydrationWarning={true}>
        <body className={`${spaceGrotesk.variable} font-sans antialiased bg-zinc-900 text-zinc-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
                <ScrollToTop />
                <GridBackground />
                <SiteHeader />
                <Suspense>
                    <div className="flex-1 z-10">{children}</div>
                </Suspense>
                <SiteFooter />
                <Toaster />
                <Analytics />
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}
