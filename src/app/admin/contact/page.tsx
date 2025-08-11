"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, MailOpen, Eye } from "lucide-react"
import { toast } from "sonner"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export default function AdminContact() {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchContactSubmissions()
  }, [])

  const fetchContactSubmissions = async () => {
    try {
      const response = await fetch("/api/admin/contact")
      if (response.ok) {
        const data = await response.json()
        setContactSubmissions(data)
      }
    } catch (error) {
      toast.error("Error fetching contact submissions")
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, read: true }),
      })

      if (response.ok) {
        toast.success("Marked as read")
        fetchContactSubmissions()
      } else {
        toast.error("Error updating submission")
      }
    } catch (error) {
      toast.error("Error updating submission")
    }
  }

  const markAsUnread = async (id: string) => {
    try {
      const response = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, read: false }),
      })

      if (response.ok) {
        toast.success("Marked as unread")
        fetchContactSubmissions()
      } else {
        toast.error("Error updating submission")
      }
    } catch (error) {
      toast.error("Error updating submission")
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Contact Messages</h2>
        <p className="text-gray-600">Manage contact form submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Messages</CardTitle>
          <CardDescription>
            A list of all contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.name}</TableCell>
                  <TableCell>{submission.email}</TableCell>
                  <TableCell>{submission.subject || "No subject"}</TableCell>
                  <TableCell>
                    <Badge variant={submission.read ? "secondary" : "default"}>
                      {submission.read ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              Message from {submission.name}
                            </DialogTitle>
                            <DialogDescription>
                              {submission.subject && `Subject: ${submission.subject}`}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <p><strong>Email:</strong> {submission.email}</p>
                              {submission.phone && (
                                <p><strong>Phone:</strong> {submission.phone}</p>
                              )}
                              <p><strong>Received:</strong> {new Date(submission.createdAt).toLocaleString()}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Message:</h4>
                              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                {submission.message}
                              </p>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              {submission.read ? (
                                <Button
                                  variant="outline"
                                  onClick={() => markAsUnread(submission.id)}
                                >
                                  <Mail className="w-4 h-4 mr-2" />
                                  Mark as Unread
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => markAsRead(submission.id)}
                                >
                                  <MailOpen className="w-4 h-4 mr-2" />
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      {submission.read ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsUnread(submission.id)}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(submission.id)}
                        >
                          <MailOpen className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}