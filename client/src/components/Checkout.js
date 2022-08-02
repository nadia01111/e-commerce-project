import React from "react";
import { useEffect, useState, useContext } from "react";
import { ItemsDataContext } from "./ItemsDataContext";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  // for setting user data for conf page + amount cost-------------------
  const { userData, setUserData, cartItems, boolean, setBoolean } =
    useContext(ItemsDataContext);

  //flag for rendering total after delay
  const [flag, setFlag] = useState(false);
  // gets cart ID from local storage and stores it into cart var---------
  const cart = JSON.parse(localStorage.getItem(`cartID`));
  const nav = useNavigate();

  const handleCheckout = () => {
    fetch("/goToCheckOut", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartId: cart }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setFlag(!flag);
    }, 1500);
  }, []);

  if (cartItems === null) {
    return (
      <Icon>
        <FiLoader style={{ height: "30px", width: "30px" }} />
      </Icon>
    );
  } else {
    //gets the prices of all items inside cart
    const arrOfCost = cartItems.map((item) => {
      return (
        Number(item.price.replace(/[^0-9.-]+/g, "")) * Number(item.amountBought)
      );
    });
    console.log(arrOfCost);

    let cost = 0;
    for (let x = 0; x <= arrOfCost.length - 1; x++) {
      cost += arrOfCost[x];
    }

    return (
      <>
        {flag ? (
          <Total>{`Your total is $${cost} .`}</Total>
        ) : (
          <Div>computing...</Div>
        )}
        <Instruc>
          Please enter your credentials in the assigned regions below.
        </Instruc>
        <Form
          onSubmit={() => {
            localStorage.removeItem("cartID");
            setBoolean(!boolean);
            handleCheckout();
            setUserData({
              name: "",
              lastName: "",
              email: "",
              address: "",
              phoneNummber: "",
            });
            nav("/orderconfirm");
          }}
        >
          <Input
            type="text"
            placeholder="First Name"
            onChange={(ev) => {
              setUserData({ ...userData, firstName: ev.target.value });
            }}
          ></Input>
          <Input
            type="text"
            placeholder="Last Name"
            onChange={(ev) => {
              setUserData({ ...userData, lastName: ev.target.value });
            }}
          ></Input>
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(ev) => {
              setUserData({ ...userData, email: ev.target.value });
            }}
          ></Input>
          <Input
            type="text"
            placeholder="Address"
            onChange={(ev) => {
              setUserData({ ...userData, email: ev.target.value });
            }}
          ></Input>
          <Input
            type="tel"
            placeholder="Cell"
            onChange={(ev) => {
              setUserData({ ...userData, email: ev.target.value });
            }}
          ></Input>
          <Conf
            // disabled={}
            type="submit"
            value="Confirm"
          ></Conf>
        </Form>
      </>
    );
  }
};

export default Checkout;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 25px;
  font-weight: 700;
`;
const totalFade = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
`;

const totalspin = keyframes`
        0% {
            transform: rotate(0deg)
        }

        100% {
            transform: rotate(1080deg);
        }
    `;

const Instruc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  margin-top: 15px;
  animation: ${totalFade} 3000ms;
`;

const Total = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-size: 25px;
  font-weight: 700;
  animation: ${totalspin} 500ms;
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

const Conf = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 248px;
  height: 36px;
  font-size: 20px;
  background-color: #d80026;
  color: white;
  border-radius: 0px;
  border: 1px solid #d80026;
  margin-top: 4px;
  &:disabled {
    opacity: 0.3;
  }
`;
const Input = styled.input`
  display: flex;
  width: 220px;
  height: 32px;
  border-radius: 0px;
  margin: 4px 0px;

  &:hover {
    border: 2px solid pink;
  }
  &:focus {
    border: 2px solid pink;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-green);
  height: 300px;
  width: 360px;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 30px;
  animation: ${totalFade} 1000ms;
`;
