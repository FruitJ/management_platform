import request from '@/utils/request';
import qs from 'qs';

// 更新 spu 列表数据
export async function updateSpuContents(params) {
  return request('/api/updateSpuContent', {
    method: 'POST',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function getUpdatedSpuList(params) {
  return request('/api/spuList/get', {
    method: 'POST',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

// 获取 spu 名称数据
export async function initSpuNames() {
  return request('/api/initSpuNames', {
    method: 'POST',
  });
}

export async function getSpuClasses() {
  return request('/api/getSpuClasses', {
    method: 'POST',
  });
}

export async function selectClassesUpdateSpu(params) {
  return request('/api/selectClassesUpdateSpu', {
    method: 'POST',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
