"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AdminSetupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const res = await fetch("/api/admin/setup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" }
    })
    
    if (res.ok) {
      window.location.href = "/admin"
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={onSubmit} className="space-y-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">Create Admin Account</h1>
        <Input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">Create Admin Account</Button>
      </form>
    </div>
  )
}
