import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { stories } from '../data/dummyData';
import { translateText, handleAudio } from '../utils/audioUtils';

const StoryDetail = () => {
  const { id } = useParams();
  const story = stories.find(s => s.id === parseInt(id));
  const [emotion, setEmotion] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const [isTranslating, setIsTranslating] = useState(false);

  const handleAudioPlay = async (lang) => {
    setShowLangMenu(false);
    handleAudio(story.fullStory, lang, setIsTranslating, setIsPlaying);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsTranslating(false);
    }
  };

  if (!story) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Story not found</h2>
        <Link to="/memory-wall" className="btn btn-outline" style={{ marginTop: '1rem' }}>Go back</Link>
      </div>
    );
  }

  return (
    <div className="container story-detail">
      <img src={story.image} alt={story.title} className="story-header-img" />

      <div className="story-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', position: 'relative' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem' }}>{story.title}</h1>

          <div style={{ position: 'relative' }}>
            {!isPlaying ? (
              <button className="btn btn-secondary" onClick={() => setShowLangMenu(!showLangMenu)}>
                🎧 Listen
              </button>
            ) : (
              <button className="btn btn-outline" onClick={stopAudio}>
                {isTranslating ? '⏳ Translating...' : '⏹ Stop'}
              </button>
            )}

            {showLangMenu && (
              <div style={{ 
                position: 'absolute', 
                right: '0', 
                top: '50px', 
                backgroundColor: '#1a1a1a', 
                border: '1px solid var(--border-light)', 
                borderRadius: '4px', 
                zIndex: 10, 
                display: 'flex', 
                flexDirection: 'column', 
                width: '120px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
              }}>
                <button onClick={() => handleAudioPlay('english')} style={{ padding: '10px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff' }}>English</button>
                <button onClick={() => handleAudioPlay('hindi')} style={{ padding: '10px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff' }}>Hindi</button>
                <button onClick={() => handleAudioPlay('marathi')} style={{ padding: '10px', textAlign: 'left', background: 'transparent', color: '#fff' }}>Marathi</button>
              </div>
            )}
          </div>
        </div>

        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '2rem' }}>
          By {story.personName}
        </p>

        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
          <p>{story.fullStory}</p>
        </div>

        <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid var(--border-light)' }} />

        <div style={{ textAlign: 'center', backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>How did this story make you feel?</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              className={`btn btn-outline ${emotion === 'inspired' ? 'active' : ''}`}
              onClick={() => setEmotion('inspired')}
              style={{ backgroundColor: emotion === 'inspired' ? 'var(--primary)' : '', color: emotion === 'inspired' ? '#000' : '' }}
            >
              🌟 Inspired
            </button>
            <button 
              className={`btn btn-outline ${emotion === 'moved' ? 'active' : ''}`}
              onClick={() => setEmotion('moved')}
              style={{ backgroundColor: emotion === 'moved' ? 'var(--primary)' : '', color: emotion === 'moved' ? '#000' : '' }}
            >
              😢 Moved
            </button>
            <button 
              className={`btn btn-outline ${emotion === 'amazed' ? 'active' : ''}`}
              onClick={() => setEmotion('amazed')}
              style={{ backgroundColor: emotion === 'amazed' ? 'var(--primary)' : '', color: emotion === 'amazed' ? '#000' : '' }}
            >
              😮 Amazed
            </button>
          </div>
          {emotion && <p style={{ marginTop: '1.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>Thank you for sharing your reflection!</p>}
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
