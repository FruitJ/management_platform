import { routerRedux } from 'dva/router';

import { reqSpuDetailsInfoService } from '@/services/spuDetails';

export default {
  namespace: 'spuDetails',
  state: {
    data: [],
    current_spu_id: 0,
    spu_picsFileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    spuDetailsInfo: {},
    input: {
      spuBarCodeVal: '',
    },
  },
  effects: {
    *toSpuDetails({ payload: spu_id }, { call, put }) {
      yield put(routerRedux.push(`/goods-manage/update/spu-details`));

      // 存储 spu_id ( 存储进 localStorage 中 )

      localStorage.setItem('current_spu_id', spu_id);
    },
    *reqSpuDetailInfo({ payload: spu_id }, { call, put }) {
      // 请求 spu details 页面的数据
      let res = yield call(reqSpuDetailsInfoService, {
        pid: spu_id,
      });

      console.log('___--___--___');
      console.log(res);

      // 存储 spu details 页面数据
      yield put({
        type: '_saveSpuDetailsInfo',
        payload: res,
      });
    },
  },
  reducers: {
    _toTempSaveSpu_id(state, { payload: spu_id }) {
      // 存储 spu_id
      state.current_spu_id = spu_id;

      if (localStorage !== undefined && localStorage !== null) {
        // 将 spu id 存储进 localStorage 中
      } else {
      }

      // 判断用户当前浏览器是否支持 localStorage
      try {
        console.log(localStorage);
      } catch (err) {
        console.warn(
          '对不起由于您的浏览器不支持 localStorage ，所以当前页面的关键数据采用路由传递参数的方式 ! ',
        );
      }

      return { ...state };
    },
    _saveSpuDetailsInfo(state, { payload: data }) {
      console.log('models ...');
      console.log(data);
      // state.spuDetailsInfo.push(data);
      state.spuDetailsInfo = data;
      return { ...state };
    },
  },
  subscriptions: {},
};
