// 添加 sku 商品 service
import request from '@/utils/request';
import qs from 'qs';
// import {uploadPics} from "@/utils/uploadPicsToQiniu";

export async function getTokenService() {
  return request('/api/backend/beanmall/third/qiniu/token/no/callback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function uploadTopPicService(params) {
  return request('/api/uploadTopPicService', {
    method: 'POST',
    body: params,
  });
}

export async function uploadBottomPicService(params) {
  return request('/api/uploadBottomPicService', {
    method: 'POST',
    body: params,
  });
}

export async function initIdDataService() {
  return request('/api/initIdDataService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function createNewCategoryService(params) {
  return request('/api/createNewCategoryService', {
    method: 'POST',
    body: qs.stringify(params),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function reqGoodsCategoryService() {
  return request('/api/backend/beanmall/third/goods/category/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function reqGoodsSpecsService(params) {
  return request('/api/backend/beanmall/third/goods/spec/option/all', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

export async function addSkuGoodsService(params) {
  return request('/api/backend/beanmall/third/goods/create', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}


export async function loadParentNodeDataService() {
  return request('/api/loadParentNodeDataService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function getNewParentNamesEleService(param) {
  return request('/api/getNewParentNamesEleService', {
    method: 'POST',
    body: qs.stringify(param),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function loadChildNodeDataService(param) {
  return request('/api/loadChildNodeDataService', {
    method: 'POST',
    body: qs.stringify(param),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function getNewChildNamesEleService(param) {
  return request('/api/getNewChildNamesEleService', {
    method: 'POST',
    body: qs.stringify(param),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function uploadPicService(params) {

  return request('/api/uploadPicService', {
    method: 'POST',
    body: params,
  });
}


