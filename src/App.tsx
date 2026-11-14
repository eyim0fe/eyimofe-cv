import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { PortfolioPage } from "./pages/PortfolioPage"
import { ProjectDetailPage } from "./pages/ProjectDetailPage"
import { ChowPortfolioPage } from "./pages/ChowPortfolioPage"
import { ChowProjectDetailPage } from "./pages/ChowProjectDetailPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ChowPortfolioPage />
      },
      {
        path: "work/:projectId",
        element: <ChowProjectDetailPage />
      },
      // Archived Notebook / Jotter Design
      {
        path: "archive",
        element: <PortfolioPage />
      },
      {
        path: "archive/work/:projectId",
        element: <ProjectDetailPage />
      },
      // Backward compatibility redirects for /chow
      {
        path: "chow",
        element: <Navigate to="/" replace />
      },
      {
        path: "chow/work/:projectId",
        element: <Navigate to="/" replace />
      },
      {
        path: "sandbox",
        element: <Navigate to="/" replace />
      },
      {
        path: "work",
        element: <Navigate to="/" replace />
      },
      {
        path: "*",
        element: <Navigate to="/" replace />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
