import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Image = styled.img`
  width: 60%;
  @media (max-width: 600px) {
    width: 35%;
  }
`;

export const availableIcons = [
  "clear-day",
  "partly-cloudy-day",
  "showers-night",
  "partly-cloudy-night",
  "wind",
  "thunder-showers-night",
  "thunder-rain",
  "rain-snow",
  "snow-showers-day",
  "snow-showers-night",
  "hail",
  "rain",
  "sleet",
  "showers-day",
  "cloudy",
  "thunder",
  "rain-snow-showers-day",
  "fog",
  "clear-night",
  "snow",
  "rain-snow-showers-night",
  "thunder-showers-day",
];

const WeatherImage = ({ iconType }) => {
  const iconName = availableIcons.some((icon) => icon === iconType)
    ? iconType
    : "clear-day";

  return (
    <ImageContainer>
      <Image src={`./icons/${iconName}.png`} alt={iconName} />
    </ImageContainer>
  );
};

export default WeatherImage;
