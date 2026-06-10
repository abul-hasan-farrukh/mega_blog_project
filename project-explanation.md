# MegaBlog — Complete Project Explanation for Beginners

---

## 🗂️ Project Structure Overview

```
src/
├── main.jsx                        ← Entry point, sets up routing & Redux
├── App.jsx                         ← Root layout (Header + Footer + Page content)
├── index.css                       ← Global styles
│
├── conf/
│   └── conf.js                     ← All environment variables in one place
│
├── appwrite/
│   ├── auth.js                     ← Login, Signup, Logout logic
│   └── config.js                   ← Posts & Image (database + storage) logic
│
├── store/
│   ├── store.js                    ← Redux store setup
│   └── authSlice.js                ← Stores whether user is logged in or not
│
├── components/
│   ├── Header/
│   │   ├── Header.jsx              ← Top navbar with navigation links
│   │   └── LogoutBtn.jsx           ← Logout button
│   ├── Footer/
│   │   └── Footer.jsx              ← Bottom footer
│   ├── post-form/
│   │   └── PostForm.jsx            ← Form for creating & editing posts
│   ├── Container/
│   │   └── Container.jsx           ← Reusable wrapper to center content
│   ├── AuthLayout.jsx              ← Protects pages from unauthorized access
│   ├── PostCard.jsx                ← Shows a single post preview (image + title)
│   ├── RTE.jsx                     ← TinyMCE rich text editor
│   ├── Input.jsx                   ← Reusable input field
│   ├── Button.jsx                  ← Reusable button
│   ├── Select.jsx                  ← Reusable dropdown
│   ├── Logo.jsx                    ← Logo component
│   ├── Login.jsx                   ← Login form UI
│   ├── Signup.jsx                  ← Signup form UI
│   └── index.js                    ← Exports all components from one place
│
└── pages/
    ├── Home.jsx                    ← Shows all active posts
    ├── AllPosts.jsx                ← Shows all posts for logged-in user
    ├── AddPost.jsx                 ← Page to create a new post
    ├── EditPost.jsx                ← Page to edit an existing post
    ├── Post.jsx                    ← Full single post view
    ├── Login.jsx                   ← Login page (wraps Login component)
    └── Signup.jsx                  ← Signup page (wraps Signup component)
```

---

## 🚀 How the App Starts — `main.jsx`

This is the **first file that runs** when you open the app in the browser.

It does 3 important things:

### 1. Sets up all the Routes (Pages)
```
/              → Home page
/login         → Login page
/signup        → Signup page
/all-posts     → All Posts page  (protected - login required)
/add-post      → Add Post page   (protected - login required)
/edit-post/:slug → Edit Post page (protected - login required)
/post/:slug    → Single Post view
```
Think of routes like a menu — when you type a URL, React shows the matching page.

### 2. Wraps the app in Redux `<Provider>`
This makes the login/logout state available everywhere in the app. Think of it like a shared noticeboard — any component can read from it.

### 3. Wraps protected pages in `<AuthLayout>`
Pages like Add Post and Edit Post are wrapped with `authentication={true}`, meaning only logged-in users can see them. Login and Signup pages use `authentication={false}`, meaning logged-in users get redirected away from them.

---

## 🏠 The Root Layout — `App.jsx`

Every page in your app shares the same layout:

```
┌─────────────────────┐
│       Header        │   ← always visible
├─────────────────────┤
│                     │
│    <Outlet />       │   ← current page loads here
│  (Home/Post/etc.)   │
│                     │
├─────────────────────┤
│       Footer        │   ← always visible
└─────────────────────┘
```

`<Outlet />` is a React Router concept — it's a placeholder that gets replaced by whatever page you're currently on.

App.jsx also **checks if the user is logged in** when the app first loads, using `useEffect`. It calls Appwrite to check for an existing session and updates Redux accordingly.

---

## ⚙️ Environment Variables — `conf/conf.js`

```js
const conf = {
    appwriteEndpoint:     // URL of your Appwrite server
    appwriteProjectId:    // Your project ID
    appwriteDatabaseId:   // Your database ID
    appwriteCollectionId: // Like a table name (stores posts)
    appwriteBucketId:     // Storage bucket (stores images)
}
```

**Why this file exists:** Instead of writing your secret keys directly in every file, you store them in `.env` and read them here. This one `conf` object is then imported wherever needed. If a key changes, you update it in one place only.

---

## 🔐 Authentication — `appwrite/auth.js`

This file handles everything related to users. It's a **class** with these methods:

| Method | What it does |
|--------|-------------|
| `createAccount()` | Creates a new user, then auto-logs them in |
| `login()` | Starts a session with email & password |
| `getCurrentUser()` | Checks if a user is already logged in |
| `logout()` | Deletes all active sessions |

At the bottom, it creates **one single instance** of the class:
```js
const authService = new AuthService();
export default authService;
```
This means the entire app shares one authService object — you never create it again.

---

## 🗄️ Posts & Images — `appwrite/config.js`

This file handles everything related to blog posts and images. It also uses a class pattern.

**Post methods:**

| Method | What it does |
|--------|-------------|
| `createPost()` | Saves a new post to the database |
| `updatePost()` | Edits an existing post |
| `deletePost()` | Removes a post from the database |
| `getPost(slug)` | Gets one specific post by its slug |
| `getPosts()` | Gets all active posts |

**Image methods:**

| Method | What it does |
|--------|-------------|
| `uploadFile()` | Uploads an image to Appwrite Storage |
| `deleteFile()` | Deletes an image from Storage |
| `getFilePreview()` | Returns a URL so the image can be shown in `<img>` tag |

Notice that the `slug` (URL-friendly title like `my-first-post`) is used as the **document ID** in the database. That's why you can fetch a post just from the URL.

---

## 🗃️ State Management — `store/`

### `store.js`
Creates the Redux store — think of it as the app's **central memory**.

```js
const store = configureStore({
    reducer: {
        auth: authSlice,  // stores login status
    }
})
```

### `authSlice.js`
Defines what the auth state looks like and how it can change:

```js
// Initial state — user is not logged in
{
    status: false,
    userData: null
}
```

Two actions can change this:
- `login(userData)` → sets `status: true` and stores user info
- `logout()` → sets `status: false` and clears user info

Any component can **read** this state with `useSelector` and **change** it with `useDispatch`.

---

## 🧩 Components Explained

### `AuthLayout.jsx` — The Gatekeeper
This wraps protected pages. It checks Redux for login status and redirects accordingly:
- Page needs login (`authentication=true`) + user is NOT logged in → redirect to `/login`
- Page needs no login (`authentication=false`) + user IS logged in → redirect to `/`

While it's checking, it shows `"Loading..."`.

---

### `Header.jsx` — The Navbar
Shows navigation links dynamically based on login status:

- **Always shown:** Home
- **Shown when NOT logged in:** Login, Signup
- **Shown when logged in:** All Posts, Add Post, Logout button

It reads login status from Redux using `useSelector`.

---

### `LogoutBtn.jsx`
When clicked, it:
1. Calls `authService.logout()` to delete the session in Appwrite
2. Dispatches `logout()` to Redux to update the app state

---

### `PostCard.jsx` — Post Preview Card
Displays a single post as a card with:
- The featured image (fetched using `getFilePreview`)
- The post title
- Clicking the card navigates to `/post/:id`

---

### `RTE.jsx` — The Rich Text Editor
Wraps the TinyMCE editor. It uses React Hook Form's `<Controller>` component to connect the editor to the form. Whatever you type in the editor gets saved as HTML content.

---

### `Input.jsx`, `Button.jsx`, `Select.jsx` — Reusable UI Components
These are generic components used throughout the app so you don't repeat the same styling everywhere.

`Input.jsx` uses `React.forwardRef` — this is needed because React Hook Form needs direct access to the input element using a `ref`.

---

### `components/index.js` — The Barrel Export
Instead of importing components one by one like:
```js
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Button from './components/Button'
```
You can write:
```js
import { Header, Footer, Button } from './components'
```
`index.js` makes this possible by re-exporting everything.

---

## 📄 Pages Explained

### `Home.jsx`
- On load, fetches all **active** posts from Appwrite
- Displays them as a grid of `<PostCard>` components
- If no posts, shows "Login to read posts"

### `AllPosts.jsx`
- Similar to Home but fetches **all** posts (no status filter)
- Only accessible to logged-in users

### `AddPost.jsx`
- Simply renders `<PostForm />` inside a Container
- `PostForm` handles all the create logic

### `EditPost.jsx`
- Reads the `slug` from the URL using `useParams`
- Fetches the existing post from Appwrite
- Passes the post data to `<PostForm post={post} />`
- `PostForm` detects it received a `post` prop and switches to "edit mode"

### `Post.jsx` — Single Post View
- Reads `slug` from URL, fetches the post
- Shows the featured image, title, and HTML content (parsed using `html-react-parser`)
- If the logged-in user is the **author** of the post, shows Edit and Delete buttons
- Delete button removes both the post from DB and the image from Storage

### `Login.jsx` & `Signup.jsx` (pages)
These are thin wrapper pages that just render the `Login` or `Signup` component from the `components` folder.

---

## 📝 PostForm.jsx — The Heart of the App

This is the most complex component. It handles both **creating** and **editing** posts.

### How it knows whether to Create or Edit:
```js
// If it received a post prop → Edit mode
// If no post prop → Create mode
export default function PostForm({ post }) { ... }
```

### What happens on Submit:
**Create mode:**
1. Uploads the image → gets a `fileId`
2. Creates the post in DB with the `fileId` as `featuredImage`
3. Navigates to the new post page

**Edit mode:**
1. If a new image was selected → upload it, delete the old one
2. Update the post in DB
3. Navigate to the updated post page

### Auto-generating the Slug:
As you type the title, a `watch` listener fires and auto-converts it to a URL-friendly slug:
```
"My First Post!" → "my-first-post-"
```
This happens using `slugTransform` which uses regex to replace spaces and special characters with dashes.

---

## 🔄 How Everything Connects — The Full Flow

```
User opens app
     ↓
main.jsx → mounts App.jsx + sets up Router + Redux store
     ↓
App.jsx → checks if user is logged in (calls Appwrite)
     ↓ (yes)                          ↓ (no)
dispatch(login(userData))         dispatch(logout())
     ↓
Header reads Redux → shows correct nav links
     ↓
User clicks "Add Post" → AuthLayout checks login → shows PostForm
     ↓
User fills form + uploads image → PostForm calls config.js
     ↓
config.js → uploadFile() + createPost() → Appwrite saves data
     ↓
Navigate to /post/slug → Post.jsx fetches post → displays it
```

---

## 💡 Key React Concepts Used in This Project

| Concept | Where it's used |
|---------|----------------|
| `useState` | Storing posts list, loading state, error messages |
| `useEffect` | Fetching data when a page loads |
| `useSelector` | Reading login status from Redux |
| `useDispatch` | Updating login status in Redux |
| `useNavigate` | Redirecting to another page |
| `useParams` | Reading the slug from the URL |
| `useForm` | Managing form state (React Hook Form) |
| `forwardRef` | Letting parent access input element directly |
| `useCallback` | Preventing slugTransform from re-creating on every render |
