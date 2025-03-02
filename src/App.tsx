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
import { Scale } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';

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
  const pageVariants = {
    initial: { x: "50%", opacity: 0, scale:0.98 }, // New screen starts off-screen (right)
    animate: { x: "0%", opacity: 1, scale:1 },  // Moves into view
    exit: { x: "-50%", opacity: 0, scale: 0.98 }, // Old screen slides out (left)
  };
  return (
    <AnimatePresenceFixedType mode="popLayout">
      <motion.div
        key={location.pathname} // Makes sure animations work per route
        variants={pageVariants}
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
          <Route path='/signin'
            element={
              <Suspense fallback={<GlobalLoader></GlobalLoader>}>
                <AuthModule></AuthModule>
              </Suspense>
            }>
          </Route>
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
