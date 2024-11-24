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
import { AuthState } from './login/authState'
import { Authenticated } from './login/authenticated';


function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
  <BrowserRouter>
    <div className="body d-flex flex-column">
    <header className="d-flex bg-secondary px-2">
      <nav className="navbar  navbar-expand-lg w-100">
        <h1 className="navbar-brand">
          <NavLink className="nav-link" href="https://github.com/Reedzit/startup">Deck of Death</NavLink>
        </h1>
        <ul className="navbar-nav me-auto">
          {authState === AuthState.Unauthenticated && (
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to=''>Login</NavLink>
            </li>
          )}
          {authState === AuthState.Authenticated && (
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to='authenticated'>Home</NavLink>
              </li>
            )}
          {authState === AuthState.Authenticated && (
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to='newworkout'>Begin New Workout</NavLink>
            </li>
          )}
          {authState === AuthState.Authenticated && (
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to='history'>Workout History</NavLink>
            </li>
          )}
          {authState === AuthState.Authenticated && (
            <li className="nav-item">
              <NavLink className="nav-link mx-2" to='friends'>Friends</NavLink>
            </li>
          )}
          <li className="nav-item">
            <NavLink className="nav-link mx-2" to='about'>About</NavLink>
          </li>
        </ul>
        {authState === AuthState.Authenticated && (
          <div className="text-light">
            <h5 className="text-light ">{userName} is logged in</h5>
          </div>
        )}
      </nav> 
    </header>

    <Routes>
      <Route 
        path='/' 
        element={
          <Login
            userName={userName}
            authState={authState}
            onAuthChange={(userName, authState) => {
              setUserName(userName);
              setAuthState(authState);
            }}
          />
        }
        exact 
      />
      <Route path='/newworkout' element={<Newworkout userName={userName} />} />
      <Route path='/workoutbegins' element={<WorkoutBegins userName={userName} />} />
      <Route path='/history' element={<History userName={userName}/>} />
      <Route path='/friends' element={<Friends userName={userName}/>} />
      <Route path='/about' element={<About />} />
      <Route path='/authenticated' element={<Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer className="d-flex bg-secondary justify-content-center align-items-center">
      <div className="text-dark text-center">Made by Reed Zitting <NavLink to="https://github.com/Reedzit/startup">GitHub</NavLink></div>
    </footer>
   </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;