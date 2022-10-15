import axios from 'axios';

export const fetchUserProfile = async (user: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/profile`,
});

export const fetchUserRecordBook = async (user: number, semester: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/record-book/${semester}`,
});
