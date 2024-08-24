import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const Login = lazy(() => import("../views/ui/login.js"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const EditProfile = lazy(() => import("../views/ui/editProfile.js"));

/*****Routes******/
const ThemeRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Employee",
    element: <FullLayout />,
    children: [
      // Optional: Uncomment and adjust if you want a default redirect within /Employee
      // { path: "/", element: <Navigate to="/Employee/table" /> },

      // Define child routes for /Employee
      { path: "table", element: <Tables /> },
      { path: "forms", element: <Forms /> },
      { path: "EditProfile", element: <EditProfile /> },
    ],
  },
  // Optionally, catch-all route for undefined paths
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default ThemeRoutes;
