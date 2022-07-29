import styled from "styled-components";

const NavBar = () => {
  return (
    <Wrapper>
      <Nav>
        <Options>Fitness</Options>
        <Options>Lifestyle</Options>
        <Options>Entertainment</Options>
        <Options>Medical</Options>
        <Options>Other</Options>
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
  width: 100vw;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
`;

const Options = styled.button`
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

  &:hover {
    color: black;
    opacity: 1;
    border-bottom: 1px solid black;
    margin-bottom: -1px;
  }

  &.active {
    color: blue;
    border-radius: 35px;
  }
`;
