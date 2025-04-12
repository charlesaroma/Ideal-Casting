import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
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
              <Route path="/talent-directory" element={<TalentDirectory />} />
              <Route path="/talent-showcase" element={<TalentShowcase />} />
              <Route path="/talent/:talentId" element={<TalentProfile />} />
              <Route path="/team" element={<Team />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
