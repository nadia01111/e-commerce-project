import styled from "styled-components";
import { useEffect, useState, useContext } from "react";

const Confirmation = () => {

  const [orderInfo, setOrderInfo] = useState(null);
  const [state, setState] = useState("Loading")
  const cart = JSON.parse(localStorage.getItem(`cartID`));

  useEffect(() => {
    
    fetch(`/getLatestOrder`)
    .then ((res) => res.json())
    .then((data)=> {
      console.log(data.data)

      // setReservationInfo(data.data);
      setState("Loaded")
})
    // .catch((err) => {
    //     throw new Error (err.stack)
    // })

    
  }, []);


if (state === "Loading") {
  return <div>Loading</div>
}

  return (
  <Wrapper>
    <Wrapper1>
    <Title>Your order is confirmed! </Title>

    </Wrapper1>

  </Wrapper>)
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 10vh;
`;
const Wrapper1 = styled.div`
border: 2px solid var(--color-alabama-crimson);
border-radius: 5px;
padding: 18px;
width: 500 vw;

`;
const Title = styled.div`
font-family: var(--font-body);
color:var(--color-alabama-crimson);
font-size: 32px;
border-bottom: 2px solid var(--color-alabama-crimson);
margin-bottom:20px;
align-content: flex-start;
padding-bottom:20px;
`;
// const Div = styled.div`
// padding: 10px;
// span{
//   font-weight: bold;
// }
// `;
// const Img = styled.img`
// padding:10px;
// height:20vh;
// `;


export default Confirmation;
