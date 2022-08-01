import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ItemsDataContext } from "./ItemsDataContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchResults = () => {
    const {allItems} = useContext(ItemsDataContext);
    let { search } = useParams();
    const matchedSuggestions = allItems?.filter((item) => {
        return item.name.toLowerCase().includes(search.toLowerCase())
    });
console.log(matchedSuggestions);
console.log(search);
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
export default SearchResults;