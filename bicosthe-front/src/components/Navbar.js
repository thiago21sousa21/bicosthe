import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #f5f5f5;
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  border-bottom: 1px solid #ccc;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;

  &:hover {
    color: #0077cc;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Início</NavLink>
      <NavLink to="/postar">Postar Serviço</NavLink>
      <NavLink to="/login">Entrar</NavLink>
    </Nav>
  );
}
