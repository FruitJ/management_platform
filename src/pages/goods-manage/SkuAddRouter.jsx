import React, { Component } from 'react';
import axios from 'axios';
import { message } from 'antd';

import AddSkuItem from '@/pages/goods-manage/components/AddSkuItem';
import { connect } from 'dva';
import { uploadPics } from '@/utils/uploadPicsToQiniu';

let count = 0;
let dispatch = null;
let id = 0;
class SkuAddRouter extends Component {

  constructor(props) {
    super(props);
    dispatch = this.props.dispatch;
    this.tableRef = React.createRef();
  }

  getBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  handleCancelSkuForm = () => {
    dispatch({
      type: 'addSku/_changeSkuModalStatus',
      payload: false,
    });
  };

  handleSubmitSkuForm = val => {
    // 提交新创建的商品分类

    dispatch({
      type: 'addSku/createNewCategory',
      payload: {
        status: false,
        data: {
          category: val,
        },
      },
    });
  };

  // 显示商品分类面板
  handleShowSkuClassModal = () => {
    dispatch({
      type: 'addSku/_changeSkuModalStatus',
      payload: true,
    });
  };

  // upload 组件上传图片之前的回调 ( 检测上传的商品格式与大小 )
  handleBeforeUploadTopSkuPic = file => {
    // 规定顶部图片上传的格式与大小
    return /image[/](?:png|(?:(?:jpg|jpeg)|gif))/.test(file.type)
      ? file.size / 1024 / 1024 < 3
      : false;
  };

  handleBeforeUploadBottomSkuPic = file => {
    // 规定底部图片上传的格式与大小
    return /image[/](?:png|(?:(?:jpg|jpeg)|gif))/.test(file.type)
      ? file.size / 1024 / 1024 < 3
      : false;
  };

  // upload 组件预览上传后的图片的回调
  handlePreviewTopSkuPic = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    dispatch({
      type: 'addSku/_topPreviewPic',
      payload: file,
    });
  };

  handlePreviewBottomSkuPic = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    dispatch({
      type: 'addSku/_bottomPreviewPic',
      payload: file,
    });
  };

  // 取消预览上传的顶部图片
  handleCancelTopSkuPic = () => {
    dispatch({
      type: 'addSku/_topCancelPic',
    });
    // this.setState({ previewVisible: false })
  };
  // 取消预览上传的底部图片
  handleCancelBottomSkuPic = () => {
    dispatch({
      type: 'addSku/_bottomCancelPic',
    });
  };

  // 移除顶部上传的商品图片
  handleRemoveTopSkuPic = file => {
    dispatch({
      type: 'addSku/_topRemovePic',
      payload: file,
    });
  };

  // 移除底部上传的商品图片
  handleRemoveBottomSkuPic = file => {
    dispatch({
      type: 'addSku/_bottomRemovePic',
      payload: file,
    });
  };

  // 获取上传七牛云的 token
  handleGetToken = () => {
    count += 1;
    if (count === 1) {
      // 判断当前的 token 是否存活
      if (
        this.props.addSku.token.prevReqTime === 0 ||
        new Date().getTime() - this.props.addSku.token.prevReqTime > 58 * 60 * 1000
      ) {
        // 重新请求 token
        dispatch({
          type: 'addSku/getToken',
        });
      } else {
        // 不用请求 token
      }
    } else {
      count = 0;
    }
  };

  handleInitIdData = () => {
    dispatch({
      type: 'addSku/initIdData',
    });
  };

  handleChangeTopSkuPic = ({ file }) => {
  };

  handleCustomTopUpload = option => {
    dispatch({
      type: 'addSku/uploadTopPic',
      payload: {
        token: this.props.addSku.token.token,
        data: option,
      },
    });
  };
  handleCustomBottomUpload = option => {

    dispatch({
      type: 'addSku/uploadBottomPic',
      payload: {
        token: this.props.addSku.token.token,
        data: option,
      },
    });
  };

  handleChangeNewInputVal = ev => {
    // 保存新建分类的用户输入内容
    dispatch({
      type: 'addSku/_changeNewInputVal',
      payload: ev.target.value,
    });
  };

  handleReqGoodsCategory = () => {
    // 请求商品分类数据
    dispatch({
      type: 'addSku/reqGoodsCategory',
    });
  };

  handleSelectCategory = (value, selectedOption) => {
    dispatch({
      type: 'addSku/_saveSelectedCategoryId',
      payload: Number(selectedOption[selectedOption.length - 1].key),
    });

  };

  handleReqGoodsSpecs = () => {
    // 获取商户 id
    const MERCHANT_ID = 1;

    // 请求商品规格数据
    dispatch({
      type: 'addSku/reqGoodsSpecs',
      payload: {
        merchant_id: MERCHANT_ID,
      },
    });
  };

  handleSubmitSkuData = data => {
    // 处理数据
    dispatch({
      type: 'addSku/_dealCurrentData',
      payload: {
        table: this.tableRef.current.nextElementSibling.querySelectorAll('table')[0],
      },
    });


    data.sku_list = this.props.addSku.sku_list;
    // 将数据提交到后台
    dispatch({
      type: 'addSku/addSkuGoods',
      payload: data,
    });
  };

  normFileTopPic = ev => {
    if (Array.isArray(ev)) {
      return ev;
    }
    return ev && ev.fileList;
  };

  // 商品规格组件区域
  // 点击添加按钮的回调函数
  handleAddComponentClick = () => {
    // 动态添加组件
    dispatch({
      type: 'addSku/_addContainer',
    });
  };

  // 获取父节点数据的回调函数
  /**
   * @author { FruitJ }
   * @param { Number } key 当前正被操作的索引
   * @return { Void } 无返回值
   * @description 加载当前被选中的父级 input 框所要展示的数据
   */
  handleParentInputClick = key => {
    dispatch({
      type: 'addSku/loadParentNodeData',
      payload: {
        key,
      },
    });
  };

  /**
   * @author { FruitJ }
   * @param { Number } index 当前 container 面板的索引
   * @return { Void } 无返回值
   * @description 删除当前选中的 container 面板
   */
  handleRemoveContainerClick = index => {
    dispatch({
      type: 'addSku/_removeContainer',
      payload: {
        index,
      },
    });
  };

  /**
   * @author { FruitJ }
   * @param { Number } parent_id 当前选中父节点列表项 id
   * @param { Number } dataKey 当前被操作的父节点的 id
   * @return { Void } 无返回值
   * @description 将当前选中的值填充进模拟表单中，同时请求其父节点下面的数据
   */
  handlePutValToParentInputClick = (parent_name, parent_id, dataKey) => {
    // 判断 parentNames 中的第一个元素是否是临时添加的


    const { parentNames } = this.props.addSku.containers[dataKey];

    if (parentNames[0].temp !== undefined && Number.isNaN(Number(parentNames[0].parent_id))) {
      // 发送当前元素值
      dispatch({
        type: 'addSku/getNewParentNamesEle',
        payload: {
          parent_name: parentNames[0].parent_name,
          key: dataKey,
        },
      });
      id = 0;
    } else {
      dispatch({
        type: 'addSku/_putValToParentInput',
        payload: {
          parent_name,
          parent_id,
          key: dataKey,
        },
      });

      id = parent_id;
    }
  };

  // 检测中文输入
  handleCheckChineseInputStart = () => {
    dispatch({
      type: 'addSku/_checkChineseInputStart',
    });
  };

  // 检测中文输出
  handleCheckChineseInputEnd = () => {
    dispatch({
      type: 'addSku/_checkChineseInputEnd',
    });
  };

  // 检测正在输入
  handleCheckInputNow = (val, key) => {
    dispatch({
      type: 'addSku/_bindParentHoverInput',
      payload: {
        value: val,
        key,
      },
    });
  };

  handleChildCheckInputNow = (val, key) => {
    dispatch({
      type: 'addSku/_bindChildHoverInput',
      payload: {
        value: val,
        key,
      },
    });
  };

  handleAddChildNodeClick = (dataKey, id, prop) => {
    // 加载对应子节点数据
    dispatch({
      type: 'addSku/loadChildNodeData',
      payload: {
        parent_name: this.props.addSku.containers[dataKey].parentInputVal,
        parent_id: id,
        key: dataKey,
        prop,
      },
    });

    const { parentNames } = this.props.addSku.containers[dataKey];
  };

  handleSwitchChildHoverBoardStatus = key => {
    let tag = false;
    // 切换子节点的悬浮选值面板的状态
    if (this.props.addSku.containers[key].hoverChildInputBoard_tag) {
      tag = false;
    } else {
      tag = true;
    }
    // 隐藏

    // 更新子节点的悬浮选值面板的状态
    dispatch({
      type: 'addSku/_changeChildHoverBoardStatus',
      payload: {
        tag: tag,
        key,
      },
    });
  };

  handlePutValToChildInputClick = (child_name, child_id, dataKey, parent_id, prop) => {
    // 将选中的子节点数据填充进容器
    dispatch({
      type: 'addSku/_tempSaveSelectedChildNodeData',
      payload: {
        child_name,
        child_id,
        key: dataKey,
        parent_id,
        prop,
      },
    });
  };

  handleRemoveAfterNative_childNames = (item, key) => {
    // 删除当前选项
    dispatch({
      type: 'addSku/_removeAfterNative_childNames',
      payload: {
        item,
        key,
      },
    });
  };

  handleCancelChildHoverBoard = key => {
    dispatch({
      type: 'addSku/_cancelChildHoverBoard',
      payload: {
        key,
      },
    });
  };

  handleTableUploadPics = info => {
    if (info.file.status !== 'uploading') {
      dispatch({
        type: 'addSku/tableUploadPic',
        payload: {
          token: this.props.addSku.token.token,
          file: info.file,
        },
      });
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  handleAddChildNamesToRealArea = key => {
    // 判断当前数组中的元素是否有临时生成的元素
    dispatch({
      type: 'addSku/_judgeTempCreatedEle',
      payload: {
        key,
      },
    });
    if (this.props.addSku.containers[key].isHaveTempCreatedEle) {
      // 有，则先将该元素提交给后台并由后台返回一个已经替换了 id 的元素

      let temp_addEle = this.props.addSku.containers[key].afterNative_childNames.filter(
        (item, index) => Number.isNaN(Number(item.child_id)),
      );
      let arr = this.props.addSku.backUp_parentNames.filter(
        (item, index) => item.parent_name === this.props.addSku.containers[key].parentInputVal,
      );

      // 替换上传元素的 id
      dispatch({
        type: 'addSku/getNewChildNamesEle',
        payload: {
          key,
          temp_addEle,
          prop: arr[0].prop,
          parent_id: arr[0].parent_id,
          table: this.tableRef.current.nextElementSibling.querySelectorAll('table')[0],
          handleTableUploadPics: this.handleTableUploadPics,
        },
      });
    }
    // 将待选区域的标签移至真实区域 ( 同时清空待选区域数组 )

    dispatch({
      type: 'addSku/_realAddChildEle',
      payload: {
        key,
        table: this.tableRef.current.nextElementSibling.querySelectorAll('table')[0],
        dispatch,
        handleTableUploadPics: this.handleTableUploadPics,
      },
    });

    setTimeout(() => {
      let tab_upload_btns = this.tableRef.current.nextElementSibling
        .querySelectorAll('table')[0]
        .querySelectorAll('.tab-upload-btn');
      for (let i = 0; i < tab_upload_btns.length; i++) {
        tab_upload_btns[i].addEventListener(
          'click',
          function(ev) {
            let btn = ev.target;
            dispatch({
              type: 'addSku/_getCurrentUploadKey',
              payload: {
                key: Number(btn.dataset.rowKey),
              },
            });
          },
          false,
        );
      }
    }, 0);
  };

  handleRemoveReal_childNames = (item, key) => {
    dispatch({
      type: 'addSku/_removeReal_childNames',
      payload: {
        item,
        key,
      },
    });
  };

  render() {
    const {
      handleCancelSkuForm,
      handleSubmitSkuForm,
      handleShowSkuClassModal,
      handleBeforeUploadTopSkuPic,
      handleBeforeUploadBottomSkuPic,
      handlePreviewTopSkuPic,
      handlePreviewBottomSkuPic,
      handleRemoveTopSkuPic,
      handleRemoveBottomSkuPic,
      handleCancelTopSkuPic,
      handleCancelBottomSkuPic,
      handleGetToken,
      handleInitIdData,
      handleCustomTopUpload,
      handleCustomBottomUpload,
      handleChangeNewInputVal,
      normFileTopPic,
      handleReqGoodsCategory,
      handleChangeTopSkuPic,
      handleSelectCategory,
      handleReqGoodsSpecs,
      handleSubmitSkuData,
    } = this;

    return (
      <div>
        <AddSkuItem
          isShowSkuClassModal={this.props.addSku.isShowSkuClassModal}
          onCancel={handleCancelSkuForm}
          onSubmit={handleSubmitSkuForm}
          onShowSkuClassModal={handleShowSkuClassModal}
          onBeforeUploadTopSkuPic={handleBeforeUploadTopSkuPic}
          onBeforeUploadBottomSkuPic={handleBeforeUploadBottomSkuPic}
          onChangeTopSkuPic={handleChangeTopSkuPic}
          onPreviewTopSkuPic={handlePreviewTopSkuPic}
          onPreviewBottomSkuPic={handlePreviewBottomSkuPic}
          onRemoveTopSkuPic={handleRemoveTopSkuPic}
          onRemoveBottomSkuPic={handleRemoveBottomSkuPic}
          onCancelTopSkuPic={handleCancelTopSkuPic}
          onCancelBottomSkuPic={handleCancelBottomSkuPic}
          onGetToken={handleGetToken}
          onInitIdData={handleInitIdData}
          onCustomTopUpload={handleCustomTopUpload}
          onCustomBottomUpload={handleCustomBottomUpload}
          onChangeNewInputVal={handleChangeNewInputVal}
          onReqGoodsCategory={handleReqGoodsCategory}
          onSelectCategory={handleSelectCategory}
          onReqGoodsSpecs={handleReqGoodsSpecs}
          onSubmitSkuData={handleSubmitSkuData}
          addSku={this.props.addSku}
          normFileTopPic={normFileTopPic}
          onAddComponentClick={this.handleAddComponentClick}
          onParentInputClick={this.handleParentInputClick}
          onRemoveContainerClick={this.handleRemoveContainerClick}
          onPutValToParentInputClick={this.handlePutValToParentInputClick}
          onPutValToChildInputClick={this.handlePutValToChildInputClick}
          onCheckInputNow={this.handleCheckInputNow}
          onChildCheckInputNow={this.handleChildCheckInputNow}
          onCheckChineseInputStart={this.handleCheckChineseInputStart}
          onCheckChineseInputEnd={this.handleCheckChineseInputEnd}
          onAddChildNodeClick={this.handleAddChildNodeClick}
          onSwitchChildHoverBoardStatus={this.handleSwitchChildHoverBoardStatus}
          onRemoveAfterNative_childNames={this.handleRemoveAfterNative_childNames}
          onCancelChildHoverBoard={this.handleCancelChildHoverBoard}
          onAddChildNamesToRealArea={this.handleAddChildNamesToRealArea}
          onRemoveReal_childNames={this.handleRemoveReal_childNames}
          tableRef={this.tableRef}
        />
      </div>
    );
  }
}
export default connect(({ addSku }) => ({
  addSku,
}))(SkuAddRouter);
