import { Brain } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6" />
              <span className="font-bold text-xl">Spurring Ventures</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Leading the future of AI development and innovation in India
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/consulting" className="text-sm text-muted-foreground hover:text-foreground">AI Consulting</Link></li>
              <li><Link href="/services/generative-ai" className="text-sm text-muted-foreground hover:text-foreground">Generative AI</Link></li>
              <li><Link href="/services/smart-assistants" className="text-sm text-muted-foreground hover:text-foreground">Smart Assistants</Link></li>
              <li><Link href="/services/data-mining" className="text-sm text-muted-foreground hover:text-foreground">Data Mining</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">Projects</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com" className="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a></li>
              <li><a href="https://twitter.com" className="text-sm text-muted-foreground hover:text-foreground">Twitter</a></li>
              <li><a href="mailto:contact@spurringventures.com" className="text-sm text-muted-foreground hover:text-foreground">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Spurring Ventures India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}