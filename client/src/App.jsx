import './App.css'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Conversation from './pages/Conversation';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';



function App() {
  const {currentUser} =useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />
    }
    return children;
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: (<ProtectedRoute><Home /></ProtectedRoute>),
    },
    {
      path: "/conversation/:id",
      element: (<ProtectedRoute><Conversation /></ProtectedRoute>),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

  ]);
  return (
      <div >
        <RouterProvider router={router} />
      </div>


  )
}

export default App
