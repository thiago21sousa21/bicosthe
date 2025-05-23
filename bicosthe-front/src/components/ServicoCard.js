import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.h3`
  margin: 0 0 8px;
`;

const Valor = styled.p`
  font-weight: bold;
  color: #0077cc;
`;

const Info = styled.p`
  margin: 4px 0;
`;

const Categorias = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
`;

const Categoria = styled.li`
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
`;

const Botao = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #0077cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

export default function ServicoCard({ titulo, valor, bairro, zona, categorias }) {
  return (
    <Card>
      <Titulo>{titulo}</Titulo>
      <Valor>R$ {valor.toFixed(2)}</Valor>
      <Info>{bairro} - Zona {zona}</Info>
      <Categorias>
        {categorias.map((cat, index) => (
          <Categoria key={index}>{cat}</Categoria>
        ))}
      </Categorias>
      <Botao>Ver Detalhes</Botao>
    </Card>
  );
}