import { useState } from 'react';

const ShareStory = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '3rem' }}>Thank You!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Your living story has been added to our archives. It will soon be part of the Memory Wall.</p>
        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Share Another Story</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="section-title">Share Your Experience / Feedback</h1>
      
      <div className="living-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ marginBottom: '2rem', color: '#666' }}>Help us preserve the rich history of Anandwan by sharing authentic experiences, photos, and memories.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" className="form-control" placeholder="E.g. Priya Sharma" required />
            </div>
            <div className="form-group">
              <label>Who is this story about?</label>
              <input type="text" className="form-control" placeholder="Name of the person" required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Story Title</label>
            <input type="text" className="form-control" placeholder="A brief, catchy title" required />
          </div>
          
          <div className="form-group">
            <label>Short Description</label>
            <input type="text" className="form-control" placeholder="1-2 sentences summarizing the story" required />
          </div>
          
          <div className="form-group">
            <label>Full Story</label>
            <textarea className="form-control" rows="6" placeholder="Write their journey here..." required></textarea>
          </div>
          
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" className="form-control" accept="image/*" />
            </div>
            <div className="form-group">
              <label>Upload Audio (Optional)</label>
              <input type="file" className="form-control" accept="audio/*" />
            </div>
          </div>
          
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Language</label>
              <select className="form-control">
                <option value="english">English</option>
                <option value="marathi">Marathi</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tags (Comma separated)</label>
              <input type="text" className="form-control" placeholder="E.g. Resilience, Art, Agriculture" />
            </div>
          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button type="submit" className="btn btn-secondary" style={{ width: '100%', padding: '15px' }}>Submit Story to Memory Wall</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareStory;
