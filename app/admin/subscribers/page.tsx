"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { adminApi } from "@/lib/admin-api"
import type { Subscriber } from "@/lib/blog-data"
import { Mail, Trash2, Bell, BellOff, Users, Search, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function AdminSubscribersPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")
  const [filterAlerts, setFilterAlerts] = useState<"all" | "enabled" | "disabled">("all")

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/unauthorized")
    }
  }, [user, loading, router])

  useEffect(() => {
    loadSubscribers()
  }, [])

  useEffect(() => {
    filterSubscriberList()
  }, [subscribers, searchQuery, filterStatus, filterAlerts])

  const loadSubscribers = async () => {
    try {
      setIsLoading(true)
      const data = await adminApi.getAllSubscribers()
      setSubscribers(data)
    } catch (error) {
      console.error("Failed to load subscribers:", error)
      toast.error("Failed to load subscribers")
    } finally {
      setIsLoading(false)
    }
  }

  const filterSubscriberList = () => {
    let filtered = [...subscribers]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (sub) =>
          sub.email.toLowerCase().includes(query) ||
          sub.name?.toLowerCase().includes(query),
      )
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((sub) =>
        filterStatus === "active" ? sub.isActive : !sub.isActive,
      )
    }

    // Alerts filter
    if (filterAlerts !== "all") {
      filtered = filtered.filter((sub) =>
        filterAlerts === "enabled" ? sub.receiveNewPostAlerts : !sub.receiveNewPostAlerts,
      )
    }

    setFilteredSubscribers(filtered)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredSubscribers.map((sub) => sub.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id])
    } else {
      setSelectedIds(selectedIds.filter((sid) => sid !== id))
    }
  }

  const handleToggleAlert = async (id: string) => {
    try {
      await adminApi.toggleSubscriberAlert(id)
      await loadSubscribers()
      toast.success("Alert preference updated")
    } catch (error) {
      console.error("Failed to toggle alert:", error)
      toast.error("Failed to update alert preference")
    }
  }

  const handleBulkEnableAlerts = async () => {
    try {
      await adminApi.bulkUpdateSubscribers(selectedIds, { receiveNewPostAlerts: true })
      await loadSubscribers()
      setSelectedIds([])
      toast.success(`Enabled alerts for ${selectedIds.length} subscriber(s)`)
    } catch (error) {
      console.error("Failed to enable alerts:", error)
      toast.error("Failed to enable alerts")
    }
  }

  const handleBulkDisableAlerts = async () => {
    try {
      await adminApi.bulkUpdateSubscribers(selectedIds, { receiveNewPostAlerts: false })
      await loadSubscribers()
      setSelectedIds([])
      toast.success(`Disabled alerts for ${selectedIds.length} subscriber(s)`)
    } catch (error) {
      console.error("Failed to disable alerts:", error)
      toast.error("Failed to disable alerts")
    }
  }

  const handleSendBulkEmail = async () => {
    if (!emailSubject || !emailMessage) {
      toast.error("Please fill in subject and message")
      return
    }

    try {
      const result = await adminApi.sendBulkEmail(selectedIds, emailSubject, emailMessage)
      if (result.success) {
        toast.success(`Email sent to ${result.sentCount} subscriber(s)`)
        setShowEmailDialog(false)
        setEmailSubject("")
        setEmailMessage("")
        setSelectedIds([])
      }
    } catch (error) {
      console.error("Failed to send email:", error)
      toast.error("Failed to send email")
    }
  }

  const handleBulkDelete = async () => {
    try {
      await adminApi.bulkDeleteSubscribers(selectedIds)
      await loadSubscribers()
      setSelectedIds([])
      setShowDeleteDialog(false)
      toast.success(`Deleted ${selectedIds.length} subscriber(s)`)
    } catch (error) {
      console.error("Failed to delete subscribers:", error)
      toast.error("Failed to delete subscribers")
    }
  }

  const handleDeleteOne = async (id: string) => {
    try {
      await adminApi.deleteSubscriber(id)
      await loadSubscribers()
      toast.success("Subscriber deleted")
    } catch (error) {
      console.error("Failed to delete subscriber:", error)
      toast.error("Failed to delete subscriber")
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const stats = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.isActive).length,
    alertsEnabled: subscribers.filter((s) => s.receiveNewPostAlerts).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
        <p className="text-muted-foreground mt-2">
          Manage your email subscribers and send bulk communications
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">{stats.active} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.active / stats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts Enabled</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.alertsEnabled}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.alertsEnabled / stats.total) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriber List</CardTitle>
          <CardDescription>
            {selectedIds.length > 0
              ? `${selectedIds.length} subscriber(s) selected`
              : "Search and filter subscribers"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-input bg-background text-foreground"
              style={{ borderRadius: "0.5rem" }}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <select
              value={filterAlerts}
              onChange={(e) => setFilterAlerts(e.target.value as any)}
              className="px-3 py-2 border border-input bg-background text-foreground"
              style={{ borderRadius: "0.5rem" }}
            >
              <option value="all">All Alerts</option>
              <option value="enabled">Alerts Enabled</option>
              <option value="disabled">Alerts Disabled</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-muted/50" style={{ borderRadius: "0.5rem" }}>
              <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Send Bulk Email</DialogTitle>
                    <DialogDescription>
                      Send an email to {selectedIds.length} selected subscriber(s)
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Email subject..."
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        style={{ borderRadius: "0.5rem" }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Email message..."
                        rows={8}
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        style={{ borderRadius: "0.5rem" }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowEmailDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSendBulkEmail}>Send Email</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="sm" onClick={handleBulkEnableAlerts}>
                <Bell className="h-4 w-4 mr-2" />
                Enable Alerts
              </Button>

              <Button variant="outline" size="sm" onClick={handleBulkDisableAlerts}>
                <BellOff className="h-4 w-4 mr-2" />
                Disable Alerts
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>

              <Button variant="ghost" size="sm" onClick={() => setSelectedIds([])}>
                Clear Selection
              </Button>
            </div>
          )}

          {/* Table */}
          <div className="border" style={{ borderRadius: "0.5rem" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        filteredSubscribers.length > 0 &&
                        selectedIds.length === filteredSubscribers.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Alerts</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Subscribed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No subscribers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(subscriber.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOne(subscriber.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>{subscriber.name || "-"}</TableCell>
                      <TableCell>
                        <Badge variant={subscriber.isActive ? "default" : "secondary"}>
                          {subscriber.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleAlert(subscriber.id)}
                        >
                          {subscriber.receiveNewPostAlerts ? (
                            <Bell className="h-4 w-4 text-primary" />
                          ) : (
                            <BellOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="capitalize">{subscriber.source}</TableCell>
                      <TableCell>
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteOne(subscriber.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedIds.length} subscriber(s). This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
