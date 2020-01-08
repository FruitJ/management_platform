import request from '@/utils/request';
import qs from 'qs';

/*export async function login(params) {
  // 登录
  return request('/management_platform/login', {
    method: 'POST',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}*/
export async function login(params) {
  // 登录
  return request('/api/login/account', {
    method: 'POST',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
