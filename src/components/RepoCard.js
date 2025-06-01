import React from 'react';
import './RepoCard.css';

// Cartão individual de um repositório com nome, descrição e estrelas
function RepoCard({ repo }) {
  return (
    <div className="repo-box">
      <h3>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-title">
          {repo.name}
        </a>
      </h3>
      <p className="repo-desc">{repo.description || 'Sem descrição por agora.'}</p>
      <div className="repo-info">
        <span className="stars">⭐ {repo.stargazers_count}</span>
      </div>
    </div>
  );
}

export default RepoCard;
