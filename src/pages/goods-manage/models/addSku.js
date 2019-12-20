import axios from 'axios';

import {
  getTokenService,
  uploadTopPicService,
  uploadBottomPicService,
  initIdDataService,
  createNewCategoryService,
  reqGoodsCategoryService,
  reqGoodsSpecsService,
  addTopPicsUrlService,
  addSkuGoodsService,
} from '@/services/addSkuService';
import { uploadPics } from '@/utils/uploadPicsToQiniu';

const DOMAIN_NAME = 'https://images.ikuanguang.com/';

export default {
  namespace: 'addSku',
  state: {
    isShowSkuClassModal: false,
    topPreviewVisible: false,
    topPreviewImage: '',
    topFileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    bottomPreviewVisible: false,
    bottomPreviewImage: '',
    bottomFileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ],
    token: {
      token: '',
      prevReqTime: 0,
    },
    idLibrary: {
      category: [],
      brand: [],
      specs: [],
    },
    newCategoryVal: '',
    goodsCategory: [],
    isFill: false,
    category_id: 0,
    goodsSpecs: [],
  },
  effects: {
    *getToken({ payload: data }, { call, put }) {
      // 发送请求，获取 token
      let res = yield call(getTokenService);
      console.log('token: ');
      console.log(res);
      // 存储 token
      yield put({
        type: '_saveToken',
        payload: res,
      });
    },
    *initIdData({ payload: req }, { call, put }) {
      // 请求初始的 id 数据
      let res = yield call(initIdDataService);
      console.log(res);

      // 保存 id 数据
      yield put({
        type: '_saveIdData',
        payload: res,
      });
    },
    *uploadTopPic({ payload: req }, { call, put }) {
      let formData = new window.FormData();
      formData.append('file', req.data.file);
      formData.append('token', req.token);
      // 将图片上传七牛云
      let res = yield call(uploadTopPicService, formData);

      // 更新上传后的图片状态
      yield put({
        type: '_updateTopPicsList',
        payload: res.key,
      });
    },
    *uploadBottomPic({ payload: req }, { call, put }) {
      console.log('______----------_________');
      console.log(req.token);
      console.log(req.data.file);
      let formData = new window.FormData();
      formData.append('file', req.data.file);
      formData.append('token', req.token);
      // 将图片上传七牛云
      let res = yield call(uploadBottomPicService, formData);

      // 更新上传后的图片状态
      yield put({
        type: '_updateBottomPicsList',
        payload: res.key,
      });
    },
    *createNewCategory({ payload: params }, { call, put }) {
      // 请求新建分类
      let res = yield call(createNewCategoryService, params.data);

      console.log(res);
      // 更改 Model 状态

      yield put({
        type: '_createNewCategory',
        payload: {
          res,
          status: params.status,
        },
      });
    },
    *reqGoodsCategory({}, { call, put }) {
      let res = yield call(reqGoodsCategoryService);

      yield put({
        type: '_updateGoodsCategory',
        payload: res,
      });
      console.log(res);
    },
    *reqGoodsSpecs( { payload: user }, { call, put } ) {
      
      // 请求商品规格数据
      let res = yield call(reqGoodsSpecsService, user);
      console.log("游客站在路灯下");
      console.log(res);
      // 保存商品规格信息
      yield put({
        type: "_saveGoodsSpecs",
        payload: res.data.spec_option
      });
    },
    *addSkuGoods( { payload: data }, { call, put } ) {
      
      let res = yield call(addSkuGoodsService, data);
      console.log(res);
    },
  },
  reducers: {
    _createNewCategory(state, { payload: data }) {
      // 更新商品分类 id 数据
      state.idLibrary.category = data.res;

      state.isShowSkuClassModal = false;
      return { ...state };
    },
    _changeSkuModalStatus(state, { payload: tag }) {
      state.isShowSkuClassModal = tag;
      return { ...state };
    },

    // 预览上传的顶部商品图片
    _topPreviewPic(state, { payload: file }) {
      state.topPreviewImage = file.url || file.preview;
      state.topPreviewVisible = true;
      return { ...state };
    },
    _bottomPreviewPic(state, { payload: file }) {
      state.bottomPreviewImage = file.url || file.preview;
      state.bottomPreviewVisible = true;
      return { ...state };
    },
    // 取消预览上传的顶部商品图片
    _topCancelPic(state, {}) {
      state.topPreviewVisible = false;
      return { ...state };
    },
    _bottomCancelPic(state, {}) {
      state.bottomPreviewVisible = false;
      return { ...state };
    },

    // 移除上传的顶部商品图片
    _topRemovePic(state, { payload: file }) {
      state.topFileList = state.topFileList.filter((item, index) => item.uid !== file.uid);
      return { ...state };
    },
    _bottomRemovePic(state, { payload: file }) {
      state.bottomFileList = state.bottomFileList.filter((item, index) => item.uid !== file.uid);
      return { ...state };
    },
    _saveToken(state, { payload: res }) {
      state.token.token = res.data;
      state.token.prevReqTime = new Date().getTime();
      console.log(`prevReqTime: ${state.token.prevReqTime}`);
      return { ...state };
    },
    _updateTopPicStatus(state, { payload: params }) {
      state.topFileList.push(params.res);
      return { ...state };
    },
    _updateBottomPicStatus(state, { payload: params }) {
      state.bottomFileList.push(params.res);
      return { ...state };
    },
    _saveIdData(state, { payload: res }) {
      // 更新 id 数据
      state.idLibrary.category = res.category;
      state.idLibrary.brand = res.brand;
      state.idLibrary.specs = res.specs;
      return { ...state };
    },
    _changeNewInputVal(state, { payload: val }) {
      state.newCategoryVal = val;
      return { ...state };
    },
    _updateGoodsCategory(state, { payload: res }) {
      state.goodsCategory = res.data.category_list;
      console.log('---------++++++++++---------');
      console.log(res.data.category_list);
      
      return { ...state };
    },
    _updateTopPicsList(state, { payload: suffix }) {
      let lastItem = state.topFileList[state.topFileList.length - 1];
      // 拼接完整的 url
      let uid = 0;
      try {
        uid = Number(lastItem.uid) + 1;
      } catch (err) {
        uid = 0;
      }
      state.topFileList.push({
        uid: uid,
        name: suffix,
        status: 'done',
        url: `${DOMAIN_NAME}${suffix}`,
      });
      return { ...state };
    },
    _updateBottomPicsList(state, { payload: suffix }) {
      let lastItem = state.bottomFileList[state.bottomFileList.length - 1];
      // 拼接完整的 url
      let uid = 0;
      try {
        uid = Number(lastItem.uid) + 1;
      } catch (err) {
        uid = 0;
      }
      state.bottomFileList.push({
        uid: uid,
        name: suffix,
        status: 'done',
        url: `${DOMAIN_NAME}${suffix}`,
      });
      return { ...state };
    },
    '_saveSelectedCategoryId'( state, { payload: index } ) {
      state.category_id = index;
      return { ...state };
    },
    '_saveGoodsSpecs'( state, { payload: specs } ) {
      state.goodsSpecs = specs;
      console.log("-- ^ 分割线 ^ --");
      console.log(state.goodsSpecs);
      console.log("-- ^ 分割线 ^ --");
      return { ...state };
    },
  },
  subscriptions: {},
};
