"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw } from "lucide-react"
import { toast } from "sonner"

interface SiteSettings {
  siteTitle: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialFacebook: string
  socialTwitter: string
  socialInstagram: string
  socialLinkedin: string
  seoKeywords: string
  googleAnalytics: string
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: "",
    siteDescription: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialFacebook: "",
    socialTwitter: "",
    socialInstagram: "",
    socialLinkedin: "",
    seoKeywords: "",
    googleAnalytics: "",
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        // Convert array to object
        const settingsObj = data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value
          return acc
        }, {})
        setSettings(settingsObj)
      }
    } catch (error) {
      toast.error("Error fetching settings")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success("Settings saved successfully")
      } else {
        toast.error("Error saving settings")
      }
    } catch (error) {
      toast.error("Error saving settings")
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
          <p className="text-gray-600">Manage your website configuration</p>
        </div>
        
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic information about your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => updateSetting("siteTitle", e.target.value)}
                placeholder="AMpire Studio"
              />
            </div>
            
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => updateSetting("siteDescription", e.target.value)}
                placeholder="We craft stunning websites, powerful brands, and effective digital strategies..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Contact details displayed on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting("contactEmail", e.target.value)}
                placeholder="contact@ampirestudio.com"
              />
            </div>
            
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => updateSetting("contactPhone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div>
              <Label htmlFor="contactAddress">Address</Label>
              <Textarea
                id="contactAddress"
                value={settings.contactAddress}
                onChange={(e) => updateSetting("contactAddress", e.target.value)}
                placeholder="123 Digital Avenue, Tech City, TC 10001"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Your social media profile links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="socialFacebook">Facebook URL</Label>
              <Input
                id="socialFacebook"
                value={settings.socialFacebook}
                onChange={(e) => updateSetting("socialFacebook", e.target.value)}
                placeholder="https://facebook.com/ampirestudio"
              />
            </div>
            
            <div>
              <Label htmlFor="socialTwitter">Twitter URL</Label>
              <Input
                id="socialTwitter"
                value={settings.socialTwitter}
                onChange={(e) => updateSetting("socialTwitter", e.target.value)}
                placeholder="https://twitter.com/ampirestudio"
              />
            </div>
            
            <div>
              <Label htmlFor="socialInstagram">Instagram URL</Label>
              <Input
                id="socialInstagram"
                value={settings.socialInstagram}
                onChange={(e) => updateSetting("socialInstagram", e.target.value)}
                placeholder="https://instagram.com/ampirestudio"
              />
            </div>
            
            <div>
              <Label htmlFor="socialLinkedin">LinkedIn URL</Label>
              <Input
                id="socialLinkedin"
                value={settings.socialLinkedin}
                onChange={(e) => updateSetting("socialLinkedin", e.target.value)}
                placeholder="https://linkedin.com/company/ampirestudio"
              />
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle>SEO & Analytics</CardTitle>
            <CardDescription>
              Search engine optimization and tracking settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="seoKeywords">SEO Keywords</Label>
              <Textarea
                id="seoKeywords"
                value={settings.seoKeywords}
                onChange={(e) => updateSetting("seoKeywords", e.target.value)}
                placeholder="web design, development, digital marketing, branding"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
              <Input
                id="googleAnalytics"
                value={settings.googleAnalytics}
                onChange={(e) => updateSetting("googleAnalytics", e.target.value)}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}