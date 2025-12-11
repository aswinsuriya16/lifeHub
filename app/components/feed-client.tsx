"use client"

import { useState, useEffect } from "react"
import { TweetComposer } from "./tweet-composer"
import { TweetList } from "./tweet-list"

// Match your Prisma Tweet model
export type Post = {
  id: number
  description: string
  email: string
  createdAt: string
  score: number,
  author: string
}

export default function FeedClient() {
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/tweet");
      const posts = await response.json();
      console.log(posts);
      setData(posts)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch posts"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <TweetComposer
        onPosted={async () => {
          await fetchData()
        }}
      />
      {error ? (
        <div className="text-sm text-destructive">Failed to load posts.</div>
      ) : isLoading ? (
        <div className="text-sm text-muted-foreground">Loading feed…</div>
      ) : (
        <TweetList posts={data} onChanged={fetchData} />
      )}
    </div>
  )
}