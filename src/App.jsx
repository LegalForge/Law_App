import { useState } from 'react'

import './App.css'
import Home from './user/home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import QuizPage from './user/quiz';
import LandingPage from './components/LandingPage';
import AdminDashboard from './admin/AdminDashboard';
import StudentDashboard from './student/StudentDashboard';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "quiz",
      element: <QuizPage/>
    },
    {
      path: "admin",
      element: <AdminDashboard />
    },
    {
      path: "student",
      element: <StudentDashboard />
    }
  ]);
  return (
    <RouterProvider router={router} />
  )

}

export default App
