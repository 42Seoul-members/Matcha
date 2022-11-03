import * as React from 'react';
import * as RouterDom from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { axiosInstance } from '../axiosConfig';

export const loginStateAtom = atom<string | null>(null);
export const setLoginStateAtom = atom(null, (_, set, update: string | null) => {
  set(loginStateAtom, update);
  if (update === null) {
    localStorage.removeItem('rtk');
    return;
  }
});

export function AuthCheck() {
  React.useEffect(() => {
    axiosInstance.get('/test');
  }, []);

  return <div>testing</div>;
}
