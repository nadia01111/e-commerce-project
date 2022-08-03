import { useState, useContext} from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { ItemsDataContext } from "./ItemsDataContext";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";


const SearchBar = () => {
const {allItems} = useContext(ItemsDataContext);

const [value, setValue] = useState("");
const [search,setSearch] =useState(false);
/// typeahead in search field
//find mathcing with the search bar input 
const matchedSuggestions = allItems?.filter((item) => {
    return item.name.toLowerCase().includes(value.toLowerCase())
});

// function on form submit which redirects to searchresults page
const showSearchResults = (ev) => {
    ev.preventDefault();
    setSearch(!search)
    navigate(`/${value}`)
}
///if user chose the item from typeahead suggestion list, he navigates to item page
let navigate = useNavigate();

  return (
      <Wrapper>
        <Form onSubmit={showSearchResults}> 
        <FiSearch/>
        <Input 
        onChange={(ev) => {
            setValue(ev.target.value);
             setSearch(false)
            }} 
        type="text" 
        placeholder="Search" 
        value={value}/>
        <Input 
        // onClick={() => navigate("/search")}
        type="submit" 
        value="Search"
        
        />

        {/* Clear searchbar */}
        <MdClear onClick={() => setValue("")}/>
    
        {value?.length>=2 && matchedSuggestions?.length>0 ?
        
        <Ul> { 
            !search && matchedSuggestions.slice(0,15).map((suggestion) => {
                return (<Li 
                  key={suggestion._id} 
                  onClick={()=>{navigate(`/item/${suggestion._id}`); 
                  setValue(suggestion.name); 
                  setSearch(!search)
                  }}>{suggestion.name}</Li>
              )
        })} </Ul>:null}
        </Form>
      </Wrapper>

  )
};

const Wrapper = styled.div``;
const Prediction = styled.span`
font-weight:bold;
`
const Ul = styled.ul`
position: absolute;
top:60px;
background-color: var(--color-navbar-beige);

`;

const Li = styled.li`
list-style-type:none;
:hover {
    background-color:var( --color-green);
    color: var(--color-navbar-beige);;
   
}`;


const Form = styled.form`
padding-left: 10px;
padding-right: 10px;
background-color: #FAFAFA;
width: 40vw;
border: 0.5px solid black;
height: 30px;
border-radius: 2px;
display: flex;
align-items: center;
justify-content: flex-start;

`
const Input = styled.input`
padding-left: 5px;
border: none;
height: 30px;
width: 100%;
outline: none;
background-color: #FAFAFA;

&[type=text]{
:active{
    padding-left: 5px;
    border:none;
}

}
&[type=submit]{
    display: none;
}
::placeholder{
    padding: 5px;
    font-size: larger;
}
`;

export default SearchBar;
