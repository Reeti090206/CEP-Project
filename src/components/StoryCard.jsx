import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { translateText, handleAudio } from '../utils/audioUtils';

const StoryCard = ({ story }) => {
  const [displayTitle, setDisplayTitle] = useState(story.title);
  const [displayDesc, setDisplayDesc] = useState(story.shortDescription);
  const [isUiTranslating, setIsUiTranslating] = useState(false);
  const [currentTextLang, setCurrentTextLang] = useState('english');
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [playingLang, setPlayingLang] = useState(null);
  const [showAudioMenu, setShowAudioMenu] = useState(false);

  const handleAudioPlay = (lang) => {
    setShowAudioMenu(false);
    setPlayingLang(lang);
    handleAudio(story.shortDescription, lang, setIsTranslating, setIsPlaying);
  };

  const handleTextLangChange = async (newLang) => {
    setCurrentTextLang(newLang);
    const target = newLang === 'hindi' ? 'hi' : (newLang === 'marathi' ? 'mr' : 'en');
    
    if (newLang === 'english') {
      setDisplayTitle(story.title);
      setDisplayDesc(story.shortDescription);
    } else {
      setIsUiTranslating(true);
      const [title, desc] = await Promise.all([
        translateText(story.title, target),
        translateText(story.shortDescription, target)
      ]);
      setDisplayTitle(title);
      setDisplayDesc(desc);
      setIsUiTranslating(false);
    }
  };

  return (
    <div className="card">
      <img src={story.images[0]} alt={story.title} className="card-img" />
      <div className="card-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 className="card-title" style={{ margin: 0 }}>{isUiTranslating ? "..." : displayTitle}</h3>
          
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button 
                className="btn btn-outline" 
                style={{ padding: '6px 10px', fontSize: '0.7rem' }}
                onClick={() => setShowAudioMenu(!showAudioMenu)}
              >
                {isPlaying ? (isTranslating ? '⏳' : '⏹') : '🎧'}
              </button>
              
              {showAudioMenu && (
                <div style={{ 
                  position: 'absolute', 
                  right: '0', 
                  top: '30px', 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid var(--border-light)', 
                  borderRadius: '4px', 
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '90px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}>
                  <button onClick={() => handleAudioPlay('english')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff', fontSize: '0.75rem' }}>English</button>
                  <button onClick={() => handleAudioPlay('hindi')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff', fontSize: '0.75rem' }}>Hindi</button>
                  <button onClick={() => handleAudioPlay('marathi')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', color: '#fff', fontSize: '0.75rem' }}>Marathi</button>
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
                padding: '5px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              <option value="english" style={{ backgroundColor: '#1a1a1a' }}>EN</option>
              <option value="hindi" style={{ backgroundColor: '#1a1a1a' }}>HI</option>
              <option value="marathi" style={{ backgroundColor: '#1a1a1a' }}>MR</option>
            </select>
          </div>
        </div>

        <p className="card-meta">{story.personName} • {story.category} ({story.year})</p>
        <p className="card-text">{isUiTranslating ? "Translating..." : displayDesc}</p>
        <Link to={`/story/${story.id}`} className="btn btn-outline" style={{ display: 'block' }}>
          Read Full Story
        </Link>
      </div>
    </div>
  );
};

export default StoryCard;
