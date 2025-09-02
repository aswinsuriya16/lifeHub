export type PostRecord = {
  id: string
  content: string
  author: string
  createdAt: string
  score: number
}

type Store = {
  posts: PostRecord[]
}

const globalForStore = globalThis as unknown as { __TWIX_STORE?: Store }

if (!globalForStore.__TWIX_STORE) {
  globalForStore.__TWIX_STORE = {
    posts: [
      {
        id: crypto.randomUUID(),
        content: "Welcome to Twix! Upvote what you like and it rises to the top.",
        author: "System",
        createdAt: new Date().toISOString(),
        score: 2,
      },
      {
        id: crypto.randomUUID(),
        content: "First post 🎉",
        author: "Alex Johnson",
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        score: 1,
      },
    ],
  }
}

export const store = globalForStore.__TWIX_STORE!

export function listPosts(): PostRecord[] {
  return [...store.posts].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export function createPost(input: { content: string; author?: string }) {
  const post: PostRecord = {
    id: crypto.randomUUID(),
    content: input.content.trim().slice(0, 280),
    author: input.author?.trim() || "Guest",
    createdAt: new Date().toISOString(),
    score: 0,
  }
  store.posts.unshift(post)
  return post
}

export function votePost(id: string, delta: number) {
  const p = store.posts.find((x) => x.id === id)
  if (!p) return null
  p.score += delta === -1 ? -1 : 1
  return p
}
