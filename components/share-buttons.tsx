"use client"

import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface ShareButtonsProps {
  title: string
  url: string
  excerpt: string
}

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [canShare, setCanShare] = useState(false)

  // Check if native share is available after component mounts
  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && "share" in navigator)
  }, [])

  const shareData = {
    title,
    text: excerpt,
    url: typeof window !== "undefined" ? window.location.href : url,
  }

  const handleShare = async (platform: string) => {
    const fullUrl = typeof window !== "undefined" ? window.location.href : url
    const encodedTitle = encodeURIComponent(title)
    const encodedUrl = encodeURIComponent(fullUrl)
    const encodedText = encodeURIComponent(excerpt)

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
    }

    if (platform === "native") {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        try {
          await navigator.share(shareData)
          toast.success("Shared successfully!")
        } catch (error: any) {
          // User cancelled or error occurred
          if (error.name !== "AbortError") {
            console.log("Error sharing:", error)
            toast.error("Failed to share")
          }
        }
      }
    } else if (platform === "copy") {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(fullUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          toast.success("Link copied to clipboard!")
        } catch (error) {
          console.log("Error copying to clipboard:", error)
          // Fallback for older browsers
          const textArea = document.createElement("textarea")
          textArea.value = fullUrl
          textArea.style.position = "fixed"
          textArea.style.left = "-999999px"
          document.body.appendChild(textArea)
          textArea.select()
          try {
            document.execCommand("copy")
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            toast.success("Link copied to clipboard!")
          } catch (err) {
            console.log("Fallback copy failed:", err)
            toast.error("Failed to copy link")
          }
          document.body.removeChild(textArea)
        }
      }
    } else if (shareUrls[platform as keyof typeof shareUrls]) {
      if (typeof window !== "undefined") {
        const shareWindow = window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
        if (!shareWindow) {
          toast.error("Please allow popups to share")
        }
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {canShare && (
          <DropdownMenuItem onClick={() => handleShare("native")}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("copy")}>
          {copied ? <Check className="h-4 w-4 mr-2 text-green-500" /> : <Link2 className="h-4 w-4 mr-2" />}
          {copied ? "Copied!" : "Copy Link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
