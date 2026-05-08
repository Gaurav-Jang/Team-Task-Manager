# Team Task Manager

This is a full-stack Team Task Manager web application made for placement assignment. In this project, admin can create projects, assign tasks to members, and track task progress. Members can view their assigned tasks and update task status.

---

# Live Links

* Frontend: https://team-task-manager-inz3.vercel.app/
* Backend: https://team-task-manager-sevp.onrender.com

---

# Features

## Authentication

* User Signup
* User Login
* JWT Authentication
* Password Hashing

## Admin Features

* Create Project
* Edit Project
* Delete Project
* Create Tasks
* Assign Tasks to Members
* View All Tasks
* View Team Members

## Member Features

* View Assigned Tasks
* Update Task Status
* View Dashboard Stats

## Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* Overdue Tasks

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* CSS

## Backend

* Node.js
* Express.js
* JWT
* bcryptjs

## Database

* PostgreSQL

---

# Project Structure

```bash
Team-Task-Manager/
│
├── Backend/
├── Frontend/
└── README.md
```

# API Routes

## Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

## Projects

* GET `/api/projects`
* POST `/api/projects`
* PUT `/api/projects/:id`
* DELETE `/api/projects/:id`

## Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`

---

# Deployment

* Frontend: Vercel 
* Backend: Render
* Database: Railway PostgreSQL

---

# Demo Credentials

## Admin

```bash
Email: admin@test.com
Password: 123456
```

## Member

```bash
Email: john@test.com
Password: 123456
```


# Learning From Project

In this project I learned:

* Authentication using JWT
* Role-based access control
* REST API development
* PostgreSQL database connection
* React frontend integration
* Deployment of full-stack application

---

# Author

Gaurav Jangra

GitHub: https://github.com/Gaurav-Jang

---

# Assignment Objective

This project was built as a placement assignment to demonstrate:

* Full-stack development
* REST API creation
* Authentication & Authorization
* Role-based access control
* Database relationships
* Deployment skills
* Modern UI development
