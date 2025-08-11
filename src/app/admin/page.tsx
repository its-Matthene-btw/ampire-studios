"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  FileText,
  Image,
  Mail
} from "lucide-react"

interface DashboardStats {
  projects: number
  testimonials: number
  articles: number
  media: number
  contactMessages: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    testimonials: 0,
    articles: 0,
    media: 0,
    contactMessages: 0,
  })

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: "Projects",
      value: stats.projects,
      description: "Total projects",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      description: "Client testimonials",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Articles",
      value: stats.articles,
      description: "Blog articles",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Media Files",
      value: stats.media,
      description: "Images and files",
      icon: Image,
      color: "text-orange-600",
    },
    {
      title: "Contact Messages",
      value: stats.contactMessages,
      description: "Unread messages",
      icon: Mail,
      color: "text-red-600",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}