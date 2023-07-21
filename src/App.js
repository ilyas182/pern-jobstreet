import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from './pages/MainPage/MainPage/MainPage';
import { Fragment, useEffect, useState } from 'react';


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  

  const setAuth = boolean => {
    setIsAuth(boolean)
  }
  return (
    <Fragment>
      
        <Routes>
          <Route exact path="/" element={<MainPage />}/>
          <Route exact path="/register" element={isAuth ? (<Dashboard setAuth={setAuth}/> ) : (<Register setAuth={setAuth}/>)}/>
          <Route exact path="/login" element={isAuth ? (<Dashboard setAuth={setAuth}/> ) : (<Login setAuth={setAuth}/>)}/>
          <Route exact path="/dashboard" element={isAuth ? (<Dashboard setAuth={setAuth}/>) : (<Login setAuth={setAuth}/>)}/> 
        </Routes>
      
    </Fragment>
  );
}

export default App;
