"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface WorldMapProps {
  showLegend?: boolean
}

const locations = [
  {
    id: "india",
    name: "India",
    coordinates: [77.2090, 28.6139], // New Delhi coordinates
    type: "headquarters"
  },
  {
    id: "australia",
    name: "Australia",
    coordinates: [151.2093, -33.8688], // Sydney coordinates
    type: "office"
  },
  {
    id: "thailand",
    name: "Thailand",
    coordinates: [100.5018, 13.7563], // Bangkok coordinates
    type: "partner"
  },
  {
    id: "uae",
    name: "UAE",
    coordinates: [55.2708, 25.2048], // Dubai coordinates
    type: "office"
  },
  {
    id: "europe",
    name: "Europe",
    coordinates: [4.9041, 52.3676], // Amsterdam coordinates
    type: "partner"
  },
  {
    id: "usa",
    name: "United States",
    coordinates: [-122.4194, 37.7749], // San Francisco coordinates
    type: "office"
  }
]

const projectToSVG = (coordinates: number[]) => {
  const [longitude, latitude] = coordinates
  // Mercator projection parameters
  const viewBox = {
    minLon: -180,
    maxLon: 180,
    minLat: -55, // Adjusted to focus on populated areas
    maxLat: 80,  // Adjusted to focus on populated areas
    width: 1009.6727,
    height: 665.96301
  }

  // Mercator projection formula
  const y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180)
  const ymin = Math.log(Math.tan((90 + viewBox.minLat) * Math.PI / 360)) / (Math.PI / 180)
  const ymax = Math.log(Math.tan((90 + viewBox.maxLat) * Math.PI / 360)) / (Math.PI / 180)
  
  const x = ((longitude - viewBox.minLon) / (viewBox.maxLon - viewBox.minLon)) * viewBox.width
  const normalizedY = ((ymax - y) / (ymax - ymin)) * viewBox.height

  return [x, normalizedY]
}

export function WorldMap({ showLegend = false }: WorldMapProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden">
      <svg
        viewBox="0 0 1009.6727 665.96301"
        className="w-full h-auto"
        style={{ background: 'transparent' }}
      >
        {/* Base Map */}
        <g>
          <path
            d={`M 0 0 H ${1009.6727} V ${665.96301} H 0 Z`}
            className="fill-background"
          />
          <image 
            href="/world-map.svg" 
            width="100%" 
            height="100%" 
            className="opacity-[0.5] dark:opacity-[0.5] [filter:invert(1)_opacity(0.8)_brightness(2)_contrast(0.5)] dark:[filter:brightness(2)_contrast(0.5)]"
            preserveAspectRatio="xMidYMid meet"
          />
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

      {/* Optional Legend */}
      {showLegend && (
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
      )}
    </div>
  )
}
