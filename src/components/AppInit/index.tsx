import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cookies from 'js-cookie';
import { Theme } from '@/constants/settings';
import { AppDispatch } from '@/store/store';
import { getUserProfile } from '@/store/actions/users';

export default function AppInit() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: any) => state.themeReducer.theme);

  useEffect(() => {
    const userId = cookies.get('userId');
    if (userId) {
      dispatch(getUserProfile({ user: +userId }));
    } else {
      // TODO: redirect to login page, user 1 is just for testing
      dispatch(getUserProfile({ user: 1 }));
    }
  }, []);

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

  return null;
}
