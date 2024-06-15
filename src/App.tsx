import React, { lazy } from 'react';
import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './components/notFound/notFound';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { themeObjDark, themeObjLight } from './constants/themeConstants';
import { ThemeState, ThemeStore } from './components/themeToggleBtn/stores/store';
import { Provider, useSelector } from 'react-redux';

const HomeModule = lazy(() => import("./modules/homeModule/HomeModule"));
const ProfileModule = lazy(() => import("./modules/profileModule/ProfileModule"));

const ThemedComponent: React.FC = () => {
  const theme = useSelector((state: ThemeState) => state.theme);
  React.useEffect(() => {
    console.log(theme);
  }, [theme]);
  return (
    <ThemeProvider theme={createTheme(theme.theme)}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/home" />}></Route>
          <Route path='/home' element={<HomeModule />}></Route>
          <Route path='/profile' element={<ProfileModule />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
const App: React.FC = () => {
  return (
    <Provider store={ThemeStore}>
      <ThemedComponent></ThemedComponent>
    </Provider>
  );
}

export default App;
