import * as React from 'react';
import * as RouterDom from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { axiosInstance } from '../axiosConfig';
import axios from 'axios';

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

  const getRefreshToken = async () => {
    const response = await axiosInstance.post(
      `/auth/login`,
      JSON.stringify({
        loginname: 'jaham',
        passwd: '1234',
      })
    );

    localStorage.setItem('refreshToken', response.data);
  };

  const testRefreshToken = async () => {
    await axiosInstance.get('/auth/refreshToken', {
      headers: {
        Autorization: `Bearer ${localStorage.getItem('refreshToken')}`,
      },
    });
  };

  return (
    <>
      <button onClick={getToken}>getToken</button>
      <button onClick={testRefresh}>test refresh</button>
      <button onClick={getRefreshToken}>getRefreshToken</button>
      <button onClick={testRefreshToken}>testRefreshToken</button>
    </>
  );
}
