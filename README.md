# Task Management API with Frontend

## Overview
This project implements a Task Management system with a backend API and a frontend interface. The backend is built using Node.js, and the frontend is developed with React. It includes features like user authentication (login/register), task management, and a user-friendly UI for interaction. Redux is used for state management on the frontend, and API calls are handled using `fetch`.

## All Links
- **GitHub Repository**: [Task Manager Repository](https://github.com/dashrathshinde07/task-manager-nodejs.git)
- **Front-End Link**: [Task Manager Front-End](https://task-manager-nodejs-ec97.vercel.app/)
- **Back-End Link**: [Task Manager Back-End](https://task-manager-nodejs-3fjm.onrender.com)

## Test Credentials
- **Email**: john.doe@example.com
- **Password**: password123

## Backend Features

### API Endpoints

#### Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a JWT token.

#### Tasks
- **GET /tasks**: Fetch all tasks.
- **GET /tasks/:id**: Fetch a single task by its ID.
- **POST /tasks**: Add a new task.
- **PUT /tasks/:id**: Update an existing task by its ID.
- **DELETE /tasks/:id**: Delete a task by its ID.

### Features
- **Error Handling**: Returns appropriate status codes (400, 404, 500) for invalid inputs, missing fields, or server errors.
- **Data Validation**: Ensures request payloads meet expected structures.

### Tech Stack
- **Backend**: Node.js with a MongoDB database.
- **ORM/ODM**: Mongoose for MongoDB.
- **Deployment**: Deployable on Vercel and Render.

## Frontend Features

### UI Highlights
- Login/Register forms for user authentication.
- Task dashboard for viewing, creating, updating, and deleting tasks.
- Real-time updates via Redux for state management.

### Tech Stack
- **Frontend Framework**: React.js
- **State Management**: Redux
- **API Integration**: Fetch API

### Pages
- **Authentication**: Login and Register pages.
- **Task Dashboard**: Displays all tasks with options to edit or delete.
- **Task Form**: Allows users to create or update tasks.

## API Usage

### Register
- **POST**: `https://task-manager-nodejs-3fjm.onrender.com/auth/register`
- **Content-Type**: `application/json`

```json
{
  "username": "exampleUser",
  "password": "examplePass"
}
