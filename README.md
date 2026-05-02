# 🎓 IIIT Sonepat — EventHub

> Student Event Management Portal for IIIT Sonepat  
> Built with React + Vite · Deployed on the web

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Demo](#demo)
- [Overview](#overview)
- [Features](#features)
- [Terrain Classes](#event-categories)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running Locally](#running-locally)
- [Tech Stack](#tech-stack)

---

## Demo

Upload or browse off-road scene images — the portal segments and displays terrain class predictions instantly.

| Login Page | Student Dashboard | Event Detail |
|---|---|---|
| Auth with role-based access | Browse & filter all events | Register, view QR ticket |

**Live app:** _[Deploy on Vercel / Netlify / GitHub Pages]_

---

## Overview

Off-campus events, hackathons, cultural fests, and sports meets are all scattered and hard to track. **EventHub** centralizes everything — students can discover, register, and manage their events in one place, while admins can create and monitor all activity from a single dashboard.

### Who is it for?

- **Students** — browse events, register in one click, get a QR entry ticket
- **Admins** — create/edit/close events, track registrations, view attendees per event

---

## Features

### Student
- 🔐 Login & Sign-up with college email and roll number
- 🏠 Home dashboard with stat cards and event grid
- 🔍 Search and filter events by category
- 📋 View event detail — description, venue, date, seat availability
- ✅ Register / cancel registration
- 📱 QR entry ticket generation per event
- 👤 Profile page with registered event history

### Admin
- 🛠️ Admin dashboard with overview stats
- ➕ Create new events with full form
- ✏️ Edit existing events
- 🔒 Open / close event registration
- 🗑️ Delete events
- 👥 View attendees per event

---

## Event Categories

| ID | Category | Color |
|----|----------|-------|
| 1 | Technical | Blue |
| 2 | Cultural | Purple |
| 3 | Workshop | Yellow |
| 4 | Seminar | Green |
| 5 | Sports | Red |
| 6 | Creative | Pink |

---

## Project Structure

```
iiit-sonepat-portal/
├── index.html                  # HTML entry point
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx                # React root render
    ├── App.jsx                 # Root state & page routing
    ├── data/
    │   └── seedData.js         # Seed events & users
    ├── utils/
    │   └── constants.js        # Color palette & category colors
    └── components/
        ├── Badge.jsx           # Category badge chip
        ├── ProgressBar.jsx     # Seat availability bar
        ├── Toast.jsx           # Notification toast
        ├── QRBlock.jsx         # SVG QR ticket generator
        ├── Navbar.jsx          # Top navigation bar
        ├── AuthPage.jsx        # Login / Sign-up page
        ├── EventCard.jsx       # Event grid card
        ├── StudentHome.jsx     # Student home with event grid
        ├── EventDetail.jsx     # Event detail & registration
        ├── MyEvents.jsx        # Student's registered events
        ├── ProfilePage.jsx     # User profile page
        └── AdminDash.jsx       # Admin dashboard (4 tabs)
```

---

## Setup and Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/iiit-sonepat-portal.git
cd iiit-sonepat-portal
```

### Install dependencies

```bash
npm install
```

---

## Running Locally

```bash
npm run dev
```

Then open your browser at:

```
http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Quick Login Hints

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@iiitsonepat.ac.in | admin123 |
| Student | arjun@iiitsonepat.ac.in | student123 |

> You can also register a new student account directly from the Sign-up page.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| UI Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | Inline styles with design tokens |
| State Management | React useState (local) |
| Font | Nunito (Google Fonts) |
| QR Ticket | Custom SVG generation |
| Version Control | GitHub |

---

## Future Work

- 🔔 Email / push notifications for registered events
- 🗓️ Calendar view for upcoming events
- 🌐 Backend integration (Node.js / Firebase) for persistent data
- 📊 Admin analytics — registration trends over time
- 📱 Mobile-responsive layout improvements
- 🔍 Full-text search with filters for date and venue
- 🎨 Dark mode support

---

## Acknowledgements

- IIIT Sonepat for the inspiration
- Google Fonts for the Nunito typeface

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
