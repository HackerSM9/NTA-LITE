# SM9 CBT Platform - Secure Multi-Page Application

**Maximum Security • Single Device Login • Admin Controlled**

A production-ready, highly secure Computer Based Test platform built with Supabase.

---

## 🔐 Security Highlights

- **Single Device Enforcement** — Only one active login per user at any time
- **Device Token Validation** — Every page checks `active_device_token`
- **Row Level Security (RLS)** — Users can only access their own data
- **Admin-Only User Creation** — No self-registration possible
- **Instant Redirects** — Unauthorized users are immediately sent to login
- **Session Protection** — Logout on device mismatch

---

## 📁 Project Structure

```
cbt/
├── index.html              ← Login Page (Auth Gate)
├── dashboard.html          ← Main user dashboard
├── exam.html               ← CBT Test Runner
├── history.html            ← Test history
├── insights.html           ← Performance analytics
├── admin.html              ← Admin panel (create users + upload papers)
├── js/
│   ├── supabase-client.js
│   ├── auth-guard.js       ← Security guard (runs on every page)
│   ├── dashboard.js
│   ├── admin.js
│   └── ...
├── css/
│   ├── style.css
│   ├── dashboard.css
│   └── admin.css
└── legacy/                 ← Original 3-file CBT (backup)
```

---

## 🚀 Getting Started

### 1. Supabase Setup (Already Done)

You have already created:
- Tables: `profiles`, `papers`, `attempts`
- RLS policies enabled
- Your admin account created

### 2. Run the Application

Simply open `index.html` in a browser (or serve via any static server).

```bash
# Optional: Simple local server
python3 -m http.server 8080
```

### 3. Login Flow

1. Go to `index.html`
2. Login with your admin credentials
3. You will be redirected to `admin.html` or `dashboard.html`

---

## 👤 Admin Features

From `admin.html` you can:

- Create new users (email + password + name)
- Upload exam papers (JSON v1.0 format)
- View all users
- Reset device tokens (force logout)

---

## 🛡️ How Single Device Login Works

1. On login → new random `active_device_token` is generated
2. Token is saved both in Supabase and `localStorage`
3. Every protected page runs `auth-guard.js`
4. If tokens don't match → user is logged out with warning

---

## 📌 Important Notes

- **Never share** your Service Role Key
- Only the `anon` key is used in the frontend
- All users must be created by the admin
- The original CBT engine is preserved in `legacy/`

---

## Next Steps (Recommended)

1. Integrate the full CBT logic into `exam.html` (from `legacy/app.js`)
2. Add ability to load papers from Supabase in the exam page
3. Add "Start Test" functionality that saves results to Supabase

---

**Built with ❤️ for maximum security**  
© 2026 SM9 CBT Platform