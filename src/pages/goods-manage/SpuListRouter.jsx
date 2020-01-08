// 导入官方包
import React from 'react';
import { connect } from 'dva';
import reqwest from 'reqwest';
import { Tooltip, Popover, Icon, Form, Select } from 'antd';

const { Option } = Select;
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 导入自定义包
import SpuList from '@/pages/goods-manage/components/SpuList';
import './static/SpuListRouter.less';
import {
  SPU$_TAB_CHANGE,
  SPU$_LOADING_CHANGE,
  SPU$_LOAD_TAB_DATA,
} from '@/pages/goods-manage/static/config';

let tempSaveGoods = []; // temp save Goods date ...
let tempGoodsName = ''; // temp save Goods name
let tempSaveSingleGoods = {}; // temp save need data object

// 面包屑导航所需数据
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

// Spu 列表父组件
const SpuListParentComponent = props => {
  const { getFieldDecorator } = props.form;

  console.warn(props);

  // spu 表格的列数据
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'spu_name',
      width: '8%',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => a.spu_name.length - b.spu_name.length,
      sortDirections: ['descend'],
      render: text => (
        <Tooltip title={text} placement="left">
          {text}
        </Tooltip>
      ),
    },
    {
      title: '商品状态',
      dataIndex: 'spuStatus',
      align: 'center',
      width: '6%',
      render: (text, record) => {
        let status = '';
        status = text ? '上架' : '下架';
        return status;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      align: 'center',
      width: '7%',
      sorter: (a, b) => {
        console.log('()()()(');
        console.log(a, b);
        return new Date(a.create_time).getTime() - new Date(b.create_time).getTime();
      },
      render: (text, record) => {
        // 将时间戳转换为 JavaScript 对象
        console.log(text);
        let time = new Date(text);
        console.log(time);
        // 返回中文格式的时间字符串
        return `${time.getFullYear()}年-${time.getMonth() +
          1}月-${time.getDate()}日 ${time.getHours()}时:${time.getMinutes()}分:${time.getSeconds()}秒`;
      },
    },
    /*{
      title: 'spu 类目',
      dataIndex: 'spuClasses',
      align: 'center',
      width: '5%',
      // className: 'column-goodsClasses',
      filters: [
        {
          text: '电子',
          value: '电子',
          children: [
            {
              text: '电脑',
              value: '电脑',
            },
            {
              text: '手机',
              value: '手机',
            },
            {
              text: '耳麦',
              value: '耳麦',
            },
          ],
        },
        {
          text: '饮品',
          value: '饮品',
          children: [
            {
              text: '酒水',
              value: '酒水',
            },
          ],
        },
        {
          text: '食品',
          value: '食品',
          children: [
            {
              text: '口香糖',
              value: '口香糖',
            },
          ],
        },
      ],
      onFilter: (value, record) => {
        return record.spuClasses.includes(value);
      },
    },*/
    {
      title: '商品图片',
      dataIndex: 'img_url',
      align: 'center',
      width: '3%',
      render: (text, record) => {
        return (
          <div
            style={{
              marginLeft: '12px',
              width: '60px',
              height: '60px',
              textAlign: 'center',
            }}
          >
            <Popover
              content={
                <div
                  style={{
                    width: '170px',
                    height: '170px',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={`${text}`}
                    alt=""
                    style={{
                      display: 'inlineBlock',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              }
              /*title={
                record.spu_name.length > 10 ? record.spu_name.slice(0, 20) + '...' : record.spu_name
              }*/
            >
              <img
                src={`${text}`}
                alt=""
                style={{
                  display: 'inlineBlock',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Popover>
          </div>
        );
      },
    },
    /*{
      title: '库存',
      dataIndex: 'spuStock',
      align: 'center',
      width: '4%',
    },*/
    /*{
      title: '实时库存',
      dataIndex: 'spuRealTimeStock',
      align: 'center',
      width: '4%',
    },*/
    {
      title: '操作',
      dataIndex: 'spu_sn',
      align: 'center',
      width: '4%',
      render: (spu_id, record, index) => {
        // tempSaveGoods.push(record);
        // props.goods.globalGoodsContainer.push(record);
        return (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <Icon
              type="edit"
              style={{
                fontSize: '16px',
                color: '#40a9ff',
                cursor: 'pointer',
              }}
              onClick={() => {
                // 跳转到 sku 界面 ( 携带 spu_id )
                props.dispatch({
                  type: 'spuDetails/toSpuDetails',
                  payload: spu_id,
                });

                // props.dispatch({
                //   type: 'goods/_addGoodsItemInfo',
                //   payload: tempSaveGoods,
                // });
                // tempSaveSingleGoods = props.goods.globalGoodsContainer[index];
                // tempGoodsName = tempSaveSingleGoods.spuName;
              }}
            />
          </div>
        );
      },
    },
  ];

  // 提交查询表单的回调函数
  const handleSubmit = ({ ev, form }) => {
    ev.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  // 点击分页、spu 列表表头筛选按钮触发的回调
  const handleTabChange = (pagination, filters, sorter) => {
    const pager = { ...props.spu.pagination };
    pager.current = pagination.current;

    props.dispatch({
      type: SPU$_TAB_CHANGE,
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

  // 选择具体的 Spu 触发的回调
  const handleSelectSpu = (val, selectObj) => {
    console.log('分割线 ...');
    console.log(Number(selectObj.key));
    console.log(selectObj);

    // 更新数据和 spu tag
    props.dispatch({
      type: 'spu/updateSpuList',
      payload: {
        spuName: val,
        spu_id: selectObj.key,
        merchant_id: 1,
      },
    });
  };

  // 获取 spu 列表的数据
  const fetch = (params = {}) => {
    props.dispatch({
      type: SPU$_LOADING_CHANGE,
      payload: true,
    });
    reqwest({
      // 请求商品列表
      url: '/api/backend/beanmall/third/goods/list',
      // url: '/api/index/spuList',
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: JSON.stringify({
        results: 10,
        merchant_id: 1,
        // ...params,
      }),
      type: 'json',
    }).then(data => {
      const pagination = { ...props.spu.pagination };

      console.log('morning ...');
      console.log(data.data.goods_list);
      // Read total count from server
      pagination.total = data.totalCount;
      props.dispatch({
        type: SPU$_LOAD_TAB_DATA,
        payload: {
          loading: false,
          data: data.data.goods_list,
          pagination,
        },
      });
    });
  };

  const handleReset = ev => {
    ev.preventDefault();
    props.dispatch({
      type: 'spu/updateSpuList',
      payload: {
        spuName: 'spu 标签',
        spu_id: 0,
        merchant_id: 1,
      },
    });
  };

  // 初始化 spu 名称信息
  const handleInitSpuName = () => {
    props.dispatch({
      type: 'spu/initSpuNames',
    });
  };

  // 获取 spu 类目信息
  const handleGetSpuClasses = () => {
    props.dispatch({
      type: 'spu/getSpuClasses',
    });
  };

  // 选择 spu 分类
  const handleSelectClasses = val => {
    // 根据所选类目更新数据源
    props.dispatch({
      type: 'spu/selectClassesUpdateSpu',
      payload: val,
    });
  };

  const handleSwitchShowModel = val => {
    props.dispatch({
      type: 'spu/switchShowModel',
      payload: val,
    });
  };

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {/* spu 列表组件【SpuListParentComponent 的子组件】  */}
      <SpuList
        spu={props.spu}
        dispatch={props.dispatch}
        handleSubmit={handleSubmit}
        handleTabChange={handleTabChange}
        handleSelectSpu={handleSelectSpu}
        handleReset={handleReset}
        handleInitSpuName={handleInitSpuName}
        handleGetSpuClasses={handleGetSpuClasses}
        handleSelectClasses={handleSelectClasses}
        handleSwitchShowModel={handleSwitchShowModel}
        fetch={fetch}
        routes={routes}
        columns={columns}
      />
    </div>
  );
};

let SpuListRouter = Form.create({})(SpuListParentComponent);

export default connect(({ spu }) => ({
  spu,
}))(SpuListRouter);
