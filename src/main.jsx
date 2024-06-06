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
import PackagesByType from './pages/PackagesByType';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import PackageDetails from './pages/PackageDetails';
import AuthProvider from './components/AuthProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import GuideDetails from './pages/GuideDetails';
import Stories from './pages/Stories';
import StoryDetails from './pages/StoryDetails';
import Dashboard from './dashboard/Dashboard';
import Profile from './dashboard/Profile';
import Bookings from './dashboard/user/Bookings';
import Wishlist from './dashboard/user/Wishlist';
import BeGuide from './dashboard/user/BeGuide';
import AddPackage from './dashboard/admin/AddPackage';
import ManageUsers from './dashboard/admin/ManageUsers';
import GuideRequests from './dashboard/admin/GuideRequests';
import AssignedTours from './dashboard/guide/AssignedTours';
import Private from './pages/Private/Private';
import UserRoute from './pages/Private/UserRoute';
import AdminRoute from './pages/Private/AdminRoute';
import GuideRoute from './pages/Private/GuideRoute';

const queryClient = new QueryClient();

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
        path: "packages",
        element: <Packages />,
      },
      {
        path: "packages-by-category/:tourType",
        element: <PackagesByType />,
      },
      {
        path: "package/:id",
        element: <PackageDetails />,
      },
      {
        path: "guide/:id",
        element: <GuideDetails />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "stories",
        element: <Stories />,
      },
      {
        path: "story/:id",
        element: <StoryDetails />,
      },
    ]
  },
  {
    path: "dashboard",
    element: <Private><Dashboard></Dashboard></Private>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },

      // user routes
      {
        path: "my-bookings",
        element: <UserRoute><Bookings /></UserRoute>,
      },
      {
        path: "my-wishlist",
        element: <UserRoute><Wishlist /></UserRoute>,
      },
      {
        path: "be-guide",
        element: <UserRoute><BeGuide /></UserRoute>,
      },

      // admin routes
      {
        path: "add-package",
        element: <AdminRoute><AddPackage /></AdminRoute>,
      },
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "guide-requests",
        element: <AdminRoute><GuideRequests /></AdminRoute>,
      },

      // guide routes
      {
        path: "assigned-tours",
        element: <GuideRoute><AssignedTours /></GuideRoute>,
      },

    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
