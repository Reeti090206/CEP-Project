import { useState, useEffect } from 'react';
import { insideAnandwanData } from '../data/dummyData';
import { translateText, handleAudio } from '../utils/audioUtils';

const InsideAnandwan = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playingLang, setPlayingLang] = useState(null);
  const [showAudioMenu, setShowAudioMenu] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleAudioPlay = async (item, index, lang) => {
    setShowAudioMenu(null);
    setPlayingIndex(index);
    setPlayingLang(lang);

    const textToSpeak = item.description + '. ' + (expandedIndex === index ? item.expandedDescription : '');
    
    handleAudio(textToSpeak, lang, setIsTranslating, (playing) => {
      setIsPlaying(playing);
      if (!playing) {
        setPlayingIndex(null);
        setPlayingLang(null);
      }
    });
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      setPlayingLang(null);
      setIsPlaying(false);
      setIsTranslating(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    if (playingIndex === index) {
      stopAudio();
    }
  };

  const [displayData, setDisplayData] = useState(insideAnandwanData);
  const [isUiTranslating, setIsUiTranslating] = useState(false);
  const [currentTextLang, setCurrentTextLang] = useState('english');

  const handleTextLangChange = async (newLang) => {
    setCurrentTextLang(newLang);
    const target = newLang === 'hindi' ? 'hi' : (newLang === 'marathi' ? 'mr' : 'en');
    
    if (newLang === 'english') {
      setDisplayData(insideAnandwanData);
    } else {
      setIsUiTranslating(true);
      const translated = await Promise.all(insideAnandwanData.map(async (item) => {
        const titleField = newLang === 'hindi' ? 'titleHindi' : 'titleMarathi';
        const descField = newLang === 'hindi' ? 'descriptionHindi' : 'descriptionMarathi';
        const expDescField = newLang === 'hindi' ? 'expandedDescriptionHindi' : 'expandedDescriptionMarathi';

        return {
          ...item,
          title: item[titleField] || await translateText(item.title, target),
          description: item[descField] || await translateText(item.description, target),
          expandedDescription: item[expDescField] || await translateText(item.expandedDescription, target)
        };
      }));
      setDisplayData(translated);
      setIsUiTranslating(false);
    }
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">What's Inside Anandwan</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
          Explore the various facilities, industries, and life systems that make Anandwan a thriving, self-sufficient ecosystem.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {displayData.map((item, index) => (
          <div key={index} className="card expandable-card" style={{ display: 'flex', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', height: 'auto', overflow: 'hidden' }}>
            <div className="img-wrapper" style={{ width: '40%' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover' }} 
              />
            </div>
            <div className="card-content" style={{ width: '60%', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>
                  {item.title}
                </h2>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                      onClick={() => setShowAudioMenu(showAudioMenu === index ? null : index)}
                    >
                      {playingIndex === index ? (isTranslating ? '⏳ Translating...' : `⏹ Stop ${playingLang}`) : '🎧 Audio'}
                    </button>
                    
                    {showAudioMenu === index && (
                      <div style={{ 
                        position: 'absolute', 
                        right: '0', 
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
                        <button onClick={() => handleAudioPlay(item, index, 'english')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff', fontSize: '0.8rem' }}>English</button>
                        <button onClick={() => handleAudioPlay(item, index, 'hindi')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', borderBottom: '1px solid #333', color: '#fff', fontSize: '0.8rem' }}>Hindi</button>
                        <button onClick={() => handleAudioPlay(item, index, 'marathi')} style={{ padding: '8px', textAlign: 'left', background: 'transparent', color: '#fff', fontSize: '0.8rem' }}>Marathi</button>
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
              
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                {isUiTranslating ? "Translating description..." : item.description}
              </p>
              
              {expandedIndex === index && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', animation: 'fadeIn 0.4s' }}>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.8', fontWeight: '400' }}>
                    {isUiTranslating ? "Translating full details..." : item.expandedDescription}
                  </p>
                </div>
              )}

              <button 
                className="btn btn-outline" 
                style={{ alignSelf: 'flex-start', marginTop: '1.5rem' }}
                onClick={() => toggleExpand(index)}
              >
                {expandedIndex === index ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsideAnandwan;
