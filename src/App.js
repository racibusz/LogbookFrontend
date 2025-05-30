import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TopBar from './components/topBar';
import MainPage from './pages/unauthorized/mainPage';
import LoginPage from './pages/unauthorized/loginPage';
import LogBookPage from './pages/authorized/flights/logBookPage';
import AddFlightPage from './pages/authorized/flights/addFlightPage';
import { UserContext } from './UserContext';
import MyLicensePage from './pages/authorized/licence/myLicensePage';
import RegisterPage from './pages/unauthorized/registerPage';



function App() {
  const [user, setUser] = React.useState(() => {
    // Pobierz użytkownika z localStorage przy pierwszym renderze
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Synchronizacja user → localStorage przy każdej zmianie
  React.useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // opcjonalnie
    }
  }, [user]);

  const unauthorizedRoutes = [
    <Route name="Strona Główna" path="/" element={<MainPage />} showInTopBar={true}/>,
    <Route name="Logowanie" path="/login" element={<LoginPage />} showInTopBar={true}/>,
    <Route name="Rejestracja" path="/register" element={<RegisterPage />} showInTopBar={true}/>,
  ]
  const authorizedRoutes = [
    <Route name="LogBook" path="/logBook" element={<LogBookPage />} showInTopBar={true} />,
    <Route name="Dodaj lot" path="/addFlight" element={<AddFlightPage />} showInTopBar={false}/>,
    <Route name="Moja Licencja" path="/myLicense" element={<MyLicensePage />} showInTopBar={true}/>,  
  ]

  return (
  <Router>
    <UserContext.Provider value={{ user, setUser }}>
      <TopBar routes={user?authorizedRoutes:unauthorizedRoutes} />
          <Routes>
            {user ? authorizedRoutes : unauthorizedRoutes}
          </Routes>
    </UserContext.Provider>
  </Router>
);

}
export default App;