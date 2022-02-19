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
  width: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px black;
  padding: 20px;
  max-width: 75%;
  min-height: 300px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
`;

const MainContainer = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default MainContainer;
