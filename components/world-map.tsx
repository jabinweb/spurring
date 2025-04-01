"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const locations = [
  {
    id: "india",
    name: "India",
    coordinates: [78.9629, 20.5937],
    type: "headquarters"
  },
  {
    id: "australia",
    name: "Australia",
    coordinates: [133.7751, -25.2744], // Adjusted to center of Australia
    type: "office"
  },
  {
    id: "thailand",
    name: "Thailand",
    coordinates: [100.9925, 15.8700], // Adjusted to center of Thailand
    type: "partner"
  },
  {
    id: "uae",
    name: "UAE",
    coordinates: [53.8478, 23.4241], // Adjusted to center of UAE
    type: "office"
  },
  {
    id: "europe",
    name: "Europe",
    coordinates: [15.2551, 54.5260], // Adjusted to center of Europe
    type: "partner"
  },
  {
    id: "usa",
    name: "United States",
    coordinates: [-95.7129, 37.0902], // Adjusted to center of USA
    type: "office"
  }
]

// Update viewBox parameters to match SVG
const projectToSVG = (coordinates: number[]) => {
  const [longitude, latitude] = coordinates
  const viewBox = {
    minLon: -169.110266,
    maxLon: 190.486279,
    minLat: -58.508473,
    maxLat: 83.600842,
    width: 1009.6727,
    height: 665.96301
  }

  const x = ((longitude - viewBox.minLon) / (viewBox.maxLon - viewBox.minLon)) * viewBox.width
  const y = ((viewBox.maxLat - latitude) / (viewBox.maxLat - viewBox.minLat)) * viewBox.height
  return [x, y]
}

export function WorldMap() {
  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      <svg
        viewBox="0 0 1009.6727 665.96301"
        className="w-full h-auto"
        style={{ background: 'transparent' }}
      >
        {/* Base Map */}
        <g className="fill-muted/10 stroke-muted-foreground/20 dark:fill-muted/20 dark:stroke-muted-foreground/30">
          <image href="/world-map.svg" width="100%" height="100%" style={{color: 'currentColor'}} />
        </g>

        {/* Connections */}
        {locations.map((location, index) => {
          const [x, y] = projectToSVG(location.coordinates)
          const [indiaX, indiaY] = projectToSVG(locations[0].coordinates)

          if (location.id === "india") return null

          return (
            <motion.path
              key={location.id}
              d={`M${indiaX},${indiaY} Q${(indiaX + x) / 2},${
                Math.min(indiaY, y) - 50
              } ${x},${y}`}
              className="stroke-primary"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 2,
                delay: index * 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )
        })}

        {/* Location Markers */}
        {locations.map((location) => {
          const [x, y] = projectToSVG(location.coordinates)
          return (
            <g key={location.id}>
              <motion.circle
                cx={x}
                cy={y}
                r={location.type === "headquarters" ? 6 : 4}
                className={cn(
                  "fill-primary",
                  location.type === "headquarters" && "stroke-primary stroke-2"
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  delay: 0.5
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r={location.type === "headquarters" ? 12 : 8}
                className="fill-primary/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <motion.text
                x={x}
                y={y + 20}
                className="text-xs fill-current text-center"
                textAnchor="middle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {location.name}
              </motion.text>
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 flex items-center gap-4 bg-background/80 backdrop-blur-sm p-2 rounded-lg border border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs">Headquarters</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs">Office</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/70" />
          <span className="text-xs">Partner</span>
        </div>
      </div>
    </div>
  )
}
