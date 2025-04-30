import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { subscribeToAuthChanges } from './firebase/auth';
import { getDocument } from './firebase/firestore';
import Navbar from './components/layout/Navbar';
import TalentNavbar from './components/navbar/TalentNavbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import TalentDirectory from './pages/TalentDirectory';
import TalentShowcase from './pages/TalentShowcase';
import TalentProfile from './pages/TalentProfile';
import TalentDashboard from './pages/talent/TalentDashboard';
import Team from './pages/Team';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Login from './components/auth/login';
import AdminLogin from './components/auth/AdminLogin';
import Signup from './components/auth/signup';
import ForgotPassword from './components/auth/forgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddTalent from './pages/admin/AddTalent';
import EditTalent from './pages/admin/EditTalent';
import ManageTalents from './pages/admin/ManageTalents';
import BookingRequests from './pages/admin/BookingRequests';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const { data: userData } = await getDocument('users', firebaseUser.uid);
          if (userData) {
            const userInfo = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name,
              role: userData.role
            };
            setUser(userInfo);
            localStorage.setItem('user', JSON.stringify(userInfo));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    // Check for saved user data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    return () => unsubscribe();
  }, []);

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  // Protected Route component for regular users
  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
  };

  // Protected Route component for admin users
  const AdminRoute = ({ children }) => {
    if (loading) {
      return <LoadingSpinner text="Loading dashboard..." />;
    }
    if (!user || user.role !== 'admin') {
      return <Navigate to="/admin-login" />;
    }
    return children;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--color-accent-50)] justify-center items-center">
        <LoadingSpinner text="Initializing application..." />
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-accent-50">
        {user?.role === 'talent' ? <TalentNavbar user={user} /> : <Navbar />}
        <main className="flex-grow">
          <div>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/team" element={<Team />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected User Routes */}
              <Route 
                path="/talent-dashboard" 
                element={
                  <ProtectedRoute>
                    <TalentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/talent-directory" 
                element={
                  <ProtectedRoute>
                    <TalentDirectory isAdmin={user?.role === 'admin'} />
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
                    <TalentProfile isAdmin={user?.role === 'admin'} />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/add-talent"
                element={
                  <AdminRoute>
                    <AddTalent />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/edit-talent/:talentId"
                element={
                  <AdminRoute>
                    <EditTalent />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/manage-talents"
                element={
                  <AdminRoute>
                    <ManageTalents />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/booking-requests"
                element={
                  <AdminRoute>
                    <BookingRequests />
                  </AdminRoute>
                }
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
