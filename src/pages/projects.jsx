import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  // Fetch first page on mount
  useEffect(() => {
    axios.get('https://alouzious-portfolio.onrender.com/api/projects/')
      .then(res => {
        setProjects(res.data.results);
        setNextPage(res.data.next);
      })
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  // Fetch additional pages on button click
  const fetchProjects = (url) => {
    axios.get(url)
      .then(res => {
        // Filter out duplicates
        const newProjects = res.data.results.filter(
          proj => !projects.some(existing => existing.id === proj.id)
        );

        setProjects(prev => [...prev, ...newProjects]);
        setNextPage(res.data.next || null);
      })
      .catch(err => console.error('Error fetching projects:', err));
  };

  return (
    <section className="projects-section" id="projects">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map(proj => (
          <div key={proj.id} className="project-card">
            <img src={proj.image} alt={proj.title} />
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <a href={proj.github_link} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </div>

      {nextPage && (
        <div className="view-more-wrapper">
          <button onClick={() => fetchProjects(nextPage)} className="view-more">
            View More Projects
          </button>
        </div>
      )}
    </section>
  );
}

export default Projects;
