"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Menu, Settings } from "lucide-react"
import { motion } from "framer-motion"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-zinc-900/80 backdrop-blur-md border-b border-blue-500/20" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-zinc-900 border-r border-blue-500/20">
              <nav className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsOpen(false)}>
                  <Settings className="h-6 w-6 text-blue-400" />
                  <span className="uppercase tracking-wider">AutoTech</span>
                </Link>
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-blue-400 transition-colors uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/models"
                  className="text-lg font-medium hover:text-blue-400 transition-colors uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Models
                </Link>
                <Link
                  href="/inventory"
                  className="text-lg font-medium hover:text-blue-400 transition-colors uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Inventory
                </Link>
                <Link
                  href="/gallery"
                  className="text-lg font-medium hover:text-blue-400 transition-colors uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium hover:text-blue-400 transition-colors uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-medium hover:text-blue-400 transition-colors uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Settings className="h-6 w-6 text-blue-400 animate-spin" style={{ animationDuration: "10s" }} />
            <span className="hidden md:inline-block uppercase tracking-wider">AutoTech</span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-blue-400 focus:bg-zinc-800 focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50 uppercase tracking-wider"
              >
                Home
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/models"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-blue-400 focus:bg-zinc-800 focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50 uppercase tracking-wider"
              >
                Models
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/inventory"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-blue-400 focus:bg-zinc-800 focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50 uppercase tracking-wider"
              >
                Inventory
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/gallery"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-blue-400 focus:bg-zinc-800 focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50 uppercase tracking-wider"
              >
                Gallery
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/about"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-blue-400 focus:bg-zinc-800 focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50 uppercase tracking-wider"
              >
                About
              </Link>
            </NavigationMenuLink>

            <NavigationMenuLink asChild>
              <Link
                href="/contact"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-800 hover:text-blue-400 focus:bg-zinc-800 focus:text-blue-400 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-zinc-800/50 data-[state=open]:bg-zinc-800/50 uppercase tracking-wider"
              >
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </motion.header>
  )
}
