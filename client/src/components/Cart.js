import React from "react";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const Cart = ({ postedItem }) => {
  const [cartItem, setCartItem] = useState(null);
  const [status, setStatus] = useState("loading");
  const cart = JSON.parse(localStorage.getItem(`cartID`));

  const [remove, setRemove] = useState(null);

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

  const handleDelete = () => {
    console.log(cartItem);
    fetch(`/deleteItemToCart`, {
      method: "DELETE",
      body: JSON.stringify({
        data: cartItem._id,
        cartId: cart,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setRemove(data);
      });
  };

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
        <PageName>Shopping Cart</PageName>
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
                <Delete onClick={handleDelete}>Remove from cart</Delete>
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
