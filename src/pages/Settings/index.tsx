import React, { useState, ForwardRefExoticComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, message, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import cookies from 'js-cookie';
import Icon, * as Icons from '@ant-design/icons';
import { ReactComponent as RoutineIcon } from '@/assets/icons/routine.svg';
import Layout from '@/components/Layout';
import { setTheme } from '@/store/reducers/theme';
import { setLanguage } from '@/store/reducers/language';
import { Language, Theme } from '@/constants/settings';
import './index.scss';

export default function Settings() {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const language = useSelector((state: any) => state.languageReducer.language);

  const [themeSelected, setThemeSelected] = useState(theme);
  const [languageSelected, setLanguageSelected] = useState(language);

  const settingsTitles = [
    { text: 'Language', icon: <Icons.GlobalOutlined className="icon" /> },
    { text: 'Theme', icon: <Icon component={RoutineIcon as unknown as ForwardRefExoticComponent<any>} className="icon" /> },
  ];
  const settingsValues: { text: string, value: any }[][] = [
    [
      { text: 'English', value: Language.English },
      { text: 'Русский', value: Language.Russian },
      { text: 'Українська', value: Language.Ukrainian },
    ],
    [
      { text: 'Light', value: Theme.Light },
      { text: 'Dark', value: Theme.Dark },
    ],
  ];

  const settingsSelected = [
    settingsValues[0].find((item) => item.value === languageSelected)?.text || '',
    settingsValues[1].find((item) => item.value === themeSelected)?.text || '',
  ];

  interface ElementTitle {
    text: string;
    icon: JSX.Element;
  }

  interface DataType {
    title: ElementTitle;
    values: string[];
    selected: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'title',
      width: '80%',
      render: (data) => (
        <>
          {data.icon}
          <span className="title">{data.text}</span>
        </>
      ),
    },
    {
      dataIndex: 'value',
      render: (_, { title, selected, values }) => (
        <Select
          className="select"
          defaultValue={selected}
          onChange={(text) => {
            message.success(`Selected ${text}`).then();
            let value;
            switch (title.text.toLowerCase()) {
              case 'language':
                value = settingsValues[0].find((item) => item.text === text)?.value;
                cookies.set('language', value);
                dispatch(setLanguage(value));
                setLanguageSelected(value);
                break;
              case 'theme':
                value = settingsValues[1].find((item) => item.text === text)?.value;
                cookies.set('theme', value);
                dispatch(setTheme(value));
                setThemeSelected(value);
                break;
              default:
                break;
            }
          }}
        >
          {values.map((value) => (
            <Select.Option value={value} key={value}>{value}</Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  const settingsDataSource: DataType[] = settingsTitles.map((title, index) => ({
    key: index,
    title,
    values: settingsValues[index].map((value) => value.text),
    selected: settingsSelected[index],
  }));

  return (
    <Layout>
      <Helmet title="Settings" />
      <div className="substrate">
        <Table
          columns={columns}
          dataSource={settingsDataSource}
          pagination={false}
          showHeader={false}
        />
      </div>
    </Layout>
  );
}
