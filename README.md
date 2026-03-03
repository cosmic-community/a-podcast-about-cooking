# A Podcast About Cooking

![App Preview](https://imgix.cosmicjs.com/b8da6020-1714-11f1-8f19-f3dd3ee2f907-autopilot-photo-1470337458703-46ad1756a187-1772551319271.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautifully designed podcast website for "A Podcast About Cooking" — specializing in steak, Italian food, and mixology. Built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com) CMS.

## Features

- 🎙️ **Episode Browser** — Browse all episodes with detailed show notes, audio links, and guest info
- 📚 **Series Collections** — Explore curated episode series organized by theme
- 👤 **Guest Profiles** — Rich guest pages with bios, photos, and episode appearances
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js 16 Server Components
- 📱 **Fully Responsive** — Beautiful layouts on every screen size
- 🔍 **SEO Optimized** — Dynamic metadata for all pages
- 🎨 **Culinary Design** — Warm, food-inspired color palette with elegant typography

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a6fc3de4be18d28269b966&clone_repository=69a6fd90e4be18d28269b998)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a podcast website with episodes (including audio URL, description, and show notes), series, and guest profiles.
>
> User instructions: A Podcast About Cooking: Specializing in steak, Italian food, and mixology."

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'A Podcast About Cooking'. The content is managed in Cosmic CMS with the following object types: guests, series, episodes. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A Podcast About Cooking: Specializing in steak, Italian food, and mixology."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript 5](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the podcast content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd a-podcast-about-cooking

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Episodes

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: episodes } = await cosmic.objects
  .find({ type: 'episodes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Episode by Slug

```typescript
const { object: episode } = await cosmic.objects
  .findOne({ type: 'episodes', slug: 'my-episode' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types from Cosmic:

| Object Type | Slug | Description |
|---|---|---|
| 🎙️ Episodes | `episodes` | Podcast episodes with audio, show notes, series & guest connections |
| 📚 Series | `series` | Themed collections of episodes |
| 👤 Guests | `guests` | Guest profiles with bios and photos |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->