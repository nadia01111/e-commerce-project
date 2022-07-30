import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";

const Lifestyle = () => {
  //contains all of the items with category Lifestyle
  const [category, setCategory] = useState(null);
  useEffect(() => {
    fetch(`/getItems`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data);
      });
  }, []);

  if (category !== null) {
    //filtered array containing only items with category 'Lifestyle'
    const filtered = category.filter((item) => {
      return item.category === "Lifestyle" && item.numInStock !== 0;
    });
    return (
      <Wrapper>
        {filtered.map((item) => {
          return (
            <Wrap>
              <WrapImg>
                <Img src={item.imageSrc}></Img>
              </WrapImg>
              <Name>{item.name}</Name>
              <Location>{item.body_location}</Location>
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
      <Icon>
        <FiLoader style={{ height: "30px", width: "30px" }} />
      </Icon>
    );
  }
};

export default Lifestyle;

const WrapImg = styled.div`
  display: flex;
  justify-content: center;
`;

const Price = styled.div`
  font-size: 20px;
`;

const Location = styled.div`
  padding-bottom: 10px;
`;

const Name = styled.div`
  padding-bottom: 10px;
`;

const Img = styled.img`
  height: 150px;
  width: 150px;
  padding-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid black;
  margin: 20px;
  padding: 15px;
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
