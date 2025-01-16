# Todo List Application

A full-stack Todo List application that allows users to create, read, update, and delete their personal todos. The backend handles authentication, and the frontend delivers an intuitive user experience.

---

## Features

### Authentication
- **Secure Login and Registration** using JWT-based authentication.
- User-specific todos protected by backend security.

### Todo List Management
- **CRUD Operations**: Create, view, edit, and delete todo items.
- Each todo includes:
  - Title
  - Description
  - Status (completed or not)
  - Due Date
- **User-specific Todos**: Every user sees and manages only their own items.

---

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** or **yarn**
- **Git**

---

## Installation

### 1. Clone the Repository
  ```bash
  git clone https://github.com/your-repo/todo-list-app.git
  cd todo-list-app
  ```

### 2. Backend Setup
- Navigate to Backend Directory
  ```bash
  cd backend
  ```
- Install Dependencies
  ```bash
  npm install
  ```
- Configure Environment Variables
  PORT=5000
  DATABASE_URL=your_database_url
  JWT_SECRET=your_secret_key
- Start the Backend Server
  ```bash
  npm run dev
  ```

### 3. Frontend Setup
- Navigate to Frontend Directory
  ```bash
  cd frontend
  ```
- Install Dependencies
  ```bash
    npm install
  ```
- Configure Environment Variables
  REACT_APP_API_BASE_URL=http://localhost:3001/api/v1
- Start the Frontend Server
  ```bash
  npm start
  ```
  The React app will run on http://localhost:3000

### 4. Running Tests
- Backend Tests
  ```bash
  npm test
  ```
- Frontend Tests
  ```bash
  npm test
  ```

### 5. Building for Production
- Backend
  ```bash
  npm run build
  npm start
  ```
- Frontend
  ```bash
  npm run build
  ```
  The build output will be available in the frontend/build directory.
