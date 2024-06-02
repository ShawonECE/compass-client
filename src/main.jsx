import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Root from './Root';
import Packages from './pages/Packages';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    {/* </AuthProvider> */}
  </React.StrictMode>
)
