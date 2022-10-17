// noinspection JSUnusedGlobalSymbols

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Profile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  image: ?string;
  cover: ?string;
  student_id: number;
  telegram_id: ?number;
  microsoft_id: ?number;
  group_id: number;
  role: string;
  locale: string;
  created_at: string;
  updated_at: string;
  year: number;
  middle_name: string;
  train_level: string;
  train_form: string;
  payment: string;
  group: {
    id: number;
    name: string;
  };
  specialization: {
    id: number;
    name: string;
  };
  cathedra: {
    id: number;
    name: string;
  };
  program: {
    id: number;
    name: string;
  };
  speciality: {
    id: number;
    name: string;
  };
  faculty: {
    id: number;
    name: string;
  };
}

interface RecordBook {
  subject: {
    id: number;
    name: string;
  };
  professor: string;
  cathedra: {
    full: string;
    short: string;
  };
  individual_task: string;
  mark_5: number;
  mark_100: number;
  mark_ects: string;
  mark_national: string;
  credit: string;
  control: string;
  debt: string;
}

interface Debt {
  subject: {
    id: number;
    name: string;
  };
  professor: string;
  cathedra: {
    full: string;
    short: string;
  };
  individual_task: string;
  semester: number;
  credit: string;
  control: string;
  date: string;
}
