// 导入官方包
import { routerRedux } from 'dva/router';

// 导入自定义包

export default {
  namespace: 'sku',
  state: {
    data: [],
    current_spu_id: 0,
  },
  effects: {
    *toSkuList({ payload: spu_id }, { call, put }) {
      // 跳转界面
      yield put(routerRedux.push('/goods-manage/query/sku-list'));
      // yield put(routerRedux.push("/goods-manage/update/spu-details"));
      // 存储 spu_id
      yield put({
        type: '_toTempSaveSpu_id',
        payload: spu_id,
      });
    },
  },
  reducers: {
    _toTempSaveSpu_id(state, { payload: spu_id }) {
      // 存储 spu_id
      state.current_spu_id = spu_id;

      // 判断用户当前浏览器是否支持 localStorage
      try {
        console.log(localStorage);
      } catch (err) {
        console.warn(
          '对不起由于您的浏览器不支持 localStorage ，所以当前页面的关键数据采用路由传递参数的方式 ! ',
        );
      }

      alert(state.current_spu_id);
      return { ...state };
    },
  },
  subscriptions: {},
};
