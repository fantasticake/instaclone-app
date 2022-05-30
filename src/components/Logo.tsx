import styled from "styled-components/native";

const Img = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: contain;
`;

const Logo = () => {
  return <Img source={require("../images/logoWhite.png")} />;
};

export default Logo;
