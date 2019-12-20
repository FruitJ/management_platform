
import {
  reqGoodsCategoryService,
  createNewCategoryService,
  editCategoryService,
  deleteCategoryService,
} from "@/services/goodsCategory";
import {yellow} from "@ant-design/colors/lib";

export default {
  namespace: 'goodsCategory',
  state: {
    isShowAddChildCategoryModel: false,
    isShowEditCategoryModel: false,
    isShowDelCategoryModel: false,
    isShowAddCategoryModel: false,
    
    categoryData: [],
    current_key: 0,
    input_addChildCategoryVal: "",
    input_editCategoryVal: "",
    input_addCategoryVal: "",
  },
  effects: {
    *reqGoodsCategory( {  }, { call, put } ) {
      let res = yield call(reqGoodsCategoryService);
      console.log("--- 分割线 ---");
      console.log(res.data.category_list);
      yield put({
        type: "_saveCategoryData",
        payload: res.data.category_list
      });
    },
    *createChildCategory( { payload: param }, { call, put } ) {
      
      // 发送请求
      console.log("发送请求之前");
      console.log(param.data.pid, typeof param.data.pid);
      let res = yield call(createNewCategoryService, param.data);
      console.log("…………………………………………………………");
      console.log(res);
        // 重新获取商品分类列表数据
        let list = yield call(reqGoodsCategoryService);
        console.log(list);
        yield put({
          type: "_saveCategoryData",
          payload: list.data.category_list
        });
        
        yield put({
          type: "_showAddChildCategoryModal",
          payload: param.visible,
        });
      
      
      // 更新商品分类数据的状态
      
    },
    *editCategory( { payload: param }, { call, put } ) {
      
      // 发送请求
      let res = yield call(editCategoryService, param.data);
      console.log(res);
      // 重新获取商品分类列表数据
      let list = yield call(reqGoodsCategoryService);
      
      // 更新状态
     /* yield put({
        type: "_saveCategoryData",
        payload: list,
      });*/
      yield put({
        type: "_showEditCategoryModal",
        payload: param.visible,
      });
      
    },
    *createCategory( { payload: param}, { call, put } ) {
      
      // 发送请求
      let res = yield call(createNewCategoryService, param);
      console.log("_+_ 分割线 _+_");
      console.log(res);
      console.log("+_+ 分割线 +_+");
      
      // 重新请求商品分类列表数据
      let list = yield call(reqGoodsCategoryService);
      console.log(list);
      // 更新状态
  
      yield put({
        type: "_saveCategoryData",
        payload: list.data.category_list
      });
  
      yield put({
        type: "_openAddCategoryModal",
        payload: false,
      });
  
    },
    *deleteCategory( { payload: data }, { call, put } ) {
      
      // 发送请求
      let res = yield call(deleteCategoryService, data);
      console.log("--%% 分割线 %%--");
      console.log(res);
      // 重新请求商品列表数据
      
      // 更新状态
      
      
    },
  },
  reducers: {
    '_saveCategoryData'( state, { payload: data } ) {
      
      // 存储商品类别
      state.categoryData = data;
      return { ...state };
    },
    '_showAddChildCategoryModal'( state, { payload: flag } ) {
      
      // 显示 Model
      state.isShowAddChildCategoryModel = flag;
      return { ...state };
    },
    '_showDelCategoryModal'( state, { payload: flag } ) {
      state.isShowDelCategoryModel = flag;
      return { ...state };
    },
    '_changeAddChildCategoryVal'( state, { payload: val } ) {
      state.input_addChildCategoryVal = val;
      return { ...state };
    },
    '_closeChildGoodsCategoryModel'( state, { } ) {
      
      state.isShowAddChildCategoryModel = false;
      return { ...state };
    },
    '_closeEditGoodsCategoryModel'( state, { } ) {
      state.isShowEditCategoryModel = false;
      return { ...state };
    },
    '_closeDelGoodsCategoryModel'( state, { } ) {
      state.isShowDelCategoryModel = false;
      return { ...state };
    },
    '_showEditCategoryModal'( state, { payload: flag } ) {
      
      state.isShowEditCategoryModel = flag;
      return { ...state };
    },
    '_changeEditCategoryVal'( state, { payload: val } ) {
      state.input_editCategoryVal = val;
      return { ...state };
    },
    '_openAddCategoryModal'( state, { payload: flag } ) {
      
      state.isShowAddCategoryModel = flag;
      
      return { ...state };
    },
    '_changeAddCategoryVal'( state, { payload: val } ) {
      
      console.log(val);
      state.input_addCategoryVal = val;
      return { ...state };
    },
  },
  subscriptions: {
  
  },
};
