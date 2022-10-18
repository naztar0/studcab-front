import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { Chart, ArcElement, Tooltip as ChartTooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import * as Icons from '@ant-design/icons';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Semester from '@/components/Semester';
import { getUserSyllabus } from '@/store/actions/users';
import { yearToSemester } from '@/helpers/utils';
import './index.scss';

export default function Rating() {
  const dispatch = useDispatch<AppDispatch>();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.syllabusReducer.isLoading);
  const syllabusData: Syllabus[] = useSelector((state: any) => state.syllabusReducer.syllabus);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0, true) || 1);

  useEffect(() => {
    dispatch(getUserSyllabus({ user: 1, semester }));
  }, [semester]);

  Chart.register(ArcElement, ChartTooltip);

  const syllabusColumns: ColumnsType<Syllabus> = isLoading ? [] : [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: 'Subject',
      render: (value, record) => (
        <div className="row-data">
          <span className="subject-name">{record.subject.name}</span>
          <div>
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
      key: 'hours',
      dataIndex: 'hours',
      title: 'Hours',
      render: (value, record) => (
        <span>{record.hours}</span>
      ),
      sorter: (a, b) => a.hours - b.hours,
    },
  ];

  const syllabusDataSource = syllabusData?.map((data, index) => ({ key: index, ...data }));

  const syllabusTableTitle = () => (
    <div className="table-title">
      <span className="title">Syllabus</span>
      <Semester semester={semester} setSemester={setSemester} />
    </div>
  );

  const colors1: string[] = [];
  for (let i = 0; i < syllabusData.length; i++) {
    colors1.push(`hsl(${(i * 360) / syllabusData.length}deg 100% 50% / 50%)`);
  }
  const colors2: string[] = [];
  for (let i = 0; i < syllabusData.length; i++) {
    colors2.push(`hsl(${(i * 360) / syllabusData.length}, 50%, 20%)`);
  }

  const creditsChart = {
    labels: syllabusData?.map((data) => data.subject.name),
    datasets: [
      {
        label: 'Credits',
        data: syllabusData?.map((data) => data.credit),
        backgroundColor: colors1,
        borderColor: colors2,
        borderWidth: 1,
      },
    ],
  };

  const hoursChart = {
    labels: syllabusData?.map((data) => data.subject.name),
    datasets: [
      {
        label: 'Hours',
        data: syllabusData?.map((data) => data.hours),
        backgroundColor: colors1,
        borderColor: colors2,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    cutout: '83%',
    responsive: true,
    borderRadius: 99,
    spacing: 20,
  };

  return (
    <Layout>
      <Helmet title="Syllabus" />
      <div className="substrate subject-table">
        <Table
          columns={syllabusColumns}
          dataSource={syllabusDataSource}
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
          title={syllabusTableTitle}
        />
      </div>
      <div className="substrate charts">
        <div className="legend">
          {syllabusData?.map((data, index) => (
            <div className="legend-item" key={data.subject.id}>
              <div className="legend-color" style={{ backgroundColor: colors1[index] }} />
              <span className="legend-name">{data.subject.name}</span>
            </div>
          ))}
        </div>
        <div className="chart">
          <span className="chart-title">Credits</span>
          <div>
            <Doughnut data={creditsChart} height={300} options={chartOptions} />
          </div>
        </div>
        <div className="chart">
          <span className="chart-title">Hours</span>
          <div>
            <Doughnut data={hoursChart} height={300} options={chartOptions} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
