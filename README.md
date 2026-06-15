# Irondo ry'Umwuga — Smart AI Surveillance System

A modern, production-ready security surveillance dashboard built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

## 🚀 Live Demo

Two dashboards with role-based access:
- **Head of Security** — `head@irondo.rw` / `admin123`
- **Guard** — `guard1@irondo.rw` / `admin123`

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with dark/light theme
│   ├── page.tsx                      # Redirects to /auth/login
│   ├── (auth)/
│   │   └── page.tsx                  # Login/Signup page
│   ├── admin/
│   │   ├── layout.tsx                # Admin sidebar + navbar layout
│   │   ├── page.tsx                  # Head of Security dashboard
│   │   ├── guards/
│   │   │   └── page.tsx             # Guard management page
│   │   ├── incidents/
│   │   │   └── page.tsx             # Incident reports page
│   │   ├── patrol/
│   │   │   └── page.tsx             # Patrol schedules page
│   │   ├── cameras/
│   │   │   └── page.tsx             # Camera management page
│   │   └── settings/
│   │       └── page.tsx             # Admin settings page
│   └── guard/
│       ├── layout.tsx               # Guard sidebar + navbar layout
│       ├── page.tsx                 # Guard dashboard
│       ├── settings/
│       │   └── page.tsx             # Guard settings page
│       └── team/
│           └── page.tsx             # Team roster page
├── components/
│   ├── auth/
│   │   └── auth-forms.tsx           # Login & Signup forms
│   ├── admin/
│   │   ├── alert-panel.tsx          # Real-time alert panel
│   │   ├── analytics-charts.tsx     # Recharts analytics
│   │   ├── camera-grid.tsx          # Camera grid overview
│   │   ├── guard-list.tsx           # Guard roster
│   │   ├── patrol-logs.tsx          # Patrol & incident history
│   │   ├── patrol-schedules.tsx     # Schedule cards
│   │   └── shift-timer.tsx          # Shift timer widget
│   ├── guard/
│   │   ├── alert-feed.tsx           # Alert feed for guards
│   │   ├── active-alerts.tsx        # Active alerts component
│   │   ├── quick-actions.tsx        # Emergency action buttons
│   │   ├── patrol-route.tsx         # Patrol route & checkpoints
│   │   ├── history.tsx              # Past incidents history
│   │   ├── duty-status.tsx          # Duty ON/OFF toggle
│   │   └── guard-shift-timer.tsx    # Shift timer for guards
│   └── shared/
│       ├── sidebar.tsx              # Responsive sidebar
│       ├── navbar.tsx               # Top navigation bar
│       ├── stat-card.tsx            # Reusable stat cards
│       └── theme-provider.tsx       # Next Themes provider
├── lib/
│   ├── auth/
│   │   └── auth-options.ts          # NextAuth configuration
│   ├── data/
│   │   ├── users.ts                 # Dummy user data
│   │   ├── incidents.ts             # Incident data
│   │   ├── cameras.ts               # Camera data
│   │   ├── guards.ts                # Guard data
│   │   └── patrol.ts                # Patrol checkpoint data
│   ├── store.ts                     # Zustand global state
│   └── utils.ts                     # Utility functions
├── types/
│   └── auth.ts                      # TypeScript interfaces
└── middleware.ts                    # Role-based routing middleware
```

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling with dark/light mode |
| shadcn/ui | UI components (Card, Button, Badge, etc.) |
| Recharts | Data visualization charts |
| NextAuth.js | Authentication |
| Zustand | Global state management |
| Lucide React | Icons |
| Framer Motion | Animations (auth page) |

## 🏃 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd irondo-frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔐 Authentication

The app uses **NextAuth.js** with credentials-based authentication. The middleware handles:
- Unauthenticated users are redirected to `/auth/login`
- Users with `HEAD_OF_SECURITY` role are redirected to `/admin`
- Users with `GUARD` role are redirected to `/guard`
- Role-based access control prevents unauthorized dashboard access

### Demo Accounts
| Role | Email | Password |
|------|-------|----------|
| Head of Security | `head@irondo.rw` | `admin123` |
| Guard | `guard1@irondo.rw` | `admin123` |
| Guard | `guard2@irondo.rw` | `admin123` |

## 📋 Features

### Head of Security Dashboard
- **Dashboard Overview** — Stats cards (Total Guards, On Duty, Active Incidents, Cameras Online)
- **Live Surveillance** — 2×2 CCTV feed grid with live/offline status
- **Active Alerts** — Real-time incident alert panel with verify/dispatch/ignore actions
- **Guard Roster** — All guards with status, role, and sector info
- **Analytic Charts** — Line chart (incidents over time), pie chart (type distribution), bar chart (response time)
- **Patrol Schedules** — Guard shift assignments with start/complete buttons
- **Camera Management** — Grid view of all cameras with online/offline status
- **Incident Reports** — Filtered incident cards with severity levels and resolution
- **Shift Timer** — Embedded timer widget for tracking guard duty duration
- **Settings** — Profile management, password change, notifications, dark/light mode toggle

### Guard Dashboard (Mobile-First)
- **Duty Status** — ON/OFF toggle with sector display
- **Quick Actions** — Report Incident, Emergency, Call Backup (big touch-friendly buttons)
- **Active Alerts** — Real-time alerts from head of security
- **Patrol Route** — Zone map with checkpoint progress and completion bars
- **History** — Past incidents responded to with outcomes
- **Dashboard Stats** — Quick summary of today's incidents

### Design Decisions
- **Dark mode default** for better visibility in security rooms
- **Compact spacing** to maximize screen real estate
- **Responsive sidebar** that collapses on mobile
- **No empty white space** — everything fills vertically
- **Professional security aesthetic** — not flashy or gaming-like
- **Tailwind v4 inline theming** for easy customization

## 📊 Routes

| Path | Role | Description |
|------|------|-------------|
| `/` | Public | Redirects to login |
| `/auth/login` | Public | Sign in page |
| `/admin` | Head of Security | Main admin dashboard |
| `/admin/guards` | Head of Security | Guard management |
| `/admin/incidents` | Head of Security | Incident reports |
| `/admin/patrol` | Head of Security | Patrol schedules |
| `/admin/cameras` | Head of Security | Camera management |
| `/admin/settings` | Head of Security | Account settings |
| `/guard` | Guard | Mobile dashboard |
| `/guard/settings` | Guard | Account settings |
| `/guard/team` | Guard | Team roster |

---

*Built for the Kigali, Rwanda security system — Kinyinya Sector surveillance management.*