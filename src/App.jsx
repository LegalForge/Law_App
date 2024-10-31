import { useState } from 'react'

import './App.css'
import Home from './user/home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import QuizPage from './user/quiz';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "quiz",
      element:< QuizPage/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  )

}

export default App
