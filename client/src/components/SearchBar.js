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
        <FiSearch/>
        <Input onChange={(ev) => setValue(ev.target.value)} type="text" placeholder="Search" value={value}/>
        <Input type="submit" value="Search"/>
        </Form>
      </Wrapper>

  )
};

const Wrapper = styled.div``;
const Form = styled.form`
padding-left: 10px;
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
outline: none;
background-color: #FAFAFA;

&[type=text]{
:active{
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
