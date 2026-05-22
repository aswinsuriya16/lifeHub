"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Post } from "./feed-client";

export function TweetList({
  posts,
  currentUserId,
  onChanged,
}: {
  posts: Post[];
  currentUserId?: number;
  onChanged?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((p) => (
        <TweetCard
          key={p.id}
          post={p}
          currentUserId={currentUserId}
          onChanged={onChanged}
        />
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
  children,
  className,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={cn("h-8 px-2", className)}
    >
      {children}
    </Button>
  );
}

export function TweetCard({
  post,
  currentUserId,
  onChanged,
}: {
  post: Post;
  currentUserId?: number;
  onChanged?: () => void;
}) {
  const { data: session } = useSession();
  const [pending, setPending] = useState(false);
  const canDelete = currentUserId === post.authorId && session?.user?.id === post.authorId;

  async function vote(direction: "upvote" | "downvote") {
    setPending(true);
    try {
      const res = await fetch(`/api/${direction}`, {
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

  async function removeTweet() {
    setPending(true);
    try {
      const res = await fetch("/api/tweet", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post.id }),
      });

      if (!res.ok) throw new Error("Delete failed");
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
                onClick={() => vote("upvote")}
                disabled={pending}
                className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
              >
                ▲
              </VoteButton>
              <VoteButton
                onClick={() => vote("downvote")}
                disabled={pending}
                className="border-rose-500 text-rose-600 hover:bg-rose-50"
              >
                ▼
              </VoteButton>

              <span
                className={cn(
                  "ml-2 text-xs font-medium",
                  post.score > 0
                    ? "text-emerald-600"
                    : post.score < 0
                      ? "text-rose-600"
                      : "text-muted-foreground"
                )}
              >
                {post.score > 0 ? `+${post.score}` : post.score}
              </span>

              {canDelete && (
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={pending}
                  onClick={removeTweet}
                  className="ml-auto"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
