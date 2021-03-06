// 导入官方包
import { routerRedux } from 'dva/router';
const md5 = require('js-md5');
import { setAuthority, setCurrentUser } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
// 导入自定义的包
import { login } from '@/services/login';

export default {
  namespace: 'consumerLogin',
  state: {
    isSwitchLoginWay: false, // 是否切换登录方式
    isAgreeKGAgreement: true, // 是否同意宽广集团关于三方商户管理平台若干规定
    isShowModel: false, // 是否展示宽广集团关于三方商户管理平台若干规定内容的模态框
    isAutoLogin: false,
    userStatus: {}, // 用户登录状态
  },
  effects: {
    *back({}, { call, put }) {
      // 回退到上一页
      yield put(routerRedux.go(-1));
    },
    *toForgetPasswordPage({}, { call, put }) {
      // 跳转到 "忘记密码" 页
      yield put(routerRedux.push('/user/forgetPassword'));
    },
    *toRegister({}, { call, put }) {
      // 跳转到 "注册" 页
      yield put(routerRedux.push('/user/register'));
    },
    *login({ payload: data }, { call, put }) {
      // 提交数据
      // 判断当前登录方式，对密码进行 md5 摘要
      data.userName !== undefined ? (data.userPwd = md5(data.userPwd)) : null;
      let res = yield call(login, data);
      // 调用 _login 函数来更新状态
      yield put({
        type: '_login',
        payload: res,
      });

      // 跳转到主界面
      yield put(routerRedux.push('/home'));
    },
  },
  reducers: {
    _loginSwitchLoginWay(state, { payload: tag }) {
      // 切换登录方式
      state.isSwitchLoginWay = tag.val;
      return { ...state };
    },
    _loginIsAgreeKGAgreement(state, { payload: tag }) {
      // 宽广规定 - 多选框
      state.isAgreeKGAgreement = tag.val;
      return { ...state };
    },
    _showModel(state) {
      // 展示宽广集团关于三方商户管理平台的若干规定的内容信息
      state.isShowModel = true;
      return { ...state };
    },
    _modelState(state, { payload: tag }) {
      // 改变展示 "规定" 信息的模态框的状态 ( 移除模态框 + 更改多选框【宽广规定】 )
      state.isShowModel = false;
      tag.val ? (state.isAgreeKGAgreement = true) : (state.isAgreeKGAgreement = false);
      return { ...state };
    },
    _login(state, { payload }) {
      state.userStatus = payload;
      // 设置用户登录权限
      setAuthority(payload.currentAuthority);
      // 设置当前登录用户
      setCurrentUser(payload.user);
      return { ...state, status: payload.status, type: payload.type };
    },
    _autoLogin(state, { payload: tag }) {
      state.isAutoLogin = tag.val;
      return { ...state };
    },
  },
  subscriptions: {},
};
