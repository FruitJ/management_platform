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

/*export async function addTopPicsUrlService(params) {
	
	return request("/api/addTopPicsUrlService", {
		method: "POST",
		body: qs.stringify(params),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}*/
