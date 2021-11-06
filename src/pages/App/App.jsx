import React, {useState, useEffect} from 'react';
import './App.css';
import apiService from '../../utils/apiService'


function App() {

  const [output, setOutput] = useState('nothing');
  // Object returned by Current Weather API
  const [currentData, setCurrentData] = useState({});
  // Oject returned by One Call API
  const [allData, setAllData] = useState({});
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  let location = "94513"

  async function getCurrent () {
    try {
      let data = await apiService.getCurrent(location);
      setCurrentData(data);
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
    <div className="App">
      {output}
    </div>
  );
}

export default App;
