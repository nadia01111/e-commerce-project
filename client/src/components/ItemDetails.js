import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ItemDetails = () => {
  //parmas to correct route/path in App.js
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  //fetch to specific item id.
  useEffect(() => {
    fetch(`/getItem/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        console.log(data.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, [itemId]);

  if (status === "loading") {
    return <div>loading</div>;
  }

  return (
    <Wrapper>
      <Name>
        <strong>{item.name}</strong>
      </Name>
      <Location>Goes on {item.body_location}</Location>
      <Img src={item.imageSrc}></Img>
      <PriceAndAdd>
        <Price>
          <strong>{item.price}</strong>
        </Price>
        {item.numInStock > 0 ? (
          <AddToCart>Add to Cart</AddToCart>
        ) : (
          <AddToCart disabled>Item out of stock</AddToCart>
        )}
      </PriceAndAdd>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 100px;
  padding-top: 25px;
`;

const Name = styled.div``;

const Location = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Img = styled.img`
  height: 400px;
  width: 400px;
`;

const Price = styled.div`
  padding-right: 15px;
  font-size: 25px;
`;

const PriceAndAdd = styled.div`
  display: flex;
  align-items: center;
`;

const AddToCart = styled.button`
  border: none;
  background-color: green;
  padding: 12px 10px;
  color: white;
  cursor: pointer;

  &:disbaled {
    cursor: not-allowed;
  }
`;

export default ItemDetails;
