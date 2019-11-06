// 导入官方包

export default {
  namespace: 'goods',
  state: {
    data: [],
    pagination: {},
    loading: false,
    selectedRowKeys: [],
  },
  effects: {},
  reducers: {
    _tabChange(state, { payload: tag }) {
      state.pagination = tag.pagination;
      return { ...state };
    },
    _loadingChange(state, { payload: val }) {
      state.loading = val;
      return { ...state };
    },
    _loadTabData(state, { payload: tag }) {
      state.loading = tag.loading;
      state.data = tag.data;
      state.pagination = tag.pagination;
      return { ...state };
    },
    _selectRows(state, { payload: tag }) {
      state.selectedRowKeys = tag.selectedRowKeys;
      console.warn(tag);
      return { ...state };
    },
  },
  subscriptions: {},
};
