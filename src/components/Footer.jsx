const Footer = () => {
  return (
    <footer className="footer">
      <h3>Living Stories of Anandwan</h3>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Preserving the legacy of Baba Amte through real lives and real stories.</p>
      
      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <p style={{ color: 'var(--text-main)', fontWeight: '500', marginBottom: '0.5rem' }}>📍 Location</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Anandwan, Warora, Chandrapur District, Maharashtra, India</p>
        <a 
          href="https://maps.app.goo.gl/GEwveL2GxBvAN9Vu9" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: '0.5rem', color: 'var(--primary)', textDecoration: 'underline', fontSize: '0.9rem' }}
        >
          View on Google Maps
        </a>
      </div>

      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#444' }}>&copy; {new Date().getFullYear()} Anandwan Digital Archival Project. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
