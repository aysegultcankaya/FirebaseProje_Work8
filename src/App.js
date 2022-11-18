import React, { useState } from 'react';
import './styles/index.css';
import { CustomProvider } from 'rsuite';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import routes from './components/layout/Routes'
import { useTranslation } from "react-i18next";
import { locale } from './utils/rsuitelocales';
import en_US from 'rsuite/locales/en_US';

export const ThemeContext = React.createContext();
const App = () => {
  const { i18n } = useTranslation();
  
  const prepareRoutes = (route) => {
    return (
      <Route key={route.name} path={route.path} element={route.component}>
        {route.routes && route.routes.length > 0 && route.routes.map((r) => prepareRoutes(r))}
      </Route>
    )
  }

  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <CustomProvider theme={theme} locale={i18n.language === "tr" ? locale : en_US}>
        <Router>
          <Routes>
            {routes.map((route) => prepareRoutes(route))}
          </Routes>
        </Router>
      </CustomProvider>
    </ThemeContext.Provider>
  );
}

export default App;