import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import WeatherImage from "../weather-image/weather-image.component";
import CircularProgress from "@mui/material/CircularProgress";
import {
  locationSelector,
  stringedDateSelector,
  weatherDataSelector,
  weatherStatusSelector,
} from "../../store/selectors";

const GridItem = ({ children, ...props }) => (
  <Grid item {...props}>
    {children}
  </Grid>
);

const CentralContainer = styled.div`
  text-align: center;
  color: #050a30;
  background-color: rgba(0, 0, 255, 0.55);
  margin: 1rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  font-weight: bold;
`;

const StyledGridItem = styled(GridItem)``;

const TextContainer = styled.p`
  color: #000c66;
`;
const BoldTextContainer = styled.p`
  color: #000c66;
  font-weight: bold;
`;
const TitleContainer = styled.h1`
  color: #000c66;
  margin-bottom: 0;
`;
//color: #050a30;

const SubTitleContainer = styled.p`
  color: #0000ff;
  margin-top: 0;
`;

const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const WeatherInfo = () => {
  const location = useSelector(locationSelector);
  const stringedDate = useSelector(stringedDateSelector);
  const weather = useSelector(weatherDataSelector);
  const weatherStatus = useSelector(weatherStatusSelector);

  const Content = (() => {
    switch (weatherStatus) {
      case "fulfilled": {
        return (
          <div>
            <Grid container>
              <StyledGridItem xs={12} sm={8}>
                <TitleContainer>{location}</TitleContainer>
                <SubTitleContainer>{stringedDate}</SubTitleContainer>
                <BoldTextContainer>{weather.description}</BoldTextContainer>
                <TextContainer>
                  Maximum temperature: {weather.tempmax} °C
                </TextContainer>
                <TextContainer>
                  Minimum temperature: {weather.tempmin} °C
                </TextContainer>
                <TextContainer>pressure: {weather.pressure} mb</TextContainer>
                <TextContainer>
                  Wind Speed: {weather.windspeed} Km/h
                </TextContainer>
              </StyledGridItem>

              <StyledGridItem xs={12} sm={4}>
                <WeatherImage iconType={weather.icon} />
              </StyledGridItem>
            </Grid>

            <Grid container>
              <StyledGridItem xs={6} sm={4}>
                <CentralContainer>
                  <p>Humidity</p>
                  <p>{weather.humidity} %</p>
                </CentralContainer>
              </StyledGridItem>
              <StyledGridItem xs={6} sm={4}>
                <CentralContainer>
                  <p>Feels Like</p>
                  <p>{weather.feelslike} °C</p>
                </CentralContainer>
              </StyledGridItem>
              <StyledGridItem xs={6} sm={4}>
                <CentralContainer>
                  <p>Temperature</p>
                  <p>{weather.temp} °C</p>
                </CentralContainer>
              </StyledGridItem>
            </Grid>
          </div>
        );
      }
      case "rejected":
        return null;
      case "pending": {
        return (
          <ProgressContainer>
            <CircularProgress />
          </ProgressContainer>
        );
      }
      default:
        return null;
    }
  })();

  return Content;
};

export default WeatherInfo;
