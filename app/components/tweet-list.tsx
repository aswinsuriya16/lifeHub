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

// Safely generate initials from name/author
function initials(name?: string) {
  if (!name) return "U"; // fallback
  return name
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

function timeAgo(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

function VoteButton({
  label,
  onClick,
  variant,
  disabled,
}: {
  label: string;
  onClick: () => void;
  variant: "up" | "down";
  disabled?: boolean;
}) {
  const up = variant === "up";
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-8 px-2",
        up
          ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
          : "border-input text-muted-foreground hover:bg-muted"
      )}
      aria-label={label}
      title={label}
    >
      {up ? "▲" : "▼"}
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

  async function vote(delta: 1 | -1) {
    setPending(true);
    try {
      const res = await fetch(`/api/tweet/${post.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ delta }),
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
              <VoteButton
                label="Upvote"
                variant="up"
                onClick={() => vote(1)}
                disabled={pending}
              />
              <VoteButton
                label="Downvote"
                variant="down"
                onClick={() => vote(-1)}
                disabled={pending}
              />
              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  post.score >= 0
                    ? "text-emerald-600"
                    : "text-muted-foreground"
                )}
                aria-label={`Score ${post.score}`}
              >
                {post.score >= 0 ? `+${post.score}` : `${post.score}`}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
