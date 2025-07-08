import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: #222;
  padding: 1rem;
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #00bcd4;
  }
`;

export default function Navbar() {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products/create">Novo Produto</NavLink>
      <NavLink to="/categories/create">Nova Categoria</NavLink>
    </Nav>
  );
}
