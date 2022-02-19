import BackgroundContainer from "./components/background-container/background-container.component";
import MainContainer from "./components/main-container/main-container.component";
import Weather from "./components/weather/weather.component";

function App() {
  return (
    <div>
      <BackgroundContainer />
      <MainContainer>
        <Weather />
      </MainContainer>
    </div>
  );
}

export default App;
