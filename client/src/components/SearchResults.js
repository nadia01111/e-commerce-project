import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ItemsDataContext } from "./ItemsDataContext";
import styled from "styled-components";
import { Link } from "react-router-dom";


// this page shows all mathced results of search

const SearchResults = () => {
    const {allItems,handleClick} = useContext(ItemsDataContext);
    /// useParams needes for filter allItems array from Context

    let { search } = useParams();
    const matchedSuggestions = allItems?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    });

if (search ===null) {
    return <div>Loading</div>
}
return (
        <Wrapper>
            {matchedSuggestions?.map((item) => {
                return (
                <Wrap key={item._id}  to={`/item/${item._id}`}>
                    <Wrap1>
                      <Img src={item.imageSrc}/>  
                    </Wrap1>
                    <Wrap2>
                        <Wrap3>{item.name}</Wrap3>
                        <Wrap4>{item.price}</Wrap4>
                        {item.numInStock > 0 ?
                            <AddToCart onClick={handleClick}>Add to Cart</AddToCart> 
                            : 
                            <AddToCart disabled>Item out of stock</AddToCart>
                        }
                    </Wrap2>
                    
                </Wrap>)
            })}
        </Wrapper>
)
}

const Wrapper = styled.div`
padding-top: 10px;
padding-left:80px;
padding-left:80px;`;
const Img = styled.img`
width:100px;`;
const Wrap = styled(Link)`
display:flex;
text-decoration:none;
color:black;
padding: 5px;
border-top:1px solid gray;
`;
const Wrap1 = styled.div``;
const Wrap2 = styled.div`
padding-left: 10px;
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content: center;
`;
const Wrap3 = styled.div``;
const Wrap4 = styled.div``;
const AddToCart = styled.button`
color: white;
background-color: var(--color-green);
border: none;
padding: 5px 10px;
border-radius: 3px;
cursor: pointer;

:hover {
  opacity: 90%;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`;



export default SearchResults;