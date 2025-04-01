"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GetStartedDialog } from "@/components/get-started-dialog"
import { cn } from "@/lib/utils"

export function GetStartedButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} 
      className={cn("relative z-10 rounded-full px-6 py-1 transition-all duration-300 bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white",)}
      >
        Get Started
      </Button>
      <GetStartedDialog open={open} onOpenChange={setOpen} />
    </>
  )
}