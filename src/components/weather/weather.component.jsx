import styled from "styled-components";

const Wrapper = styled.div`
  width: 500px;
  padding: 20px;
  max-width: 75vw;
  min-height: 300px;
  display: flex;
`;

const Container = styled.div`
  flex-grow: 1;
`;

const Weather = () => {
  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  );
};

export default Weather;
