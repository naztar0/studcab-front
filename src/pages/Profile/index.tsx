import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Skeleton, Button, Upload, UploadProps, message,
} from 'antd';
import { Helmet } from 'react-helmet';
import * as Icons from '@ant-design/icons';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Avatar from '@/components/Avatar';
import { setUserCover } from '@/store/actions/users';
import { yearToSemester } from '@/helpers/utils';
import defaultCover from '@/assets/images/default_cover.jpg';
import './index.scss';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading: boolean = useSelector((state: any) => state.profileReducer.isLoading);
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoadingCover: boolean = useSelector((state: any) => state.coverReducer.isLoading);

  const profileRowTitles = [
    ['Year • Semester', <Icons.CalendarOutlined className="icon" />],
    ['Group', <Icons.TeamOutlined className="icon" />],
    ['Education level', <Icons.BookOutlined className="icon" />],
    ['Form of study', <Icons.EyeOutlined className="icon" />],
    ['Payment form', <Icons.DollarOutlined className="icon" />],
  ];

  const profileRowValues = !profileData ? [] : [
    `${profileData.year} • ${yearToSemester(profileData.year)}`,
    profileData.group.name,
    profileData.train_level,
    profileData.train_form,
    profileData.payment,
  ];

  const profileColTitles = [
    'Faculty',
    'Speciality',
    'Educational program',
    'Cathedra',
    'Specialization',
  ];

  const profileColValues = !profileData ? [] : [
    profileData.faculty.name,
    profileData.speciality.name,
    profileData.program.name,
    profileData.cathedra.name,
    profileData.specialization.name,
  ];

  const props: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isImage) {
        message.error(`${file.name} is not an image file`).then();
      }
      return isImage || Upload.LIST_IGNORE;
    },
    customRequest: (options) => {
      dispatch(setUserCover({ user: profileData.id, image: options.file as File }));
    },
  };

  return (
    <Layout>
      <Helmet title="Profile" />
      <div className="substrate pd-0">
        <div className="cover">
          {!isLoading ? (
            <img src={profileData.cover ? import.meta.env.VITE_APP_IMAGES_URL + profileData.cover : defaultCover} alt="cover" />
          ) : (
            <Skeleton.Input active className="skeleton" />
          )}
          <Upload className="upload" {...props}>
            <Button loading={isLoadingCover} disabled={isLoadingCover}>Edit cover</Button>
          </Upload>
        </div>
        <div className="basic">
          <div className="profile-avatar">
            {!isLoading ? (
              <Avatar
                size={160}
                avatar={profileData.image}
                username={profileData.first_name}
                mono
              />
            ) : (
              <Skeleton.Avatar size={160} active />
            )}
          </div>
          <div className="info">
            {!isLoading ? (
              <>
                <span className="name">{`${profileData.last_name} ${profileData.first_name} ${profileData.middle_name}`}</span>
                <a className="email" href={`mailto:${profileData.email}`}>{profileData.email}</a>
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
              {!isLoading ? (
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
            !isLoading ? (
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
