import styled from 'styled-components';

const FiltroContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export default function FiltroServicos({ filtros, setFiltros, opcoes }) {
  return (
    <FiltroContainer>
      <Select
        value={filtros.bairro}
        onChange={(e) => setFiltros(prev => ({ ...prev, bairro: e.target.value }))}
      >
        <option value="">Todos os Bairros</option>
        {opcoes.bairros.map((b, i) => <option key={i} value={b}>{b}</option>)}
      </Select>

      <Select
        value={filtros.zona}
        onChange={(e) => setFiltros(prev => ({ ...prev, zona: e.target.value }))}
      >
        <option value="">Todas as Zonas</option>
        {opcoes.zonas.map((z, i) => <option key={i} value={z}>{z}</option>)}
      </Select>

      <Select
        value={filtros.categoria}
        onChange={(e) => setFiltros(prev => ({ ...prev, categoria: e.target.value }))}
      >
        <option value="">Todas as Categorias</option>
        {opcoes.categorias.map((c, i) => <option key={i} value={c}>{c}</option>)}
      </Select>

      <Input
        type="number"
        placeholder="Valor máximo"
        value={filtros.valorMaximo}
        onChange={(e) => setFiltros(prev => ({ ...prev, valorMaximo: e.target.value }))}
      />
    </FiltroContainer>
  );
}
