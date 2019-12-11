import React, { Component } from 'react';
import { connect } from 'dva';

import GoodsCategory from '@/pages/goods-manage/components/GoodsCategory';

class GoodsCategoryRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <GoodsCategory />
      </div>
    );
  }
}
export default connect(({ goodsCategoryManage }) => ({
  goodsCategoryManage,
}))(GoodsCategoryRouter);
