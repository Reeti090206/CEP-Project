import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StoryCard from '../components/StoryCard';
import { stories, aboutAnandwan } from '../data/dummyData';
import { translateText, handleAudio } from '../utils/audioUtils';

const Home = () => {
  const [playingLang, setPlayingLang] = useState(null);
  const [showAudioMenu, setShowAudioMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleAudioPlay = async (lang) => {
    setShowAudioMenu(false);
    setPlayingLang(lang);
    handleAudio(aboutAnandwan.description, lang, setIsTranslating, setIsPlaying);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingLang(null);
      setIsPlaying(false);
      setIsTranslating(false);
    }
  };

  const [displayDescription, setDisplayDescription] = useState(aboutAnandwan.description);
  const [isUiTranslating, setIsUiTranslating] = useState(false);
  const [currentTextLang, setCurrentTextLang] = useState('english');

  const handleTextLangChange = async (newLang) => {
    setCurrentTextLang(newLang);
    const target = newLang === 'hindi' ? 'hi' : (newLang === 'marathi' ? 'mr' : 'en');
    
    if (newLang === 'english') {
      setDisplayDescription(aboutAnandwan.description);
    } else {
      setIsUiTranslating(true);
      const preTranslated = newLang === 'hindi' ? aboutAnandwan.descriptionHindi : aboutAnandwan.descriptionMarathi;
      if (preTranslated) {
        setDisplayDescription(preTranslated);
      } else {
        const translated = await translateText(aboutAnandwan.description, target);
        setDisplayDescription(translated);
      }
      setIsUiTranslating(false);
    }
  };

  return (
    <div>
      <section className="hero">
        <h1>Living Stories of Anandwan</h1>
        <p>Experience, feel, and be part of real lives.</p>
        <div className="hero-buttons">
          <Link to="/memory-wall" className="btn btn-primary">Explore Stories</Link>
          <Link to="/experience" className="btn btn-secondary">Start Experience</Link>
        </div>
      </section>

      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '2.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', position: 'relative' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h2 className="section-title" style={{ marginBottom: 0 }}>About Anandwan</h2>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <button 
                  className="btn btn-outline" 
                  style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  onClick={() => setShowAudioMenu(!showAudioMenu)}
                >
                  {isPlaying ? (isTranslating ? '⏳ Translating...' : `⏹ Stop ${playingLang}`) : '🎧 Audio'}
                </button>
                
                {showAudioMenu && (
                  <div style={{ 
                    position: 'absolute', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    top: '40px', 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: '4px', 
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                  }}>
                    <button onClick={() => handleAudioPlay('english')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff', fontSize: '0.8rem' }}>English</button>
                    <button onClick={() => handleAudioPlay('hindi')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff', fontSize: '0.8rem' }}>Hindi</button>
                    <button onClick={() => handleAudioPlay('marathi')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', color: '#fff', fontSize: '0.8rem' }}>Marathi</button>
                  </div>
                )}
              </div>

              <select 
                value={currentTextLang}
                onChange={(e) => handleTextLangChange(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--primary)',
                  border: '1px solid var(--border-light)',
                  padding: '7px 10px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                <option value="english" style={{ backgroundColor: '#1a1a1a' }}>Text: EN</option>
                <option value="hindi" style={{ backgroundColor: '#1a1a1a' }}>Text: HI</option>
                <option value="marathi" style={{ backgroundColor: '#1a1a1a' }}>Text: MR</option>
              </select>
            </div>
          </div>

          <p style={{ fontSize: '1.2rem', maxWidth: '850px', margin: '0 auto', color: 'var(--text-main)', lineHeight: '1.8' }}>
            {isUiTranslating ? "Translating content..." : displayDescription}
          </p>
        </div>

        <h2 className="section-title">What Exists in Anandwan</h2>
        <div className="grid-3" style={{ marginBottom: '5rem' }}>
          <Link to="/inside" className="card" style={{ textDecoration: 'none' }}>
            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400" alt="Schools" className="card-img" style={{ height: '150px' }} />
            <div className="card-content" style={{ padding: '1rem', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--primary)' }}>Schools & Education</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Empowering minds through inclusive and accessible education.</p>
            </div>
          </Link>
          <Link to="/inside" className="card" style={{ textDecoration: 'none' }}>
            <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=400" alt="Hospitals" className="card-img" style={{ height: '150px' }} />
            <div className="card-content" style={{ padding: '1rem', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--primary)' }}>Healthcare</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Compassionate healthcare restoring dignity and well-being.</p>
            </div>
          </Link>
          <Link to="/inside" className="card" style={{ textDecoration: 'none' }}>
            <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=400" alt="Industries" className="card-img" style={{ height: '150px' }} />
            <div className="card-content" style={{ padding: '1rem', textAlign: 'center' }}>
              <h3 style={{ color: 'var(--primary)' }}>Community Industries</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Building self-reliance through skills, creativity, and work.</p>
            </div>
          </Link>
        </div>

        <h2 className="section-title">Quick Journey</h2>
        <div className="grid-4" style={{ marginBottom: '4rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>📖 Memory Wall</h3>
            <p>Explore real life events and community stories.</p>
            <Link to="/memory-wall" style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Explore &rarr;</Link>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🎮 Experience</h3>
            <p>Step into their shoes through interactive scenarios.</p>
            <Link to="/experience" style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Play &rarr;</Link>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>📝 Feedback</h3>
            <p>Contribute your real experience of Anandwan.</p>
            <Link to="/share-story" style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Share &rarr;</Link>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', justifyContent: 'center' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>🌍 Visit</h3>
            <p>Request a meaningful visit or volunteering.</p>
            <Link to="/visit" style={{ marginTop: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Book &rarr;</Link>
          </div>
        </div>

        <h2 className="section-title">Featured Stories</h2>
        <div className="grid-3">
          {stories.slice(0, 3).map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
