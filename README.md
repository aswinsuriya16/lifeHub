# 🌱 LifeHub

LifeHub is a community-driven platform where users share life lessons and thoughts they’ve learned the hard way. These insights are posted as short tweets, and the community upvotes them. Posts are dynamically organized so that the most upvoted thoughts appear at the top, creating a curated feed of meaningful life experiences.

---

## 🚀 Features

- ✍️ Share short life lessons as tweets  
- 👍 Upvote thoughts shared by other users  
- 📊 Automatic ranking based on upvotes  
- 🔐 Secure authentication system  
- ⚡ Sorted feed (most upvoted → least upvoted)

---

## 🛠 Tech Stack

- **Framework:** Next.js (Frontend + Backend)
- **Authentication:** NextAuth (Next.js Auth)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API Layer:** Next.js API Routes / App Router

---

## 🧠 Application Workflow

1. Users authenticate using the built-in authentication system.
2. Authenticated users can post tweets sharing life lessons.
3. Other users can upvote these tweets.
4. Tweets are sorted based on upvote count.
5. The most upvoted tweets appear at the top of the feed.

---

## 🗄 Database Overview

- **User**
  - Stores user authentication details
- **Tweet**
  - Stores user-generated life lessons
- **Upvote**
  - Tracks user upvotes on tweets

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lifehub.git

# Navigate to the project directory
cd lifehub

# Install dependencies
npm install

# Configure environment variables
# Add DATABASE_URL and NEXTAUTH_SECRET in a .env file

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
