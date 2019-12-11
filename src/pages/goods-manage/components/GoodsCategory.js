import React, { Component } from 'react';
import {} from 'antd';
import { PageHeader } from 'antd';
const GoodsCategory = () => {
  const routes = [
    {
      path: 'index',
      breadcrumbName: '商品管理',
    },
    {
      path: 'first',
      breadcrumbName: '商品分类',
    },
  ];

  return (
    <div>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#FFF',
        }}
        title="商品管理"
        breadcrumb={{ routes }}
        subTitle="商品分类"
      />
      <h1>Hello React ...</h1>
    </div>
  );
};
export default GoodsCategory;
