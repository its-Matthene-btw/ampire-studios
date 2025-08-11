# 🚀 Next.js CMS & Website

A complete Next.js 15 website with a custom-built Content Management System (CMS) featuring authentication, CRUD operations for projects, testimonials, articles, and a contact form with email functionality.

## ✨ Features

### 🎯 Frontend Website
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Multi-page Structure** - Home, Projects, Testimonials, Articles, and Contact pages
- **Dynamic Content** - All content is managed through the CMS
- **Contact Form** - Functional contact form with email notifications
- **Modern UI** - Built with shadcn/ui components

### 🛠️ Admin CMS
- **Secure Authentication** - NextAuth.js with username/password login
- **Dashboard** - Overview of all content with statistics
- **Content Management** - Full CRUD operations for:
  - Projects (portfolio items)
  - Testimonials (client reviews)
  - Articles (blog posts)
  - Contact form submissions
- **Admin Panel** - Protected admin area with intuitive interface

### 📧 Email System
- **Contact Notifications** - Email alerts when someone submits the contact form
- **Auto-replies** - Automatic email responses to users
- **SMTP Support** - Configurable email delivery

### 🗄️ Backend & Database
- **Next.js 15** - Latest Next.js with App Router
- **TypeScript** - Full type safety
- **Prisma ORM** - Database management with SQLite
- **API Routes** - RESTful API for all content

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**
```bash
git clone <your-repo-url>
cd my-project
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Configuration (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="My Company <your-email@gmail.com>"

# Contact Email (where contact form submissions are sent)
CONTACT_EMAIL="admin@yourcompany.com"
```

3. **Set up the database**
```bash
# Push database schema
npm run db:push

# Create admin user
npx tsx scripts/create-admin.ts
```

4. **Start the development server**
```bash
npm run dev
```

5. **Access your website**
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
  - Email: `admin@example.com`
  - Password: `admin123`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin CMS pages
│   ├── api/               # API routes
│   ├── articles/          # Articles page
│   ├── contact/           # Contact page
│   ├── projects/          # Projects page
│   └── testimonials/      # Testimonials page
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
└── lib/                  # Utilities and configurations
    ├── auth.ts           # NextAuth configuration
    ├── db.ts             # Database client
    └── email.ts          # Email service
```

## 🛠️ Admin CMS Features

### Dashboard
- Overview statistics for all content types
- Quick access to all management sections
- Visual indicators for unread messages

### Projects Management
- Create, edit, delete projects
- Featured projects functionality
- Image support with URLs
- Publishing controls

### Testimonials Management
- Add client testimonials
- Featured testimonials
- Client information (name, role, company)
- Photo support

### Articles Management
- Blog post creation and editing
- Article excerpts and content
- Publishing workflow
- Image support

### Contact Form Management
- View all contact submissions
- Mark messages as read/unread
- Contact information display

## 📧 Email Configuration

The email system uses SMTP for sending emails. Here's how to configure it:

### Gmail Configuration
1. Enable 2-factor authentication on your Gmail account
2. Go to App passwords: https://myaccount.google.com/apppasswords
3. Generate an app password
4. Use the app password in `SMTP_PASS`

### Other SMTP Providers
Update the SMTP settings in your `.env` file:
- `SMTP_HOST` - Your SMTP server hostname
- `SMTP_PORT` - SMTP port (usually 587 for TLS, 465 for SSL)
- `SMTP_SECURE` - Set to "true" for SSL, "false" for TLS
- `SMTP_USER` - Your email username
- `SMTP_PASS` - Your email password

## 🎨 Customization

### Styling
- All styles use Tailwind CSS
- Customize colors and themes in `tailwind.config.ts`
- Components use shadcn/ui for consistent design

### Content
- All content is managed through the admin panel
- Add your own projects, testimonials, and articles
- Customize the contact information in the contact page

### Branding
- Update the company name in `src/components/header.tsx` and `src/components/footer.tsx`
- Replace the logo in `public/logo.svg`
- Customize colors and styling to match your brand

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Make sure to set all required environment variables in your production environment:
- Database URL
- NextAuth secret and URL
- SMTP configuration for emails

## 🔐 Security

- Admin authentication with NextAuth.js
- Protected API routes
- Input validation with Zod
- CSRF protection
- Secure session management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.
