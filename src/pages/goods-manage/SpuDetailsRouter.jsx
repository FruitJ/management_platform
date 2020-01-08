import React, { Component } from 'react';
import { connect } from 'dva';
import spu from '@/pages/goods-manage/models/spu';
import SpuDetails from './components/SpuDetails';

class SpuDetailsRouter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
    // 重新请求
    this.props.dispatch({
      type: 'spuDetails/reqSpuDetailInfo',
      payload: spu_id,
    });
  }

  handleReReqSpuDetailsInfo = spu_id => {
    this.props.dispatch({
      type: 'spuDetails/getSpuDetailInfo',
      payload: spu_id,
    });
  };

  render() {
    return (
      <div>
        {/*<h1>Sku ({this.props.spuDetails.current_spu_id}) ...</h1>*/}
        <SpuDetails
          spuDetails={this.props.spuDetails}
          // urlParam = { this.props.match.params.spu_id }
          handleReReqSpuDetailsInfo={this.handleReReqSpuDetailsInfo}
        />
      </div>
    );
  }
}
export default connect(({ spuDetails }) => ({
  spuDetails,
}))(SpuDetailsRouter);
