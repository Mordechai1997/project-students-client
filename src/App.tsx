import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import Home from './pages/Home';
import UserList from './pages/UserList';
import './app.css';
import { ROUTES } from './constants/constUrls';

const App: React.FC = () => {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.USER_LIST} element={<UserList />} />
        </Routes>
      </Router>
    </FormProvider>
  );
};

export default App;
