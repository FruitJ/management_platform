import React, { Component, useEffect } from 'react';
import { connect } from 'dva';

import GoodsCategory from '@/pages/goods-manage/components/GoodsCategory';

let isShowAddChildCategory = false;
let isShowEditGoodsCategory = false;
let isShowDelGoodsCategory = false;


const GoodsCategoryRouter = ({ dispatch, goodsCategory }) => {
// class GoodsCategoryRouter extends Component {
  const addChildCategoryRef = React.createRef();
  useEffect(() => {
    console.log("分割线");
    console.log(goodsCategory);
    
    // 获取商品类别列表
    dispatch({
      type: "goodsCategory/reqGoodsCategory",
    });
    
  }, []);
  
  
  const handleShowAddCategoryModal = (ev) => {
    console.log("--*( 分割线 )*--");
    console.log(ev);
    console.log("--*( 分割线 )*--");
    
    // 显示新建子分类的 Model
    dispatch({
      type: "goodsCategory/_showAddChildCategoryModal",
      payload: true,
    });
    
  };
  
  const handleShowDelCategoryModal = (ev) => {
    
    dispatch({
      type: "goodsCategory/_showDelCategoryModal",
      payload: {
        payload: true,
      },
    });
  };
  
  
  const handleAddChildCategoryModalOk = (ev, parentId) => {
    console.log("分割线,,,");
    console.log(ev);
    // console.log(addChildCategoryRef.current.state.value);
    // const { value: val } = addChildCategoryRef.current.state;
    isShowAddChildCategory = false;
    // 更新状态 提交数据
    dispatch({
      type: "goodsCategory/createChildCategory",
      payload: {
        visible: false,
        data: {
          pid: parentId,
          name: goodsCategory.input_addChildCategoryVal,
        }
      }
    });
    
  };
  
  const handleChangeTagCategoryStatus = (val) => {
    isShowAddChildCategory = val;
  };
  
  const handleChangeTagEditCategoryStatus = (val) => {
    isShowEditGoodsCategory = val;
  };
  
  const handleChangeTagDelCategoryStatus = (val) => {
    isShowDelGoodsCategory = val;
  };
  const handleChangeAddChildCategoryVal = (ev)=> {
    console.log(ev.target.value);
    dispatch({
      type: "goodsCategory/_changeAddChildCategoryVal",
      payload: ev.target.value,
    });
    
  };
  
  const handleChangeEditCategoryVal = (ev) => {
    
    console.log("--- --- ---");
    console.log(ev.target.value);
    //更新表单状态
    dispatch({
      type: "goodsCategory/_changeEditCategoryVal",
      payload: ev.target.value,
    });
    
  };
  
  const handleChangeAddCategoryVal = (ev) => {
    
    console.log(ev.target.value);
    
    // 同步用户输入内容
    dispatch({
      type: "goodsCategory/_changeAddCategoryVal",
      payload: ev.target.value,
    });
    
    
  };
  
  
  const handleAddChildCategoryModalCancel = () => {
    
    // 关闭弹框
    dispatch({
      type: "goodsCategory/_closeChildGoodsCategoryModel",
      
    });
  };
  
  const handleEditCategoryModalCancel = () => {
    
    dispatch({
      type: "goodsCategory/_closeEditGoodsCategoryModel",
      
    });
  };
  
  const handleDelCategoryModalCancel = () => {
    dispatch({
      type: "goodsCategory/_closeDelGoodsCategoryModel",
    });
  };
  
  const handleShowEditCategoryModal = () => {
  
    dispatch({
      type: "goodsCategory/_showEditCategoryModal",
      payload: true,
    });
  };
  
  const handleEditCategoryModalOk = (val) => {
    
    console.log("--^ 分割线 ^--");
    console.log(val);
    console.log(goodsCategory.input_editCategoryVal);
    console.log("--^ 分割线 ^--");
    
    dispatch({
      type: "goodsCategory/editCategory",
      payload: {
        visible: false,
        data: {
          current_id: val,
          name: goodsCategory.input_editCategoryVal,
        }
      }
    });
    
  };
  
  const handleAddCategoryModalOk = () => {
    // 新增分类
    dispatch({
      type: "goodsCategory/createCategory",
      payload: {
        pid: 0,
        name: goodsCategory.input_addCategoryVal,
      }
    });
  };
  
  const handleDelCategoryModalOk = (currentId) => {
    
    console.log(currentId);
    
    // 删除分类
    dispatch({
      type: "goodsCategory/deleteCategory",
      payload: {
        uid: currentId,
      },
    });
  };
  
  const handleOpenNewAddCategoryModal = () => {
    dispatch({
      type: "goodsCategory/_openAddCategoryModal",
      payload: true,
    });
  };
  
  const handleDelCategory = (index) => {
    
    // 删除当前选中分类
    
  };
  
    return (
      <div>
        <GoodsCategory goodsCategory = { goodsCategory }
                       onShowAddCategoryModal = { handleShowAddCategoryModal }
                       onAddChildCategoryModalOk = { handleAddChildCategoryModalOk }
                       addChildCategoryRef = { addChildCategoryRef }
                       isShowAddChildCategory = { isShowAddChildCategory }
                       isShowEditGoodsCategory = { isShowEditGoodsCategory }
                       isShowDelGoodsCategory = { isShowDelGoodsCategory }
                       onChangeTagCategoryStatus = { handleChangeTagCategoryStatus }
                       onChangeAddChildCategoryVal = { handleChangeAddChildCategoryVal }
                       onAddChildCategoryModalCancel = { handleAddChildCategoryModalCancel }
                       onShowEditCategoryModal = { handleShowEditCategoryModal }
                       onChangeTagEditCategoryStatus = { handleChangeTagEditCategoryStatus }
                       onChangeTagDelCategoryStatus = { handleChangeTagDelCategoryStatus }
                       onChangeEditCategoryVal = { handleChangeEditCategoryVal }
                       onEditCategoryModalOk = { handleEditCategoryModalOk }
                       onAddCategoryModalOk = { handleAddCategoryModalOk }
                       onOpenNewAddCategoryModal = { handleOpenNewAddCategoryModal }
                       onChangeAddCategoryVal = { handleChangeAddCategoryVal }
                       onEditCategoryModalCancel = { handleEditCategoryModalCancel }
                       onDelCategoryModalCancel = { handleDelCategoryModalCancel }
                       onDelCategory = { handleDelCategory }
                       onShowDelCategoryModal = { handleShowDelCategoryModal }
                       onDelCategoryModalOk = { handleDelCategoryModalOk }
        />
      </div>
    );
};
export default connect(({ goodsCategory }) => ({
  goodsCategory,
}))(GoodsCategoryRouter);
