import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_EP,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
  console.log(request.method);
  if (request.method === 'post') {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
    };
    return request;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.warn('success');
    return response;
  },
  async (error) => {
    console.warn('error');
    if (error?.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken === null) return Promise.reject(error);

      try {
        console.log('try refresh');
        const refreshResponse = await axiosInstance.post(
          '/refreshtest',
          JSON.stringify({
            refreshToken,
          })
        );

        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

        console.log('try original req');
        return axiosInstance(error.config);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);
