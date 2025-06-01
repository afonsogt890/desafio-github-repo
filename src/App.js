import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import RepoList from './components/RepoList';
import UserCard from './components/UserCard';
import SettingsCard from './components/Settings';

// Componente principal da aplicação
// Faz manage ao estado e coordena a pesquisa dos repositórios do GitHub
function App() {
  const [appData, setAppData] = useState({
    repoList: [],
    githubUser: null,
    errorMsg: '',
    isLoadingRepos: false,
    hasSearched: false,
    patToken: '',
    pageNum: 1,
    moreToLoad: false
  });

  /* --- Função Principal: Load Repositórios --- */
  // Da load aos dados do utilizador e os seus repositórios da API GitHub
  // Parâmetros: username (nome do utilizador), page (página da API), addMore (adiciona ou substitui repositórios)
  const loadUserRepos = async (username, page = 1, addMore = false) => {
    console.log(`Test ${username}...`);
    if (page === 1) {
      setAppData({
        ...appData,
        errorMsg: '',
        repoList: [],
        githubUser: null,
        hasSearched: true,
        isLoadingRepos: true
      });
    }

    const headers = {
      Accept: 'application/vnd.github+json',
      ...(appData.patToken && { Authorization: `token ${appData.patToken}` })
    };

    try {
      // Procura os dados do utilizador apenas na primeira página
      if (page === 1) {
        const userResp = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userResp.ok) {
          const errMsg = userResp.status === 403
            ? 'Ups, limite de pedidos atingido! Tenta usar um token nas definições.'
            : 'Esse utilizador não existe...';
          throw new Error(errMsg);
        }
        const userInfo = await userResp.json();
        setAppData(prev => ({ ...prev, githubUser: userInfo }));
      }

      // Procura os repositórios após obter os dados do utilizador
      setAppData(prev => ({ ...prev, isLoadingRepos: true }));
      const repoUrl = `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`;
      const repoResp = await fetch(repoUrl, { headers });
      if (!repoResp.ok) {
        throw new Error(repoResp.status === 403
          ? 'Limite de pedidos excedido! Adiciona um token.'
          : 'Erro ao carregar repositórios.');
      }
      const repos = await repoResp.json();

      setAppData(prev => ({
        ...prev,
        repoList: addMore ? [...prev.repoList, ...repos] : repos,
        pageNum: page,
        moreToLoad: repos.length === 100,
        isLoadingRepos: false
      }));
    } catch (err) {
      setAppData(prev => ({
        ...prev,
        errorMsg: err.message,
        repoList: page === 1 ? [] : prev.repoList,
        githubUser: page === 1 ? null : prev.githubUser,
        isLoadingRepos: false
      }));
    }
  };

  /* --- Função getNextRepos: Carregar Mais Repositórios --- */
  // Procura a próxima página de repositórios do utilizador atual
  const getNextRepos = () => {
    if (appData.githubUser && appData.moreToLoad) {
      loadUserRepos(appData.githubUser.login, appData.pageNum + 1, true);
    }
  };

  /* --- Função update: Atualizar Token --- */
  // Define o token de acesso pessoal (PAT) para a API
  const updateToken = token => {
    setAppData(prev => ({ ...prev, patToken: token.trim() }));
  };

  /* --- Função startNewSearch: Iniciar Pesquisa --- */
  // Inicia uma nova pesquisa por utilizador
  const startNewSearch = username => loadUserRepos(username, 1, false);

  return (
    <div className="App">
      <h1>Explorador de Repositórios do GitHub</h1>
      <div className="search-container">
        <SearchForm onSearch={startNewSearch} />
        <SettingsCard setGithubToken={updateToken} />
      </div>
      {appData.githubUser && appData.isLoadingRepos && (
        <p className="loading">A carregar repos de {appData.githubUser.login}...</p>
      )}
      {appData.errorMsg && <p className="error">{appData.errorMsg}</p>}
      {appData.githubUser && <UserCard user={appData.githubUser} />}
      <RepoList repos={appData.repoList} hasSearched={appData.hasSearched} />
      {appData.githubUser && appData.repoList.length > 0 && appData.moreToLoad && !appData.isLoadingRepos && (
        <button className="load-more-btn" onClick={getNextRepos}>
          Ver Mais
        </button>
      )}
    </div>
  );
}

export default App;