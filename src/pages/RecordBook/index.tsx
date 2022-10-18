import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import * as Icons from '@ant-design/icons';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Semester from '@/components/Semester';
import { getUserRecordBook } from '@/store/actions/users';
import { yearToSemester } from '@/helpers/utils';
import './index.scss';

export default function RecordBook() {
  const dispatch = useDispatch<AppDispatch>();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.recordBookReducer.isLoading);
  const recordBookData: { record_book: RecordBook[], debts: Debt[] } = useSelector(
    (state: any) => state.recordBookReducer.recordBook,
  );

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0, true) || 1);

  useEffect(() => {
    dispatch(getUserRecordBook({ user: 1, semester }));
  }, [semester]);

  const rbColumns: ColumnsType<RecordBook> = isLoading ? [] : [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: 'Subject',
      render: (value, record) => (
        <div className="row-data">
          <span className="subject-name">{record.subject.name}</span>
          <div>
            <span className="professor">{record.professor}</span>
            <Tooltip title={record.cathedra.full} placement="right">
              <span className="cathedra">{record.cathedra.short}</span>
            </Tooltip>
          </div>
        </div>
      ),
      sorter: (a, b) => a.subject.name.localeCompare(b.subject.name),
    },
    {
      key: 'credit',
      dataIndex: 'credit',
      title: 'Credit',
      render: (value, record) => (
        <span>{record.credit}</span>
      ),
      sorter: (a, b) => a.credit.localeCompare(b.credit),
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: 'E/C',
      render: (value, record) => (
        <div className="row-data e-c">
          <span>{record.control || '-'}</span>
          <span>{record.individual_task || '-'}</span>
        </div>
      ),
      sorter: (a, b) => a.control.localeCompare(b.control),
    },
    {
      key: 'mark_5',
      dataIndex: 'mark_5',
      title: 'Nat',
      render: (value, record) => (
        <Tooltip title={record.mark_national} placement="top">
          <span>{record.mark_5}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.mark_5 - b.mark_5,
    },
    {
      dataIndex: 'mark_100',
      key: 'mark_100',
      title: 'Mark',
      render: (value, record) => (
        <Tooltip title={record.mark_national} placement="top">
          <span>{record.mark_100}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.mark_100 - b.mark_100,
    },
    {
      key: 'mark_ects',
      dataIndex: 'mark_ects',
      title: 'ECTS',
      render: (value, record) => (
        <Tooltip title={record.mark_national} placement="top">
          <span>{record.mark_ects}</span>
        </Tooltip>
      ),
      sorter: (a, b) => a.mark_ects.localeCompare(b.mark_ects),
    },
  ];

  const debtsColumns: ColumnsType<Debt> = isLoading ? [] : [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: 'Subject',
      render: (value, record) => (
        <div className="row-data">
          <span className="subject-name">{record.subject.name}</span>
          <div>
            <span className="professor">{record.professor}</span>
            <Tooltip title={record.cathedra.full} placement="right">
              <span className="cathedra">{record.cathedra.short}</span>
            </Tooltip>
          </div>
        </div>
      ),
      sorter: (a, b) => a.subject.name.localeCompare(b.subject.name),
    },
    {
      key: 'credit',
      dataIndex: 'credit',
      title: 'Credit',
      render: (value, record) => (
        <span>{record.credit}</span>
      ),
      sorter: (a, b) => a.credit.localeCompare(b.credit),
    },
    {
      key: 'semester',
      dataIndex: 'semester',
      title: 'Semester',
      render: (value, record) => (
        <span>{record.semester}</span>
      ),
      sorter: (a, b) => a.semester - b.semester,
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: 'E/C',
      render: (value, record) => (
        <div className="row-data e-c">
          <span>{record.control || '-'}</span>
          <span>{record.individual_task || '-'}</span>
        </div>
      ),
      sorter: (a, b) => a.control.localeCompare(b.control),
    },
    {
      key: 'date',
      dataIndex: 'date',
      title: 'Date',
      render: (value, record) => (
        <span>{record.date}</span>
      ),
      sorter: (a, b) => Date.parse(a.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')) - Date.parse(b.date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$2/$1/$3')),
    },
  ];

  const rbDataSource = recordBookData.record_book?.map((data, index) => ({ key: index, ...data }));
  const debtsDataSource = recordBookData.debts?.map((data, index) => ({ key: index, ...data }));

  const rbTableTitle = () => (
    <div className="table-title">
      <span className="title">Record Book</span>
      <Semester semester={semester} setSemester={setSemester} />
    </div>
  );

  const debtsTableTitle = () => (
    <div className="table-title">
      <Icons.WarningOutlined className="icon" />
      <span className="title">Debts</span>
    </div>
  );

  return (
    <Layout>
      <Helmet title="Record Book" />
      <div className="substrate subject-table">
        <Table
          columns={rbColumns}
          dataSource={rbDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          locale={{
            emptyText: (
              <div className="empty-table">
                <Icons.ExceptionOutlined className="icon-big" />
                <p>No data</p>
              </div>
            ),
          }}
          title={rbTableTitle}
        />
      </div>
      <div className="substrate subject-table debts">
        <Table
          columns={debtsColumns}
          dataSource={debtsDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          locale={{
            emptyText: (
              <div className="empty-table">
                <Icons.ExceptionOutlined className="icon-big" />
                <p>No debts</p>
              </div>
            ),
          }}
          title={debtsTableTitle}
        />
      </div>
    </Layout>
  );
}
