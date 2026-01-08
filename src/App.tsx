import { useContext, useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Login from "./Pages/LoginPage/Login";
import "./style.scss";
import Register from "./Pages/RegisterPage/Register";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./Component/NavBar/NavBar";
import LeftBar from "./Component/LeftBar/LeftBar";
import RightBar from "./Component/RightBar/RightBar";
import Home from "./Pages/HomePage/Home";
import Profile from "./Pages/UserProfile/User";
import type { ReactNode } from "react";
import { DarkModeContext } from "./Context/DarkModeContext";
import { AuthContext } from "./Context/Autheciator";
import VideoReels from "./Component/VideoReels/VideoReels";
import ChatBox from "./Component/ChatBox/ChatBox";
import Chat from "./Component/Chat/Chat";
import List from "./Component/List/List";
import Details from "./Component/Details/Details";
import SearchResult from "./Pages/SearchResults/SearchResults";

export interface ProtectedRouteProps {
  children: ReactNode;
}

function App() {
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    console.log("App mounted - darkMode:", darkMode);
  }, []);
  useEffect(() => {
    console.log("darkMode changed to:", darkMode);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);
  console.log(darkMode);
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  // Chat layout without sidebars for chat-related pages
  const ChatLayout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        {/* <NavBar/> */}
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  const NavOnlyLayout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <NavBar />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!currentUser) {
      return <Navigate to="/Login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Profile/:id",
          element: <Profile />,
        },
        {
          path: "/Reels",
          element: <VideoReels />,
        },
      ],
    },
    {
      path: "/chatBox",
      element: (
        <>
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        </>
      ),
      children: [
        {
          path: "",
          element: <ChatBox />,
        },
        {
          path: "messages",
          element: <Chat />,
        },
        {
          path: "list",
          element: <List />,
        },
        {
          path: "details/:id",
          element: <Details />,
        },
      ],
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
    {
      path: "/search-result",
      element: (
        <ProtectedRoute>
          <NavOnlyLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <SearchResult />,
        },
      ],
    },
  ]);
  return (
    <>
      <div className={`app ${darkMode ? "dark-app" : "light-app"}`}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
