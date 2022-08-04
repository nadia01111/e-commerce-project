import GlobalStyles from "./GlobalStyles";
import { useContext, useState, useEffect } from "react";
import { ItemsDataContext } from "./ItemsDataContext";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

const HomeFeed = () => {
  const { allItems} = useContext(ItemsDataContext);

  /// display 18 random items on home page

  if (allItems) {

    ///create an array of random items & render it
    let randomItemArr = [];
    for (let counter = 0; counter < 18; counter++) {
      let randomIndex = Math.floor(Math.random() * allItems?.length);
      if (!randomItemArr.includes(allItems[randomIndex])) {
        randomItemArr.push(allItems[randomIndex]);
      }
    }
    return (
      <Wrapper>
        {randomItemArr?.map((item) => {
          return (
            <Wrap key={item._id} to={`/item/${item._id}`}>
              <WrapImg>
                <Img src={item.imageSrc}></Img>
              </WrapImg>
              <GrayText>{item.body_location}</GrayText>
              <Text>{item.name}</Text>
              {item.numInStock < 2 ? <GrayText>Low stock</GrayText> : null}
              <Price>
                <strong>{item.price}</strong>
              </Price>
            </Wrap>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <LoaderWrapper>
        <Icon>
          <FiLoader style={{ height: "30px", width: "30px" }} />
        </Icon>
      </LoaderWrapper>
    );
  }
};
const WrapImg = styled.div`
  width: auto;
  height: 150px;
  margin: 10px;
  align-self: flex-start;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  padding-top: 10px;
  padding-left: 80px;
  padding-right: 80px;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled(Link)`
  color: var(--color-black);
  text-decoration: none;
  border: 1px solid var(--color-navbar-beige);
  width: calc(98vw / 7);
  margin: 5px;
  padding: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  align-content: flex-start;
  height: 300px;
  :hover{
    margin-bottom: 3px solid var(--color-navbar-beige);
    
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Price = styled.div`
  font-size: 12px;
  align-self: flex-end;
`;

const GrayText = styled.div`
  font-size: 10px;
  color: grey;
`;

const Text = styled.div`
  font-size: 12px;
  height: 10vh;
`;

const LoaderWrapper = styled.div`
  height: 500px;
`;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;

const Icon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 49%;
  left: 49%;
  animation: ${turning} 1000ms infinite linear;
`;

export default HomeFeed;
