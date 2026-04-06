import { useState } from 'react';
import StoryCard from '../components/StoryCard';
import { stories } from '../data/dummyData';

const MemoryWall = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStories = stories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    story.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="section-title">Memory Wall</h1>
      
      <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <input 
          type="text" 
          placeholder="Search stories by title or category..." 
          className="form-control"
          style={{ maxWidth: '500px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="form-control" style={{ width: 'auto' }}>
          <option value="">All Categories</option>
          <option value="Resilience">Resilience</option>
          <option value="Empowerment">Empowerment</option>
          <option value="Environment">Environment</option>
        </select>
      </div>

      <div className="grid-3">
        {filteredStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      
      {filteredStories.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '3rem', color: '#666' }}>
          <h3>No stories found matching your criteria.</h3>
        </div>
      )}
    </div>
  );
};

export default MemoryWall;
