"use client"

import { Brain } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { CTA } from "./sections/cta"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
      <>
      {/* CTA Section with gradient variant */}
      <CTA 
      variant="gradient"
      title="Ready to Transform Your Business?"
      description="Let's discuss how our AI solutions can drive your success"
      primaryButtonText="Get Started"
      secondaryButtonText="Learn More"
      secondaryButtonHref="/about"
    />
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo size="md" />
            </div>
            <p className="text-sm text-muted-foreground">
            Leading the AI revolution in India
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/ai-consulting" className="text-sm text-muted-foreground hover:text-foreground">AI Consulting</Link></li>
              <li><Link href="/services/generative-ai" className="text-sm text-muted-foreground hover:text-foreground">Generative AI</Link></li>
              {/* <li><Link href="/services/smart-assistants" className="text-sm text-muted-foreground hover:text-foreground">Smart Assistants</Link></li> */}
              <li><Link href="/services/data-mining" className="text-sm text-muted-foreground hover:text-foreground">Data Mining</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              {/* <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">Projects</Link></li> */}
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://www.linkedin.com/company/spurring-ventures-india" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a></li>
              {/* <li><a href="https://twitter.com" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a></li>  */}
              <li><a href="mailto:spurringventuresindia@gmail.com " className="text-sm text-muted-foreground hover:text-foreground">Email</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2024 Spurring Ventures India. 
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Made with ❤️ by <a href="https://web.jabin.org">JabinWeb</a>
              </p>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}