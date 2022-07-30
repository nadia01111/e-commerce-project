import React from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useContext, useState, useEffect } from "react";

const Lifestyle = () => {
  //contains all of the items with category Lifestyle
  const [category, setCategory] = useState(null);
  useEffect(() => {
    fetch(`/api/getItems`)
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
    return filtered.map((item) => {
      return (
        <>
          <div>item.name</div>
          <div>item.price</div>
          <img src={item.src}></img>
          <div>item.body_location</div>
        </>
      );
    });
  }
};

export default Lifestyle;
