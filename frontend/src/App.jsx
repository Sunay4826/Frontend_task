import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { Header } from './components/Header.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { TasksPage } from './pages/TasksPage.jsx'
import { TaskCreatePage } from './pages/TaskCreatePage.jsx'
import { TaskSearchPage } from './pages/TaskSearchPage.jsx'
import { TaskEditPage } from './pages/TaskEditPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="relative min-h-screen overflow-x-hidden text-slate-900">
          <div className="pointer-events-none absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="pointer-events-none absolute right-[-120px] top-[30%] h-80 w-80 rounded-full bg-indigo-200/50 blur-3xl" />
          <Header />
          <main className="page-wrap">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/new" element={<TaskCreatePage />} />
                <Route path="/tasks/search" element={<TaskSearchPage />} />
                <Route path="/tasks/:id/edit" element={<TaskEditPage />} />
              </Route>
              <Route path="*" element={<p className="glass-card p-4">Page not found</p>} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
