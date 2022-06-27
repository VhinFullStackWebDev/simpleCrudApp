import React, { useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const id = '';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    Axios.get("http://localhost:3001/view").then((response)=> {
      setMovieList(response.data);
    });
  });

  const submitForm = () => {
    Axios.post("http://localhost:3001/add", {
      title: title,
      description: description
    });
    
    setMovieList([...movieList, {
        id: id,
        title: title,
        description: description
    }]);
  };

  const deleteData = (id) => {
    console.log("reached deleteData");
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  const updateData = (title, newTitle, id) => {
    console.log("reached updateData", newTitle, title, id);
    Axios.put(`http://localhost:3001/update/${id}`, {
      newTitle: newTitle,
      title: title
    });
    setNewTitle("");
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className='forWrapper container'>
        <div className="card p-3 m-2">
          <div className='row'>
            <label htmlFor='title'>Title: </label> <input type='title' id='title' name='title' onChange={(e)=> {
              setTitle(e.target.value) 
            }} />
          </div>
          <div className='row'>
            <label htmlFor='description'>Description: </label> <input type='text-area' id='description' name='description'onChange={(e)=> {
              setDescription(e.target.value) 
            }} />
          </div>
          
          <button className='btn btn-primary mb-5 mt-2' onClick={submitForm}>SUBMIT</button>

        </div>
        
        {movieList.map((val) => {
          return (
            <div key={val.id} className='card p-3 m-2'>
              <h5 key={val.title}>Title: {val.title} Description: {val.description} </h5>
              <input placeholder='Edit title' onChange={(e)=>
                setNewTitle(e.target.value)
              } />
              <div className='d-flex justify-content-center p-3'>

                <button className='btn btn-warning' type='button' onClick={() => updateData(val.title, newTitle, val.id)}>UPDATE</button>

                <button className='btn btn-danger' type='button' id={val.id} onClick={() => {deleteData(val.id)}}>DELETE</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
