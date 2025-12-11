"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export function TweetComposer({ onPosted }: { onPosted?: () => void }) {
  const [description, setContent] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canPost = description.trim().length > 0 && description.trim().length <= 280

  async function handlePost() {
    console.log(description);
    if (!canPost) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })
      if (!res.ok) throw new Error("Failed to post")
      setContent("")
      onPosted?.()
    } catch (e: any) {
      setError(e.message || "Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card aria-labelledby="compose-title">
      <CardContent className="p-4">
        <h2 id="compose-title" className="sr-only">
          Compose a new post
        </h2>
        <div className="flex flex-col gap-3">
          <Textarea
            value={description}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            aria-label="Post content"
            maxLength={280}
            className="min-h-24"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{description.trim().length}/280</span>
            <Button
              onClick={handlePost}
              disabled={!canPost || submitting}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {submitting ? "Posting…" : "Post"}
            </Button>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
      </CardContent>
    </Card>
  )
}