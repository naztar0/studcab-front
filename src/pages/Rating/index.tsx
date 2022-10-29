import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import * as Icons from '@ant-design/icons';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Semester from '@/components/Semester';
import { getUserRating } from '@/store/actions/users';
import { yearToSemester, calculationFormat } from '@/helpers/utils';
import './index.scss';

export default function Rating() {
  const dispatch = useDispatch<AppDispatch>();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.ratingReducer.isLoading);
  const ratingData: Rating[] = useSelector((state: any) => state.ratingReducer.rating);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0, true) || 1);

  useEffect(() => {
    dispatch(getUserRating({ user: profileData.id, semester }));
  }, [semester]);

  useEffect(() => {
    setTimeout(() => {
      const oldSelectors = document.getElementsByClassName('rating-me');
      for (let i = 0; i < oldSelectors.length; i++) {
        oldSelectors[i].classList.remove('rating-me');
      }
      const ratingMe = document.getElementsByClassName('student-id');
      for (let i = 0; i < ratingMe.length; i++) {
        if (ratingMe[i].innerHTML === profileData.student_id.toString()) {
          ratingMe[i].parentElement?.parentElement?.classList.add('rating-me');
          ratingMe[i].parentElement?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 750);
  }, [isLoading]);

  const ratingColumns: ColumnsType<Rating> = isLoading ? [] : [
    {
      key: 'position',
      dataIndex: 'position',
      title: '№',
      render: (value, record) => (
        <>
          <span>{record.position}</span>
          <span className="student-id">{record.student.id}</span>
        </>
      ),
      sorter: (a, b) => a.position - b.position,
    },
    {
      key: 'student',
      dataIndex: 'student',
      title: 'Student',
      render: (value, record) => {
        const percent = (record.position * 100) / ratingData.length;
        const probability = percent > 50 ? '0%' : (percent > 45 ? 'висока' : '100%');
        return (
          <Tooltip
            title={
              record.student.id === profileData?.student_id
                ? `Percentage in the rating: ${percent.toFixed(2)}%\n`
                + `Probability of getting a scholarship: ${probability}`
                : null
            }
            placement="right"
          >
            <div>
              <Link to={`/student/${record.student.id}`}>
                <span>{record.student.name}</span>
              </Link>
            </div>
          </Tooltip>
        );
      },
      sorter: (a, b) => a.student.name.localeCompare(b.student.name),
    },
    {
      key: 'group',
      dataIndex: 'group',
      title: 'Group',
      render: (value, record) => (
        <span>{record.group}</span>
      ),
      sorter: (a, b) => a.group.localeCompare(b.group),
    },
    {
      key: 'mark_5',
      dataIndex: 'mark_5',
      title: 'Nat',
      render: (value, record) => (
        <span>{record.mark_5}</span>
      ),
      sorter: (a, b) => a.mark_5 - b.mark_5,
    },
    {
      dataIndex: 'mark_100',
      key: 'mark_100',
      title: 'Mark',
      render: (value, record) => (
        <Tooltip title={calculationFormat(record.calculation)} placement="left">
          <span>{record.mark_100}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.mark_100 - b.mark_100,
    },
  ];

  const ratingDataSource = ratingData?.map((data, index) => ({ key: index, ...data }));

  const ratingTableTitle = () => (
    <div className="table-title">
      <span className="title">Rating</span>
      <Semester semester={semester} setSemester={setSemester} />
    </div>
  );

  return (
    <Layout>
      <Helmet title="Rating" />
      <div className="substrate subject-table">
        <Table
          columns={ratingColumns}
          dataSource={ratingDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          size="small"
          locale={{
            emptyText: (
              <div className="empty-table">
                <Icons.ExceptionOutlined className="icon-big" />
                <p>No data</p>
              </div>
            ),
          }}
          title={ratingTableTitle}
        />
      </div>
    </Layout>
  );
}
