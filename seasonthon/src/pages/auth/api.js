// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // 서버주소
  withCredentials: true,
});

// 회원가입
export const signup = (data) =>
  api.post('/api/auth/signup', data);

// 로그인
export const login = (memberCode) =>
  api.post('/api/auth/login', { memberCode });

// 내 정보 확인
export const getMe = () =>
  api.get('/api/auth/me');

// 로그아웃
export const logout = () =>
  api.post('/api/auth/logout');

export default api;
