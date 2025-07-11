import React from "react";
import styled from "styled-components";
import { Bio } from "../data/constants";
import TypeWriter from "typewriter-effect";
import HeroImg from "../../src/HeroImage.jpg";
import HeroBgAnimation from "./HeroBgAnimation";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headTextAnimation,
} from "../../src/utils/motion";

import StarCanvas from "./canavas/Stars"


const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 66px 16px;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }

  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
`;
const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 45px;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  // background: red;

  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;
const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  background: ;
  display: flex;
  justify-content: end;

  @media (max-width: 960px) {
    order: 1;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    margin=bottom: 30px;
  }
`;

const Title = styled.div`
font-weight: 700px;
font-size: 50px;
color: {({theme}) => theme.text_primary};
line-height: 68px;

@media (max-width: 960px){
text-align: center;
};

@media (max-width: 960px){
font-size: 40px;
line-height: 48px;
margin-bottom: 8px;
};
`;
const TextLoop = styled.div`
  font-weight: 600px;
  font-size: 32px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;
const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 32px;
  }
`;
const ResumeButton = styled.a`
-webkit-appearance: button;
-moz-appearance: button;
appearance: button;
text-decoration: none;

width: 95%;
max-width: 300px;
text-align: center;
padding: 16px 0px;

background: hsla(271, 100%, 50%, 1);
background: linear-gradient(
225deg,
hsla(271, 100%, 50%, 1) 0%,
hsla(295, 100%, 50%, 1) 100%,
);

background: -moz-linear-gradient(
225deg,
hsla(271, 100%, 50%, 1) 0%,
hsla(295, 100%, 50%, 1) 100%,
);

background: -webkit-linear-gradient(
225deg,
hsla(271, 100%, 50%, 1) 0%,
hsla(295, 100%, 50%, 1) 100%,
);
box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #12634;
border-radius: 50px;
font-weight: 700;
font-size: 18px;

&:hover {
transform: scale(1.05);
cursor:pointer;
transform: all 0.4s ease-in-out;
box-shadow: 20px 20px 60px #1F2634,
filter: brightness(1);
}

@media (max-width: 640px){
padding: 12px 0px;
font-size: 18px;
}
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;
const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border: 12px solid ${({ theme }) => theme.primary};

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;
const HeroBg = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  justify-content: wnd;

  -webkit-transform: translateX(-50%) translateY(-50%);
  transforrm: translateX(-50%) translateY(-50%);

  @media {
    max-width: 960px;
  }
   {
    justify-content: center;
    padding: 0 0px;
  }
`;

const Hero = () => {
  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas/>
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {Bio.name}
                </Title>
                <TextLoop>
                  I am a <Span />
                  <TypeWriter
                    options={{
                      strings: Bio.roles,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </TextLoop>
              </motion.div>

              <motion.div {...headTextAnimation}>
                <SubTitle>{Bio.description}</SubTitle>
              </motion.div>
              <ResumeButton>Check Resume</ResumeButton>
            </HeroLeftContainer>
            <HeroRightContainer>
              <motion.div {...headTextAnimation}>
                <Tilt>
                  <Img src={HeroImg} alt="Shubham" />
                </Tilt>{" "}
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
