import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

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
    const filtered = category.filter((item) => {
      return item.category === "Entertainment" && item.numInStock !== 0;
    });
    return (
      <Wrapper>
        {filtered.map((item) => {
          return (
            <Wrap>
              <img src={item.imageSrc}></img>
              <div>{item.name}</div>
              <div>{item.body_location}</div>
              <div>{item.price}</div>
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

export default Entertainment;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
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
