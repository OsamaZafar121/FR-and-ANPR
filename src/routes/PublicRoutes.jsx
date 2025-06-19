
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard";
import FRLayout from "../pages/FR/Layout"; 
import Review from "../pages/FR/FRReview"
import FRVideoAnalysis from "../pages/FR/FRVideoAnalysis";
import FRReporting from "../pages/FR/FRReporting";
import Database from "../pages/FR/Database";
import ANPRLayout from "../pages/ANPR/layout";
import ANPRResults from "../pages/ANPR/ANPRResults";
import ANPRReview from "../pages/ANPR/ANPRReview";
import ANPRVideoAnalysis from "../pages/ANPR/ANPRVideoAnalysis";
import ANPRReporting from "../pages/ANPR/ANPRReporting";
import Setting from "../pages/SettingPage/setting"
import FaceDetector from "../pages/FR/FRResults";
import AuthForm from "../pages/login.signup/auth";
import { Navigate } from "react-router-dom";




const publicRoutes = [
  {
    path: "/auth",
    element: <AuthForm />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "fr",
        element: <FRLayout />, 
        children: [
          { index: true,  element: <FaceDetector /> },
          { path: "review", element: <Review /> },
          { path: "video-analysis", element: <FRVideoAnalysis /> },
          { path: "reporting", element: <FRReporting /> },
          { path: "database", element: <Database /> },
        ],
      },
      {
        path: "anpr",
        element: <ANPRLayout />, 
        children: [
          { index: true,  element: <ANPRResults /> },
          { path: "review", element: <ANPRReview /> },
          { path: "video-analysis", element: <ANPRVideoAnalysis /> },
          { path: "reporting", element: <ANPRReporting /> },
          { path: "database", element: <Database /> },
        ],
      },
      {
          path:"setting",
          children: [
            { index: true,  element: < Setting /> },
            
          ],
      },
    ],
  },
  {
  path: "*",
  element: <Navigate to="/auth" replace />,
}
];

export default publicRoutes;
