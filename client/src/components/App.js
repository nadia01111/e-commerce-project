import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import HomeFeed from "./HomeFeed";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import ItemDetails from "./ItemDetails";
import Cart from "./Cart";
import Fitness from "./Nav/Fitness";
import Lifestyle from "./Nav/Lifestyle";
import Entertainment from "./Nav/Entertainment";
import Medical from "./Nav/Medical";
import Other from "./Nav/Other";
import Header from "./Header";
import About from "./About";
import SearchResults from "./SearchResults";
import Confirmation from "./Confirmation";
import Checkout from "./Checkout";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <NavBar />
        <Container>
          <Routes>
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/lifestyle" element={<Lifestyle />} />
            <Route path="/entertainment" element={<Entertainment />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/other" element={<Other />} />
            <Route path="/" element={<HomeFeed />} />
            <Route path="/item/:itemId" element={<ItemDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/:search" element={<SearchResults />} />
            <Route path="/orderconfirm" element={<Confirmation/>} />
            <Route path="/checkout" element={<Checkout/>} />
          </Routes>
        </Container>
        <Footer />
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div``;

const Container = styled.div``;
