import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useContext, useState, useEffect } from "react";

//contains all of the items with category Fitness
const Fitness = () => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`/getItems`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data);

        console.log(data);
      });
  }, []);

  if (category !== null) {
    //filtered array containing only items with category 'Fitness'
    const filtered = category.filter((item) => {
      return item.category === "Fitness" && item.numInStock !== 0;
    });
    return filtered.map((item) => {
      return (
        <>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <img src={item.imageSrc}></img>
          <div>{item.body_location}</div>
        </>
      );
    });
  } else {
    return (
      <Icon>
        <FiLoader style={{ height: "30px", width: "30px" }} />
      </Icon>
    );
  }
};

export default Fitness;

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