import styled from "styled-components";
import { NavLink } from "react-router-dom";

//Path links to specific categories in Navbar
const NavBar = () => {
  return (
    <Wrapper>
      <Nav>
        <Options to="/fitness">Fitness</Options>
        <Options to="/lifestyle">Lifestyle</Options>
        <Options to="/entertainment">Entertainment</Options>
        <Options to="/medical">Medical</Options>
        <Options to="/other">Other</Options>
      </Nav>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 6px -6px gray;
  font-weight: bold;
  background: var(--color-navbar-beige);
  box-shadow: 1px 6px 6px -6px gray;
  width: 100%;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
`;

const Options = styled(NavLink)`
  background-color: transparent;
  font-size: 15px;
  border: none;
  display: flex;
  text-align: center;
  padding: 10px 20px;
  /* border-bottom: 1px solid grey; */
  cursor: pointer;
  color: black;
  opacity: 0.6;
  text-decoration: none;

  &:hover {
    color: black;
    opacity: 1;
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }

  &.active {
    color: var(--color-green);
    opacity: 1;
  }
`;
