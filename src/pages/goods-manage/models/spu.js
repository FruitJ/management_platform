// 导入官方包

// 导入自定义包
import {
  updateSpuContents,
  initSpuNames,
  getUpdatedSpuList,
  getSpuClasses,
  selectClassesUpdateSpu,
} from '@/services/spu';

export default {
  namespace: 'spu',
  state: {
    data: [],
    pagination: {},
    loading: false,
    tagSpu: '商品标签',
    selectorSpu: '未选择',
    spuNames: [],
    spuClasses: [],
    isShowModel: 'spu 模式',
  },
  effects: {
    *selectClassesUpdateSpu({ payload: data }, { call, put }) {
      let res = yield call(selectClassesUpdateSpu, data);
    },
    *updateSpuList({ payload: data }, { call, put }) {
      // 异步请求数据
      let res = yield call(getUpdatedSpuList, data);

      // 更新数据源
      yield put({
        type: '_updateSpuContent',
        payload: res.spuList,
      });

      // 更新标签数据
      yield put({
        type: '_updateSpuTagsStatus',
        payload: res.spuList.length > 1 ? 'spu标签' : data.spuName,
      });
    },
    *getSpuClasses({}, { call, put }) {
      let res = yield call(getSpuClasses);
      console.log(res);
      yield put({
        type: '_getSpuClasses',
        payload: res,
      });
    },
    *initSpuNames({}, { call, put }) {
      let res = yield call(initSpuNames);
      yield put({
        type: '_initSpuNames',
        payload: res,
      });
      // console.log(res);
    },
    *switchShowModel({ payload: val }, { call, put }) {
      if (val) {
        // 请求商品列表数据
      } else {
        // 请求 spu 列表数据
      }

      console.log(val);
      // 更新标签状态
      yield put({
        type: '_switchShowModel',
        payload: {
          tagContent: val ? '商品模式' : 'spu 模式',
          data: [],
        },
      });
    },
  },
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
    _updateSpuTagsStatus(state, { payload: val }) {
      // 更新 tags
      state.tagSpu = val;
      state.selectorSpu = val;
      return { ...state };
    },
    _updateSpuContent(state, { payload: res }) {
      // 更新数据源
      state.data = res;
      return { ...state };
    },
    _initSpuNames(state, { payload: res }) {
      state.spuNames = res;
      return { ...state };
    },
    _getSpuClasses(state, { payload: res }) {
      state.spuClasses = res;
      return { ...state };
    },
    _switchShowModel(state, { payload: res }) {
      state.isShowModel = res.tagContent;
      return { ...state };
    },
  },
  subscriptions: {},
};
