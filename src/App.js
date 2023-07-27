import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import SearchResultsPage from './pages/UserPages/SearchResultsPage';
import EmployerNavbar from './components/Employer/EmployerNavbar';
import EmployerPostJob from './pages/EmployerPages/EmployerPostJobPage';
import ViewApplicants from './pages/EmployerPages/ViewApplicants';



function App() {
  const location = useLocation();
  const [isAuth, setIsAuth] = useState(false);
  const [employerAuth, setEmployerAuth] = useState(false);
  const navigate = useNavigate();
  const [employerMode, setEmployerMode] = useState(false)

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
  const isUserRoute =
    location.pathname === '/' ||
    location.pathname === '/register' ||
    location.pathname === '/login' ||
    location.pathname === '/dashboard' ||
    location.pathname.startsWith('/job/') ||
    location.pathname.startsWith("/search");

  useEffect(() => {
    console.log("pathname", isUserRoute);
    setEmployerMode(!isUserRoute);
  }, [isUserRoute]);

  useEffect(() => {
    checkAuth()
  }, [])
  return (
    <Fragment>
        {!employerMode? (<NavBar isAuth={isAuth} setAuth={setAuth} setEmployerMode={setEmployerMode}/>):(<EmployerNavbar employerAuth={employerAuth} EmployerAuth={EmployerAuth} setEmployerMode={setEmployerMode}/>)}
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/register" element={isAuth ? (<Dashboard setAuth={setAuth}/> ) :(<Register setAuth={setAuth}/>) }/>
          <Route path="/login" element={isAuth ? (<Dashboard setAuth={setAuth}/> ) : (<Login setAuth={setAuth}/>)}/>
          <Route path="/dashboard" element={isAuth ? (<Dashboard setAuth={setAuth}/>) : (<Login setAuth={setAuth}/>)}/>
          <Route path="/job/:jobId/apply" element={isAuth ? (<JobApplicationPage/>) : (<Login setAuth={setAuth}/>)}/>
          <Route path="/search" element={<SearchResultsPage/>}/> 


          <Route path="/employer/main" element={<EmployerMainPage setAuth={setAuth} setEmployerAuth={setEmployerAuth}/>} />
          <Route path="/employer/login" element={!employerAuth ? (<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>) : (<EmployerDashboard setAuth={setAuth} EmployerAuth={EmployerAuth}/>)}/>
          <Route path="/employer/dashboard/:businessName" element={employerAuth ? (<EmployerDashboard setAuth={setAuth} EmployerAuth={EmployerAuth}/>) :(<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>)}/>
          <Route path="/employer/dashboard/:businessName/jobs" element={employerAuth ? (<EmployerJobPage setAuth={setAuth} EmployerAuth={EmployerAuth}/>) :(<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>)}/>
          <Route path="/employer/dashboard/:businessName/jobs/:jobId" element={employerAuth ? (<EmployerJobDetails setAuth={setAuth} EmployerAuth={EmployerAuth}/>) : (<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>)}/>
          <Route path="/employer/dashboard/:businessName/jobs/:jobId/applicants" element={employerAuth ? (<ViewApplicants setAuth={setAuth} EmployerAuth={EmployerAuth}/>):(<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>)}/>
          <Route path="/employer/post" element={employerAuth ? (<EmployerPostJob setAuth={setAuth} EmployerAuth={EmployerAuth}/>) : (<EmployerLogin setAuth={setAuth} EmployerAuth={EmployerAuth}/>)}/>
          {/* <Route path="jobs" element={<EmployerJobPage/>}/> */}
        
        </Routes>
      
    </Fragment>
  );
}

export default App;
