import request from '@/utils/request';

export async function login(params) {
  // 登录
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
