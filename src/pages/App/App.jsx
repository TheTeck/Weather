import React, {useState, useEffect} from 'react';
import './App.css';
import apiService from '../../utils/apiService'


function App() {

  const [output, setOutput] = useState('nothing');
  const [allData, setAllData] = useState({});

  async function getCurrent () {
    let data = await apiService.getCurrent();
    setAllData(data);
    setOutput(data.current.temp);
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
