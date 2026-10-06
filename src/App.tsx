import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { MainLayout } from "./layouts/MainLayout"
import { PortfolioPage } from "./pages/PortfolioPage"
import { FolderSandboxPage } from "./pages/FolderSandboxPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PortfolioPage />
      },
      {
        path: "sandbox",
        element: <FolderSandboxPage />
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
