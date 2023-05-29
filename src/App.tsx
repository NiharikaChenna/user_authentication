import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
// prettier-ignore
import {SignIn} from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import LogOut from './pages/LogOut';
// prettier-ignore
const App = ()=>{
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route path="/logout" element={<LogOut/>}/>
      </Routes>
    </div>
  );
}

export default App;
