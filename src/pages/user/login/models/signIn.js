import {login} from "@/services/login";
import {routerRedux} from "dva/router";
import {setAuthority, setCurrentUser} from "@/utils/authority";
const md5 = require('js-md5');

export default {

	namespace: "signIn",
	state: {
		userStatus: {}, // 用户登录状态
	},
	effects: {
		*login({ payload: param }, { call, put }) {
			// 提交数据
			console.log('--- +++ ---');
			console.log(param);
			// 判断当前登录方式，对密码进行 md5 摘要
			param.data.userPwd = md5(param.data.userPwd);
			let res = yield call(login, param);
			console.log('咕噜咕噜咕噜');
			console.log(res);
			// 调用 _login 函数来更新状态
			yield put({
				type: '_login',
				payload: res,
			});
			console.log(res.status);
			
			// 跳转到主界面
			yield put(routerRedux.push('/home'));
		},
	},
	reducers: {
		_login(state, { payload }) {
			state.userStatus = payload;
			console.log('&&&&');
			console.log(payload);
			// 设置用户登录权限
			setAuthority(payload.currentAuthority);
			// 设置当前登录用户
			console.log('啦啦啦啦啦');
			console.log(payload.user);
			setCurrentUser(payload.user);
			return { ...state, status: payload.status, type: payload.type };
		},
	},
	subscriptions: {
	
	},
}
