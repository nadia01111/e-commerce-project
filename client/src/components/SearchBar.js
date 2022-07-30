import { useState } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
const [value, setValue] = useState("")
/// typeahead in search field
const startSearch = () => {
// {to be done}
}

  return (
      <Wrapper>
        <Form onSubmit={startSearch}> 
        <Input onChange={(ev) => setValue(ev.target.value)} type="text" placeholder="Search" value={value}/>   
        <Input type="submit" value="Search"/>
        </Form>
      </Wrapper>

  )
};

const Wrapper = styled.div`

`;
const Form = styled.form`
display: flex;

`
const Input = styled.input`
height: 30px;
border-radius: 2px;
&[type=text]{
    width: 40vw;
    border: 0.5px solid black;
    padding: -2px;

}
&[type=submit]{
    display: none;
}
::placeholder{
    padding: 10px;
    font-size: larger;
}
`;

export default SearchBar;
