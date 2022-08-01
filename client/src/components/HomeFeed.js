import GlobalStyles from "./GlobalStyles";
import { useContext, useState, useEffect } from "react";
import { ItemsDataContext } from "./ItemsDataContext";
import styled from "styled-components";

const HomeFeed = () => {

const {allItems,setAllItems} = useContext(ItemsDataContext);

/// display 18 random items on home page

if (allItems) {
  let randomItemArr = [];
  for (let counter = 0; counter < 18; counter++) {
    let randomIndex = Math.floor(Math.random() * allItems?.length);
    if (!randomItemArr.includes(allItems[randomIndex])){
      randomItemArr.push(allItems[randomIndex])}
    }
  return (
    
    <Wrapper>
          {randomItemArr?.map((item) => {
            return (
            <Wrap>
              <WrapImg>
                <Img src={item.imageSrc}></Img>
              </WrapImg>
              <GrayText>{item.body_location}</GrayText>
              <Text>{item.name}</Text>
              {item.numInStock<2 
              ? <GrayText>Low stock</GrayText>:null}
              <Price>
                <strong>{item.price}</strong>
              </Price>
            </Wrap>)
          })}
    </Wrapper>
  );
 } else {return <div>Loading</div>}
};
const WrapImg = styled.div`
width: auto;
height:150px;
margin: 10px;
align-self:flex-start;
display: flex;
justify-content: center;
align-items: center;
`;

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
margin-top: 10px;
margin-left: 80px;
margin-right: 80px;

`;
const Wrap = styled.div`
border: 1px solid var(--color-navbar-beige);
width: calc(90vw/7);
margin: 5px;
padding:5px;
overflow: hidden;
display: flex;
flex-direction: column;
align-items:flex-start;
justify-content: space-between;
align-content: flex-start;
`;
const Img = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
`;

const Price = styled.div`
font-size: 12px;
align-self:flex-end;
`;

const GrayText = styled.div`
font-size: 10px;
color: grey;
`;

const Text = styled.div`
font-size: 12px;
height: 10vh;
`;
export default HomeFeed;
