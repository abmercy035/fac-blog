"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt: string;
}

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [fullUrl, setFullUrl] = useState(url);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setFullUrl(window.location.href);
    setCanShare(typeof navigator !== "undefined" && "share" in navigator);
  }, [url]);

  const shareData = useMemo(() => ({ title, text: excerpt, url: fullUrl }), [title, excerpt, fullUrl]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = async (platform: string) => {
    setOpen(false);

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedText = encodeURIComponent(excerpt);

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
    };

    try {
      if (platform === "native" && navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } else if (platform === "copy") {
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        toast.success("Link copied!");
        setTimeout(() => setCopied(false), 2000);
      } else if (shareUrls[platform as keyof typeof shareUrls]) {
        const win = window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400");
        if (!win) toast.error("Please allow popups to share.");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") toast.error("Share failed.");
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <Button variant="outline" size="sm" onClick={() => setOpen((prev) => !prev)} className="font-medium px-4 py-2 rounded-lg shadow-sm border border-border bg-background hover:bg-primary/10 transition-colors">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 border border-border"
        >
          <div className="flex flex-col text-sm divide-y divide-border">
            {canShare && (
              <button
                onClick={() => handleShare("native")}
                className="flex items-center gap-2 px-4 py-3 hover:bg-primary/5 transition-colors text-foreground font-semibold cursor-pointer"
              >
                <Share2 className="h-4 w-4" /> Share
              </button>
            )}
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-blue-600 dark:text-blue-400 font-semibold cursor-pointer"
            >
              <Twitter className="h-4 w-4" /> Twitter
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-blue-700 dark:text-blue-300 font-semibold cursor-pointer"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-blue-800 dark:text-blue-200 font-semibold cursor-pointer"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="flex items-center gap-2 px-4 py-3 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-green-700 dark:text-green-400 font-semibold cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
