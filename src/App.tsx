import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';
import Profile from '@/pages/Profile';
import RecordBook from '@/pages/RecordBook';
import Settings from '@/pages/Settings';
import './styles/global.scss';
import './styles/antd.scss';
import 'antd/dist/antd.less';

function App() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Helmet defaultTitle="NeoCab" titleTemplate="%s ∣ NeoCab" />
        <Routes>
          {/* <Route path='/' exact element={<Home/>}/> */}
          {/* <Route path={'/login'} first element={<Login/>}/> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/record-book" element={<RecordBook />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
