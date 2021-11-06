import React, {useState, useEffect} from 'react';
import './App.css';
import apiService from '../../utils/apiService'


function App() {

  const [output, setOutput] = useState('nothing');
  const [allData, setAllData] = useState({});

  let location = "Paris"

  async function getCurrent () {
    let data = await apiService.getCurrent(location);
    setAllData(data);
    setOutput(data.main.temp + "\u00B0");
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
