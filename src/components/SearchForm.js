import React, { useState } from 'react';
import './SearchForm.css';

// Barra de pesquisa para nomes de utilizador GitHub
function SearchForm({ onSearch }) {
  // Armazena o nome de utilizador digitado
  const [ghUser, setGhUser] = useState('');

  /* --- Função: Iniciar Pesquisa --- */
  // Envia o nome de utilizador para pesquisa e limpa o campo
  const kickOffSearch = e => {
    e.preventDefault();
    if (ghUser.trim()) {
      onSearch(ghUser);
      setGhUser('');
    }
  };

  return (
    <form onSubmit={kickOffSearch} className="gh-search">
      <input
        type="text"
        value={ghUser}
        onChange={e => setGhUser(e.target.value)}
        placeholder="Nome de utilizador do GitHub"
        className="search-box"
      />
      <button type="submit" className="search-btn">Buscar</button>
    </form>
  );
}

export default SearchForm;