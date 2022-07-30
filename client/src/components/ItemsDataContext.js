import { createContext, useEffect, useState } from "react";

export const  ItemsDataContext = createContext(null);

export const ItemsDataProvider = ({children}) => {

    const [allItems, setAllItems] = useState(null);
      
   
    useEffect(() => {
        fetch(`/getItems`)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.data)
            setAllItems(data.data);
          });
      }, []);


    return (
        <ItemsDataContext.Provider 
        value ={{
            allItems,
            setAllItems
        }}>
            {children}
        </ItemsDataContext.Provider>
    )
}