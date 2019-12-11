// 导入 react 官方包
import React, { Component } from 'react';
import { connect } from 'dva';

// 导入自定义包
import SkuList from '@/pages/goods-manage/components/SkuList';

const SkuListRouter = ({ sku }) => {
  // class SkuListRouter extends Component {

  return (
    <div>
      <SkuList sku={sku} />
    </div>
  );
};
export default connect(({ sku }) => ({
  sku,
}))(SkuListRouter);
