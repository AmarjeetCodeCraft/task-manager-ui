# 📋 Task Manager UI

A modern, responsive task management application built with React and TailwindCSS.

## ✨ Features

- 🔐 **User Authentication** - Secure login with session management
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🎨 **Modern UI** - Clean design with TailwindCSS
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🚀 **React Router** - Protected routes with navigation guards
- 🔄 **Real-time Updates** - Instant UI updates with optimistic rendering
- 📊 **Status Tracking** - Monitor task progress (To-Do, In Progress, Completed)
- 📅 **Due Date Management** - Set and track task deadlines
- ⚡ **Performance Optimized** - Memoized components for better performance

## 🛠️ Tech Stack

- **Frontend**: React 19.2.3
- **Routing**: React Router DOM 6.x
- **Styling**: TailwindCSS 3.4.1
- **HTTP Client**: Axios 1.13.2
- **Backend Mock**: JSON Server 1.0.0
- **Build Tool**: React Scripts 5.0.1
- **Node Version**: v22.19.0
- **npm -version**: 10.9.3

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Application

### Development Mode (Recommended)
Runs both frontend and backend concurrently:
```bash
npm run dev
```

### Separate Commands
**Backend Server** (Port 5000):
```bash
npm run server
```

**Frontend** (Port 3000):
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🔑 Login Credentials

```
Username: admin
Password: admin123
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users?username=<username>` | Fetch user by username |
| GET | `/tasks` | Fetch all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update task by ID |
| DELETE | `/tasks/:id` | Delete task by ID |

## 📂 Project Structure

```
task-manager-ui/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ConfirmModal.jsx    # Confirmation dialog
│   │   ├── Dashboard.jsx       # Main dashboard
│   │   ├── Login.jsx           # Login page
│   │   ├── TaskCard.jsx        # Individual task card
│   │   └── TaskModal.jsx       # Add/Edit task form
│   ├── utils/
│   │   └── util.js             # Helper functions
│   ├── App.jsx                 # Root component with routing
│   ├── index.css               # Global styles
│   └── index.jsx               # Entry point
├── db.json                     # Mock database
├── package.json
└── tailwind.config.js
```

## 🎯 Key Components

### App.jsx
- Implements routing with authentication guards
- `ProtectedRoute` - Restricts access to authenticated users
- `PublicRoute` - Redirects logged-in users away from login

### Dashboard.jsx
- Displays task list in responsive grid
- Handles CRUD operations
- Loading and error states

### TaskModal.jsx
- Reusable form for creating/editing tasks
- Form validation
- Keyboard support (ESC to close)

### TaskCard.jsx
- Memoized component for performance
- Status badges with color coding
- Edit and delete actions

## 🎨 Features Breakdown

### Authentication Flow
1. User enters credentials
2. System validates against mock database
3. Generates session token
4. Stores in localStorage
5. Redirects to dashboard

### Task Operations
- **Create**: Fill form → POST to `/tasks`
- **Read**: Auto-fetches on mount
- **Update**: Edit task → PUT to `/tasks/:id`
- **Delete**: Confirm → DELETE to `/tasks/:id`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

### Tailwind Configuration
Customize colors, fonts, and styles in `tailwind.config.js`

## 📝 Scripts

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "server": "json-server --watch db.json --port 5000",
  "dev": "concurrently \"npm run server\" \"npm start\""
}
```

## 🐛 Troubleshooting

**Error: "Server connection failed"**
- Ensure json-server is running on port 5000
- Check `db.json` file exists
- Verify `REACT_APP_API_URL` environment variable

**Error: "Task not found (404)"**
- Restart json-server to reset database
- Check task IDs in `db.json`

**Styling issues**
- Clear browser cache
- Rebuild Tailwind: `npm start` (rebuilds automatically)

## 🚧 Future Enhancements

- [ ] Add task filtering and sorting
- [ ] Implement search functionality
- [ ] Dark mode support
- [ ] Task categories/tags
- [ ] User registration
- [ ] Password hashing
- [ ] Real backend integration
- [ ] Unit and integration tests
- [ ] Accessibility improvements (ARIA labels)
- [ ] Toast notifications instead of alerts
