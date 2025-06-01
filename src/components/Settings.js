import React, { useState } from 'react';
import { GearIcon } from '@primer/octicons-react';
import './Settings.css';

// Popup para inserir o token de acesso pessoal (PAT)
function Settings({ setGithubToken }) {
  // Controla a visibilidade do popup
  const [isOpen, setIsOpen] = useState(false);
  const [pat, setPat] = useState('');

  /* --- Função: Guardar Token --- */
  // Salva o token e fecha o popup
  const saveToken = () => {
    setGithubToken(pat.trim());
    setIsOpen(false);
    setPat('');
  };

  return (
    <div className="token-settings">
      <button
        className="gear-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Ajustar token"
      >
        <GearIcon size={16} />
      </button>
      {isOpen && (
        <div className="token-popup">
          <input
            type="password"
            value={pat}
            onChange={e => setPat(e.target.value)}
            placeholder="Coloca o teu token do GitHub"
            className="pat-field"
          />
          <button className="save-btn" onClick={saveToken}>
            Ok
          </button>
        </div>
      )}
    </div>
  );
}

export default Settings;