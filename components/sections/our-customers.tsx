"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"

export function OurCustomers() {
  const customers = [
    { name: "BuildCam", logo: "/images/buildcam.webp", invertInLight: false },
    { name: "Timelapse SEA", logo: "/images/timelapse-sea.webp", invertInLight: false },
    { name: "Farm Mapping Services", logo: "/images/farm-mapping-services.png", invertInLight: true },
    { name: "Farmhand", logo: "/images/farmhand.png", invertInLight: false },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {customers.map((customer, index) => (
            <motion.div 
              key={customer.name} 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <Image
                  src={customer.logo}
                  alt={`${customer.name} logo`}
                  width={150}
                  height={100}
                  className={`object-contain transition-all duration-300 group-hover:scale-105 grayscale hover:grayscale-0 ${
                    customer.invertInLight ? 'dark:invert-0 brightness-0 dark:brightness-100' : ''
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}