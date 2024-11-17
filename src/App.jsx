import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from '../src/components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from '../src/dashboard/admin/AdminDashboard';
import StudentDashboard from '../src/dashboard/student/StudentDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionForm from './dashboard/admin/QuestionForm';
import AuthGuard from './components/guards/AuthGuard';

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
      path: "register",
      element: <Register />
    },
    {
      path: "admin",
      element: (
        <AuthGuard >
        {/* <AuthGuard allowedRole="admin"> */}
          <AdminDashboard />
        </AuthGuard>
      )
    },
    {
      path: "student",
      element: (
        <AuthGuard >

        {/* </AuthGuard> */}
        {/* // <AuthGuard allowedRole="student"> */}
          <StudentDashboard />
        </AuthGuard>
      )
    },
    {
      path:'questions-form',
      element: (
        <AuthGuard allowedRole="admin">
          <QuestionForm />
        </AuthGuard>
      )
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;


