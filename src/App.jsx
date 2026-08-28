import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import { ThemeProvider } from './context/ThemeContext';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import Stack from './pages/admin/Stack';
import Education from './pages/admin/Education';
import Experience from './pages/admin/Experience';
import Services from './pages/admin/Services';
import Projects from './pages/admin/Projects';
import Messages from './pages/admin/Messages';
import Testimonials from './pages/admin/Testimonials';
import AdminLayout from './layout/AdminLayout';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>

            <Route element={<AdminLayout />}>

              <Route
                path="/admin/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/admin/projects"
                element={<Projects />}
              />

              <Route
                path="/admin/services"
                element={<Services />}
              />

              <Route
                path="/admin/experience"
                element={<Experience />}
              />

              <Route
                path="/admin/education"
                element={<Education />}
              />

              <Route
                path="/admin/stack"
                element={<Stack />}
              />

              <Route
                path="/admin/testimonials"
                element={<Testimonials />}
              />

              <Route
                path="/admin/messages"
                element={<Messages />}
              />

            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
