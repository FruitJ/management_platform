// 导入官方包
import { routerRedux } from 'dva/router';

export default {
  namespace: 'consumerLogin',
  state: {
    isSwitchLoginWay: false, // 是否切换登录方式
    isAgreeKGAgreement: true, // 是否同意宽广集团关于三方商户管理平台若干规定
    isShowModel: false, // 是否展示宽广集团关于三方商户管理平台若干规定内容的模态框
  },
  effects: {
    *back({}, { call, put }) {
      // 回退到上一页
      yield put(routerRedux.go(-1));
    },
    *toForgetPasswordPage({}, { call, put }) {
      // 跳转到 "忘记密码" 页
      yield put(routerRedux.push('/consumer/forgetPassword'));
    },
    *toRegister({}, { call, put }) {
      // 跳转到 "注册" 页
      yield put(routerRedux.push('/consumer/register'));
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
  },
  subscriptions: {},
};
