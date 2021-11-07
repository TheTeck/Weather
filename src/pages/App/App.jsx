import React, {useState, useEffect} from 'react';

import './App.scss';
import apiService from '../../utils/apiService'
import MainHeader from '../../components/MainHeader/MainHeader';
import SubHeader from '../../components/SubHeader/SubHeader';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';

let dummyData = {
    "coord": {
      "lon": -0.1257,
      "lat": 51.5085
    },
  
    "weather": [
  
      {
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02n"
      }
    ],
    "base": "stations",
  
    "main": {
      "temp": 274.5,
      "feels_like": 271.66,
      "temp_min": 272.21,
      "temp_max": 277.06,
      "pressure": 1024,
      "humidity": 90
    },
    "visibility": 10000,
  
    "wind": {
      "speed": 2.57,
      "deg": 200
    },
  
    "clouds": {
      "all": 12
    },
    "dt": 1636091095,
  
    "sys": {
      "type": 2,
      "id": 2019646,
      "country": "GB",
      "sunrise": 1636095672,
      "sunset": 1636129618
    },
    "timezone": 0,
    "id": 2643743,
    "name": "London",
    "cod": 200
  }

function App() {

  const [output, setOutput] = useState('nothing');
  // Object returned by Current Weather API
  const [currentData, setCurrentData] = useState(dummyData);
  // Oject returned by One Call API
  const [allData, setAllData] = useState(dummyData);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  let location = "94513"
  

  function getZipcode (zip) {
    console.log(zip);
  }

  async function getCurrent () {
    try {
      /////let data = await apiService.getCurrent(location);
      /////setCurrentData(data);
      let data = dummyData;
      setLat(data.coord.lat);
      setLong(data.coord.lon);

      // output is for testing
      setOutput(`${data.name} ${data.main.temp}\u00B0`);
    } catch (error) {
      setOutput(error.message);
    }
  }

  useEffect(() => {
    getCurrent();
  }, [])

  return (
    <div id="App">
      <header>
        <MainHeader getZipcode={getZipcode} />
        <SubHeader name={currentData.name} temp={currentData.main.temp} icon={currentData.weather[0].main} />
      </header>
      <div id="content-container">
        <CurrentWeather weather={currentData.weather[0]} main={currentData.main} name={currentData.name} />
      </div>
    </div>
  );
}

export default App;
