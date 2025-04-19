import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TalentDirectory from './pages/TalentDirectory';
import TalentShowcase from './pages/TalentShowcase';
import TalentProfile from './pages/TalentProfile';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import ForgotPassword from './components/auth/forgotPassword';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userInfo) => {
    setUser(userInfo);
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-accent-50">
        <Navbar />
        <main className="flex-grow">
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route 
                path="/talent-directory" 
                element={
                  <ProtectedRoute>
                    <TalentDirectory />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/talent-showcase" 
                element={
                  <ProtectedRoute>
                    <TalentShowcase />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/talent/:talentId" 
                element={
                  <ProtectedRoute>
                    <TalentProfile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/team" element={<Team />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
