import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { NavLink, useParams } from "react-router-dom";

import { useContext, useState, useEffect } from "react";

//contains all of the items with category entertainment
const Entertainment = () => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`/getItems`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data);
      });
  }, []);

  if (category !== null) {
    //filtered array containing only items with category 'Entertainment'
    const filtered = category?.filter((item) => {
      return item.category === "Entertainment" && item.numInStock !== 0;
    });
    console.log(filtered);
    return (
      <Wrapper>
        {filtered?.map((item) => {
          return (
            <LinkTo key={item._id} to={`/item/${item._id}`}>
              <Wrap>
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
            </LinkTo>
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
  width: 100%;
  margin-top: 10px;
  margin-left: 80px;
  margin-right: 80px;
`;
const Wrap = styled.div`
  border: 1px solid var(--color-navbar-beige);
  width: calc(90vw / 7);
  margin: 5px;
  padding: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const LinkTo = styled(NavLink)``;

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

export default Entertainment;
