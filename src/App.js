import React, { useState } from 'react';
import './App.css';
import DataForm from './components/DataForm';
import Alert from './components/Alert';

function App(props) {
  const [alert, setAlert] = useState(null);

  const showAlert = (Success, msg, type) => {
    setAlert({
      Success: Success,
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <Alert Alert={alert} showAlert={showAlert} />
      <div className="container">
        <div className="row">
          <h1 className='heading fs-1'>To Do List App</h1>
        </div>
        <DataForm showAlert={showAlert} /> 
      </div>
    </>

  )
}

export default App;
