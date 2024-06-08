import React, { lazy } from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/notFound/notFound';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeObjDark, themeObjLight } from './constants/themeConstants';

const HomeModule = lazy(() => import("./modules/homeModule/HomeModule"));
const ProfileModule = lazy(() => import("./modules/profileModule/ProfileModule"));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={createTheme(themeObjDark)}>
      <CssBaseline  />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />}></Route>
        <Route path='/home' element={<HomeModule/>}></Route>
        <Route path='/profile' element={<ProfileModule/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
