import React, { useEffect, useState } from 'react';
import {
  Skeleton, Button, Upload, UploadProps, message,
} from 'antd';
import { Helmet } from 'react-helmet';
import * as Icons from '@ant-design/icons';
import Layout from '@/components/Layout';
import Avatar from '@/components/Avatar';
import defaultCover from '@/assets/images/default_cover.jpg';
import './index.scss';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [fileUploading, setFileUploading] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    // setLoading(false);
  }, []);

  const profileRowTitles = [
    ['Year • Semester', <Icons.CalendarOutlined className="icon" />],
    ['Group', <Icons.TeamOutlined className="icon" />],
    ['Education level', <Icons.BookOutlined className="icon" />],
    ['Form of study', <Icons.EyeOutlined className="icon" />],
    ['Payment form', <Icons.DollarOutlined className="icon" />],
  ];
  const profileRowValues = [
    '4 • 7',
    'КН-919д',
    'Bachelor',
    'Full-time',
    'Budget',
  ];

  const profileColTitles = [
    'Faculty',
    'Speciality',
    'Educational program',
    'Cathedra',
    'Specialization',
  ];
  const profileColValues = [
    'Computer Science',
    'Computer Science',
    'Computer Science',
    'Computer Science',
    'Computer Science',
  ];

  const props: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isImage) {
        message.error(`${file.name} is not an image file`).then((r) => r);
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        setFileUploading(true);
      }
    },
  };

  return (
    <Layout>
      <Helmet title="Profile" />
      <div className="substrate pd-0">
        <div className="cover">
          {!loading ? (
            <img src={defaultCover} alt="cover" />
          ) : (
            <Skeleton.Input active className="skeleton" />
          )}
          <Upload className="upload" {...props}>
            <Button loading={fileUploading} disabled={fileUploading}>Edit cover</Button>
          </Upload>
        </div>
        <div className="basic">
          <div className="profile-avatar">
            {!loading ? (
              <Avatar size={160} />
            ) : (
              <Skeleton.Avatar size={160} active />
            )}
          </div>
          <div className="info">
            {!loading ? (
              <>
                <span className="name">Nazar Taran</span>
                <a className="email" href="mailto:">nazar.taran.id@gmail.com</a>
              </>
            ) : (
              <Skeleton paragraph={{ rows: 1 }} style={{ width: '250px' }} active />
            )}
          </div>
        </div>
      </div>
      <div className="substrate">
        <div className="profile-section col">
          {profileRowTitles.map((title, index) => (
            <div className="item" key={title[0] as string}>
              {!loading ? (
                <div>
                  <div className="label">
                    {title[1]}
                    <span className="title">{title[0]}</span>
                  </div>
                  <span className="value">{profileRowValues[index]}</span>
                </div>
              ) : (
                <Skeleton paragraph={{ rows: 1 }} active />
              )}
            </div>
          ))}
        </div>
        <div className="profile-section row">
          {profileColTitles.map((title, index) => (
            !loading ? (
              <div className="item" key={title}>
                <div>
                  <div className="title">
                    <span>{title}</span>
                  </div>
                  <div className="value">
                    <span>{profileColValues[index]}</span>
                  </div>
                </div>
              </div>
            ) : (
              <Skeleton key={title} paragraph={{ rows: 0 }} active style={!index ? { marginTop: '20px' } : {}} />
            )))}
        </div>
      </div>
    </Layout>
  );
}
