"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { updateSmtpSettings, testSmtpConnection, getSmtpSettings, deleteSmtpSettings } from "@/app/admin/settings/actions"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, 
  AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Loader2, Check, Save } from "lucide-react"

export function EmailSettingsForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testSuccess, setTestSuccess] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [formData, setFormData] = useState({
    host: '',
    port: '587',
    user: '',
    password: '',
    from: '',
    fromName: 'Spurring Ventures'
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const settings = await getSmtpSettings()
      if (settings) {
        setFormData({
          host: settings.host,
          port: String(settings.port),
          user: settings.user,
          password: settings.password,
          from: settings.from,
          fromName: settings.fromName
        })
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleTestConnection = async () => {
    setTesting(true)
    setTestSuccess(false)
    console.log('Testing SMTP connection:', {
      host: formData.host,
      port: formData.port,
      user: formData.user
    })

    try {
      const result = await testSmtpConnection({
        ...formData,
        port: parseInt(formData.port)
      })
      
      setTestSuccess(true)
      console.log('SMTP test result:', result)
      toast({
        title: "Connection Successful",
        description: "SMTP server is configured correctly.",
        variant: "default"
      })
    } catch (error) {
      console.error('SMTP test failed:', error)
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Could not connect to SMTP server. Please check your settings.",
        variant: "destructive"
      })
    } finally {
      setTesting(false)
      // Reset success state after 3 seconds
      setTimeout(() => setTestSuccess(false), 3000)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteSmtpSettings()
      setFormData({
        host: '',
        port: '587',
        user: '',
        password: '',
        from: '',
        fromName: 'Spurring Ventures'
      })
      toast({
        title: "Settings deleted",
        description: "SMTP settings have been removed",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete settings",
        variant: "destructive"
      })
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setSaveSuccess(false)

    // Validate all required fields
    if (!formData.host || !formData.port || !formData.user || !formData.password || !formData.from) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      setLoading(false)
      return
    }

    const data = {
      host: formData.host,
      port: parseInt(formData.port),
      user: formData.user,
      password: formData.password,
      from: formData.from,
      fromName: formData.fromName
    }

    try {
      await updateSmtpSettings(data)
      setSaveSuccess(true)
      toast({
        title: "Settings Saved",
        description: "Email settings have been updated successfully.",
        variant: "default"
      })
    } catch (error) {
      console.error('Save error:', error)
      toast({
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save settings.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      // Reset success state after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Settings</CardTitle>
        <CardDescription>
          Configure SMTP settings for sending emails from the website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="host">SMTP Host</Label>
              <Input 
                id="host" 
                name="host" 
                value={formData.host}
                onChange={handleChange}
                placeholder="smtp.example.com" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">SMTP Port</Label>
              <Input 
                id="port" 
                name="port" 
                type="number" 
                value={formData.port}
                onChange={handleChange}
                placeholder="587" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="user">SMTP Username</Label>
            <Input 
              id="user" 
              name="user" 
              value={formData.user}
              onChange={handleChange}
              placeholder="user@example.com" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">SMTP Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="from">From Email</Label>
            <Input 
              id="from" 
              name="from" 
              type="email" 
              value={formData.from}
              onChange={handleChange}
              placeholder="noreply@yourdomain.com" 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromName">From Name</Label>
            <Input 
              id="fromName" 
              name="fromName" 
              value={formData.fromName}
              onChange={handleChange}
              placeholder="Spurring Ventures" 
              required 
            />
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={loading}
              variant={saveSuccess ? "default" : "default"}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
            
            <Button 
              type="button" 
              variant={testSuccess ? "default" : "secondary"}
              onClick={handleTestConnection}
              disabled={testing || !formData.host || !formData.port || !formData.user || !formData.password}
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : testSuccess ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Connected
                </>
              ) : (
                "Test Connection"
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button">Delete Settings</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove all SMTP settings. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
