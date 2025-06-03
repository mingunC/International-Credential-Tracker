import axios from 'axios';
import { toast } from 'react-toastify';

// API 기본 URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터 - 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);

    // 네트워크 에러
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // 인증 실패 - 토큰 제거 및 로그인 페이지로 리다이렉트
        localStorage.removeItem('token');
        if (window.location.pathname !== '/login') {
          toast.error('Session expired. Please login again.');
          window.location.href = '/login';
        }
        break;

      case 403:
        toast.error('You do not have permission to perform this action.');
        break;

      case 404:
        toast.error('Requested resource not found.');
        break;

      case 422:
        // 유효성 검사 에러
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach(err => toast.error(err.msg || err));
        } else {
          toast.error(data.message || 'Validation failed.');
        }
        break;

      case 500:
        toast.error('Server error. Please try again later.');
        break;

      default:
        toast.error(data.message || 'An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

// API 헬퍼 함수들
export const apiHelpers = {
  // GET 요청
  get: (url, config = {}) => api.get(url, config),
  
  // POST 요청
  post: (url, data = {}, config = {}) => api.post(url, data, config),
  
  // PUT 요청
  put: (url, data = {}, config = {}) => api.put(url, data, config),
  
  // PATCH 요청
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),
  
  // DELETE 요청
  delete: (url, config = {}) => api.delete(url, config),
  
  // 파일 업로드
  uploadFile: (url, file, onUploadProgress = null) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  },
  
  // 다중 파일 업로드
  uploadFiles: (url, files, onUploadProgress = null) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    
    return api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  }
};

// 요청 취소를 위한 헬퍼
export const createCancelToken = () => axios.CancelToken.source();

// 요청이 취소되었는지 확인
export const isCancel = axios.isCancel;

export default api;