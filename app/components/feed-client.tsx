"use client"

import useSWR from "swr"
import { TweetComposer } from "./tweet-composer"
import { TweetList } from "./tweet-list"

export type Post = {
  id: string
  content: string
  author: string
  createdAt: string
  score: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function FeedClient() {
  const { data, error, isLoading, mutate } = useSWR<Post[]>("/api/tweet", fetcher, {
    revalidateOnFocus: false,
  })

  return (
    <div className="flex flex-col gap-6">
      <TweetComposer
        onPosted={async () => {
          await mutate()
        }}
      />
      {error ? (
        <div className="text-sm text-destructive">Failed to load posts.</div>
      ) : isLoading ? (
        <div className="text-sm text-muted-foreground">Loading feed…</div>
      ) : (
        <TweetList posts={data || []} onChanged={mutate} />
      )}
    </div>
  )
}
