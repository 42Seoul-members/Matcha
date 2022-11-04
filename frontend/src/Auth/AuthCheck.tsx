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
  const getToken = async () => {
    const response = await axiosInstance.get('/logintest');
    localStorage.setItem('refreshToken', response.data.refreshToken);
  };

  const testRefresh = async () => {
    axiosInstance
      .post('/logintest')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('test done');
  };

  return (
    <>
      <button onClick={getToken}>getToken</button>
      <button onClick={testRefresh}>test refresh</button>
    </>
  );
}
