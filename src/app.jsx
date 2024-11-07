import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'; 
import { Login } from './login/login';
import { Newworkout } from './newworkout/newworkout';
import { WorkoutBegins } from './newworkout/workoutbegins';
import { History } from './history/history';
import { Friends } from './friends/friends';
import { About } from './about/about';


export default function App() {
  return (
  <BrowserRouter>
    <div className="body d-flex flex-column">
    <header className="d-flex bg-secondary px-2">
      <nav className="navbar  navbar-expand-lg w-100">
        <h1 className="navbar-brand">
          <NavLink className="nav-link" href="https://github.com/Reedzit/startup">Deck of Death</NavLink>
        </h1>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to=''>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to='newworkout'>Begin New Workout</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to='history'>Workout History</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to='friends'>Friends</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to='about'>About</NavLink>
          </li>
        </ul>
        <div className="text-light">
          User will go here
        </div>
      </nav> 
    </header>

    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/newworkout' element={<Newworkout />} />
      <Route path='/workoutbegins' element={<WorkoutBegins />} />
      <Route path='/history' element={<History />} />
      <Route path='/friends' element={<Friends />} />
      <Route path='/about' element={<About />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer className="d-flex bg-secondary justify-content-center align-items-center">
      <div className="text-dark text-center">Made by Reed Zitting <a href="https://github.com/Reedzit/startup">GitHub</a></div>
    </footer>
   </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}