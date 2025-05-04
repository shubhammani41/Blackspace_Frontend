import React, { ElementType, Suspense, lazy, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { NotFound } from './components/notFound/notFound';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import useThemeStore from './components/themeToggleBtn/store/themeStore';
import { AppHeader } from './components/header/header';
import { GlobalLoader } from './components/globalLoader/GlobalLoader';
import { SigninDialog } from './components/signinDialog/signinDialog';
import useUserLoginDataStore from './store/userLoginDetailsStore';
import { AddBasicDetailsDialog } from './components/addBasicDetailsDialog/addBasicDetailsDialog';
import { getUserDataFromLocalStorage } from './constants/appConstants';
import apiFunctions from './constants/apiFunctions';
import useAddBasicDetailsDialogStore from './components/addBasicDetailsDialog/store/addBasicDetailsDialogStotre';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionFramerStore } from './store/motionFramerAnimationStore';
import useSigninDialogStore from './components/signinDialog/store/signinDialogStore';

const SearchModule = lazy(() => import("./modules/searchModule/searchModule"));
const ProfileModule = lazy(() => import("./modules/profileModule/ProfileModule"));
const AuthModule = lazy(() => import("./modules/AuthModule/AuthModule"));
const SettingsModule = lazy(() => import("./modules/settingsModule/settingsModule"));

const App: React.FC = () => {
  const themeStore = useThemeStore();
  const userLoginDataStore = useUserLoginDataStore();
  const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
  const signinDialog = useSigninDialogStore();

  const verifyUserDataFromLocalAndSignin = () => {
    let userData = getUserDataFromLocalStorage();
    if (userData?.userLoginDetails?.userDetails?.userId && userData?.userLoginDetails?.token) {
      userLoginDataStore.updateUserData({ userLoginDetails: userData.userLoginDetails, ...userLoginDataStore.data.userDetails });
      apiFunctions.fetchUserProfileByUserLoginId(userData.userLoginDetails.userDetails.userId).then(res => {
        if (res?.data?.userId && userLoginDataStore?.data?.userDetails) {
          userLoginDataStore.updateUserData({ userProfileDetails: res.data, ...userLoginDataStore.data.userDetails });
        }
        else {
          addBasicDetailsDialogStore.openDialog();
        }
      }, rej => {
        if (rej === 'error') {
          userLoginDataStore.clearUserData();
          signinDialog.openDialog();
        }
        else {
          addBasicDetailsDialogStore.openDialog();
        }
      });
    }
    else{
      signinDialog.openDialog();
    }
  }
  useEffect(() => {
    verifyUserDataFromLocalAndSignin();
  }, []);



  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={createTheme(themeStore.data.theme)}>
        <CssBaseline />
        <BrowserRouter>
          <div className='componentContainer'>
            <GlobalComponents></GlobalComponents>
            <RoutesComponent></RoutesComponent>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

const GlobalComponents: React.FC = () => {
  return (
    <div>
      <AppHeader></AppHeader>
      <SigninDialog></SigninDialog>
      <AddBasicDetailsDialog></AddBasicDetailsDialog>
    </div>
  )
}

const RoutesComponent: React.FC = () => {
  const location = useLocation();
  const motionFramerStore = useMotionFramerStore();
  const AnimatePresenceFixedType = AnimatePresence as ElementType;
  return (
    <AnimatePresenceFixedType mode="popLayout">
      <motion.div
        key={location.pathname} // Makes sure animations work per route
        variants={motionFramerStore.data.framerConfig}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path='/'
            element={
              <Navigate to="/profileSearch" />
            }>
          </Route>
          {/* <Route path='/signin'
            element={
              <Suspense fallback={<GlobalLoader></GlobalLoader>}>
                <AuthModule></AuthModule>
              </Suspense>
            }>
          </Route> */}
          <Route path='/profileSearch'
            element={
              <Suspense fallback={<GlobalLoader></GlobalLoader>}>
                <SearchModule></SearchModule>
              </Suspense>
            }>
          </Route>
          <Route path='/profile/*'
            element={
              <Suspense fallback={<GlobalLoader></GlobalLoader>}>
                <ProfileModule></ProfileModule>
              </Suspense>
            }>
          </Route>
          <Route path='/settings/*'
            element={
              <Suspense fallback={<GlobalLoader></GlobalLoader>}>
                <SettingsModule></SettingsModule>
              </Suspense>
            }>
          </Route>
          <Route path='*'
            element={
              <NotFound />
            }>
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresenceFixedType>
  )
}


export default App;
