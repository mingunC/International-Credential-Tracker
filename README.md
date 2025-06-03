# 🎓 WES Credential Portal

> A comprehensive full-stack web application for international academic credential evaluation, built with modern technologies and following industry best practices.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=flat&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4+-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5+-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## 🌟 Overview

The WES Credential Portal is a modern web application inspired by World Education Services (WES), designed to help international students and professionals get their academic credentials evaluated for use in Canada and the United States. This project demonstrates a complete full-stack development workflow with authentication, database management, and responsive UI design.

## 📱 Screenshots

| Figure 1. Home Page | Figure 2. Registration Form | Figure 3. User Dashboard |
|:--:|:--:|:--:|
| <img src="https://github.com/user-attachments/assets/d07f6e8c-701a-45bf-a64f-fb4f9f08892c" alt="Home Page" width="400" /><br><em>Clean, professional landing page with clear call-to-action buttons</em> | <img src="https://github.com/user-attachments/assets/1dac5fca-b7ad-4519-8391-e40296321438" alt="Registration Form" width="400" /><br><em>Comprehensive registration form with real-time validation</em> | <img src="https://github.com/user-attachments/assets/6db660e1-e5bc-4ff4-bdb2-9fb0757bafbc" alt="User Dashboard" width="400" /><br><em>Personalized dashboard showing user information and account status</em> |


### 🎯 Project Goals

- **Industry-Ready Code**: Following best practices for production-ready applications
- **Modern Architecture**: Clean separation of concerns with scalable design patterns
- **User Experience**: Intuitive interface with responsive design and accessibility features
- **Security First**: JWT authentication, input validation, and secure data handling
- **Performance**: Optimized API endpoints and efficient database queries

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration** with comprehensive validation
- **Secure Login** with JWT token-based authentication
- **Protected Routes** with role-based access control
- **Password Encryption** using bcrypt
- **Session Management** with automatic token refresh

### 📊 Dashboard & User Management
- **Personalized Dashboard** showing user information and account status
- **Profile Management** with editable user information
- **Application Tracking** system for credential evaluation requests
- **Email Verification** status and notifications

### 🎨 UI/UX Features
- **Responsive Design** that works on all devices
- **Modern Bootstrap 5** styling with custom components
- **Interactive Forms** with real-time validation
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Accessible Design** following WCAG guidelines

### 🛡️ Security Features
- **Input Validation** on both client and server side
- **SQL Injection Protection** with Sequelize ORM
- **XSS Prevention** with proper data sanitization
- **CORS Configuration** for secure cross-origin requests
- **Rate Limiting** to prevent abuse
- **Environment Variables** for sensitive configuration

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Declarative routing for React applications
- **Bootstrap 5** - CSS framework for responsive design
- **React Bootstrap** - Bootstrap components for React
- **Axios** - Promise-based HTTP client for API calls
- **React Toastify** - Toast notifications for better UX

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **Sequelize ORM** - Object-relational mapping for PostgreSQL
- **PostgreSQL** - Robust, open-source relational database
- **JWT (jsonwebtoken)** - JSON Web Token implementation
- **bcryptjs** - Password hashing library
- **express-validator** - Middleware for input validation
- **CORS** - Cross-Origin Resource Sharing middleware
- **Helmet** - Security middleware for Express

### Development Tools
- **Docker** - Containerization for PostgreSQL database
- **Nodemon** - Development server with hot reload
- **Git** - Version control system
- **npm** - Package manager for Node.js

## 📁 Project Structure

```
wes-credential-portal/
├── 📁 backend/                    # Node.js Express API
│   ├── 📁 src/
│   │   ├── 📁 config/             # Database and environment configuration
│   │   ├── 📁 controllers/        # Route handlers and business logic
│   │   ├── 📁 middleware/         # Custom middleware (auth, validation)
│   │   ├── 📁 models/             # Sequelize database models
│   │   ├── 📁 routes/             # API route definitions
│   │   ├── 📁 services/           # Business logic and external services
│   │   └── 📄 app.js              # Express application setup
│   ├── 📁 uploads/                # File upload directory
│   ├── 📄 server.js               # Server entry point
│   ├── 📄 package.json            # Backend dependencies
│   └── 📄 .env                    # Environment variables
├── 📁 frontend/                   # React Application
│   ├── 📁 public/                 # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable React components
│   │   │   ├── 📁 auth/           # Authentication components
│   │   │   ├── 📁 common/         # Shared components
│   │   │   └── 📁 dashboard/      # Dashboard-specific components
│   │   ├── 📁 context/            # React Context providers
│   │   ├── 📁 pages/              # Page components
│   │   ├── 📁 services/           # API service functions
│   │   ├── 📁 styles/             # Custom CSS styles
│   │   └── 📁 utils/              # Utility functions
│   ├── 📄 package.json            # Frontend dependencies
│   └── 📄 .env                    # Frontend environment variables
├── 📄 README.md                   # Project documentation
└── 📄 docker-compose.yml          # Docker configuration
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Docker** (for PostgreSQL database)
- **Git** (for version control)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wes-credential-portal.git
   cd wes-credential-portal
   ```

2. **Set up the database**
   ```bash
   # Start PostgreSQL with Docker
   docker run --name postgres-wes \
     -e POSTGRES_PASSWORD=password \
     -e POSTGRES_DB=wes_portal \
     -p 5432:5432 \
     -d postgres:14
   ```

3. **Configure the backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cat > .env << EOF
   NODE_ENV=development
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=wes_portal
   DB_USER=postgres
   DB_PASSWORD=password
   
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   EOF
   ```

4. **Configure the frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env file
   echo "REACT_APP_API_URL=/api" > .env
   
   # Add proxy to package.json
   sed -i '' '/"private": true,/a\
     "proxy": "http://localhost:3001",
   ' package.json
   ```

### 🏃‍♂️ Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The API will be available at `http://localhost:3001`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```
   The application will open at `http://localhost:3000`

### 🧪 Testing the Application

1. **Visit the application** at `http://localhost:3000`
2. **Register a new account** with your details
3. **Login** with your credentials
4. **Explore the dashboard** and user features

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body Parameters |
|--------|----------|-------------|-----------------|
| POST | `/api/auth/register` | Register new user | firstName, lastName, email, password, phone?, country? |
| POST | `/api/auth/login` | User login | email, password |
| GET | `/api/auth/me` | Get current user | - (requires authentication) |
| GET | `/api/auth/verify-token` | Verify JWT token | - (requires authentication) |

### User Management

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/users/profile` | Get user profile | Required |
| PUT | `/api/users/profile` | Update user profile | Required |

### Example API Usage

```javascript
// Register a new user
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'SecurePassword123',
    phone: '+1-234-567-8900',
    country: 'Canada'
  })
});

// Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePassword123'
  })
});
```

| <img src="./images/project3_graph.png" alt="Project 3 Graph View" width="400" /><br><em>Graph view of task dependencies</em> | <img src="./images/project3_calender.png" alt="Project 3 Calender View" width="400" /><br><em>Gantt view of task schedule and duration</em> |

### Home Page
![Home Page](https://github.com/user-attachments/assets/d07f6e8c-701a-45bf-a64f-fb4f9f08892c)
*Clean, professional landing page with clear call-to-action buttons*

### Registration Form
![Registration](https://github.com/user-attachments/assets/1dac5fca-b7ad-4519-8391-e40296321438)
*Comprehensive registration form with real-time validation*

### User Dashboard
![Dashboard](https://github.com/user-attachments/assets/6db660e1-e5bc-4ff4-bdb2-9fb0757bafbc)
*Personalized dashboard showing user information and account status*

## 🔧 Development

### Code Style & Standards

- **ESLint** - JavaScript linting for code quality
- **Prettier** - Code formatting for consistency
- **Semantic Commits** - Conventional commit messages
- **Component Structure** - Organized, reusable React components
- **API Design** - RESTful endpoints with consistent responses

### Environment Variables

#### Backend (.env)
```bash
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wes_portal
DB_USER=postgres
DB_PASSWORD=password

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=/api
```

### Database Schema

#### Users Table
```sql
CREATE TABLE Users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  dateOfBirth DATE,
  country VARCHAR(255),
  role ENUM('applicant', 'admin') DEFAULT 'applicant',
  isEmailVerified BOOLEAN DEFAULT false,
  isActive BOOLEAN DEFAULT true,
  lastLoginAt TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚢 Deployment

### Production Deployment

1. **Environment Setup**
   ```bash
   # Update environment variables for production
   NODE_ENV=production
   PORT=8080
   JWT_SECRET=your-production-secret-key
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to cloud platforms**
   - **Frontend**: Vercel, Netlify, or AWS S3
   - **Backend**: Heroku, Railway, or AWS EC2
   - **Database**: AWS RDS, Google Cloud SQL, or DigitalOcean

### Docker Deployment

```dockerfile
# Dockerfile for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Write clear, commented code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🙏 Acknowledgments

- **World Education Services (WES)** - Inspiration for the credential evaluation concept
- **React Community** - Amazing documentation and ecosystem
- **Node.js Community** - Robust backend framework and packages
- **Bootstrap Team** - Beautiful, responsive UI components

---

<div align="center">




</div>
