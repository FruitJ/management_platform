// 导入官方包

export default {
  namespace: 'goods',
  state: {
    data: [],
    pagination: {},
    loading: false,
    selectedRowKeys: [],
    drawerVisible: false,
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
    _changeDrawerStatus(state, { payload: val }) {
      // alert(val);
      state.drawerVisible = val;
      console.log(1);
      return { ...state };
    },
    _updateGoodsData(state, { payload: data }) {
      // 向后端发送数据
      console.log('++__++__++');
      console.log(data);
      console.log('++__++__++');
      // 重置 drawer 弹框的状态
      state.drawerVisible = false;
      return { ...state };
    },
  },
  subscriptions: {},
};
