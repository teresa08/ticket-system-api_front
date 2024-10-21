import axios from "axios";
export type MessagePayload<T> =
  {
    status: number
    payload: T,
    token: string,
    errorCode: string
  }
const api = axios.create({
  baseURL: 'https://localhost:7079',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const get = async <R> (url: string, params = {}):Promise<MessagePayload<R>> => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};


export const put = async <T, R>(url: string, data: T): Promise<MessagePayload<R>> => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};

export const _delete = async <R> (url: string, params = {}):Promise<MessagePayload<R>> => {
  try {
    const response = await api.delete(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error en GET:', error);
    throw error;
  }
};



export const post = async <T, R>(url: string, data: T): Promise<MessagePayload<R>> => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error en POST:', error);
    throw error;
  }
};