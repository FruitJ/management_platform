export default {
  namespace: 'subWelcome',
  state: {
    current_userName: '',
  },
  effects: {},
  reducers: {
    _getCurrentUserName(state, {}) {
      let user = JSON.parse(localStorage.getItem('platform-user'));
      state.current_userName = user.name;
      return { ...state };
    },
  },
  subscriptions: {},
};
