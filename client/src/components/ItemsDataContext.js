import { createContext, useEffect, useState } from "react";

export const ItemsDataContext = createContext(null);

export const ItemsDataProvider = ({ children }) => {
  const [allItems, setAllItems] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNummber: "",
  });
  const [postedItem, setPostedItem] = useState(null);
  const cartId = localStorage.getItem("cartID");

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
  }, []);

  useEffect(() => {
    fetch(`/getItems`)
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data.data);
      });
  }, []);

  return (
    <ItemsDataContext.Provider
      value={{
        allItems,
        setAllItems,
        userData,
        setUserData,
        postedItem,
        setPostedItem,
      }}
    >
      {children}
    </ItemsDataContext.Provider>
  );
};
