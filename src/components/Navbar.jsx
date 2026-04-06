import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Anandwan Stories</Link>
      <ul className="nav-links">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/inside" className={isActive('/inside')}>Inside Anandwan</Link></li>
        <li><Link to="/memory-wall" className={isActive('/memory-wall')}>Memory Wall</Link></li>
        <li><Link to="/experience" className={isActive('/experience')}>Experience</Link></li>
        <li><Link to="/share-story" className={isActive('/share-story')}>Share Feedback</Link></li>
        <li><Link to="/visit" className={isActive('/visit')}>Visit</Link></li>
        <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
