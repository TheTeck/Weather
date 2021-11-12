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
import WeekWeather from '../../components/WeekWeather/WeekWeather';

let dummyData = require('../../dummyCurrent');
let dummyWeekData = require('../../dummyWeek');

function App() {

  const [zipError, setZipError] = useState('');
  // Object returned by Current Weather API
  const [currentData, setCurrentData] = useState(dummyData);
  // Oject returned by One Call API
  const [allData, setAllData] = useState(dummyWeekData);
  const [day, setDay] = useState(true);
  const [active, setActive] = useState('Today');
  const [zip, setZip] = useState('94513');

  // Navigational options
  const PAGES = ["Today", "Hourly", "7 Day"];
  
  // Retrieve zipcode from search bar
  function getZipcode (newZip) {
    setZip(newZip);
  }

  // Retrieve the new active page name from nav button click
  function getActivePage (name) {
    setActive(name);
  }

  async function getCurrent () {
    try {
      let data = await apiService.getCurrent(zip);
      /////let data = dummyData;
      if (data.cod === 200) {
        setZipError('');
        setCurrentData(data);
      } else {
        console.log(data.message)
        setZipError(data.message);
      }

    } catch (err) {
      console.log(err);
    }
  }

  async function getWeek (latitude, longitude) {
    try {
      let weekData = await apiService.getSevenDay(latitude, longitude);
      /////let weekData = dummyWeekData;
      setAllData(weekData);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getCurrent();
  }, [zip])

  useEffect(() => {
    getWeek(currentData.coord.lat, currentData.coord.lon);
    setDay(currentData.dt >= currentData.sys.sunrise && currentData.dt <= currentData.sys.sunset);
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
          zipError={zipError}
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
              <TodayForecast 
                name={currentData.name} 
                hourly={allData.hourly} 
                currentTime={allData.current.dt}
                timezoneOffset={allData.timezone_offset}
                temps={allData.daily[0].temp} 
              />
              <TodaysWeather 
                name={currentData.name} 
                weather={allData.current} 
                temp={currentData.main} 
                timezoneOffset={allData.timezone_offset} 
              />
            </>
          : active === 'Hourly' ?
            <HourlyData 
              name={currentData.name} 
              data={allData.current} 
              timezoneOffset={allData.timezone_offset}
              hours={allData.hourly}
            />
          : <WeekWeather 
            name={currentData.name} 
            days={allData.daily} 
            timeOffset={allData.timezone_offset} 
            isDay={day} 
          />
        }
      </div>
    </div>
  );
}

export default App;
