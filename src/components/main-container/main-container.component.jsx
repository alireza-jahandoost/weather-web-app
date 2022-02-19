import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  background-color: rgba(255, 255, 255, 0.55);
`;

const MainContainer = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default MainContainer;
