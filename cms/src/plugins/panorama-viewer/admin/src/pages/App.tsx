import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import { CreateTourPage } from './CreateTourPage';

const App = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/create-tour" element={<CreateTourPage />} />
      <Route path="*" element={<Page.Error />} />
    </Routes>
  );
};

export { App };
