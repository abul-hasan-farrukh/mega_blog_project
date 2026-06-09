# 📝 MegaBlog

A full-stack blogging platform built with **React** and **Appwrite**, where users can create, edit, and publish rich-text blog posts with featured image uploads — all behind secure authentication.

---

## ✨ Features

- 🔐 **User Authentication** — Signup, Login, Logout via Appwrite Auth
- 📝 **Rich Text Editor** — Write blog content using TinyMCE
- 🖼️ **Image Uploads** — Upload and display featured images via Appwrite Storage
- 📋 **Full Post Management** — Create, Edit, Delete your posts
- 🌐 **Post Status Control** — Set posts as `active` or `inactive`
- 🔒 **Protected Routes** — Only logged-in users can create or edit posts
- ⚡ **Responsive UI** — Clean and mobile-friendly design with Tailwind CSS
- 🗄️ **Global State** — Auth state managed with Redux Toolkit

---

## 🛠️ Tech Stack

| Frontend | Backend | Tools |
|---|---|---|
| React + Vite | Appwrite (BaaS) | TinyMCE Editor |
| Tailwind CSS | Appwrite Database | Redux Toolkit |
| React Router DOM | Appwrite Storage | React Hook Form |

---

## 📁 Project Structure

```
src/
├── appwrite/
│   ├── auth.js          # Authentication service
│   └── config.js        # Database & Storage service
├── components/
│   ├── Header/          # Navbar with auth buttons
│   ├── Footer/          # Footer component
│   ├── post-form/       # PostForm with TinyMCE & image upload
│   ├── PostCard.jsx     # Post preview card
│   ├── RTE.jsx          # TinyMCE Rich Text Editor
│   ├── Input.jsx        # Reusable input component
│   ├── Button.jsx       # Reusable button component
│   ├── Select.jsx       # Reusable select component
│   └── AuthLayout.jsx   # Route protection wrapper
├── pages/
│   ├── Home.jsx         # Lists all active posts
│   ├── Login.jsx        # Login page
│   ├── Signup.jsx       # Signup page
│   ├── AddPost.jsx      # Create new post
│   ├── EditPost.jsx     # Edit existing post
│   ├── AllPosts.jsx     # All posts by user
│   └── Post.jsx         # Single post view
├── store/
│   ├── store.js         # Redux store
│   └── authSlice.js     # Auth state slice
└── conf/
    └── conf.js          # Environment variables config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- An [Appwrite](https://appwrite.io) account
- A [TinyMCE](https://www.tiny.cloud) account (free tier works)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/megablog.git
cd megablog
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root of the project:
```env
VITE_APPRWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPRWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPRWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPRWRITE_COLLECTION_ID=your_collection_id
VITE_APPRWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

4. **Run the development server**
```bash
npm run dev
```

---

## ⚙️ Appwrite Setup

### Database Collection Attributes
Create a collection with the following attributes:

| Attribute | Type | Required |
|---|---|---|
| `title` | String | ✅ |
| `content` | String | ✅ |
| `featuredImage` | String | ✅ |
| `status` | String | ✅ |
| `userId` | String | ✅ |
| `slug` | String | ✅ |

### Storage Bucket Permissions
In your Appwrite bucket settings, add the following permission:

| Role | Read |
|---|------|
| Any | ✅ |

This is required to display uploaded images publicly.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).