import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegisterPage from './components/registerPage' ;
import Form from './components/formPage';
import LoginPage from './components/LoginPage';
import EditForm from './components/editPage';
import Tables from './components/tablePage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PrivateRoute from './components/global/auth';

function App() {
  return (
    <>
    
    {/* <RegisterPage /> */}
        {/* <LoginPage/> */}
        {/* <Form/> */}
        {/* <EditForm/> */}
      {/* <Tables/> */}

      <BrowserRouter>
      <Routes>
  <Route path='/' element={<RegisterPage />} />
  <Route path='/login' element={<LoginPage />} />
  <Route path='/form' element={<PrivateRoute><Form /></PrivateRoute>} />
  <Route path='/table' element={<PrivateRoute><Tables /></PrivateRoute>} />
  <Route path='/edit/:id' element={<EditForm />} />
</Routes>

      </BrowserRouter>
    </>
  )
}

export default App
