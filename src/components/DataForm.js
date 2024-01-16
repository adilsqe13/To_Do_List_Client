import React, { useState, useEffect } from 'react';
import './../App.css';
import axios from 'axios';
import RightArrowIcon from './RightArrowIcon';
import DeleteIcon from './DeleteIcon';
import EmptyList from './EmptyList';

export default function DataForm(props) {

  const apiUrl = process.env.REACT_APP_API_URL;
  const [task, setTask] = useState('');
  const [allTask, setAllTask] = useState([]);

  //GET - REQUEST
  const getResponse = async () => {
    let response = await axios.get(`${apiUrl}/api/allTask`);
    setTask("");
    return setAllTask(response.data);
  }


  //Add a task using POST-Request
  const addTask = async () => {
    let trimmedTask = task.trim();
    if (trimmedTask !== '') {
      await axios.post(`${apiUrl}/api/allTask`, { trimmedTask });
      props.showAlert("Success", "A new task added", "success");
    } else {
      props.showAlert("Failed", "Please enter a valid task..", "danger");
    }
    getResponse(); //Call get request
  };

  //Function to add a task using press Enter key
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  //Remove a task using Delete-Request
  const removeTask = async(taskId) => {
    await axios.delete(`${apiUrl}/api/allTask/${taskId}`);
    let updatedTasks = allTask.filter((el) => {
      return el._id !== taskId;
    });
    setAllTask(updatedTasks);
    props.showAlert("Success", "One task deleted ", "warning");
  };

  //Function to delete all data
  const resetApp = () => {
    axios.delete(`${apiUrl}/reset-data`);
    setAllTask([]);
    setTask("");
    props.showAlert("Success", "All tasks have been deleted ", "danger");
  };

  //USE EFFECT
  useEffect(() => {
    getResponse();  
  }, []);

  return (
    <>
      <div className="row">
        <input
          className='input-task text-center'
          type="text"
          placeholder="Enter a task here"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={handleKeyPress} />
      </div>
      <div className="row my-1 py-2">
        <div className="col-6">
          <button title='Add Task' className='btn btn-warning w-100 add-task-btn' onClick={addTask} disabled={task === ''} >Add Task</button>
        </div>
        <div className="col-6">
          <button title='Delete all tasks' className='btn btn-danger w-100 reset-btn' onClick={resetApp} disabled={allTask[0] === undefined}>Reset App</button>
        </div>
      </div>

      <div className="row result py-3">
        <ol className="text-light">
          {allTask.length === 0 ? <EmptyList /> : ''}
          {allTask.map((el, index) => (
            <div key={index} className=' p-3 display-screen'>
              <div className="row">
                <div className="col-1">
                  <RightArrowIcon />
                </div>
                <div className="col-10 tasks">
                  {el.task}
                </div>
                <div className="col-1 dfjcac">
                  <button title='delete' className='dlt-btn dfjcac' onClick={() => removeTask(el._id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ol>
      </div>
    </>
  )
}


