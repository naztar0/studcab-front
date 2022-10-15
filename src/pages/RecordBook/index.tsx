import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import * as Icons from '@ant-design/icons';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import { getUserRecordBook } from '@/store/actions/users';
import './index.scss';

export default function RecordBook() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading: boolean = useSelector((state: any) => state.recordBookReducer.isLoading);
  const recordBookData: { record_book: RecordBook[], debts: [] } = useSelector(
    (state: any) => state.recordBookReducer.recordBook,
  );

  const [semester, setSemester] = useState(1);

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
            <span>{record.professor}</span>
            <Tooltip title={record.cathedra.full} placement="right">
              <span className="cathedra">{record.cathedra.short}</span>
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      key: 'credit',
      dataIndex: 'credit',
      title: 'Credit',
      render: (value, record) => (
        <span>{record.credit}</span>
      ),
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
    },
  ];

  const rbDataSource = recordBookData.record_book?.map((data, index) => ({ key: index, ...data }));

  return (
    <Layout>
      <Helmet title="Record Book" />
      <div className="substrate record-book">
        <Table
          columns={rbColumns}
          dataSource={rbDataSource}
          pagination={false}
          loading={isLoading}
          locale={{
            emptyText: (
              <div className="empty-table">
                <Icons.ExceptionOutlined className="icon-big" />
                <p>No data</p>
              </div>
            ),
          }}
        />
      </div>
    </Layout>
  );
}
