import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Task from './components/Task';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/task' element={<Task />} />
      </Routes>
    </div>
  );
};

export default App;
