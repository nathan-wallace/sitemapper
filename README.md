# 🗺️ Sitemap Tree Visualization

A web-based tool to **fetch, parse, and explore XML sitemaps** visually. Supports both URL-based and file-based sitemap input, with powerful filtering, sorting, and export features.

---

## 🛠 Install dependencies

```bash
npm install
```

## ▶️ Start the server

```bash
node index.js
```

## 🌐 Open in your browser

```text
http://localhost:3000
```

---

## 📁 Project Structure

```
.
├── index.js          # Express server (handles sitemap fetching, parsing, uploads)
├── index.html        # Main frontend HTML UI
├── script.js         # Client-side JavaScript for UI interaction
├── styles.css        # Styling with responsive & dark mode support
├── package.json      # Node.js dependencies and project metadata
├── cache/
│   └── sitemap.xml   # Cached sitemap output (ignored by Git)
├── uploads/          # Temporary storage for uploaded files (created automatically)
└── .gitignore
```

---

## ✨ Usage

- **URL Mode:** Enter a sitemap URL and click **"Load URL"**
- **Upload Mode:** Select a local `.xml` sitemap file and click **"Upload File"**
- Apply filters or search to refine the view
- Use export buttons to generate reports in **HTML**, **CSV**, or **JSON**

---

## 🛑 .gitignore Highlights

```gitignore
.DS_Store
node_modules/
cache/sitemap.xml
uploads/
```

---

## 🧪 Health Check

For uptime monitoring:

```bash
GET /health
→ { "status": "OK", "uptime": <seconds> }
```
