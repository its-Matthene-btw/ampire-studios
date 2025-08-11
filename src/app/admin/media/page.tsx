"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Upload, MoreHorizontal, Download, Trash2, Eye } from "lucide-react"
import { toast } from "sonner"

interface Media {
  id: string
  filename: string
  originalName: string
  filePath: string
  fileSize: number
  mimeType: string
  altText?: string
  createdAt: string
  updatedAt: string
}

export default function AdminMedia() {
  const [mediaFiles, setMediaFiles] = useState<Media[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [altText, setAltText] = useState("")
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch("/api/admin/media")
      if (response.ok) {
        const data = await response.json()
        setMediaFiles(data)
      }
    } catch (error) {
      toast.error("Error fetching media files")
    }
  }

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("altText", altText)

    try {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        toast.success("File uploaded successfully")
        fetchMedia()
        setIsUploadDialogOpen(false)
        setSelectedFile(null)
        setAltText("")
      } else {
        toast.error("Error uploading file")
      }
    } catch (error) {
      toast.error("Error uploading file")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this file?")) {
      try {
        const response = await fetch(`/api/admin/media/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          toast.success("File deleted successfully")
          fetchMedia()
        } else {
          toast.error("Error deleting file")
        }
      } catch (error) {
        toast.error("Error deleting file")
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileTypeIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "🖼️"
    if (mimeType.startsWith("video/")) return "🎥"
    if (mimeType.startsWith("audio/")) return "🎵"
    if (mimeType.includes("pdf")) return "📄"
    return "📁"
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600">Manage your images and files</p>
        </div>
        
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New File</DialogTitle>
              <DialogDescription>
                Select a file to upload to your media library.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <Input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept="image/*,video/*,audio/*,.pdf"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Alt Text (for images)</label>
                <Input
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="Describe the image for accessibility"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading || !selectedFile}>
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Media Files</CardTitle>
          <CardDescription>
            A list of all uploaded media files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mediaFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="text-2xl">{getFileTypeIcon(file.mimeType)}</div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{file.originalName}</div>
                      {file.altText && (
                        <div className="text-sm text-gray-500">Alt: {file.altText}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{file.mimeType}</Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(file.fileSize)}</TableCell>
                  <TableCell>
                    {new Date(file.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <a href={file.filePath} target="_blank" rel="noopener noreferrer">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={file.filePath} download>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {mediaFiles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No media files uploaded yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}