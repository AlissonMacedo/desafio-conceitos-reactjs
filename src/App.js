import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepository();
  });

  async function loadRepository() {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }

  async function handleAddRepository() {
    const text = {
      title: `Repositorio ${Date.now()}`,
      url:
        "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["React", "React-Native", "NodeJS"],
    };
    const { data } = await api.post("/repositories", text);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li>
            {repository?.title}

            <button onClick={() => handleRemoveRepository(repository?.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
