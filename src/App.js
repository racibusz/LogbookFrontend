import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TopBar from './components/topBar';
import MainPage from './pages/unauthorized/mainPage';
import LoginPage from './pages/unauthorized/loginPage';
import LogBookPage from './pages/authorized/flights/logBookPage';
import AddFlightPage from './pages/authorized/flights/addFlightPage';
import { UserContext } from './UserContext';
import MyLicensePage from './pages/authorized/license/myLicensePage';
import RegisterPage from './pages/unauthorized/registerPage';
import Footer from './components/footer';
import AirplanesPage from './pages/authorized/airplanes/airplanesPage';
import AddAirplanePage from './pages/authorized/airplanes/addAirplanePage';
import languageStrings from './translationFile';

function App() {
  const [user, setUser] = React.useState(() => {
    // Pobierz użytkownika z localStorage przy pierwszym renderze
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [language, setLanguage] = React.useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage ? JSON.parse(storedLanguage) : 'en';
  });

  // Synchronizacja user → localStorage przy każdej zmianie
  React.useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // opcjonalnie
    }
  }, [user]);
  const pageNames = languageStrings[language]['pages']
  const unauthorizedRoutes = [
    <Route name={pageNames['main']} path="/" element={<MainPage />} showInTopBar={true}/>,
    <Route name={pageNames['login']} path="/login" element={<LoginPage />} showInTopBar={true}/>,
    <Route name={pageNames['register']} path="/register" element={<RegisterPage />} showInTopBar={true}/>,
  ]
  const authorizedRoutes = [
    <Route name={pageNames['logbook']} path="/logBook" element={<LogBookPage />} showInTopBar={true} />,
    <Route name={pageNames['addFlight']} path="/addFlight" element={<AddFlightPage />} showInTopBar={false}/>,
    <Route name={pageNames['myLicenses']} path="/myLicense" element={<MyLicensePage />} showInTopBar={true}/>,  
    <Route name={pageNames['airplanes']} path="/airplanes" element={<AirplanesPage />} showInTopBar={true}/>,
    <Route name={pageNames['addAirplane']} path="/addAirplane" element={<AddAirplanePage />} showInTopBar={false}/>
  ]

  return (
  <Router>
    <UserContext.Provider value={{ user, setUser, language, setLanguage }}>
      <TopBar routes={user?authorizedRoutes:unauthorizedRoutes} />
          <Routes>
            {user ? authorizedRoutes : unauthorizedRoutes}
          </Routes>
      <Footer routes={user?authorizedRoutes:unauthorizedRoutes}></Footer>
    </UserContext.Provider>
  </Router>
);

}
export default App;