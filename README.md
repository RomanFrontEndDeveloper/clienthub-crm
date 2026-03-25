🚀 ClientHub CRM

A modern CRM dashboard built with Next.js, TypeScript, React Query, and Zod validation.
The application allows managing clients, deals, and tasks with filtering, sorting, pagination, and full CRUD functionality.

✨ Features
📋 Clients
Create, edit, and delete clients
Search by name, email, or company
Filter by status
Sorting (name, date, etc.)
Pagination
💼 Deals
Create, edit, and delete deals
Link deals to clients
Deal status tracking (new, in progress, closed, lost)
Validation with Zod + React Hook Form
✅ Tasks
Track tasks and completion status
Identify overdue tasks
Dashboard statistics
📊 Dashboard
Overview of clients, deals, and tasks
Calculated stats (active deals, overdue tasks, etc.)
🎨 UI/UX
Responsive layout
Sidebar navigation
Clean and modern UI with Tailwind CSS
Form validation with error messages
🧠 Architecture
Feature-based structure:
clients
deals
tasks
Each feature contains:
components
hooks
services
types
Scalable and maintainable architecture
🛠 Tech Stack
Frontend
Next.js (App Router)
React
TypeScript
Forms & Validation
React Hook Form
Zod (schema validation)
State & Data
React Query (server state)
useState, useMemo (client state)
UI & Styling
Tailwind CSS
Tools
ESLint
Prettier
⚙️ Getting Started

1. Install dependencies
   npm install
2. Run development server
   npm run dev
3. Build project
   npm run build
4. Open in browser
   http://localhost:3000
   🧠 What I Practiced in This Project
   Building a scalable feature-based architecture
   Working with Next.js App Router
   Implementing full CRUD functionality
   Integrating React Hook Form + Zod validation
   Handling async data with React Query
   Managing state and derived data
   Debugging and fixing TypeScript type issues
   Connecting related entities (clients ↔ deals)
   Optimizing performance with useMemo
   🚀 Future Improvements
   Backend integration (Node.js + Express + MongoDB)
   Authentication (JWT)
   API-based data instead of mock data
   Role-based access (admin/user)
   Server-side pagination and filtering
   👨‍💻 Author

Roman Okhremov
Junior Frontend Developer
