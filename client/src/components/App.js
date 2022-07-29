import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import HomeFeed from "./HomeFeed";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import ItemDetails from "./ItemDetails";
import Cart from "./Cart";
import Header from "./Header";

const App = () => {
  return (
    <Router>
      {/* <GlobalStyles /> */}
      <Wrapper>
        <Header/>
        {/* <NavBar /> */}
        <Container>
          <Routes>
            {/* <Route path="/" element={<HomeFeed />} />
            <Route path="/item/:itemId" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </Container>
        {/* <Footer /> */}
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div``;

const Container = styled.div``;
