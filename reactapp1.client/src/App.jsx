import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.scss'
import Dashboard from './utils/routing/dashboard/dashboard.component';
import Auth from './utils/routing/auth/auth.component'
import Navigation from './utils/routing/navigation/navigation.component';
import { getUserPool } from './utils/cognito/cognito.utils';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './app/store/user/user.slice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getUserPool().getCurrentUser();
    dispatch(setCurrentUser(currentUser));
    if(currentUser) {
      navigate('/dashboard');
    }
    else {
      navigate('/auth');
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route path='auth' element={<Auth/>}/>
        <Route path='dashboard' element={<Dashboard apiBase={window.location.origin}/>}/>
      </Route>
    </Routes>
  );
};

export default App;
