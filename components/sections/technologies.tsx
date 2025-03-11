"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function Technologies() {
  return (
    <section className="bg-muted py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Technologies We Use</h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        We leverage cutting-edge technologies and frameworks to deliver powerful AI solutions
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {[
          {
            name: "TensorFlow",
            image: "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg"
          },
          {
            name: "PyTorch",
            image: "https://pytorch.org/assets/images/pytorch-logo.png"
          },
          {
            name: "OpenAI",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
          },
          {
            name: "Microsoft Azure",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg"
          },
          {
            name: "AWS",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
          },
          {
            name: "Google Cloud",
            image: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg"
          }
        ].map((tech, index) => (
          <Card key={index} className="bg-background">
            <CardContent className="p-6 flex items-center justify-center">
              <div className="relative h-12 w-full">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-contain"
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
