import { useState } from 'react';
import { experienceScenarios } from '../data/dummyData';

const Experience = () => {
  const [step, setStep] = useState(0); // 0: Intro, 1: Questions, 2: Final
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const scenario = experienceScenarios[0];

  const handleOptionSelect = () => {
    if (currentQuestionIndex < scenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep(2);
    }
  };

  const restartExperience = () => {
    setStep(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="sim-container" style={{ width: '100%', border: '1px solid var(--border-light)' }}>
        
        {step === 0 && (
          <div>
            <h1 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '3.5rem' }}>Step Into Their Shoes</h1>
            <h2 style={{ marginBottom: '2rem', fontWeight: '400', color: 'var(--text-main)' }}>Scenario: {scenario.title}</h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
              Experience the decisions and realities faced by the residents of Anandwan.
            </p>
            <button className="btn btn-primary" onClick={() => setStep(1)} style={{ padding: '15px 40px', fontSize: '1.2rem' }}>
              Begin Experience
            </button>
          </div>
        )}

        {step === 1 && (
          <div style={{ textAlign: 'left' }}>
            <h2 className="sim-question" style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{scenario.questions[currentQuestionIndex].situation}</h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Question {currentQuestionIndex + 1} of {scenario.questions.length}</p>
            <div className="sim-options">
              {scenario.questions[currentQuestionIndex].options.map((opt, idx) => (
                <button 
                  key={idx} 
                  className="sim-btn"
                  onClick={handleOptionSelect}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>{scenario.realStoryTitle}</h2>
            <img src={scenario.realStoryImage} alt="Real outcome" style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '2rem', border: '1px solid var(--border-light)' }} />
            
            <p style={{ fontSize: '1.2rem', marginBottom: '3rem', lineHeight: '1.8', color: 'var(--text-main)' }}>{scenario.realStory}</p>
            
            <hr style={{ borderColor: 'var(--border-light)', marginBottom: '2rem' }} />
            
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Reflection: How does this change your perspective?</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
               <button className="btn btn-outline"  onClick={restartExperience}>Restart Experience</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Experience;
