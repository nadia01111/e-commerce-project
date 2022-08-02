import { useEffect } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";
import {
  AiFillInstagram,
  AiFillApple,
  AiFillAndroid,
  AiFillFacebook,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Footer = () => {
  const [companies, setCompanies] = useState(null);

  //get all companies endpoint
  useEffect(() => {
    fetch(`/getCompanies`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.data);
      });
  }, []);

  // display max of 45 companies we distribute
  if (companies) {
    let randomCompanies = [];
    for (let counter = 0; counter < 45; counter++) {
      let randomIndex = Math.floor(Math.random() * companies?.length);
      if (!randomCompanies.includes(companies[randomIndex])) {
        randomCompanies.push(companies[randomIndex]);
      }
    }
    return (
      <div style={{ width: "100%" }}>
        <Info>Some brands we distribute</Info>
        <Container>
          {randomCompanies?.map((company) => {
            return (
              <Wrapper>
                <Wrap>{company.name}</Wrap>
              </Wrapper>
            );
          })}
        </Container>
        <ContactSection>
          <OurApp>
            <div>Find us on Social</div>
            <Icons>
              <AiFillInstagram style={{ paddingRight: "10px" }} />
              <AiFillFacebook style={{ paddingRight: "10px" }} />
              <AiFillTwitterSquare />
            </Icons>
          </OurApp>
          <OurApp>
            <div>Download our App</div>
            <Icons>
              <AiFillApple style={{ paddingRight: "10px" }} />
              <AiFillAndroid />
            </Icons>
          </OurApp>
        </ContactSection>
      </div>
    );
  } else {
    return (
      <LoaderWrapper>
        <Icon>
          <FiLoader style={{ height: "30px", width: "30px" }} />
        </Icon>
      </LoaderWrapper>
    );
  }
};

export default Footer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 200px;
  align-items: flex-start;
  padding-right: 80px;
  padding-left: 80px;
  background-color: #1f1f1e;
  padding-bottom: 35px;
`;

const Wrap = styled.div`
  padding: 5px 10px;
  color: white;
  font-size: 12px;
`;

const Wrapper = styled.div``;

const Info = styled.div`
  color: white;
  background-color: #1f1f1e;
  padding: 35px 0 35px 85px;
  margin-top: 40px;
  font-size: 25px;
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
`;

const Icons = styled.div``;

const Socials = styled.div;

const OurApp = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  color: white;
`;

const LoaderWrapper = styled.div`
  height: 500px;
`;

const turning = keyframes`
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    `;

const Icon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 49%;
  left: 49%;
  animation: ${turning} 1000ms infinite linear;
`;
