import React, { Suspense, lazy, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/notFound/notFound';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import useThemeStore from './components/themeToggleBtn/store/themeStore';
import { AppHeader } from './components/header/header';
import { GlobalLoader } from './components/globalLoader/GlobalLoader';
import { SideBar } from './components/sideBar/sidebar';
import { SigninDialog } from './components/signinDialog/signinDialog';
import useUserLoginDataStore from './store/userLoginDetailsStore';

const HomeModule = lazy(() => import("./modules/homeModule/HomeModule"));
const ProfileModule = lazy(() => import("./modules/profileModule/ProfileModule"));
const AuthModule = lazy(() => import("./modules/AuthModule/AuthModule"));

const App: React.FC = () => {
  const themeStore = useThemeStore();
  const userLoginDataStore = useUserLoginDataStore();
  useEffect(() => {
    let userLoginData = localStorage.getItem('userLoginData');
    if(userLoginData){
      userLoginDataStore.updateUserData(JSON.parse(userLoginData));
    }
  }, [])
  return (
    <ThemeProvider theme={createTheme(themeStore.data.theme)}>
      <CssBaseline />
      <BrowserRouter>
        <div className='componentContainer'>
          <AppHeader></AppHeader>
          <SideBar></SideBar>
          <SigninDialog></SigninDialog>
          <Routes>
            <Route path='/' element={<Navigate to="/home" />}></Route>
            <Route path='/signin' element={<Suspense fallback={<GlobalLoader></GlobalLoader>}><AuthModule /></Suspense>}></Route>
            <Route path='/home' element={<Suspense fallback={<GlobalLoader></GlobalLoader>}><HomeModule /></Suspense>}></Route>
            <Route path='/profile/:userName' element={<Suspense fallback={<GlobalLoader></GlobalLoader>}><ProfileModule /></Suspense>}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
