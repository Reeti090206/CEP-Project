import { useState } from 'react';

const Visit = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '3rem' }}>Request Submitted</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Thank you for your interest in visiting Anandwan. Your request is pending approval. We will contact you soon with pre-visit guidelines.
        </p>
        <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Back to Form</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>Visit Anandwan</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: '#555' }}>
          Experience the spirit of self-reliance and dignity firsthand. Whether you wish to observe, learn, or volunteer, your journey begins here.
        </p>
      </div>
      
      <div className="living-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" required />
          </div>
          
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Type of Visit</label>
              <select className="form-control">
                <option value="individual">Individual</option>
                <option value="group">Group / Organization</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Date</label>
              <input type="date" className="form-control" required />
            </div>
          </div>
          
          <div className="form-group">
            <label>Purpose</label>
            <select className="form-control">
              <option value="awareness">Awareness & Learning</option>
              <option value="volunteer">Volunteering</option>
              <option value="research">Academic / Research</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Message/Notes</label>
            <textarea className="form-control" rows="4" placeholder="Any specific areas of interest..."></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default Visit;
