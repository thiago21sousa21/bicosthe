import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #0d0d0d;
  color: #f0f0f0;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: #111;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  color: #00ffff;
  text-shadow: 0 0 5px #00ffff;
`;

const Filtros = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #1a1a1a;

  select, input {
    background-color: #111;
    color: #fff;
    border: 1px solid #444;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

const ServicosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const Card = styled.div`
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #333;
  box-shadow: 0 0 10px #00ffff20;

  h3 {
    color: #00ffff;
    margin-top: 0;
  }

  p {
    margin: 0.2rem 0;
  }
`;

export default function FeedDeServicos() {
  const [categorias, setCategorias] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [filtros, setFiltros] = useState({
    zona: '',
    bairro: '',
    valor: '',
    categoria: ''
  });

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const response = await axios.get('http://localhost:3000/categorias');
        setCategorias(response.data);
      } catch (e) {
        console.error("Erro ao carregar categorias", e);
      }
    }

    carregarCategorias();
  }, []);

  useEffect(() => {
    async function carregarServicos() {
      try {
        const response = await axios.get('http://localhost:3000/servicos');
        let filtrados = response.data.filter(servico => {
          const zonaOk = !filtros.zona || servico.zona === filtros.zona;
          const bairroOk = !filtros.bairro || (servico.bairro || '').toLowerCase().includes(filtros.bairro.toLowerCase());
          const valorOk = !filtros.valor || servico.valor <= parseFloat(filtros.valor);
          const categoriaOk = !filtros.categoria || servico.idcategoria == filtros.categoria;
          return zonaOk && bairroOk && valorOk && categoriaOk;
        });
        setServicos(filtrados);
      } catch (e) {
        console.error("Erro ao buscar serviços", e);
      }
    }

    carregarServicos();
  }, [filtros]);

  function handleChange(e) {
    const { id, value } = e.target;
    setFiltros(prev => ({ ...prev, [id]: value }));
  }

  return (
    <Container>
      <Header>Feed de Serviços</Header>

      <Filtros>
        <select id="zona" value={filtros.zona} onChange={handleChange}>
          <option value="">Todas as zonas</option>
          <option value="norte">Norte</option>
          <option value="sul">Sul</option>
          <option value="leste">Leste</option>
          <option value="sudeste">Sudeste</option>
          <option value="centro">Centro</option>
        </select>

        <input id="bairro" type="text" placeholder="Bairro" value={filtros.bairro} onChange={handleChange} />
        <input id="valor" type="number" placeholder="Valor máx." value={filtros.valor} onChange={handleChange} />

        <select id="categoria" value={filtros.categoria} onChange={handleChange}>
          <option value="">Todas as categorias</option>
          {categorias.map(cat => (
            <option key={cat.idcategoria} value={cat.idcategoria}>
              {cat.nome}
            </option>
          ))}
        </select>
      </Filtros>

      <ServicosGrid>
        {servicos.map(servico => (
          <Card key={servico.idservico}>
            <h3>{servico.titulo}</h3>
            <p><strong>Descrição:</strong> {servico.descricao}</p>
            <p><strong>Valor:</strong> R$ {servico.valor.toFixed(2)}</p>
            <p><strong>Zona:</strong> {servico.zona || '-'}</p>
            <p><strong>Bairro:</strong> {servico.bairro || '-'}</p>
          </Card>
        ))}
      </ServicosGrid>
    </Container>
  );
}
