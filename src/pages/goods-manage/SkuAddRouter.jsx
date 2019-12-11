import React, { Component } from 'react';
import axios from 'axios';

import AddSkuItem from '@/pages/goods-manage/components/AddSkuItem';
import { connect } from 'dva';
import { uploadPics } from '@/utils/uploadPicsToQiniu';

let count = 0;

class SkuAddRouter extends Component {
  // const SkuAddRouter = ( { dispatch, addSku } ) => {
  // class SkuAddRouter extends Component {

  constructor(props) {
    super(props);
    console.log('SkuAddRouter ...');
    console.log(props);
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
    this.props.dispatch({
      type: 'addSku/_changeSkuModalStatus',
      payload: false,
    });
  };

  handleSubmitSkuForm = val => {
    // 提交新创建的商品分类
    console.log(val);

    // alert(addSku.newCategoryVal + 123);

    this.props.dispatch({
      type: 'addSku/createNewCategory',
      payload: {
        status: false,
        data: {
          category: val,
        },
      },
    });
  };

  handleShowSkuClassModal = () => {
    this.props.dispatch({
      type: 'addSku/_changeSkuModalStatus',
      payload: true,
    });
  };

  // upload 组件上传图片之前的回调 ( 检测上传的商品格式与大小 )
  handleBeforeUploadTopSkuPic = file => {
    return /image[/](?:png|(?:(?:jpg|jpeg)|gif))/.test(file.type)
      ? file.size / 1024 / 1024 < 3
      : false;
  };

  handleBeforeUploadBottomSkuPic = file => {
    return /image[/](?:png|(?:(?:jpg|jpeg)|gif))/.test(file.type)
      ? file.size / 1024 / 1024 < 3
      : false;
  };

  // upload 组件预览上传后的图片的回调
  handlePreviewTopSkuPic = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.props.dispatch({
      type: 'addSku/_topPreviewPic',
      payload: file,
    });
  };

  handlePreviewBottomSkuPic = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj);
    }
    this.props.dispatch({
      type: 'addSku/_bottomPreviewPic',
      payload: file,
    });
  };

  handleCancelTopSkuPic = () => {
    this.props.dispatch({
      type: 'addSku/_topCancelPic',
    });
    // this.setState({ previewVisible: false })
  };
  handleCancelBottomSkuPic = () => {
    this.props.dispatch({
      type: 'addSku/_bottomCancelPic',
    });
    // this.setState({ previewVisible: false })
  };

  handleRemoveTopSkuPic = file => {
    this.props.dispatch({
      type: 'addSku/_topRemovePic',
      payload: file,
    });
  };

  handleRemoveBottomSkuPic = file => {
    this.props.dispatch({
      type: 'addSku/_bottomRemovePic',
      payload: file,
    });
  };

  handleGetToken = () => {
    count += 1;
    if (count === 1) {
      // 判断当前的 token 是否存活
      if (
        this.props.addSku.token.prevReqTime === 0 ||
        new Date().getTime() - this.props.addSku.token.prevReqTime > 58 * 60 * 1000
      ) {
        alert(21212);
        // 重新请求 token
        this.props.dispatch({
          type: 'addSku/getToken',
        });
      } else {
        // 不用请求 token
        alert('no req token');
      }
    } else {
      count = 0;
    }
  };

  handleInitIdData = () => {
    this.props.dispatch({
      type: 'addSku/initIdData',
    });
  };

  handleChangeTopSkuPic = ({ file }) => {
    console.log('啦啦啦');
    console.log(file);
    console.log('呃呃呃');
  };

  handleCustomTopUpload = option => {
    /*let formData = new window.FormData();
        formData.append("file", option.file);
        formData.append("token", this.props.addSku.token.token);
        axios({
            url: 'https://up-z1.qiniup.com',
            data: formData,
            method: 'POST',
        }).then((res) => {
            
            // 更新图片列表数据
            this.props.dispatch({
                type: "addSku/_updateTopPicsList",
                payload: res.data.key
            });
            
            console.log(res);
        })
        .catch((err) => {
            console.error(err.message);
        })
        ;*/
    this.props.dispatch({
      type: 'addSku/uploadTopPic',
      payload: {
        token: this.props.addSku.token.token,
        data: option,
      },
    });
  };
  handleCustomBottomUpload = option => {
    this.props.dispatch({
      type: 'addSku/uploadBottomPic',
      payload: {
        token: this.props.addSku.token.token,
        data: option,
      },
    });
  };

  handleChangeNewInputVal = ev => {
    // 保存新建分类的用户输入内容
    this.props.dispatch({
      type: 'addSku/_changeNewInputVal',
      payload: ev.target.value,
    });
  };

  handleReqGoodsCategory = () => {
    // 请求商品分类数据
    this.props.dispatch({
      type: 'addSku/reqGoodsCategory',
    });
  };

  normFileTopPic = ev => {
    console.log('Upload event:', ev);
    if (Array.isArray(ev)) {
      return ev;
    }
    return ev && ev.fileList;
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
          addSku={this.props.addSku}
          normFileTopPic={normFileTopPic}
        />
      </div>
    );
  }
}
export default connect(({ addSku }) => ({
  addSku,
}))(SkuAddRouter);
