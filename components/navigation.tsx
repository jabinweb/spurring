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
import { Menu, Brain, Code, MessageSquare, LineChart, Building2, ArrowRight, Sparkles, Bot, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/logo"
import { useLightText } from "@/hooks/use-light-text"
import { GetStartedButton } from "./get-started-button"
import type { LucideIcon } from 'lucide-react'

// Define interface for navigation items
interface NavigationItem {
  title: string
  description: string
  icon: LucideIcon
  href: string
}

// Create services data with proper types
const services: NavigationItem[] = [
  {
    title: "AI Consulting",
    description: "Expert guidance in leveraging artificial intelligence solutions",
    icon: Brain,
    href: "/services/ai-consulting"
  },
  // {
  //   title: "Generative AI",
  //   description: "Cutting-edge generative AI solutions and implementations",
  //   icon: Sparkles,
  //   href: "/services/generative-ai"
  // },
  // {
  //   title: "Smart Assistants",
  //   description: "Intelligent virtual assistants and chatbot solutions",
  //   icon: Bot,
  //   href: "/services/smart-assistants"
  // },
  // {
  //   title: "Data Mining",
  //   description: "Advanced data analytics and mining solutions",
  //   icon: Database,
  //   href: "/services/data-mining"
  // },
    {
    title: "Computer Vision",
    description: "Next-Generation Vision AI Solutions",
    icon: Database,
    href: "/services/computer-vision"
  },
]

const industries = ["Healthcare", "Finance", "Manufacturing", "Retail"].map(title => ({ title, description: `AI solutions for ${title.toLowerCase()} sector`, icon: Building2, href: `/industries/${title.toLowerCase()}` }))

const navigationItems = [
  { title: "About", href: "/about" },
  { title: "Careers", href: "/careers" },
  { title: "Contact", href: "/contact" }
]

export function Navigation() {
  const { isLightText, isScrolled } = useLightText()

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      isLightText && "text-white"
    )}>  
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Logo size="md" variant={isLightText ? "light" : "default"} />
        <div className="ml-auto flex items-center space-x-4">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-2">
              {[{ label: "Services", data: services, width: "600px" }].map(({ label, data, width }) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuTrigger className={cn(
                    "!px-4 !py-2 rounded-md transition-colors",
                    !isScrolled
                      ? "text-white hover:bg-white/10 data-[state=open]:bg-white/10" // Always white when not scrolled
                      : "hover:bg-accent data-[state=open]:bg-accent" // Default theme colors when scrolled
                  )}>
                    {label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] grid-cols-2 gap-4 p-6 bg-background/95 backdrop-blur-md border rounded-lg shadow-lg">
                      {data.map(({ title, description, icon: Icon, href }) => (
                        <NavigationMenuLink 
                          key={title} 
                          href={href || "#"} 
                          className="block select-none space-y-1 rounded-md p-3 transition-colors hover:bg-accent"
                        >
                          <div className="flex items-center gap-2 text-sm font-medium leading-none text-foreground">
                            <Icon className="h-5 w-5" /> {title}
                          </div>
                          <p className="line-clamp-2 text-sm text-muted-foreground pt-1">{description}</p>
                        </NavigationMenuLink>
                      ))}
                      {services.length > 0 && (
                        <div className="col-span-2 mt-4 flex justify-end border-t pt-4">
                          <NavigationMenuLink href="/services" className="text-sm font-medium text-primary flex items-center hover:underline">
                            View All Services <ArrowRight className="ml-2 h-4 w-4" />
                          </NavigationMenuLink>
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              {navigationItems.map(({ title, href }) => (
                <NavigationMenuItem key={title}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink 
                      className={cn(
                        "px-4 py-2 rounded-md transition-colors",
                        !isScrolled 
                          ? "text-white hover:bg-white/10" // Always white when not scrolled (dark bg)
                          : "hover:bg-accent hover:text-accent-foreground" // Default theme colors when scrolled
                      )}
                    >
                      {title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden md:block relative">
            <div className={cn("rounded-full p-[2px] animate-spin-slow", isLightText ? "bg-white" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500")}>
              <GetStartedButton />
            </div>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={cn(isLightText && "text-white hover:bg-white/10")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Services Section */}
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase">Services</p>
                  {services.map(({ title, href }) => (
                    <Link key={title} href={href} className="block text-lg font-semibold text-foreground hover:text-primary mt-2">
                      {title}
                    </Link>
                  ))}
                </div>

                {/* Industries Section */}
                {/* <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-500 uppercase">Industries</p>
                  {industries.map(({ title }) => (
                    <Link key={title} href={`/industries/${title.toLowerCase()}`} className="block text-lg font-semibold hover:text-primary mt-2">
                      {title}
                    </Link>
                  ))}
                </div> */}

                {/* Other Navigation Items */}
                {navigationItems.map(({ title, href }) => (
                  <Link key={title} href={href} className="text-lg font-semibold text-foreground hover:text-primary mt-4">
                    {title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
