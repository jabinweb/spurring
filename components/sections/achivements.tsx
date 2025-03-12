"use client"

import { motion } from "framer-motion"

export function Achivement() {
    const achievements = [
    { number: "500+", label: "Projects Delivered" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "25+", label: "Industry Awards" },
    { number: "10+", label: "Years Experience" }
    ]
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto bg-primary/5 rounded-3xl p-12 backdrop-blur-sm border border-primary/10 mb-32"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {achievement.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {achievement.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
