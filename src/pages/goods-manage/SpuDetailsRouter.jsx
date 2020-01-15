import React, { Component } from 'react';
import { connect } from 'dva';
import spu from '@/pages/goods-manage/models/spu';
import SpuDetails from './components/SpuDetails';
import {message} from "antd";
import AddSkuItem from "@/pages/goods-manage/components/AddSkuItem";

let dispatch = null;
let count = 0;
let id = 0;
let spuDetailsInfo_copy = null;
class SpuDetailsRouter extends Component {
  constructor(props) {
    super(props);
    dispatch = this.props.dispatch;
    this.tableRef = React.createRef();
  }
  handleTableUploadPics = info => {
    if (info.file.status !== 'uploading') {
      dispatch({
        type: 'spuDetails/tableUploadPic',
        payload: {
          token: this.props.spuDetails.token,
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
  componentDidMount() {

    // 从 localStorage 中获取当前的 spu id
    let spu_id = JSON.parse(localStorage.getItem('current_spu_id'));
    
    // 请求 token
    dispatch({
      type: "spuDetails/getToken",
      
    });
    
    
    // 重新请求
    this.props.dispatch({
      type: 'spuDetails/reqSpuDetailInfo',
      payload: {
        spu_id,
        handleTableUploadPics: this.handleTableUploadPics,
        // key: ,
      },
    });
  
    let tab_upload_btns = this.tableRef.current.nextElementSibling
        .querySelectorAll('table')[0]
        .querySelectorAll('.tab-upload-btn');
    for (let i = 0; i < tab_upload_btns.length; i++) {
      tab_upload_btns[i].addEventListener(
          'click',
          function(ev) {
            let btn = ev.target;
            dispatch({
              type: 'spuDetails/_getCurrentUploadKey',
              payload: {
                key: Number(btn.dataset.rowKey),
              },
            });
          },
          false,
      );
    }
  
    
      setTimeout(() => {
        
        const { spuDetailsInfo } = this.props.spuDetails;
        spuDetailsInfo_copy = spuDetailsInfo;
        let table = this.tableRef.current.nextElementSibling.querySelectorAll('table')[0];
        spuDetailsInfo.specs.forEach((item, index) => {{
          this.props.dispatch({
            type: "spuDetails/_realAddChildEle",
            payload: {
              key: index,
              table: table,
              dispatch,
              handleTableUploadPics: this.handleTableUploadPics,
            }
          });
        }});
        
        // 获取对应的 dom 节点，并赋值
        // 获取售价表格集合
        let tds_price = table.querySelectorAll(".input-price");
        let tds_stock = table.querySelectorAll(".input-stock");
        let tds_pics = table.querySelectorAll(".input-pics");
        const { common } = spuDetailsInfo;
        
        common.forEach((item, index) => {
  
          tds_price[index].querySelectorAll("input")[0].value = Number(item.price);
          tds_stock[index].querySelectorAll("input")[0].value = Number(item.stock);
          tds_pics[index].src = item.sku_url;
        });
        
      }, 900);
  
  
  }
  
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    
    
    setTimeout(() => {
      let table = this.tableRef.current.nextElementSibling.querySelectorAll('table')[0];
      let tds_price = table.querySelectorAll(".input-price");
      let tds_stock = table.querySelectorAll(".input-stock");
      let tds_pics = table.querySelectorAll(".input-pics");
      const { common } = spuDetailsInfo_copy;
  
      common.forEach((item, index) => {
    
        tds_price[index].querySelectorAll("input")[0].value = Number(item.price);
        tds_stock[index].querySelectorAll("input")[0].value = Number(item.stock);
        tds_pics[index].src = item.sku_url;
      });
  
    }, 1000);
  
  
  }
  
  
  handleReReqSpuDetailsInfo = spu_id => {
    this.props.dispatch({
      type: 'spuDetails/getSpuDetailInfo',
      payload: spu_id,
    });
  };
  
  handleAddComponentClick = () => {
    // 动态添加组件
    dispatch({
      type: 'spuDetails/_addContainer',
    });
  };
  
  handleParentInputClick = key => {
    dispatch({
      type: 'spuDetails/loadParentNodeData',
      payload: {
        key,
      },
    });
  };
  
  handlePutValToParentInputClick = (parent_name, parent_id, dataKey) => {
    // 判断 parentNames 中的第一个元素是否是临时添加的
    
    
    const { parentNames } = this.props.spuDetails.containers[dataKey];
    
    if (parentNames[0].temp !== undefined && Number.isNaN(Number(parentNames[0].parent_id))) {
      // 发送当前元素值
      dispatch({
        type: 'spuDetails/getNewParentNamesEle',
        payload: {
          parent_name: parentNames[0].parent_name,
          key: dataKey,
          // parentName: parent_name,
          // parent_id: id,
        },
      });
      id = 0;
    } else {
      dispatch({
        type: 'spuDetails/_putValToParentInput',
        payload: {
          parent_name,
          parent_id,
          key: dataKey,
        },
      });
      id = parent_id;
    }
  };
  
  handleAddChildNodeClick = (dataKey, id, prop) => {
    
    // 加载对应子节点数据
    dispatch({
      type: 'spuDetails/loadChildNodeData',
      payload: {
        parent_name: this.props.spuDetails.containers[dataKey].parentInputVal,
        parent_id: id,
        key: dataKey,
        prop,
      },
    });
    
  };
  
  handlePutValToChildInputClick = (child_name, child_id, dataKey, parent_id, prop) => {
    // 将选中的子节点数据填充进容器
    dispatch({
      type: 'spuDetails/_tempSaveSelectedChildNodeData',
      payload: {
        child_name,
        child_id,
        key: dataKey,
        parent_id,
        prop,
      },
    });
  };
  
  handleSwitchChildHoverBoardStatus = key => {
    let tag = false;
    // 切换子节点的悬浮选值面板的状态
    if (this.props.spuDetails.containers[key].hoverChildInputBoard_tag) {
      tag = false;
    } else {
      tag = true;
    }
    // 隐藏
    
    // 更新子节点的悬浮选值面板的状态
    dispatch({
      type: 'spuDetails/_changeChildHoverBoardStatus',
      payload: {
        tag: tag,
        key,
      },
    });
  };
  

  
  handleAddChildNamesToRealArea = key => {
    // 判断当前数组中的元素是否有临时生成的元素
    dispatch({
      type: 'spuDetails/_judgeTempCreatedEle',
      payload: {
        key,
      },
    });
    if (this.props.spuDetails.containers[key].isHaveTempCreatedEle) {
      // 有，则先将该元素提交给后台并由后台返回一个已经替换了 id 的元素
      
      let temp_addEle = this.props.spuDetails.containers[key].afterNative_childNames.filter(
          (item, index) => Number.isNaN(Number(item.child_id)),
      );
      let arr = this.props.spuDetails.backUp_parentNames.filter(
          (item, index) => item.parent_name === this.props.spuDetails.containers[key].parentInputVal,
      );
      
      // 替换上传元素的 id
      dispatch({
        type: 'spuDetails/getNewChildNamesEle',
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
      type: 'spuDetails/_realAddChildEle',
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
                type: 'spuDetails/_getCurrentUploadKey',
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
    const { spuDetailsInfo } = this.props.spuDetails;
    dispatch({
      type: 'spuDetails/_removeReal_childNames',
      payload: {
        item,
        key,
        table: this.tableRef.current.nextElementSibling.querySelectorAll('table')[0],
        spuDetailsInfo,
      },
    });
  };
  
  handleCancelChildHoverBoard = key => {
    dispatch({
      type: 'spuDetails/_cancelChildHoverBoard',
      payload: {
        key,
      },
    });
  };
  
  handleRemoveAfterNative_childNames = (item, key) => {
    // 删除当前选项
    dispatch({
      type: 'spuDetails/_removeAfterNative_childNames',
      payload: {
        item,
        key,
      },
    });
  };
  
  handleSubmit = () => {
    
    // 获取数据
    let form = document.querySelectorAll(".form-spuDetails")[0];
    let inputs = form.querySelectorAll("input");
    
    let data = {
      spu_name: inputs[1].value,
      spu_barCode: inputs[0].value,
      top_urls: [""],
      bottom_urls: [""],
      sku_list: [],
    };
  
    
    let temp_arr = this.props.spuDetails.board_data.filter((item, index) => item.temp === undefined);
    let sku_list = [];
    if (temp_arr.length > 1 && temp_arr.length <= 2) {
      // 两次循环
      for (let i = 0; i < temp_arr[temp_arr.length - 2].children.length; i++) {
        for (let j = 0; j < temp_arr[temp_arr.length - 1].children.length; j++) {
          let temp = [];
          temp.push(temp_arr[temp_arr.length - 2].children[i].id, temp_arr[temp_arr.length - 1].children[j].id);
          sku_list.push(temp);
        }
      }
    } else if (temp_arr.length > 2 && temp_arr.length <= 3) {
      // 三次循环
    
      for (let i = 0; i < temp_arr[temp_arr.length - 3].children.length; i++) {
        for (let j = 0; j < temp_arr[temp_arr.length - 2].children.length; j++) {
          for (let o = 0; o < temp_arr[temp_arr.length - 1].children.length; o++) {
            let temp = [];
            temp.push(
                temp_arr[temp_arr.length - 3].children[i].id,
                temp_arr[temp_arr.length - 2].children[j].id,
                temp_arr[temp_arr.length - 1].children[o].id,
            );
            sku_list.push(temp);
          }
        }
      }
    } else if (temp_arr.length <= 1) {
      // 一次循环
      for (let i = 0; i < temp_arr[temp_arr.length - 1].children.length; i++) {
        let temp = [];
        temp.push(temp_arr[temp_arr.length - 1].children[i].id);
        sku_list.push(temp);
      }
    }
    let table = this.tableRef.current.nextElementSibling.querySelectorAll('table')[0];
    let tds_price = table.querySelectorAll(".input-price");
    let tds_stock = table.querySelectorAll(".input-stock");
    let price = [];
    let stock = [];
    tds_price.forEach((item, index) => {
      price.push(item.querySelectorAll("input")[0].value);
    });
    tds_stock.forEach((item, index) => {
      stock.push(item.querySelectorAll("input")[0].value);
    });
    
    
    let dataSource = [];
    // 合成数据
    for(let i = 0; i < sku_list.length; i++) {
      dataSource.push({
        price: price[i],
        stock: stock[i],
        url: this.props.spuDetails.currentUploadPics[i] === undefined ? "" : this.props.spuDetails.currentUploadPics[i],
        sku_specs_option_id: sku_list[i],
      });
    }
    data.sku_list = dataSource;
    
    // 提交页面数据
    dispatch({
      type: "spuDetails/submitSpuDetailsData",
      payload: data,
    });
    
  };
  
  handleChildCheckInputNow = (val, key) => {
    dispatch({
      type: 'spuDetails/_bindChildHoverInput',
      payload: {
        value: val,
        key,
      },
    });
  };
  // 检测中文输入
  handleCheckChineseInputStart = () => {
    dispatch({
      type: 'spuDetails/_checkChineseInputStart',
    });
  };
  
  handleCheckChineseInputEnd = () => {
    dispatch({
      type: 'spuDetails/_checkChineseInputEnd',
    });
  };
  
  render() {
    return (
      <div>
        {/*<h1>Sku ({this.props.spuDetails.current_spu_id}) ...</h1>*/}
        <SpuDetails
          spuDetails={this.props.spuDetails}
          tableRef={this.tableRef}
          // urlParam = { this.props.match.params.spu_id }
          handleReReqSpuDetailsInfo={this.handleReReqSpuDetailsInfo}
          onAddComponentClick = { this.handleAddComponentClick }
          onParentInputClick = { this.handleParentInputClick }
          onPutValToParentInputClick = { this.handlePutValToParentInputClick }
          onAddChildNodeClick = { this.handleAddChildNodeClick }
          onPutValToChildInputClick = { this.handlePutValToChildInputClick }
          onSwitchChildHoverBoardStatus = { this.handleSwitchChildHoverBoardStatus }
          onAddChildNamesToRealArea = { this.handleAddChildNamesToRealArea }
          onRemoveReal_childNames = { this.handleRemoveReal_childNames }
          onChildCheckInputNow={this.handleChildCheckInputNow}
          onCheckChineseInputStart={this.handleCheckChineseInputStart}
          onCheckChineseInputEnd={this.handleCheckChineseInputEnd}
          onCancelChildHoverBoard = { this.handleCancelChildHoverBoard }
          onRemoveAfterNative_childNames = { this.handleRemoveAfterNative_childNames }
          onSubmit = { this.handleSubmit }
          
        />
      </div>
    );
  }
}
export default connect(({ spuDetails }) => ({
  spuDetails,
}))(SpuDetailsRouter);
