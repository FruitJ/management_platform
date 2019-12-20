
import request from "@/utils/request";
import qs from 'qs';

export async function reqSpuDetailsInfoService(params) {
	return request("/api/reqSpuDetailsInfoService", {
		
		method: "POST",
		body: qs.stringify(params),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
}
