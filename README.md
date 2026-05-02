# IIIT Sonepat – EventHub

Student Event Management Portal for IIIT Sonepat.

## Getting Started

```bash
npm install
npm run dev
```

## Quick Login Hints

| Role    | Email                          | Password    |
|---------|-------------------------------|-------------|
| Admin   | admin@iiitsonepat.ac.in       | admin123    |
| Student | arjun@iiitsonepat.ac.in       | student123  |

## Project Structure

```
iiit-sonepat-portal/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── data/
    │   └── seedData.js          # Seed events & users
    ├── utils/
    │   └── constants.js         # Color palette & category colors
    └── components/
        ├── Badge.jsx            # Category badge chip
        ├── ProgressBar.jsx      # Seat availability bar
        ├── Toast.jsx            # Notification toast
        ├── QRBlock.jsx          # SVG QR ticket
        ├── Navbar.jsx           # Top navigation bar
        ├── AuthPage.jsx         # Login / Sign-up page
        ├── EventCard.jsx        # Event grid card
        ├── StudentHome.jsx      # Student home with event grid
        ├── EventDetail.jsx      # Event detail & registration
        ├── MyEvents.jsx         # Student's registered events
        ├── ProfilePage.jsx      # User profile page
        └── AdminDash.jsx        # Admin dashboard
```
