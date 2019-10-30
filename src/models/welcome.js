// 导入官方包
import { routerRedux } from 'dva/router';

// 导入自定义包
import { initWelcomeData } from '@/services/welcome';

export default {
  namespace: 'welcome',
  state: {
    list: {},
    moveLogoCtlGoods: '',
    moveLogoCptAppoah: '',
    moveLogoAbsSafe: '',
    moveLogoCldService: '',
    menuItems: '',
  },
  effects: {
    *initWelcomeData({}, { call, put }) {
      // 初始化欢迎页的页面数据
      const res = yield call(initWelcomeData);
      yield put({
        type: 'defaultWelcomeData',
        payload: res,
      });
    },
    *toLogin({}, { call, put }) {
      yield put(routerRedux.push('/consumer/login'));
    },
  },
  reducers: {
    // 首页的 content 部分的 logo 标，向上的过渡效果!
    changeStyleUp(state, { payload: suffix }) {
      switch (suffix) {
        case 'ctlGoods':
          state.moveLogoCtlGoods = `suspension-up`;
          break;
        case 'cptAppoah':
          state.moveLogoCptAppoah = `suspension-up`;
          break;
        case 'absSafe':
          state.moveLogoAbsSafe = `suspension-up`;
          break;
        case 'cldService':
          state.moveLogoCldService = `suspension-up`;
          break;
        default:
          break;
      }
      return { ...state };
    },
    // 首页的 content 部分的 logo 标，向下的过渡效果
    changeStyleDown(state, { payload: suffix }) {
      switch (suffix) {
        case 'ctlGoods':
          state.moveLogoCtlGoods = `suspension-down`;
          break;
        case 'cptAppoah':
          state.moveLogoCptAppoah = `suspension-down`;
          break;
        case 'absSafe':
          state.moveLogoAbsSafe = `suspension-down`;
          break;
        case 'cldService':
          state.moveLogoCldService = `suspension-down`;
          break;
        default:
          break;
      }

      return { ...state };
    },
    changeStyleForMenu(state, { payload: node }) {
      state.menuItems = 'menuItems';
      return { ...state };
    },
    // 返回异步获取到的欢迎页的初始化数据
    defaultWelcomeData(state, { payload: res }) {
      state.list = res;
      // console.log(state.list.app_content_func.ctlGoods);
      return { ...state };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // 订阅欢迎页需要的数据
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'initWelcomeData',
          });
        }
      });
    },
  },
};
