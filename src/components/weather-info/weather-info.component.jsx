import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import WeatherImage from "../weather-image/weather-image.component";
import {
  locationSelector,
  stringedDateSelector,
  weatherDataSelector,
} from "../../store/selectors";

const GridItem = ({ children, ...props }) => (
  <Grid item {...props}>
    {children}
  </Grid>
);

const CentralContainer = styled.div`
  text-align: center;
`;

const StyledGridItem = styled(GridItem)``;

const TextContainer = styled.p``;
const TitleContainer = styled.h1``;
const SubTitleContainer = styled.p``;

const WeatherInfo = () => {
  const location = useSelector(locationSelector);
  const stringedDate = useSelector(stringedDateSelector);
  const weather = useSelector(weatherDataSelector);

  return (
    <div>
      <Grid container>
        <StyledGridItem xs={12} sm={8}>
          <TitleContainer>{location}</TitleContainer>
          <SubTitleContainer>Date: {stringedDate}</SubTitleContainer>
          <TextContainer>Description: {weather.description}</TextContainer>
          <TextContainer>Maximum temperature: {weather.tempmax}</TextContainer>
          <TextContainer>Minimum temperature: {weather.tempmin}</TextContainer>
          <TextContainer>pressure: {weather.pressure}</TextContainer>
          <TextContainer>Wind Speed: {weather.windspeed}</TextContainer>
        </StyledGridItem>

        <StyledGridItem xs={12} sm={4}>
          <WeatherImage />
        </StyledGridItem>
      </Grid>

      <Grid container>
        <StyledGridItem xs={6} sm={4}>
          <CentralContainer>
            <p>Humidity</p>
            <p>{weather.humidity}</p>
          </CentralContainer>
        </StyledGridItem>
        <StyledGridItem xs={6} sm={4}>
          <CentralContainer>
            <p>Feels Like</p>
            <p>{weather.feelslike}</p>
          </CentralContainer>
        </StyledGridItem>
        <StyledGridItem xs={6} sm={4}>
          <CentralContainer>
            <p>Temperature</p>
            <p>{weather.temp}</p>
          </CentralContainer>
        </StyledGridItem>
      </Grid>
    </div>
  );
};

export default WeatherInfo;
