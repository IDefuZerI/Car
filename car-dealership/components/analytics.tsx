"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // This would be where you'd typically initialize analytics
    // For example:
    // - Google Analytics
    // - Plausible
    // - Fathom
    // - Custom analytics

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")

    // Example analytics call
    console.log(`Page view: ${url}`)

    // You would typically have code like:
    // window.gtag('config', 'GA-MEASUREMENT-ID', {
    //   page_path: url,
    // })
  }, [pathname, searchParams])

  return null
}
