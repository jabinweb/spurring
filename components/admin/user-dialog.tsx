"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"
import { User, UserFormData } from "@/types/user"

interface UserDialogProps {
  open: boolean
  onClose: () => void
  user?: User
  onSubmit: (data: UserFormData) => Promise<void>
}

export function UserDialog({ open, onClose, user, onSubmit }: UserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false
  })
    const [loading, setLoading] = useState(false)

  // Reset form and populate with user data when dialog opens/closes or user changes
  useEffect(() => {
    if (open && user) {
      setFormData({
        name: user.name || "",
        email: user.email,
        password: "",
        isAdmin: user.isAdmin
      })
    } else if (!open) {
      // Reset form when dialog closes
      setFormData({
        name: "",
        email: "",
        password: "",
        isAdmin: false
      })
    }
  }, [open, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({ ...formData, id: user?.id })
      onClose()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          {!user && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAdmin"
              checked={formData.isAdmin}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, isAdmin: checked === true }))
              }
            />
            <label htmlFor="isAdmin" className="text-sm font-medium">
              Admin User
            </label>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : user ? "Update User" : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
