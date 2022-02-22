import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utilities";
import DatePicker from "../date-picker/date-picker.component";
import LocationInput from "../location-input/location-input.component";
import { Grid } from "@mui/material";
import WeatherInfo from "../weather-info/weather-info.component";
import { fetchWeather } from "../../store/weatherSlice";
import { useDebounce } from "react-use";

const Wrapper = styled.div`
  width: 600px;
  padding: 20px;
  max-width: 75vw;
  min-height: 300px;
  display: flex;
`;

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const GridItem = ({ children, ...props }) => (
  <Grid item {...props}>
    {children}
  </Grid>
);

const StyledGridItem = styled(GridItem)`
  padding: 5px !important;
`;

export const defaultDate = formatDate(new Date());
export const defaultLocation = "mashhad";

const Weather = () => {
  const [date, setDate] = useState(defaultDate);
  const [location, setLocation] = useState(defaultLocation);
  const dispatch = useDispatch();

  useDebounce(
    () => {
      dispatch(fetchWeather({ date, location }));
    },
    500,
    [date, location]
  );

  useEffect(() => {
    dispatch(fetchWeather({ date, location }));
  }, []);

  const handleDateChange = (newDate) => {
    setDate(formatDate(newDate));
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <Wrapper>
      <Container>
        <Grid container>
          <StyledGridItem xs={12} sm={6}>
            <DatePicker value={date} onChange={handleDateChange} />
          </StyledGridItem>

          <StyledGridItem xs={12} sm={6}>
            <LocationInput value={location} onChange={handleLocationChange} />
          </StyledGridItem>
        </Grid>

        <WeatherInfo />
      </Container>
    </Wrapper>
  );
};

export default Weather;
