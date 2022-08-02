import React from "react";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

const Cart = ({ postedItem }) => {
  //all items cintained inside array cartItem
  const [cartItem, setCartItem] = useState(null);
  //used for loading state
  const [status, setStatus] = useState("loading");
  // gets cart ID from local storage and stores it into cart var
  const cart = JSON.parse(localStorage.getItem(`cartID`));

  //contains item recently removed, serves as flag to reluanch useEffect
  const [remove, setRemove] = useState(null);

  // handle to navigate when clicking checkout
  let nav = useNavigate();
  const handleNav = () => {
    nav("/orderconfirm");
  };

  //useEffect for getting items stored inside current cart collection
  useEffect(() => {
    fetch(`/getCartItems/${cart}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItem(data.data);
        console.log(data.data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, [remove, postedItem]);

  //handler for deleting specific item onClick
  const handleDelete = (specificItem) => {
    fetch(`/deleteItemFromCart`, {
      method: "DELETE",
      body: JSON.stringify({
        ...specificItem,
        cartId: cart,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setRemove(data);
      });
  };
  //loading state
  if (status === "loading") {
    return (
      <LoaderWrapper>
        <Icon>
          <FiLoader style={{ height: "30px", width: "30px" }} />
        </Icon>
      </LoaderWrapper>
    );
  }

  return (
    <Wrapper>
      {cartItem.length > 0 ? (
        <CartAndCheckout>
          <PageName>Shopping Cart</PageName>
          <Checkout onClick={handleNav}>Proceed to checkout</Checkout>
        </CartAndCheckout>
      ) : (
        <EmptyCart>Empty Cart</EmptyCart>
      )}
      {cartItem?.map((item) => {
        return (
          <Container>
            <Wrap>
              <Picture>
                <Img src={item.imageSrc}></Img>
              </Picture>
              <NameDelete>
                <ItemName>{item.name}</ItemName>
                {item.numInStock > 0 ? (
                  <InStock>In stock</InStock>
                ) : (
                  <div style={{ color: "gray" }}>out of stock</div>
                )}
                <Delete onClick={() => handleDelete(item)}>
                  Remove from cart
                </Delete>
              </NameDelete>
            </Wrap>
            <Price>{item.price}</Price>
          </Container>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  margin-left: 80px;
  margin-right: 80px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid gray;
`;

const Wrap = styled.div`
  display: flex;
  padding: 25px;
`;

const CartAndCheckout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Checkout = styled.button`
  margin-bottom: 25px;
  margin-right: 80px;
  border: none;
  background: gold;
  padding: 12px 10px;
  border-radius: 5px;
`;

const EmptyCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  width: 100%;
  height: 200px;
`;

const Img = styled.img`
  height: 140px;
  width: 140px;
  padding-bottom: 25px;
`;

const PageName = styled.p`
  font-size: 25px;
  padding-bottom: 25px;
  font-weight: bold;
`;

const ItemName = styled.div``;
const Picture = styled.div``;

const NameDelete = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 25px;
`;

const Delete = styled.button`
  display: flex;
  position: absolute;
  bottom: 0;
  border: none;
  background: none;
  text-decoration: underline;
  cursor: pointer;
`;

const InStock = styled.div`
  color: var(--color-green);
  padding-top: 10px;
`;

const Price = styled.div`
  display: flex;
  padding: 25px 80px 0 0;
  font-weight: bold;
  font-size: 20px;
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

export default Cart;
