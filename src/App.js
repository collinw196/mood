// Import necessary React Native components
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import './App.scss'
import HomePage from './utils/routing/home/home.component';
import Auth from './utils/routing/auth/auth.component'
import Navigation from './utils/routing/navigation/navigation.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route path='auth' element={<Auth/>}/>
        <Route path='home' element={<HomePage/>}/>
      </Route>
    </Routes>
  );
};

export default App;
