import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const Confirmation = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const [state, setState] = useState("Loading");

  //get the last order ID from Local storage and use it to render ite,s from tis order
  const cart = JSON.parse(localStorage.getItem(`cartID`));

  useEffect(() => {
    fetch(`/getLatestOrder`)
      .then((res) => res.json())
      .then((data) => {
        setOrderInfo(data.data);
        setState("Loaded");
      })
      .catch((err) => {
        throw new Error(err.stack);
      });
  }, [cart]);

  if (state === "Loading") {
    return <div>Loading</div>;
  }

  return (
    <Wrapper>
      <Wrapper1>
        <Title>
          Your order <span>#{orderInfo._id}</span> is on the way!
        </Title>
      </Wrapper1>
      {orderInfo.orderItems.map((item) => {
        return (
          <Wrap to={`/item/${item._id}`}>
            <Wrapper2>
              <Img src={item.imageSrc}></Img>
              <h4>{item.name}</h4>
            </Wrapper2>
          </Wrap>
        );
      })}
    </Wrapper>
  );
};

const Wrap = styled(Link)`
  text-decoration: none;
  color: black;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  height: 50vh;
`;
const Wrapper1 = styled.div`
  padding: 18px;
`;

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 20px;
  align-content: flex-start;
  padding-bottom: 20px;
  span {
    color: var(--color-green);
    text-shadow: 2px 2px 2px gray;
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  padding: 10px;
  width: 60px;
`;

export default Confirmation;
