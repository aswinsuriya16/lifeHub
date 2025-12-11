"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Post } from "./feed-client";

export function TweetList({
  posts,
  onChanged,
}: {
  posts: Post[];
  onChanged?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((p) => (
        <TweetCard key={p.id} post={p} onChanged={onChanged} />
      ))}

      {posts.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No posts yet. Be the first!
        </p>
      )}
    </div>
  );
}


function initials(name?: string) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

function timeAgo(iso?: string) {
  if (!iso) return "";
  const ms = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function VoteButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className="h-8 px-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
    >
      ▲
    </Button>
  );
}

export function TweetCard({
  post,
  onChanged,
}: {
  post: Post;
  onChanged?: () => void;
}) {
  const [pending, setPending] = useState(false);

  async function vote() {
    setPending(true);
    try {
      const res = await fetch(`/api/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id }),
      });

      if (!res.ok) throw new Error("Vote failed");
      onChanged?.();
    } finally {
      setPending(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-blue-600/10 text-blue-700">
              {initials(post.author)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">{post.author || "Unknown"}</span>
              <span className="text-xs text-muted-foreground">
                • {timeAgo(post.createdAt)}
              </span>
            </div>

            <p className="mt-1 text-pretty leading-relaxed">
              {post.description || ""}
            </p>

            <div className="mt-3 flex items-center gap-2">
              <VoteButton onClick={vote} disabled={pending} />

              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  post.score > 0 ? "text-emerald-600" : "text-muted-foreground"
                )}
              >
                +{post.score}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
