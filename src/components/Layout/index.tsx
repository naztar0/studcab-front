import React, { useEffect } from 'react';
import { Layout as LayoutAntd } from 'antd';
import { useSelector } from 'react-redux';
import darkStyles from 'antd/dist/antd.dark.less';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Theme } from '@/constants/settings';
import './index.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: any) => state.themeReducer.theme);

  /* eslint-disable eqeqeq */
  useEffect(() => {
    document.body.classList.remove('light-theme');
    document.body.classList.remove('dark-theme');
    if (theme === Theme.Light) {
      document.body.classList.add('light-theme');
    } else if (theme === Theme.Dark) {
      document.body.classList.add('dark-theme');
    }
  }, [theme]);

  return (
    <>
      <Navbar />
      <LayoutAntd>
        <Sidebar />
        <LayoutAntd.Content className="container">
          {children}
        </LayoutAntd.Content>
      </LayoutAntd>
      {theme === Theme.Dark ? <style>{darkStyles}</style> : null}
    </>
  );
}
