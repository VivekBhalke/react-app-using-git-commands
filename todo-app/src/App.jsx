// import { useState , useEffect} from 'react'
import { Button, Card, TextField, Typography } from '@mui/material';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Singup from './Singup';



import Appbar from './Appbar';
import GetTodos from './GetTodos';
import Login from './Login';
var i = 0;
function App() {
  return (
    <div>
      <Router>
      <Appbar></Appbar>
        <Routes>
          <Route path={"/singup"} element={<Singup/>}></Route>
          <Route path={"/todos"} element={<GetTodos/>}></Route>
          <Route path={"/login"} element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
   )
  }
  
export default App
