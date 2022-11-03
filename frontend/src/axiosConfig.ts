import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_EP,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken === null) throw error;

      try {
        const refreshResponse = await axiosInstance.post('/auth/refresh', {
          refreshToken,
        });

        localStorage.setItem('refreshToken', refreshResponse.data.refreshToken);

        return axiosInstance(error.config);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);
