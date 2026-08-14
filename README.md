<div align="center">

```
██╗     ███████╗███████╗████████╗███████╗██╗   ██╗███╗   ██╗ ██████╗
██║     ██╔════╝██╔════╝╚══██╔══╝██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝
██║     █████╗  █████╗     ██║   ███████╗ ╚████╔╝ ██╔██╗ ██║██║
██║     ██╔══╝  ██╔══╝     ██║   ╚════██║  ╚██╔╝  ██║╚██╗██║██║
███████╗███████╗███████╗   ██║   ███████║   ██║   ██║ ╚████║╚██████╗
╚══════╝╚══════╝╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝
                     P R O   —   Y O U R   S O L V E   H I S T O R Y,   F U L L Y   S Y N C E D
```

### 🚀 The Chrome extension that bypasses LeetCode's 20-question limit and syncs your **entire** solved history to your own database.

[![Live Backend](https://img.shields.io/website?url=https%3A%2F%2Fleetcode-tracker-hc0z.onrender.com&label=backend&up_message=online&down_message=offline&style=for-the-badge)](https://leetcode-tracker-hc0z.onrender.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blueviolet?style=for-the-badge)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/manifest-v3-orange?style=for-the-badge&logo=googlechrome&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![MongoDB Atlas](https://img.shields.io/badge/database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](#-contributing)

**[Get the Extension](#-browser-extension)** · **[API Docs](#-api-documentation)** · **[Quick Start](#-quick-start)** · **[Contribute](#-contributing)**

</div>

---

## 😤 The Problem

LeetCode's public API caps your solved-questions list at **20**. If you've ground through 500+ problems, the platform itself can't even show you the full list back — let alone let you build stats, streak trackers, or spaced-repetition tools on top of it.

## 💡 The Fix

**LeetSync Pro** rides shotgun in your browser, talking to the *same internal GraphQL endpoints LeetCode's own frontend uses* — no cap, no nonsense. Every problem you've ever solved, paginated and pulled straight from your authenticated session, synced to your own database with one click.

---

## 🏗️ Architecture

```
┌──────────────────┐        GraphQL         ┌──────────────────┐
│   LeetCode.com    │ ◄───── (internal, ────►│  LeetSync Pro     │
│   you solving      │        no 20-cap)      │  Extension        │
│   problems 🧠      │                        │  (content.js +    │
└──────────────────┘                        │   service_worker) │
                                              └─────────┬─────────┘
                                                        │
                                                        │  1. Cache locally
                                                        │     chrome.storage.local
                                                        │
                                                        │  2. Click "Sync Now"
                                                        │     POST + JWT 🔐
                                                        ▼
                                              ┌──────────────────┐
                                              │   Backend API      │
                                              │   Node.js + Express │
                                              │   verifies JWT,     │
                                              │   writes solved list│
                                              └─────────┬─────────┘
                                                        │
                                                        ▼
                                              ┌──────────────────┐
                                              │   MongoDB Atlas    │
                                              │   your solved       │
                                              │   problems, forever │
                                              └──────────────────┘
```

> The extension intercepts and proactively queries LeetCode's own internal `questionList` GraphQL endpoint — the exact one that powers the checkmarks on leetcode.com/problemset — so it inherits zero rate limits and 100% accuracy with what you actually see on-site.

---

## ✨ Features

| | |
|---|---|
| 🔓 **No 20-question cap** | Pulls your *entire* solved history via paginated internal GraphQL calls |
| ⚡ **One-click sync** | Popup UI with live status, last-sync time, and a big satisfying **Sync Now** button |
| 🔐 **JWT-secured** | Your data only ever reaches *your* backend, authenticated as *you* |
| 📴 **Offline-first** | Everything is cached in `chrome.storage.local` before it ever touches the network |
| 🔄 **Auto-sync (optional)** | Detects a fresh "Accepted" submission and syncs automatically |
| 🌐 **Cross-browser** | Built on Manifest V3 — Chrome and Firefox compatible |

---

## 🚀 Quick Start

### Prerequisites

- Node.js **v18+**
- A MongoDB Atlas account (or local MongoDB instance)
- A LeetCode account with problems to sync 😉

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Amrit-raj50/leetcode_tracker.git
cd leetcode_tracker/backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file in `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

### 4️⃣ Start the server

```bash
npm start
```

Your backend is now live at **`http://localhost:5000/api`** 🎉

---

## 🔌 Browser Extension

The LeetSync Pro extension syncs your solved questions in one click.

**🧩 Get it:**
- GitHub repo: [`Amrit-raj50/leetSync_ex`](https://github.com/Amrit-raj50/leetSync_ex)
- Manual install: download the repo → `chrome://extensions/` → enable **Developer Mode** → **Load unpacked** → select the folder

### How to use

| Step | Action |
|---|---|
| 1️⃣ | Register/login at `/api/auth/login` to get your JWT |
| 2️⃣ | Open the extension's **Options** page and paste your JWT token |
| 3️⃣ | Visit your LeetCode profile — `leetcode.com/u/your-username/` |
| 4️⃣ | Click the extension icon → **Sync Now** |
| ✅ | Your full solved list is now in your database, ready for revision |

---

## 📮 API Documentation

All backend endpoints are fully documented in Postman:

[![Postman](https://img.shields.io/badge/Postman-API_Docs-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](#)

| Category | Covers |
|---|---|
| 🔐 **Auth** | Register, Login, JWT issuance |
| 👤 **User** | Get current user, sync from extension |
| 📚 **LeetCode** | Manual sync (fallback path) |

---

## 🗄️ Backend

| | |
|---|---|
| **Base URL** | `https://leetcode-tracker-hc0z.onrender.com/api` |
| **Live status** | [![Website](https://img.shields.io/website?url=https%3A%2F%2Fleetcode-tracker-hc0z.onrender.com)](https://leetcode-tracker-hc0z.onrender.com) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Auth** | JWT + bcrypt |
| **Extension** | JavaScript (Manifest V3) |
| **APIs** | GraphQL (LeetCode internal) · REST (backend) |

---

## 🗺️ Roadmap

- [ ] One-click "Connect" flow (no more copy-pasting JWTs)
- [ ] Auto-sync toggle refinements + retry/backoff on failed syncs
- [ ] Streak & topic-tag analytics dashboard
- [ ] Firefox Add-ons Store listing
- [ ] Public read-only profile pages (`leetsync.pro/u/you`)

Got an idea? [Open an issue](../../issues) — we're listening. 👂

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn and build. Any contribution is **greatly appreciated**.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feat/amazing-feature`
5. Open a Pull Request

Please keep your code in line with the existing style and include tests where it makes sense.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 🌟 Star History

If LeetSync Pro saved you from LeetCode's 20-question wall, **give it a star** ⭐ — it genuinely helps others find the project.

<div align="center">

### Made with 💖, ☕, and an unreasonable number of GraphQL schema debugging sessions
**by [Amrit Raj](https://github.com/Amrit-raj50)**

</div>
