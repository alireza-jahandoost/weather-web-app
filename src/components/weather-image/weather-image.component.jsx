import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  width: 50%;
`;

const WeatherImage = () => {
  return (
    <ImageContainer>
      <Image src="./icons/clear-day.png" />
    </ImageContainer>
  );
};

export default WeatherImage;
