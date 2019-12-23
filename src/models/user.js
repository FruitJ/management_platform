import { queryCurrent, query as queryUsers } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    /**fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log(response);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },*/
    *fetchCurrent({ callback }, { call, put }) {
      // const response = yield call(queryCurrent);

      // 到 localStorage 中拿出当前登录用户
      let currentUser = JSON.parse(localStorage.getItem('platform-user'));
      console.log('分割线------');
      // console.log(currentUser);
      console.log(currentUser);
      console.log('------分割线');
      yield put({
        type: 'saveCurrentUser',
        payload: currentUser,
      });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
