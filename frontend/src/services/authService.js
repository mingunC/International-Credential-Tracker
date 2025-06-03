import { apiHelpers } from './api';

export const authService = {
  // 회원가입
  register: async (userData) => {
    try {
      const response = await apiHelpers.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 로그인
  login: async (email, password) => {
    try {
      const response = await apiHelpers.post('/auth/login', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 현재 사용자 정보 조회
  getMe: async () => {
    try {
      const response = await apiHelpers.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 비밀번호 변경
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiHelpers.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 토큰 검증
  verifyToken: async () => {
    try {
      const response = await apiHelpers.get('/auth/verify-token');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // 프로필 업데이트
  updateProfile: async (userData) => {
    try {
      const response = await apiHelpers.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};