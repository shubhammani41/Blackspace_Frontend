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
import { SearchComponent } from './modules/searchModule/searchComponent/searchComponent';

const SearchModule = lazy(() => import("./modules/searchModule/searchModule"));
const ProfileModule = lazy(() => import("./modules/profileModule/ProfileModule"));
const AuthModule = lazy(() => import("./modules/AuthModule/AuthModule"));

const App: React.FC = () => {
  const themeStore = useThemeStore();
  const userLoginDataStore = useUserLoginDataStore();
  const addBasicDetailsDialogStore = useAddBasicDetailsDialogStore();
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
        addBasicDetailsDialogStore.openDialog();
      }).catch((err) => {
        userLoginDataStore.clearUserData();
      });
    }
  }
  useEffect(() => {
    verifyUserDataFromLocalAndSignin();
  }, [])
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
  const AnimatePresenceFixedType = AnimatePresence as ElementType;
  return (
    <AnimatePresenceFixedType mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/'
          element={
            <Navigate to="/profileSearch" />
          }>
        </Route>
        <Route path='/signin'
          element={
            <Suspense fallback={<GlobalLoader></GlobalLoader>}>
              <AnimationMotionDiv component={AuthModule}></AnimationMotionDiv>
            </Suspense>
          }>
        </Route>
        <Route path='/profileSearch'
          element={
            <Suspense fallback={<GlobalLoader></GlobalLoader>}>
              <AnimationMotionDiv component={SearchModule}></AnimationMotionDiv>
            </Suspense>
          }>
        </Route>
        <Route path='/profile/*'
          element={
            <Suspense fallback={<GlobalLoader></GlobalLoader>}>
              <AnimationMotionDiv component={ProfileModule}></AnimationMotionDiv>
            </Suspense>
          }>
        </Route>
        <Route path='*'
          element={
            <NotFound />
          }>
        </Route>
      </Routes>
    </AnimatePresenceFixedType>
  )
}

interface AnimationMotionDivProps {
  component: React.FC;
}

const AnimationMotionDiv: React.FC<AnimationMotionDivProps> = (props: AnimationMotionDivProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      style={{ position: "absolute", width: "100%", height: '100%' }}
    >
      <props.component />
    </motion.div>
  )
}


export default App;
