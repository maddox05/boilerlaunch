# 🚀 BoilerLaunch

A Purdue-focused Product Hunt clone built with Next.js, Drizzle ORM, Supabase, and Tailwind CSS.

BoilerLaunch is a community-driven platform designed specifically for Purdue University students and faculty to showcase and discover innovative projects, research, startups, and tools created within the Purdue community.

## ✨ Features

- **🔐 Authentication**: Sign in with Google via Supabase Auth
- **📝 Product Submission**: Submit projects with title, description, image, and project URL
- **👍 Upvoting System**: Upvote products you find interesting (one vote per user)
- **🏷️ Categories**: Tag products with relevant categories (Web App, AI/ML, Research, etc.)
- **🔥 Today's Launches**: Featured section for products launched today
- **💬 Testimonials**: Community feedback section
- **📱 Responsive Design**: Beautiful, modern UI that works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase project)
- Supabase account for authentication

### 1. Clone and Install

```bash
git clone <repository-url>
cd boilerlaunch
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Database Setup

Generate and run the database migration:

```bash
npm run db:generate
npm run db:migrate
```

### 4. Supabase Configuration

1. Create a new Supabase project
2. Enable Google OAuth in Authentication > Providers
3. Add your domain to Authentication > URL Configuration
4. Copy your project URL and anon key to the `.env.local` file

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📖 Usage Guide

### For Users

1. **Browse Products**: Visit the homepage to see all submitted products
2. **View Details**: Click on any product to see its full details
3. **Sign In**: Click "Sign In with Google" to authenticate
4. **Submit Products**: Once signed in, click "Submit Product" to add your project
5. **Upvote**: Show support for products you like by upvoting them

### For Developers

The application follows a clean architecture:

- **`/src/app`**: Next.js app router pages and API routes
- **`/src/components`**: Reusable React components
- **`/src/db`**: Database schema and configuration
- **`/src/lib`**: Utility functions and Supabase clients

## 🗄️ Database Schema

### Products Table

- `id`: UUID primary key
- `title`: Product name
- `short_description`: Brief description
- `image_url`: Product image URL
- `project_url`: Link to the actual project
- `tags`: Array of category tags
- `slug`: URL-friendly identifier
- `created_at`: Timestamp
- `user_id`: Creator's Supabase user ID

### Upvotes Table

- `id`: UUID primary key
- `product_id`: Foreign key to products
- `user_id`: Supabase user ID
- `created_at`: Timestamp

## 🎯 Key Components

- **`ProductCard`**: Displays product information in grid layouts
- **`AuthButton`**: Handles Google sign-in/sign-out
- **`SubmitForm`**: Product submission form with validation
- **`UpvoteButton`**: Handles upvoting functionality

## 🛣️ Roadmap

- [ ] User profiles and project management
- [ ] Advanced search and filtering
- [ ] Email notifications for upvotes
- [ ] Featured products by admins
- [ ] Comment system
- [ ] Product categories with icons
- [ ] Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Purdue University community
- Product Hunt for inspiration
- Supabase team for excellent documentation
- Next.js team for the amazing framework

---

**Built with ❤️ for the Purdue community**
