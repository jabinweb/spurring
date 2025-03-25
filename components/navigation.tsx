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
import { useLightText } from "@/hooks/use-light-text"

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
    // children: [
    //   {
    //     title: "AI Consulting",
    //     href: "/services/consulting",
    //     description: "Strategic guidance for AI implementation and digital transformation",
    //   },
    //   {
    //     title: "Generative AI",
    //     href: "/services/generative-ai",
    //     description: "Custom generative AI solutions for content, design, and more",
    //   },
    //   {
    //     title: "Smart Assistants",
    //     href: "/services/smart-assistants",
    //     description: "Intelligent virtual assistants and chatbots for business automation",
    //   },
    //   {
    //     title: "Data Mining",
    //     href: "/services/data-mining",
    //     description: "Advanced data analysis and pattern recognition solutions",
    //   },
    // ],
  },
  {
    title: "About",
    href: "/about",
  },
]

export function Navigation() {
  const { isLightText, isScrolled } = useLightText()

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b' 
        : 'bg-transparent',
      isLightText && 'text-white'
    )}>
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        {/* Logo - Add light variant for dark backgrounds */}
        <Logo size="md" variant={isLightText ? 'light' : 'default'} />

        <div className="ml-auto flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "bg-transparent hover:bg-accent",
                            isLightText && 'text-white hover:text-white hover:bg-white/10'
                          )}
                        >
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
                        <NavigationMenuLink 
                          className={cn(
                            "bg-transparent px-4 py-2 rounded-md transition-colors",
                            isLightText 
                              ? 'text-white hover:bg-white/10' 
                              : 'hover:bg-accent hover:text-accent-foreground'
                          )}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block relative">
            <div className={cn(
              "rounded-full p-[2px] animate-spin-slow",
              isLightText 
                ? 'bg-white' 
                : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
            )}>
              <Button
                asChild
                className={cn(
                  "relative z-10 rounded-full px-6 py-1 transition-all duration-300 bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white",)}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className={cn(
                  isLightText && 'text-white hover:bg-white/10'
                )}
              >
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