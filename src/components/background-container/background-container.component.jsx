import styled from "styled-components";

const Wrapper = styled.div`
  background-image: url("./background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(4px);
  -webkit-filter: blur(4px);
  height: 100vh;
  width: 100vw;
`;

const BackgroundContainer = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BackgroundContainer;
