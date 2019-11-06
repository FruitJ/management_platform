// 导入官方包
import React, { Component } from 'react';
import { connect } from 'dva';
import reqwest from 'reqwest';
import { Tooltip, Popover, Icon } from 'antd';

// 导入自定义包
import GoodsList from '@/pages/goods-manage/components/GoodsList';
import './static/GoodsListRouter.less';
import {
  GOODS$_TAB_CHANGE,
  GOODS$_LOADING_CHANGE,
  GOODS$_LOAD_TAB_DATA,
} from '@/pages/goods-manage/static/config';

// goods table column's rule
const columns = [
  {
    title: '名称',
    dataIndex: 'goodsName',
    width: '13%',
    align: 'center',
    ellipsis: true,
    sorter: (a, b) => a.goodsName.length - b.goodsName.length,
    sortDirections: ['descend'],
    render: text => (
      <Tooltip title={text} placement="left">
        {text}
      </Tooltip>
    ),
  },
  {
    title: '品牌',
    dataIndex: 'goodsBrand',
    width: '10%',
    align: 'center',
    className: 'column-goodsBrand',
    ellipsis: true,
    filters: [
      {
        text: '徐福记',
        value: '徐福记',
      },
    ],
    onFilter: (value, record) => {
      console.log(record.goodsBrand.indexOf(value));
      return record.goodsBrand.includes(value);
    },
    render: text => (
      <Tooltip title={text} placement="top">
        {text}
      </Tooltip>
    ),
  },
  {
    title: '上/下架',
    dataIndex: 'goodsShelfStatus',
    align: 'center',
    width: '7%',
    render: (text, record) => {
      let status = '';
      status = text ? '上架' : '下架';
      return status;
    },
  },
  {
    title: '价格',
    dataIndex: 'goodsPrice',
    align: 'center',
    width: '10%',
    className: 'column-goodsPrice',
    sorter: (a, b) => a.goodsPrice - b.goodsPrice,
    render: text => {
      return `￥${text}`;
    },
  },
  {
    title: '规格',
    dataIndex: 'goodsSpecs',
    align: 'center',
  },
  {
    title: '类目',
    dataIndex: 'goodsClasses',
    align: 'center',
    width: '7%',
    className: 'column-goodsClasses',
    filters: [
      {
        text: '生鲜',
        value: '生鲜',
        children: [
          {
            text: '水果',
            value: '水果',
          },
        ],
      },
      {
        text: '非食',
        value: '非食',
        children: [
          {
            text: '数码',
            value: '数码',
          },
          {
            text: '洗化',
            value: '洗化',
          },
        ],
      },
      {
        text: '食品',
        value: '食品',
        children: [
          {
            text: '饮料',
            value: '饮料',
          },
          {
            text: '酒水',
            value: '酒水',
          },
        ],
      },
    ],
    onFilter: (value, record) => {
      console.log(value);
      console.log(record.goodsClasses.indexOf(value));
      return record.goodsClasses.includes(value);
    },
  },
  {
    title: '图片',
    dataIndex: 'goodsPics',
    align: 'center',
    className: 'column-goodsPic',
    width: '7%',
    render: (text, record) => (
      <div
        style={{
          width: '50px',
          height: '50px',
        }}
      >
        <Popover
          content={
            <div
              style={{
                width: '170px',
                height: '170px',
              }}
            >
              <img
                src={`${text}`}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          }
          title={
            record.goodsName.length > 10 ? record.goodsName.slice(0, 20) + '...' : record.goodsName
          }
        >
          <img
            src={`${text}`}
            alt=""
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Popover>
      </div>
    ),
  },
  {
    title: '范围',
    dataIndex: 'goodRange',
    align: 'center',
    width: '7%',
    filters: [
      {
        text: '市区',
        value: '市区',
      },
      {
        text: '外县',
        value: '外县',
      },
    ],
    onFilter: (value, record) => {
      return record.goodRange.includes(value);
    },
  },
  {
    title: '库存',
    dataIndex: 'goodsStock',
    align: 'center',
    width: '8%',
  },
  {
    title: '操作',
    dataIndex: 'edit',
    align: 'center',
    width: '7%',
    render: (text, record) => (
      <div
        style={{
          textAlign: 'center',
        }}
        onClick={() => alert(123)}
      >
        <Icon
          type="edit"
          style={{
            fontSize: '16px',
            color: '#40a9ff',
            cursor: 'pointer',
          }}
        />
      </div>
    ),
  },
];

// breadCrumb's routes
const routes = [
  {
    path: 'index',
    breadcrumbName: '首页',
  },
  {
    path: 'first',
    breadcrumbName: '商品列表',
  },
];

// GoodsListRouter Component
const GoodsListRouter = ({ dispatch, goods }) => {
  // submit form ( search goods ... )
  const handleSubmit = ({ ev, form }) => {
    ev.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // click pagination 、filter、sorter 's callback ( update page content )
  const handleTabChange = (pagination, filters, sorter) => {
    const pager = { ...goods.pagination };
    pager.current = pagination.current;

    dispatch({
      type: GOODS$_TAB_CHANGE,
      payload: {
        pagination: pager,
      },
    });
    fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  // req data
  const fetch = (params = {}) => {
    dispatch({
      type: GOODS$_LOADING_CHANGE,
      payload: true,
    });
    reqwest({
      url: '/api/index/goodsList',
      method: 'get',
      data: {
        results: 10,
        ...params,
      },
      type: 'json',
    }).then(data => {
      const pagination = { ...goods.pagination };
      // Read total count from server
      pagination.total = data.totalCount;
      dispatch({
        type: GOODS$_LOAD_TAB_DATA,
        payload: {
          loading: false,
          data: data.goodsList,
          pagination,
        },
      });
    });
  };

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {/* GoodsList Component ( the GoodsListRouter's child ) */}
      <GoodsList
        goods={goods}
        dispatch={dispatch}
        handleSubmit={handleSubmit}
        handleTabChange={handleTabChange}
        fetch={fetch}
        routes={routes}
        columns={columns}
      />
    </div>
  );
};
export default connect(({ goods }) => ({
  goods,
}))(GoodsListRouter);
