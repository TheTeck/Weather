import React, {useState, useEffect} from 'react';

import './App.scss';
import apiService from '../../utils/apiService'
import MainHeader from '../../components/MainHeader/MainHeader';
import SubHeader from '../../components/SubHeader/SubHeader';
import NavBar from '../../components/NavBar/NavBar';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import TodayForecast from '../../components/TodayForecast/TodayForecast';
import TodaysWeather from '../../components/TodaysWeather/TodaysWeather';
import HourlyData from '../../components/HourlyData/HourlyData';

let dummyData = require('../../dummyCurrent');
let dummyWeekData = require('../../dummyWeek');

function App() {

  const [output, setOutput] = useState('nothing');
  // Object returned by Current Weather API
  const [currentData, setCurrentData] = useState(dummyData);
  // Oject returned by One Call API
  const [allData, setAllData] = useState(dummyWeekData);
  const [day, setDay] = useState(true);
  const [active, setActive] = useState('Today');


  // Navigational options
  const PAGES = ["Today", "Hourly", "7 Day"];

  let location = "94513"
  
  // Retrieve zipcode from search bar
  function getZipcode (zip) {
    console.log(zip);
  }

  // Retrieve the new active page name from nav button click
  function getActivePage (name) {
    setActive(name);
  }

  async function getCurrent () {
    try {
      /////let data = await apiService.getCurrent(location);
      let data = dummyData;
      setCurrentData(data);

    } catch (error) {
      console.log(error.message);
    }
  }

  async function getWeek (latitude, longitude) {
    try {
      /////let weekData = await apiService.getSevenDay(latitude, longitude);
      let weekData = dummyWeekData;
      setAllData(weekData);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getCurrent();
  }, [])

  useEffect(() => {
    getWeek(currentData.coord.lat, currentData.coord.lon);
  }, [currentData])

  return (
    <div id="App">
      <header>
        <MainHeader getZipcode={getZipcode} />
        <SubHeader 
          name={currentData.name} 
          temp={currentData.main.temp}
          weather={currentData.weather[0].main} 
          day={day} 
        />
      </header>

      <NavBar pages={PAGES} active={active} getActivePage={getActivePage} />

      <div id="content-container">
        {
          active === 'Today' ?
            <>
              <CurrentWeather 
                  weather={currentData.weather[0]} 
                  main={currentData.main} 
                  name={currentData.name} 
                  day={day}
              />
              <TodayForecast name={currentData.name} hourly={allData.hourly} />
              <TodaysWeather name={currentData.name} weather={allData.current} temp={currentData.main} timezoneOffset={allData.timezone_offset} />
            </>
          : active === 'Hourly' ?
            <HourlyData />
          : <>Nothing Here Yet</>
        }
      </div>
    </div>
  );
}

export default App;
