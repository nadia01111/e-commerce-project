import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  return (
    <Wrapper>
      <Logo>Store name</Logo>
      <SearchBar />
      <Wrapper1>
        <AiOutlineShoppingCart />
        <About>About</About>
        <LogIn>Login</LogIn>
      </Wrapper1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Wrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
  align-items: center;
`;

const Logo = styled.div``;
const About = styled.div``;
const LogIn = styled.button`
  background: none;
  border: none;
  padding: 0;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px;
  font: inherit;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
`;

export default Header;
