import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container nature-bg">
      <h1 className="section-title" style={{ textAlign: 'left' }}>My Dashboard</h1>
      
      <div className="grid-3" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Visit Status</h3>
          <div style={{ padding: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', display: 'inline-block', fontWeight: 'bold' }}>
            Approved
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>Scheduled for: Oct 12, 2026</p>
        </div>
        
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Saved Stories</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>3</p>
          <Link to="/memory-wall" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: '500' }}>View saved &rarr;</Link>
        </div>
        
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>My Contributions</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary)' }}>1</p>
          <Link to="/share-story" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: '500' }}>Add new &rarr;</Link>
        </div>
      </div>
      
      <div className="living-form">
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)', marginBottom: '1.5rem' }}>Reflection Journal</h2>
        <div style={{ padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
          <p style={{ fontStyle: 'italic', color: '#555' }}>"Reading about Ramesh's resilience today made me realize the power of community support over isolation. I want to learn more about the agricultural initiatives."</p>
          <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999' }}>- Written on Oct 3, 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
