'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { updateProfile } from "@/app/admin/profile/actions"
import { User } from "next-auth"

interface ProfileFormProps {
  user: User & {
    id: string
    isAdmin: boolean
    name?: string | null
    email: string
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const { toast } = useToast()
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [isLoading, setIsLoading] = useState(false)

interface UpdateProfileParams {
    name: string
    email: string
}

interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
        await updateProfile({ name, email } as UpdateProfileParams)
        toast({ title: "Profile updated successfully" })
    } catch (error) {
        toast({ title: "Failed to update profile", variant: "destructive" })
    } finally {
        setIsLoading(false)
    }
}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
