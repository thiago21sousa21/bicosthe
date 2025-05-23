import { useState } from 'react';
import ServicoCard from '../components/ServicoCard.js';
import FiltroServicos from '../components/FiltroServicos.js';
import styled from 'styled-components';

const mockServicos = [
  {
    id: 1,
    titulo: 'Pintar parede da sala',
    descricao: 'Preciso pintar uma parede de 4m x 3m',
    valor: 150,
    bairro: 'Centro',
    zona: 'centro',
    categorias: ['Pintura', 'Reforma']
  },
  {
    id: 2,
    titulo: 'Consertar torneira',
    descricao: 'Torneira do banheiro está pingando',
    valor: 50,
    bairro: 'Dirceu',
    zona: 'sudeste',
    categorias: ['Hidráulica']
  },
  {
    id: 3,
    titulo: 'Cortar grama do quintal',
    descricao: 'Quintal de 10x10m',
    valor: 80,
    bairro: 'Ilhotas',
    zona: 'sul',
    categorias: ['Jardinagem']
  },
];

const FeedContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  const [filtros, setFiltros] = useState({
    bairro: '',
    zona: '',
    categoria: '',
    valorMaximo: ''
  });

  const bairros = [...new Set(mockServicos.map(s => s.bairro))];
  const zonas = [...new Set(mockServicos.map(s => s.zona))];
  const categorias = [...new Set(mockServicos.flatMap(s => s.categorias))];

  const servicosFiltrados = mockServicos.filter(s => {
    return (
      (!filtros.bairro || s.bairro === filtros.bairro) &&
      (!filtros.zona || s.zona === filtros.zona) &&
      (!filtros.categoria || s.categorias.includes(filtros.categoria)) &&
      (!filtros.valorMaximo || s.valor <= parseFloat(filtros.valorMaximo))
    );
  });

  return (
    <FeedContainer>
      <FiltroServicos
        filtros={filtros}
        setFiltros={setFiltros}
        opcoes={{ bairros, zonas, categorias }}
      />
      {servicosFiltrados.map(servico => (
        <ServicoCard key={servico.id} {...servico} />
      ))}
    </FeedContainer>
  );
}