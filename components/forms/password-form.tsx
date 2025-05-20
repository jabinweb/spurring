'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { updatePassword } from "@/app/admin/profile/actions"
import { useToast } from "@/hooks/use-toast"
import { User } from "next-auth"

interface PasswordFormProps {
  user: User & {
    id: string
    isAdmin: boolean
    name?: string | null
    email: string
  }
}

export function PasswordForm({ user }: PasswordFormProps) {
  const { toast } = useToast()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  interface PasswordFormValues {
    currentPassword: string;
    newPassword: string;
  }

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        await updatePassword({ currentPassword, newPassword } as PasswordFormValues);
        toast({ title: "Password updated successfully" });
        setCurrentPassword('');
        setNewPassword('');
    } catch (error) {
        toast({ title: "Failed to update password", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
