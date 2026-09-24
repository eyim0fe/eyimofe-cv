import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export function MainLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Dynamic page content */}
      <Outlet />

      <Toaster position="top-right" richColors />
    </div>
  )
}
