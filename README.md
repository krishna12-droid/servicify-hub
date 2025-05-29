# 🛠️ Servicify Hub

**Servicify Hub** is a smart service-scheme provider web app, built to connect users with relevant schemes or services based on their profile, preferences, and eligibility. It features a modern frontend built with **React + TypeScript**, styled using **Tailwind CSS**, and linked to a **Supabase backend** for authentication, storage, and data management. The project was scaffolded using [Lovable.dev](https://lovable.dev) and enhanced using GPT-based automation tools.

---

## 🚀 Features

- 🔐 **Authentication** (via Supabase)
- 🎯 **Smart scheme matching** using user criteria
- 💡 **AI-assisted UI generation** via gptengineer.js
- 🌐 **Responsive UI** with Tailwind CSS
- 📦 **Vite-powered build system** for lightning-fast development
- 🧠 Powered by **React + TypeScript**
- 🧰 Fully structured and scalable project architecture

---

## 🧱 Tech Stack

| Layer        | Technology              |
|--------------|--------------------------|
| Frontend     | React, TypeScript        |
| Styling      | Tailwind CSS             |
| Tooling      | Vite, ESLint             |
| AI Tooling   | [gptengineer.js](https://cdn.gpteng.co/gptengineer.js) |
| Backend      | Supabase (auth + DB)     |
| Hosting      | Vercel / Netlify (optional) |

---

## 📁 Project Structure

.
├── public/ # Static assets
├── src/ # Main app source
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── hooks/ # Custom React hooks
│ ├── services/ # Supabase service & logic
│ ├── utils/ # Helper utilities
│ └── main.tsx # App entry point
├── index.html # App root HTML file
├── package.json # NPM dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── vite.config.ts # Vite config
├── .gitignore # Git ignored files
├── README.md # This documentation
└── bun.lockb # Bun lockfile (if used)

markdown
Copy
Edit

---

## 🔗 Supabase Integration

Supabase is used for:
- User authentication (sign up, sign in, password reset)
- Realtime database for service/scheme listings
- User profile and eligibility storage

### Supabase Setup Steps:

1. [Go to Supabase](https://supabase.com) and create a new project.
2. Get the `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
3. Create tables:
   - `users` — for storing user info
   - `schemes` — for storing government schemes
   - `user_scheme_matches` — to track personalized results

4. Add `.env` file at root:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-key
In your src/services/supabaseClient.ts:

ts
Copy
Edit
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

export default supabase;
⚙️ Getting Started
Prerequisites
Node.js (>=16)

npm or bun

Supabase account

Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/servicify-hub.git
cd servicify-hub
Install dependencies
Using npm:

bash
Copy
Edit
npm install
Or using bun:

bash
Copy
Edit
bun install
Start development server
bash
Copy
Edit
npm run dev
Visit http://localhost:5173 in your browser.

🧠 AI-Generated UI Support
The index.html contains:

html
Copy
Edit
<!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
This script enables runtime enhancement of UI using GPT Engineer tooling. It allows you to update, scaffold, or experiment with UI components in real time.

📦 Build & Deployment
To create an optimized production build:

bash
Copy
Edit
npm run build
Deploy options
Vercel: Zero-config deploy with Git integration

Netlify: Drag-and-drop deploy or CI/CD

GitHub Pages: Use Vite plugin or GitHub Actions

🧪 TypeScript Compiler Settings
Defined in tsconfig.json:

Option	Value	Description
target	ES2020	Modern JS
jsx	react-jsx	React JSX
moduleResolution	bundler	Optimized for Vite
strict	false	Loose TS
paths	@/* → ./src/*	Cleaner imports

✅ Available Scripts
Script	Description
dev	Start development server
build	Build for production
preview	Preview production build locally
lint	Run ESLint for code quality

🤝 Contributing
How to Contribute
Fork the repo

Create your feature branch: git checkout -b feature/my-feature

Commit your changes: git commit -am 'Add some feature'

Push to the branch: git push origin feature/my-feature

Create a Pull Request

Code Style
Use consistent formatting with Prettier

Follow ESLint rules

Keep components modular

