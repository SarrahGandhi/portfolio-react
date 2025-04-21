# Portfolio Website

A personal portfolio website built with React and Node.js to showcase projects, work experience, and skills.

## Features

- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Portfolio Showcase**: Display projects with details, technologies, and links
- **Resume/Experience Section**: Highlight professional experience and skills
- **Admin Dashboard**: Secure admin panel to manage projects and work experience
- **Contact Form**: Allow visitors to reach out via a contact form
- **Authentication**: Secure login for admin functionality

## Tech Stack

### Frontend

- React
- React Router
- CSS3
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Express Session for authentication

### DevOps

- Concurrently (for running frontend and backend simultaneously)

## Project Structure

```
portfolio-react/
├── public/                 # Static files
├── src/                    # React frontend
│   ├── assets/             # Images and static assets
│   ├── components/         # Reusable UI components
│   ├── config/             # Configuration files
│   ├── pages/              # Page components
│   │   ├── Admin/          # Admin dashboard and forms
│   │   ├── Home/           # Homepage components
│   │   ├── ProjectDetails/ # Project detail page
│   │   └── Resume/         # Resume page
│   ├── App.jsx             # Main application component
│   └── index.js            # Application entry point
├── backend/                # Node.js backend
│   ├── public/             # Static files for backend
│   ├── src/                # Backend source code
│   ├── db.js               # Database connection
│   ├── server.js           # Express server setup
│   └── .env                # Environment variables
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd portfolio-react
   ```

2. Install frontend dependencies

   ```
   npm install
   ```

3. Install backend dependencies

   ```
   cd backend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   SESSIONSECRET=your_session_secret
   ```

### Running the application

#### Development mode

```
npm run dev
```

This runs both frontend and backend concurrently:

- Frontend: www.sarrahgandhi.com
- Backend: www.sarrahgandhi.com/admin/login
  (Make sure your browser allows third party cookies)

#### Frontend only

```
npm start
```

#### Backend only

```
cd backend
npm run dev
```

## Deployment

- Frontend can be deployed to services like Netlify, Vercel, or GitHub Pages
- Backend can be deployed to services like Render, Heroku, or DigitalOcean

## License

This project is licensed under the MIT License
