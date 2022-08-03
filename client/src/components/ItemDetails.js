import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";
import { ItemsDataContext } from "./ItemsDataContext";

const ItemDetails = () => {
  //parmas to correct route/path in App.js
  const { itemId } = useParams();
  const {setPostedItem } = useContext(ItemsDataContext);
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

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
  width: 350px;
  padding-bottom: 25px;
`;

const Price = styled.div`
  padding-right: 15px;
  font-size: 20px;
`;

const PriceAndAdd = styled.div`
  display: flex;
  align-items: center;
`;

const AddToCart = styled.button`
  border: none;
  background-color: var(--color-green);
  padding: 12px 10px;
  color: white;
  cursor: pointer;
  margin-right: 10px;
  border: none;
  padding: 0;
  border-radius: 3px;
  padding: 10px 15px;


  :hover {
  opacity: 90%;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`;


export default ItemDetails;
