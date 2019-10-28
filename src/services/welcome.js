import request from "@/utils/request";

export async function initWelcomeData() {
	return request("/api/initWelcomeData");
}
