import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ItemsDataContext } from "./ItemsDataContext";

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const { cartItems } = useContext(ItemsDataContext);
  return (
    <Wrapper>
      <Logo to="/">
        <h1>GFKN</h1>
      </Logo>
      <SearchBar />
      {screenWidth > 600 ? (
        <Wrapper1>
          <Cart to="/cart">
            {cartItems?.length > 0 ? (
              <ItemInTheCart>
                <Num>{cartItems?.length}</Num>
              </ItemInTheCart>
            ) : null}
            <AiOutlineShoppingCart size="35px" />
          </Cart>
          <About to="/about">
            <h4>About</h4>
          </About>
          <Btn to="/orderconfirm">
            <h4>Orders</h4>
          </Btn>
          <Btn to="/login">
            <h4>Login</h4>
          </Btn>
        </Wrapper1>
      ) : (
        <Menu>
          <AiOutlineMenu />
        </Menu>
      )}
    </Wrapper>
  );
};

const Menu = styled.div``;

const ItemInTheCart = styled.div`
  border-radius: 2px;
  color: white;
  border-left: 3.7px solid transparent;
  border-right: 3.9px solid transparent;
  border-top: 11px solid var(--color-green);
  width: 16px;
  height: 5px;
  display: flex;
  position: relative;
  left: 32px;
  top: -1px;
`;
const Num = styled.div`
  color: white;
  position: relative;
  font-weight: bold;
  font-size: 9px;
  left: 5px;
  top: -11px;
`;

const Cart = styled(Link)`
  /* overflow: hidden; */
  text-decoration: none;
  display: flex;
  align-content: center;
  align-items: baseline;
  width: inherit;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: center;
  color: inherit;
  :hover {
  }
`;
const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
`;
const Wrapper1 = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  align-items: center;
`;

const Logo = styled(NavLink)`
  margin-left: 40px;
  text-decoration: none;
  color: var(--color-black);
  cursor: pointer;
`;
const About = styled(NavLink)`
  text-decoration: none;
  color: var(--color-black);
  padding-right: 4px;
  :hover {
    display: inline;
    border-bottom: 3px solid var(--color-navbar-beige);
  }
`;

const Btn = styled(NavLink)`
  color: var(--color-black);
  text-decoration: none;
  margin-right: 10px;
  background: none;
  border: none;
  padding: 0;
  border: 1px solid var(--color-black);
  border-radius: 3px;
  padding: 5px 12px;
  font: inherit;
  cursor: pointer;
  :hover {
    background-color: var(--color-black);
    color: var(--color-navbar-beige);
  }
`;

export default Header;
