"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import Image from "next/image"
import { Container } from "@/components/ui/container"

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CTO",
    company: "TechCrest Solutions",
    image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80",
    quote: "Spurring Ventures transformed our business with their AI solutions. Their expertise in implementing custom AI models improved our operational efficiency by 40% and significantly enhanced our customer experience.",
    rating: 5,
    date: "2024-02-15"
  },
  {
    name: "Priya Sharma",
    role: "Head of Digital Innovation",
    company: "FinTech Innovations Ltd",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    quote: "Their generative AI solutions revolutionized our content creation process. We&apos;ve seen a 60% reduction in time-to-market for our marketing campaigns while maintaining exceptional quality.",
    rating: 5,
    date: "2024-01-20"
  },
  {
    name: "Arun Patel",
    role: "CEO",
    company: "HealthTech Solutions",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    quote: "The smart assistant implementation by Spurring Ventures has transformed our patient care system. We&apos;ve achieved a 35% improvement in response times and better patient satisfaction scores.",
    rating: 5,
    date: "2024-03-01"
  }
]

export function Testimonials() {
  // Schema as a static string to avoid hydration issues
  const schemaMarkup = {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Spurring Ventures",
      "review": testimonials.map(t => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": t.rating,
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": t.name
        },
        "reviewBody": t.quote,
        "datePublished": t.date
      }))
    })
  }

  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-b from-background via-background/50 to-background">
      {/* Schema markup with dangerouslySetInnerHTML */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={schemaMarkup}
      />

      {/* Enhanced Background Elements with lower z-index */}
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-[0.2]" />
      <motion.div 
        className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <Container>
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              Testimonials
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-4xl md:text-5xl font-bold"
          >
            What Our Clients Say
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full backdrop-blur-sm border-primary/10 bg-gradient-to-br from-background/80 to-muted/50">
                <CardContent className="p-8 relative">
                  <Quote className="h-12 w-12 absolute -top-2 -left-2 text-primary opacity-20" />
                  <div className="space-y-6">
                    <p className="text-lg text-muted-foreground relative z-10 italic leading-relaxed">
                    &ldquo;{testimonial.quote}&ldquo;
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                        <div className="text-sm bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-medium">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  )
}
