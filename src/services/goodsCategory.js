import request from "@/utils/request";
import qs from "qs";

export async function reqGoodsCategoryService() {
	return request('/api/backend/beanmall/third/goods/category/list', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	});
}

export async function createNewCategoryService(params) {
	return request('/api/backend/beanmall/third/goods/category/create', {
		method: 'POST',
		body: JSON.stringify(params),
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}

export async function editCategoryService(params) {
	return request("/api/editCategoryService", {
		method: "POST",
		body: qs.stringify(params),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	});
}

export async function deleteCategoryService(params) {
	
	return request("/api/delCategoryService", {
		method: "POST",
		body: qs.stringify(params),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		}
	});
}

