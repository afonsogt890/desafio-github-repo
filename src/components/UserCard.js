import React from 'react';
import './UserCard.css';

// Exibe informações do utilizador GitHub com avatar e estatísticas
function UserCard({ user }) {
  return (
    <div className="user-profile">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="profile-pic"
      />
      <div className="user-details">
        <h2 className="username">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            {user.login}
          </a>
        </h2>
        <p className="bio">{user.bio || 'Sem Bio.'}</p>
        <div className="stats">
          <span className="followers">Seguidores: {user.followers}</span>
          <span className="repos">Repos: {user.public_repos}</span>
        </div>
      </div>
    </div>
  );
}

export default UserCard;