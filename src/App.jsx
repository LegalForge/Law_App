import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from '../src/dashboard/admin/AdminDashboard';
import StudentDashboard from '../src/dashboard/student/StudentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionForm from './dashboard/admin/QuestionForm';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "login",
      element: <Login />
    },
    {
      path:'questions-form',
      element:<QuestionForm />
    },
    {
      path: "register",
      element: <Register />
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
    <>
      <RouterProvider router={router} />
      <ToastContainer /> {/* Move ToastContainer here */}
    </>
  );
}

export default App;