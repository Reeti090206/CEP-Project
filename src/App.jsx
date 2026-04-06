import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MemoryWall from './pages/MemoryWall';
import StoryDetail from './pages/StoryDetail';
import Experience from './pages/Experience';
import ShareStory from './pages/ShareStory';
import Visit from './pages/Visit';
import Dashboard from './pages/Dashboard';
import InsideAnandwan from './pages/InsideAnandwan';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/memory-wall" element={<MemoryWall />} />
            <Route path="/story/:id" element={<StoryDetail />} />
            <Route path="/inside" element={<InsideAnandwan />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/share-story" element={<ShareStory />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
