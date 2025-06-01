import React from 'react';
import RepoCard from './RepoCard';
import './RepoList.css';

// Mostra uma grelha de cartões de repositórios
function RepoList({ repos: repoList, hasSearched: didSearch }) {
  return (
    <div className="repos-grid">
      {repoList.length ? (
        repoList.map(repo => <RepoCard key={repo.id} repo={repo} />)
      ) : (
        didSearch && <p className="no-repos">Sem repositórios para mostrar.</p>
      )}
    </div>
  );
}

export default RepoList;
