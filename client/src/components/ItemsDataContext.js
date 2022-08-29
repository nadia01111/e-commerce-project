import { createContext, useContext, useEffect, useState } from "react";


export const ItemsDataContext = createContext(null);


export const ItemsDataProvider = ({ children }) => {

  const [allItems, setAllItems] = useState(null); //all items for rendering 
  const [item, setItem] = useState(null); // exact item 
  const [cartItems, setCartItems] = useState(null);
  const [boolean, setBoolean] = useState(false);
  const cartId = localStorage.getItem("cartID");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNummber: "",
  });
  const [postedItem, setPostedItem] = useState(null);


  //get all items fetch
    useEffect(() => {
    fetch(`/getItems`)
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data.data);
      });
  }, []);
  
  
  //create new unique cart fetch
  useEffect(() => {
    if (cartId === null) {
      fetch(`/createCart`)
        .then((res) => res.json())
        .then((data) => {
          JSON.stringify(
            localStorage.setItem("cartID", JSON.stringify(data.data.insertedId))
          );
        });
    }
  }, [boolean]);


/// handleClick to add item in the cart
  const handleClick = () => {
    fetch("/savePalette", {
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


  return (
    <ItemsDataContext.Provider
      value={{
        allItems,
        setAllItems,
        userData,
        setUserData,
        postedItem,
        setPostedItem,
        cartItems,
        setCartItems,
        boolean,
        setBoolean,
        handleClick
      }}
    >
      {children}
    </ItemsDataContext.Provider>
  );
};
