import axios from 'axios';
import * as ReactQuery from '@tanstack/react-query';
import * as RouterDom from 'react-router-dom';
import { atom, useAtom } from 'jotai';

export const loginStateAtom = atom<boolean>(false);
export const setLoginStateAtom = atom(null, (_, set, update: boolean) => {
  console.log(update);
  set(loginStateAtom, update);
  if (update === false) localStorage.removeItem('rtk');
});

export function Root() {
  const [, setLoginState] = useAtom(loginStateAtom);
  const navigator = RouterDom.useNavigate();

  const getLoginByToken = async ({ queryKey }: { queryKey: string[] }) => {
    const response = await axios.get('/');

    if (response.status === 200) {
      setLoginState(true);
      return;
    }

    setLoginState(false);
    navigator('/login');
  };

  const query = ReactQuery.useQuery({
    queryKey: ['login', 'token'],
    queryFn: getLoginByToken,
  });

  return query.isLoading ? (
    <div>Loading...</div>
  ) : query.isError ? (
    <div>Error...</div>
  ) : (
    <RouterDom.Outlet />
  );
}
