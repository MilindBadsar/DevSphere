# DevSphere

A modern, full-stack Q&A platform inspired by Stack Overflow — built with **Next.js 15** and **Appwrite**.  
Ask questions, share knowledge, and connect with developers worldwide in a beautiful, real-time, and collaborative environment.

![DevSphere Banner](https://user-images.githubusercontent.com/your-banner.png)

---

## 🚀 Features

- **Real-time Q&A:** Instantly ask and answer questions with live updates.
- **Appwrite Backend:** Secure authentication, database, and storage powered by Appwrite.
- **Modern UI/UX:** Sleek, responsive design with MagicUI, glassmorphism, and smooth animations.
- **Smart Search & Tag Filtering:** Quickly find relevant questions and filter by tags.
- **User Profiles:** View stats, recent activity, and reputation for every user.
- **Markdown Editor:** Rich text editor for beautiful, formatted questions and answers.
- **Voting & Reputation:** Upvote answers, build your reputation, and climb the leaderboard.
- **Authentication:** Secure login/signup with email and OAuth providers.
- **Mobile Friendly:** Fully responsive for all devices.

---

## 🛠️ Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Backend:** [Appwrite](https://appwrite.io/) (Database, Auth, Storage)
- **UI:** [Tailwind CSS](https://tailwindcss.com/), MagicUI, Framer Motion
- **Editor:** [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor)
- **Icons:** [Tabler Icons](https://tabler.io/icons)

---

## ✨ Screenshots

![Ask Question](https://user-images.githubusercontent.com/your-ask-screenshot.png)
![All Questions Page](https://user-images.githubusercontent.com/your-profile-screenshot.png)

---

## 🧑‍💻 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/devsphere.git
   cd devsphere
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env.local` and fill in your Appwrite credentials.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) to view the app.**

---

## ⚙️ Appwrite Setup

1. [Install Appwrite](https://appwrite.io/docs/installation) and create a new project.
2. Create collections for users, questions, answers, votes, and tags.
3. Set up authentication providers (email, OAuth, etc.).
4. Update your `.env.local` with Appwrite endpoint, project ID, and API key.

---

## 📁 Project Structure

```
src/
  app/           # Next.js app directory (routes, pages, layouts)
  components/    # Reusable UI components (SearchBar, TagFilter, etc.)
  models/        # Appwrite client/server config
  store/         # State management (Auth, etc.)
  styles/        # Global styles and Tailwind config
```

---

## 🌐 Live Demo

> [https://devsphere.vercel.app](https://devsphere.vercel.app)  
> _(Replace with your deployed URL)_

---

## 🤝 Contributing

Contributions are welcome!  
Please open issues and pull requests to help improve DevSphere.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tabler Icons](https://tabler.io/icons)
- [Framer Motion](https://www.framer.com/motion/)

---

> Made with ❤️ by [Your Name](https://github.com/yourusername)
