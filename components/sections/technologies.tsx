"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "next-themes"
import Image from "next/image"

export function Technologies() {
  const { theme } = useTheme()

  const technologies = [
    {
      name: "TensorFlow",
      image: "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg",
      invertInDark: true,
    },
    {
      name: "PyTorch",
      image: "https://pytorch.org/assets/images/pytorch-logo.png",
      invertInDark: true,
    },
    {
      name: "OpenAI",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
      invertInDark: true,
    },
    {
      name: "Microsoft Azure",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
      invertInDark: false,
    },
    {
      name: "AWS",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      invertInDark: true,
    },
    {
      name: "Google Cloud",
      image: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
      invertInDark: false,
    }
  ]

  return (
    <section className="bg-muted/50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Technologies We Use
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-lg">
          We leverage cutting-edge technologies and frameworks to deliver powerful AI solutions
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <Card 
              key={index} 
              className="bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors"
            >
              <CardContent className="p-6 flex items-center justify-center h-32">
                <div className="relative h-12 w-full">
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    fill
                    className={`object-contain transition-all ${
                      tech.invertInDark ? 'dark:invert' : ''
                    } hover:scale-110 duration-300`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
