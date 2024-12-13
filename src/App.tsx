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
import { AddBasicDetailsDialog } from './components/addBasicDetailsDialog/addBasicDetailsDialog';
import { getUserLoginDetailsFromLocalStorage } from './constants/appConstants';
import apiFunctions from './constants/apiFunctions';
import useAddBasicDetailsDialogStore from './components/addBasicDetailsDialog/store/addBasicDetailsDialogStotre';

const HomeModule = lazy(() => import("./modules/homeModule/HomeModule"));
const ProfileModule = lazy(() => import("./modules/profileModule/ProfileModule"));
const AuthModule = lazy(() => import("./modules/AuthModule/AuthModule"));

const App: React.FC = () => {
  const themeStore = useThemeStore();
  const userLoginDataStore = useUserLoginDataStore();
  const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
  useEffect(() => {
    let userLoginData = getUserLoginDetailsFromLocalStorage();
    if (userLoginData) {
      userLoginDataStore.updateUserData(userLoginData);
      if (userLoginData?.userDetails?.userId) {
        apiFunctions.fetchUserProfileByUserLoginId(userLoginData.userDetails.userId).then(res => {
          console.log(res);
        }).catch(err => {
          addBasicDetailsDialogStore.openDialog();
        });
      }
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
          <AddBasicDetailsDialog></AddBasicDetailsDialog>
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
