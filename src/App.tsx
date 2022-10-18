import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';
import AppInit from '@/components/AppInit';
import Profile from '@/pages/Profile';
import RecordBook from '@/pages/RecordBook';
import Rating from '@/pages/Rating';
import Syllabus from '@/pages/Syllabus';
import Settings from '@/pages/Settings';
import './styles/global.scss';
import './styles/antd.scss';
import 'antd/dist/antd.less';

function App() {
  return (
    <Provider store={setupStore()}>
      <BrowserRouter>
        <AppInit />
        <Helmet defaultTitle="NeoCab" titleTemplate="%s ∣ NeoCab" />
        <Routes>
          {/* <Route path='/' exact element={<Home/>}/> */}
          {/* <Route path={'/login'} first element={<Login/>}/> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/record-book" element={<RecordBook />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
