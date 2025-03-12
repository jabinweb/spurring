"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/logo"
import { useState, useEffect } from "react"

interface NavItem {
  title: string
  href: string
  description?: string
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    title: "Services",
    href: "/services",
    children: [
      {
        title: "AI Consulting",
        href: "/services/consulting",
        description: "Strategic guidance for AI implementation and digital transformation",
      },
      {
        title: "Generative AI",
        href: "/services/generative-ai",
        description: "Custom generative AI solutions for content, design, and more",
      },
      {
        title: "Smart Assistants",
        href: "/services/smart-assistants",
        description: "Intelligent virtual assistants and chatbots for business automation",
      },
      {
        title: "Data Mining",
        href: "/services/data-mining",
        description: "Advanced data analysis and pattern recognition solutions",
      },
    ],
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b' : 'bg-transparent'
    }`}>
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Logo size="md" />

        <div className="ml-auto flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent data-[state=open]:bg-accent">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.children.map((child) => (
                              <ListItem
                                key={child.title}
                                title={child.title}
                                href={child.href}
                                className="hover:bg-accent"
                              >
                                {child.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink className="bg-transparent px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Animated CTA Button */}
          <div className="hidden md:block relative">
            <div className="rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow">
              <Button
                asChild
                className="relative z-10 rounded-full bg-white text-black px-6 py-2 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <React.Fragment key={item.title}>
                    <Link
                      href={item.href}
                      className="text-lg font-semibold hover:text-primary"
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="block text-muted-foreground hover:text-primary"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"