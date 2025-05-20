"use client"

import { adminMiddleware } from "../middleware"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AdminSidebar } from "@/components/admin/sidebar"
import { useState, useEffect } from "react"
import { UserDialog } from "@/components/admin/user-dialog"
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog"
import { User, UserFormData } from "@/types/user"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [userDialog, setUserDialog] = useState<{ open: boolean; user: User | null }>({ open: false, user: null })
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; userId: string | null }>({ open: false, userId: null })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users")
      if (!res.ok) throw new Error("Failed to fetch users")
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      setError("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleUserSubmit = async (data: UserFormData) => {
    try {
      const method = data.id ? "PUT" : "POST"
      const res = await fetch("/api/admin/users", {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      if (!res.ok) throw new Error("Failed to save user")
      fetchUsers()
    } catch (error) {
      setError("Failed to save user")
    }
  }

  const handleDelete = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE"
      })
      if (!res.ok) throw new Error("Failed to delete user")
      fetchUsers()
      setDeleteDialog({ open: false, userId: null })
    } catch (error) {
      setError("Failed to delete user")
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {error && (
            <div className="mb-4 p-4 text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Users Management</h1>
            <Button onClick={() => setUserDialog({ open: true, user: null })}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No users found</TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name || '-'}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                      <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setUserDialog({ open: true, user })}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => setDeleteDialog({ open: true, userId: user.id })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>

      <UserDialog 
        open={userDialog.open}
        user={userDialog.user ?? undefined}
        onClose={() => setUserDialog({ open: false, user: null })}
        onSubmit={handleUserSubmit}
      />

      <AlertDialog 
        open={deleteDialog.open} 
        onOpenChange={() => setDeleteDialog({ open: false, userId: null })}
      >
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user.
          </AlertDialogDescription>
          <div className="flex justify-end space-x-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDelete(deleteDialog.userId!)}
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
