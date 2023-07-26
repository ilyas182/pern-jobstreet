import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/User/Dashboard';
import Login from './components/User/Login';
import Register from './components/User/Register';
import MainPage from './pages/MainPage/MainPage/MainPage';
import { Fragment, useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import EmployerMainPage from './pages/EmployerPages/EmployerMainPage';
import EmployerLogin from './components/Employer/EmployerLogin';
import EmployerDashboard from './components/Employer/EmployerDashboard';
import EmployerJobPage from './pages/EmployerPages/EmployerJobPage';
import EmployerJobDetails from './components/Employer/EmployerJobDetails';
import JobApplicationPage from './pages/UserPages/JobApplicationPage';



function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [employerAuth, setEmployerAuth] = useState(false);
  const navigate = useNavigate();
  

  const setAuth = boolean => {
    setIsAuth(boolean)
  }
  const EmployerAuth = boolean => {
    setEmployerAuth(boolean)
  }

  async function checkAuth() {
    try {
      const response = await fetch('http://localhost:3001/api/main/verify',{
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseResponse = await response.json();
      parseResponse === true ? setIsAuth(true) : setIsAuth(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <Fragment>
        <NavBar isAuth={isAuth} setAuth={setAuth}/>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/register" element={isAuth ? (<Register setAuth={setAuth}/>) : (<Dashboard setAuth={setAuth}/> ) }/>
          <Route path="/login" element={isAuth ? (<Dashboard setAuth={setAuth}/> ) : (<Login setAuth={setAuth}/>)}/>
          <Route path="/dashboard" element={isAuth ? (<Dashboard setAuth={setAuth}/>) : (<Login setAuth={setAuth}/>)}/>
          <Route path="/job/:jobId/apply" element={isAuth ? (<JobApplicationPage/>) : (<Login setAuth={setAuth}/>)}/> 


          <Route path="/employer/main" element={<EmployerMainPage setAuth={setAuth} EmployerAuth={EmployerAuth}/>} />
          <Route path="/employer/login" element={<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>}/>
          <Route path="/employer/dashboard/:businessName" element={<EmployerDashboard setAuth={setAuth} EmployerAuth={EmployerAuth}/>}/>
          <Route path="/employer/dashboard/:businessName/jobs" element={<EmployerJobPage setAuth={setAuth} EmployerAuth={EmployerAuth}/>}/>
          <Route path="/employer/dashboard/:businessName/jobs/:jobId" element={<EmployerJobDetails setAuth={setAuth} EmployerAuth={EmployerAuth}/>}/>
          {/* <Route path="jobs" element={<EmployerJobPage/>}/> */}
        
        </Routes>
      
    </Fragment>
  );
}

export default App;
