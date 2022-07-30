import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
    
const [screenWidth, setScreenWidth] = useState(window.screen.width);
console.log(screenWidth)
    

  return (
    <Wrapper onChange={()=>setScreenWidth(window.screen.width)}>
      <Logo to="/"><h1>GFKN</h1></Logo>
      <SearchBar />
    {screenWidth>600
        ?<Wrapper1>
            <Cart to="/about"><AiOutlineShoppingCart/></Cart>
            <About to="/about"><h4>About</h4></About>
            <LogIn to="/login"><h4>Login</h4></LogIn>
        </Wrapper1>
        :<Menu><AiOutlineMenu/></Menu>
        }
      
    </Wrapper>
  );
};

const Menu = styled.div`

`;
const Cart = styled(Link)`
color:inherit;
:hover{
    display: inline;
    border-bottom: 3px solid var(--color-navbar-beige);
}
`;
const Wrapper = styled.div`
  height: 80px;
  width: 100vw;;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
  
`;
const Wrapper1 = styled.div`
  display: flex;
  justify-content: space-around;
  width: 30%;
  align-items: center;
`;

const Logo = styled(NavLink)`
margin-left:40px;
text-decoration:none;
color:black;
cursor: pointer;
`;
const About = styled(NavLink)`
text-decoration:none;
color:black;
:hover {
    display: inline;
    border-bottom: 3px solid var(--color-navbar-beige);

}
`;

const LogIn = styled(NavLink)`
color:black;
text-decoration:none;
margin-right:10px;
  background: none;
  border: none;
  padding: 0;
  border: 1px solid black;
  border-radius: 3px;
  padding: 5px 15px;
  font: inherit;
  cursor: pointer;
  :hover {
    background-color: black;
    color: var(--color-navbar-beige);

  }
`;

export default Header;
