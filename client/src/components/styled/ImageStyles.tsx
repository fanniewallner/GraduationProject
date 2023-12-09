import styled from "styled-components";

export const LogoContainer = styled("div")`
  position: absolute;
  top: 1rem;
  left: 1rem;
  size: 100%;
`;

export const HeroContainer = styled("div")`
  position: fixed;
  width: 100%;
  top: 15%;
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s;
  @media (min-width: 600px) {
    top: 20%;
    left: 10%;
    justify-content: space-around;
  }
  &.scroll {
    background-color: white;
    top: 0;
    transform: none;
    align-items: flex-start;

    @media (min-width: 600px) {
      background-color: transparent;
    }
  }
`;

export const LogoImage = styled("img")`
  max-height: 90%;
  max-width: 90%;
  transition: all 0.3s;
  @media (min-width: 600px) {
    max-height: 100%;
    max-width: 100%;
  }
  &.scroll {
    max-height: 20%;
    max-width: 20%;
  }
`;
