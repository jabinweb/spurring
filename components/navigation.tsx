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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Brain, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/ui/logo"
import { useState, useEffect } from "react"

const services = [
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
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent data-[state=open]:bg-accent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {services.map((service) => (
                        <ListItem
                          key={service.title}
                          title={service.title}
                          href={service.href}
                          className="hover:bg-accent"
                        >
                          {service.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/projects" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent px-4 py-2 hover:bg-accent rounded-md transition-colors">
                      Projects
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent px-4 py-2 hover:bg-accent rounded-md transition-colors">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="bg-transparent px-4 py-2 hover:bg-accent rounded-md transition-colors">
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:block">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <ModeToggle />
          
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
                <Link
                  href="/services"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Services
                </Link>
                <div className="ml-4 space-y-2">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="block text-muted-foreground hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/projects"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Projects
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-semibold hover:text-primary"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-lg font-semibold hover:text-primary"
                >
                  Contact
                </Link>
                <Button className="mt-4" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
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