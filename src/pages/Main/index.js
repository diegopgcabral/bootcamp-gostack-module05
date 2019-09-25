import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Form,
  SubmitButton,
  List,
  DetailsButton,
  RemoveButton,
  ClearButton,
} from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
  };

  // Carregar dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      // stringify -> Utilizo pois o localStorage só aceita String...
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    // Evita que o formulário faça o refresh na página
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '')
        throw new Error('É obrigatório indicar um repositório');

      const checkRespoExists = repositories.find(r => r.name === newRepo);

      if (checkRespoExists) throw new Error('Repositório já existe na lista');

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        // Conceito de imutabilidade do React
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  HandleClearList = () => {
    localStorage.clear();

    this.setState({
      repositories: [],
    });
  };

  handleRemove = repository => {
    const { repositories } = this.state;
    const filteredArray = repositories.filter(arrayItem => {
      return arrayItem !== repository;
    });

    this.setState({ repositories: [...filteredArray] });
    localStorage.setItem('repositories', JSON.stringify(repositories));
  };

  render() {
    const { newRepo, repositories, loading, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <DetailsButton>
                  <Link
                    to={`/repository/${encodeURIComponent(repository.name)}`}
                  >
                    Detalhes
                  </Link>
                </DetailsButton>
                <RemoveButton
                  onClick={() => {
                    this.handleRemove(repository);
                  }}
                >
                  Excluir
                </RemoveButton>
              </div>
            </li>
          ))}
        </List>
        <ClearButton onClick={this.HandleClearList}>Limpar Tudo</ClearButton>
      </Container>
    );
  }
}
