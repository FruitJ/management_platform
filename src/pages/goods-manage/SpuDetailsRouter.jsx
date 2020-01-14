import React, { Component } from 'react';
import { connect } from 'dva';
import spu from '@/pages/goods-manage/models/spu';
import SpuDetails from './components/SpuDetails';
import {message} from "antd";

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
    // alert(";;");
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      console.log('|||||');
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
    alert("sasasasasasasasasasa");
    // console.log(this.props.match.params.spu_id);
    /*let str = this.props.match.params.spu_id;
        const spu_id = Number(str.replace(":", ""));
        // 重新请求数据
        this.props.dispatch({
            type: "spuDetails/getSpuDetailInfo",
            payload: spu_id,
        });*/

    // 从 localStorage 中获取当前的 spu id
    console.log(localStorage.getItem('current_spu_id'));
    let spu_id = JSON.parse(localStorage.getItem('current_spu_id'));
    console.log('--- 分割线* ---');
    console.log(spu_id);
    
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
    console.log("get all table's upload's btn.");
    console.log(tab_upload_btns);
    for (let i = 0; i < tab_upload_btns.length; i++) {
      tab_upload_btns[i].addEventListener(
          'click',
          function(ev) {
            console.log('_______)()()_____----------__________+++++++');
            console.log(ev.target);
            // alert('获取 key');
            let btn = ev.target;
            console.log(Number(btn.dataset.rowKey));
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
        
        console.log("户户户户户户户");
        const { spuDetailsInfo } = this.props.spuDetails;
        spuDetailsInfo_copy = spuDetailsInfo;
        console.log(this.props.spuDetails);
        console.log(spuDetailsInfo);
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
        console.log("获取 tds");
        console.log(table);
        console.log(tds_price);
        console.log(tds_stock);
        console.log(tds_pics);
        const { common } = spuDetailsInfo;
        console.log(common);
        
        common.forEach((item, index) => {
  
          tds_price[index].querySelectorAll("input")[0].value = Number(item.price);
          tds_stock[index].querySelectorAll("input")[0].value = Number(item.stock);
          tds_pics[index].src = item.sku_url;
        });
  
  
  

        
        
        
      }, 900);
  
  
  }
  
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    
    
    setTimeout(() => {
      console.log("**********************************");
      console.log(prevProps, prevState);
      let table = this.tableRef.current.nextElementSibling.querySelectorAll('table')[0];
      let tds_price = table.querySelectorAll(".input-price");
      let tds_stock = table.querySelectorAll(".input-stock");
      let tds_pics = table.querySelectorAll(".input-pics");
      console.log("获取 tds");
      console.log(table);
      console.log(tds_price);
      console.log(tds_stock);
      console.log(tds_pics);
      // const { spuDetailsInfo } = prevProps.spuDetails;
      const { common } = spuDetailsInfo_copy;
      console.log(common);
  
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
    
    alert(parent_id);
    
    const { parentNames } = this.props.spuDetails.containers[dataKey];
    
    if (parentNames[0].temp !== undefined && Number.isNaN(Number(parentNames[0].parent_id))) {
      alert(`: ${id}`);
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
    
    console.log("....");
    console.log(dataKey, id, prop);
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
    
    // const { parentNames } = this.props.addSku.containers[dataKey];
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
      console.log("get all table's upload's btn.");
      console.log(tab_upload_btns);
      for (let i = 0; i < tab_upload_btns.length; i++) {
        tab_upload_btns[i].addEventListener(
            'click',
            function(ev) {
              console.log('___________________----------__________+++++++');
              console.log(ev.target);
              alert('获取 key');
              let btn = ev.target;
              console.log(Number(btn.dataset.rowKey));
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
    console.log("form ...");
    console.log(form);
    console.log(form.querySelectorAll("input"));
    let inputs = form.querySelectorAll("input");
    
    let data = {
      spu_name: inputs[1].value,
      spu_barCode: inputs[0].value,
      top_urls: [""],
      bottom_urls: [""],
      sku_list: [],
    };
  
    console.log("sudo");
    console.log(data);
    console.log(this.props.spuDetails.board_data);
    
    let temp_arr = this.props.spuDetails.board_data.filter((item, index) => item.temp === undefined);
    console.log(temp_arr);
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
    
    
    
    console.log("OPOOPO");
    console.log(sku_list);
    console.log(this.props.spuDetails.currentUploadPics);
    console.log(price);
    console.log(stock);
  
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
