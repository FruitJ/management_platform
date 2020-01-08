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
    tempSaveSpuList: [],
  },
  effects: {
    *selectClassesUpdateSpu({ payload: data }, { call, put }) {
      let res = yield call(selectClassesUpdateSpu, data);
    },
    *updateSpuList({ payload: data }, { call, put }) {
      // 异步请求数据
      let res = yield call(getUpdatedSpuList, data);

      console.warn('-------');
      console.log(res);
      console.log(data);
      // console.log(data);

      // 更新数据源
      yield put({
        type: '_updateSpuContent',
        payload: {
          res,
          data,
        },
      });

      // 更新标签数据
      /*yield put({
        type: '_updateSpuTagsStatus',
        // payload: res.data.goods_list.length > 1 ? 'spu标签' : data.spuName,
      });*/
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
      console.log(';;;');

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
    _updateSpuTagsStatus(state, {}) {
      // 更新 tags
      // res.spuList.length > 1 ? 'spu标签' : data.spuName
      console.log('啦啦啦啦啦啦');
      console.log(state.data.length);
      let val = state.data.length > 1 ? '商品标签' : state.data[0].spu_name;
      // payload: res.data.goods_list.length > 1 ? 'spu标签' : data.spuName,
      if (state.data === null) {
        state.tagSpu = '商品标签';
        state.selectorSpu = '未选择';
      } else {
        state.tagSpu = val;
        state.selectorSpu = val;
      }

      return { ...state };
    },
    _updateSpuContent(state, { payload: param }) {
      // 更新数据源
      // state.data = res;
      console.log('data ...');

      let temp = JSON.parse(JSON.stringify(param.res.data.goods_list));
      if (param.data.spu_id !== 0) {
        // state.tempSaveSpuList = JSON.parse(JSON.stringify(state.data));
        // let temp = JSON.parse(JSON.stringify(state.data));
        // console.log(state.data);
        state.data = temp.filter((item, index) => {
          // console.log(item.spu_sn);
          // console.log(data.spu_id);
          return item.spu_sn === param.data.spu_id;
        });
        console.log('_________');
        console.log(state.data);
        let val = state.data.length > 1 ? '商品标签' : state.data[0].spu_name;
        state.tagSpu = val;
        state.selectorSpu = val;
      } else {
        state.data = JSON.parse(JSON.stringify(param.res.data.goods_list));
        console.log('65s46d5as4d6sa');
        console.log(JSON.parse(JSON.stringify(param.res.data.goods_list)));
        console.log(state.data);
        // let val = state.data.length > 1 ? '商品标签' : state.data[0].spu_name;
        state.tagSpu = '商品标签';
        state.selectorSpu = '未选择';
      }

      return { ...state };
    },
    _initSpuNames(state, { payload: res }) {
      state.spuNames = state.data.map((item, index) => ({
        spu_name: item.spu_name,
        spu_id: item.spu_sn,
      }));
      console.log(state.data);
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
