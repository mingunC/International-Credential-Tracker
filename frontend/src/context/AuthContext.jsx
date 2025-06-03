import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import { authService } from '../services/authService';

// 초기 상태
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null,
  // Application 관리 추가
  applications: JSON.parse(localStorage.getItem('applications')) || [],
  applicationLoading: false,
  applicationError: null
};

// 액션 타입
const actionTypes = {
  AUTH_START: 'AUTH_START',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAIL: 'AUTH_FAIL',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  
  // Application 액션들
  APPLICATION_START: 'APPLICATION_START',
  APPLICATION_SUCCESS: 'APPLICATION_SUCCESS',
  APPLICATION_FAIL: 'APPLICATION_FAIL',
  ADD_APPLICATION: 'ADD_APPLICATION',
  UPDATE_APPLICATION: 'UPDATE_APPLICATION',
  DELETE_APPLICATION: 'DELETE_APPLICATION',
  CLEAR_APPLICATION_ERROR: 'CLEAR_APPLICATION_ERROR'
};

// 리듀서
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    
    case actionTypes.LOGOUT:
      // 로그아웃 시 applications도 초기화
      localStorage.removeItem('applications');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        applications: [],
        applicationError: null
      };
    
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    // Application 관련 액션들
    case actionTypes.APPLICATION_START:
      return {
        ...state,
        applicationLoading: true,
        applicationError: null
      };

    case actionTypes.APPLICATION_SUCCESS:
      return {
        ...state,
        applicationLoading: false,
        applicationError: null
      };

    case actionTypes.APPLICATION_FAIL:
      return {
        ...state,
        applicationLoading: false,
        applicationError: action.payload
      };

    case actionTypes.ADD_APPLICATION:
      const newApplications = [...state.applications, action.payload];
      localStorage.setItem('applications', JSON.stringify(newApplications));
      return {
        ...state,
        applications: newApplications,
        applicationLoading: false,
        applicationError: null
      };

    case actionTypes.UPDATE_APPLICATION:
      const updatedApplications = state.applications.map(app =>
        app.id === action.payload.id ? { ...app, ...action.payload.updates } : app
      );
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      return {
        ...state,
        applications: updatedApplications,
        applicationLoading: false,
        applicationError: null
      };

    case actionTypes.DELETE_APPLICATION:
      const filteredApplications = state.applications.filter(app => app.id !== action.payload);
      localStorage.setItem('applications', JSON.stringify(filteredApplications));
      return {
        ...state,
        applications: filteredApplications,
        applicationLoading: false,
        applicationError: null
      };

    case actionTypes.CLEAR_APPLICATION_ERROR:
      return {
        ...state,
        applicationError: null
      };
    
    default:
      return state;
  }
};

// 컨텍스트 생성
const AuthContext = createContext();

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 토큰 검증 및 사용자 정보 로드
  const loadUser = async () => {
    if (state.token) {
      try {
        dispatch({ type: actionTypes.AUTH_START });
        
        const response = await authService.getMe();
        
        dispatch({
          type: actionTypes.AUTH_SUCCESS,
          payload: {
            user: response.data.user,
            token: state.token
          }
        });
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem('token');
        dispatch({
          type: actionTypes.AUTH_FAIL,
          payload: error.response?.data?.message || 'Authentication failed'
        });
      }
    } else {
      dispatch({ type: actionTypes.AUTH_FAIL, payload: null });
    }
  };

  // 로그인
  const login = async (email, password) => {
    try {
      dispatch({ type: actionTypes.AUTH_START });
      
      const response = await authService.login(email, password);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: { user, token }
      });
      
      toast.success('Login successful!');
      return response;
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      
      dispatch({
        type: actionTypes.AUTH_FAIL,
        payload: errorMessage
      });
      
      toast.error(errorMessage);
      throw error;
    }
  };

  // 회원가입
  const register = async (userData) => {
    try {
      dispatch({ type: actionTypes.AUTH_START });
      
      const response = await authService.register(userData);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        payload: { user, token }
      });
      
      toast.success('Registration successful!');
      return response;
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      
      dispatch({
        type: actionTypes.AUTH_FAIL,
        payload: errorMessage
      });
      
      toast.error(errorMessage);
      throw error;
    }
  };

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: actionTypes.LOGOUT });
    toast.info('Logged out successfully');
  };

  // 사용자 정보 업데이트
  const updateUser = (userData) => {
    dispatch({
      type: actionTypes.UPDATE_USER,
      payload: userData
    });
  };

  // 에러 클리어
  const clearError = React.useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  }, []);

  // Application 관련 함수들
  
  // 새 Application 추가
  const addApplication = async (applicationData) => {
    try {
      dispatch({ type: actionTypes.APPLICATION_START });

      // 실제 환경에서는 API 호출
      // const response = await applicationService.create(applicationData);
      
      // 시뮬레이션용 지연
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newApplication = {
        id: Date.now(),
        ...applicationData,
        submittedDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };

      dispatch({
        type: actionTypes.ADD_APPLICATION,
        payload: newApplication
      });

      toast.success('Application submitted successfully!');
      return newApplication;

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit application';
      
      dispatch({
        type: actionTypes.APPLICATION_FAIL,
        payload: errorMessage
      });

      toast.error(errorMessage);
      throw error;
    }
  };

  // Application 업데이트
  const updateApplication = async (applicationId, updates) => {
    try {
      dispatch({ type: actionTypes.APPLICATION_START });

      // 실제 환경에서는 API 호출
      // const response = await applicationService.update(applicationId, updates);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch({
        type: actionTypes.UPDATE_APPLICATION,
        payload: { id: applicationId, updates }
      });

      toast.success('Application updated successfully!');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update application';
      
      dispatch({
        type: actionTypes.APPLICATION_FAIL,
        payload: errorMessage
      });

      toast.error(errorMessage);
      throw error;
    }
  };

  // Application 삭제
  const deleteApplication = async (applicationId) => {
    try {
      dispatch({ type: actionTypes.APPLICATION_START });

      // 실제 환경에서는 API 호출
      // await applicationService.delete(applicationId);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch({
        type: actionTypes.DELETE_APPLICATION,
        payload: applicationId
      });

      toast.success('Application deleted successfully!');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete application';
      
      dispatch({
        type: actionTypes.APPLICATION_FAIL,
        payload: errorMessage
      });

      toast.error(errorMessage);
      throw error;
    }
  };

  // Application ID로 찾기
  const getApplicationById = (applicationId) => {
    return state.applications.find(app => app.id === applicationId);
  };

  // Application 에러 클리어
  const clearApplicationError = React.useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_APPLICATION_ERROR });
  }, []);

  // 컴포넌트 마운트 시 사용자 정보 로드
  useEffect(() => {
    loadUser();
  }, []);

  // 컨텍스트 값
  const value = {
    // 기존 Auth 관련
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
    loadUser,

    // Application 관련
    applications: state.applications,
    applicationLoading: state.applicationLoading,
    applicationError: state.applicationError,
    addApplication,
    updateApplication,
    deleteApplication,
    getApplicationById,
    clearApplicationError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};