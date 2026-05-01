import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Documents from './pages/Documents'
import Presentations from './pages/Presentations'
import About from './pages/About'
import AdminLogin from './pages/AdminLogin'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/documents"      element={<Documents />} />
          <Route path="/presentations"  element={<Presentations />} />
          <Route path="/about"          element={<About />} />
          <Route path="/admin"          element={<AdminLogin />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}