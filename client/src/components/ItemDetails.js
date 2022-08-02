import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";

const ItemDetails = () => {
  //parmas to correct route/path in App.js
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  const [postedItem, setPostedItem] = useState(null);

  let nav = useNavigate();

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

  const handleClick = () => {
    nav("/cart");
    fetch("/addItemToCart", {
      method: "POST",
      body: JSON.stringify({
        ...item,
        cartId: JSON.parse(localStorage.getItem(`cartID`)),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostedItem(data.data);
      });
  };

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
          <AddToCart onClick={handleClick}>Add to Cart</AddToCart>
        ) : (
          <AddToCart disabled>Item out of stock</AddToCart>
        )}
      </PriceAndAdd>
      <div style={{ display: "none" }}>
        <Cart postedItem={postedItem} />
      </div>
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
  padding-bottom: 25px;
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
