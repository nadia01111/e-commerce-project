import React from "react";
import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItem, setCartItem] = useState(null);
  const [status, setStatus] = useState("loading");
  const cart = JSON.parse(localStorage.getItem(`cartID`));

  useEffect(() => {
    fetch(`/getCartItems/${cart}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItem(data);
        console.log(data);
        setStatus("idle");
      })
      .catch((err) => {
        setStatus("error");
      });
  }, []);

  if (status === "loading") {
    return <div>loading</div>;
  }

  return <div>cart</div>;
};

export default Cart;
