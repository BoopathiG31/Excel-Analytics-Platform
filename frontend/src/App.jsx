import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Registration from './components/Registration'
import SignUp from './components/SignUp'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMeUser } from './features/auth/authSlice'
import ExcelUpload from './pages/ExcelUpload'
import History from './pages/History'
import Insight from './pages/Insight'


function App() {

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);

  useEffect(() => {
    if(token){
        dispatch(getMeUser());
    }
  }, [token, dispatch]);

  return ( 
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<SignUp/>}/>
            <Route path="/signin" element={<Registration/>}/>
            <Route path="/" element={ <Layout/>}>
                <Route path='/' element={<Dashboard/> }/>
                <Route path='/upload' element={<ExcelUpload/> }/>
                <Route path='/history' element={<History/>} />
                <Route path='/insight' element={ <Insight/> } />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
