import React, { Component } from 'react';
import { connect } from "dva";
import spu from "@/pages/goods-manage/models/spu";
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
        
    }
    
    handleReReqSpuDetailsInfo = (spu_id) => {
        this.props.dispatch({
            type: "spuDetails/getSpuDetailInfo",
            payload: spu_id,
        });
    };
    
    render() {
        return (
            <div>
                {/*<h1>Sku ({this.props.spuDetails.current_spu_id}) ...</h1>*/}
                <SpuDetails spuDetails = { this.props.spuDetails }
                            urlParam = { this.props.match.params.spu_id }
                            handleReReqSpuDetailsInfo = { this.handleReReqSpuDetailsInfo }
                />
            </div>
        );
    }
}
export default connect(({ spuDetails }) => ({
    spuDetails
}))(SpuDetailsRouter);
