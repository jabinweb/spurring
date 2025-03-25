import { Card, CardContent } from "@/components/ui/card"
import { Brain, Target, Globe, TrendingUp, Building } from "lucide-react"
import Image from "next/image"
import { Hero } from "@/components/ui/hero"

export default function AboutPage() {
  return (
    <div>
      <Hero
        title="About Spurring Ventures"
        description="Leading the AI revolution in India with innovative solutions and expert consulting"
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
      />

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Global Network</span>
            </div>
            <h2 className="text-3xl font-bold">Who We Are</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Spurring Ventures is a Bangalore-based startup operating within a global network 
              of companies across Australia and other countries. We leverage our international 
              expertise to build intelligent AI systems that tackle complex business challenges 
              using advanced machine learning technologies.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Building className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Bangalore HQ</h3>
                <p className="text-sm text-muted-foreground">Our primary development hub</p>
              </div>
              <div className="space-y-2">
                <Globe className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Global Presence</h3>
                <p className="text-sm text-muted-foreground">International network & expertise</p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
              alt="Global Technology Network"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* AI Impact Section */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">The Future of AI in Business</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            By 2030, AI is projected to add $13 trillion to the global GDP. Organizations leveraging 
            AI are expected to outperform their competition by 30% by 2025.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-primary mb-2">30%</h3>
                <p className="text-muted-foreground">Competitive advantage for AI-enabled organizations by 2025</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-primary mb-2">$13T</h3>
                <p className="text-muted-foreground">Potential AI contribution to global GDP by 2030</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold text-primary mb-2">100%</h3>
                <p className="text-muted-foreground">Commitment to long-term client success</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To empower businesses across India with cutting-edge AI solutions that drive
                innovation, efficiency, and sustainable growth. We&apos;re committed to making
                advanced technology accessible and practical for organizations of all sizes.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Brain className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To be India&apos;s leading AI solutions provider, recognized globally for our
                innovative approaches, technical excellence, and the transformative impact
                we create for our clients and society at large.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="max-w-7xl mx-auto"> 
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI Consulting Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive AI consultation to guide businesses through the complexities 
              of the ever-evolving AI landscape, delivering tailored solutions that drive tangible growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/50">
              <CardContent className="pt-6">
                <Brain className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">AI Readiness Assessment</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive evaluation of your organization&apos;s AI implementation capabilities
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/50">
              <CardContent className="pt-6">
                <Target className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Tailored Strategies</h3>
                <p className="text-sm text-muted-foreground">
                  Custom solutions designed to meet your specific organizational goals
                </p>
              </CardContent>
            </Card>
            <Card className="bg-background/50">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Long-term Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Sustainable AI solutions that ensure continuous business evolution
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}