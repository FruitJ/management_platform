// 导入官方包
import React, { Component } from 'react';
import { connect } from 'dva';
import reqwest from 'reqwest';
import {
  Tooltip,
  Popover,
  Icon,
  Drawer,
  Form,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  TimePicker,
  Input,
  InputNumber,
} from 'antd';

const { Option } = Select;
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 导入自定义包
import GoodsList from '@/pages/goods-manage/components/GoodsList';
import './static/GoodsListRouter.less';
import {
  GOODS$_TAB_CHANGE,
  GOODS$_LOADING_CHANGE,
  GOODS$_LOAD_TAB_DATA,
  GOODS$_CHANGE_DRAWER_STATUS,
} from '@/pages/goods-manage/static/config';

let tempSaveGoods = []; // temp save Goods date ...
let tempGoodsName = ''; // temp save Goods name
let tempSaveSingleGoods = {}; // temp save need data object
// breadCrumb's routes data
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

// GoodsListRouter Component dispatch、goods
// const GoodsListParentComponent = ({ dispatch, goods }) => {
const GoodsListParentComponent = props => {
  const { getFieldDecorator } = props.form;

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
      render: (text, record) => {
        return (
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
                record.goodsName.length > 10
                  ? record.goodsName.slice(0, 20) + '...'
                  : record.goodsName
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
        );
      },
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
      dataIndex: 'key',
      align: 'center',
      width: '7%',
      render: (text, record, index) => {
        console.warn(index);
        tempSaveGoods.push(record);
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
                // tempIndex = index;
                tempSaveSingleGoods = tempSaveGoods[index];
                tempSaveGoods = [];
                tempGoodsName = tempSaveSingleGoods.goodsName;
                changeDrawerStatus(true);
              }}
            />
            <Drawer
              title={`修改商品信息 - ${
                tempGoodsName.length > 12 ? tempGoodsName.slice(0, 12) + '...' : tempGoodsName
              }`}
              placement="left"
              closable={true}
              onClose={() => {
                changeDrawerStatus(false);
              }}
              visible={props.goods.drawerVisible}
              keyboard={true}
              maskStyle={{
                backgroundColor: 'rgba(0, 0, 0, .3)',
              }}
              headerStyle={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textAlign: 'center',
              }}
              width={415}
            >
              <Form
                layout="vertical"
                hideRequiredMark
                onSubmit={ev => {
                  handleDrawerForm(ev);
                }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="商品名称 :">
                      {getFieldDecorator('goodsName', {
                        rules: [
                          {
                            required: true,
                            message: '商品名称必须包含 2 个中文字符',
                            validator(rule, value) {
                              return (
                                /[\u4e00-\u9fa5]{2,}/.test(value) && value.match(/\d/g).length <= 8
                              );
                            },
                          },
                        ],
                      })(<Input placeholder="请输入商品名称" required />)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="商品品牌">
                      {getFieldDecorator('url', {
                        rules: [
                          {
                            required: true,
                            message: '不能输入 /,.。，;\':"：；“‘[]【】{}',
                            validator(rule, value) {
                              return !/[/,.。，;':"：；“‘[\]【】{}]/.test(value);
                            },
                          },
                        ],
                      })(<Input placeholder="请输入商品品牌" required />)}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="上下架">
                      {getFieldDecorator('owner', {
                        rules: [
                          {
                            required: true,
                            message: '请选择商品状态',
                            validator(rule, value) {
                              return typeof value === 'boolean';
                            },
                          },
                        ],
                      })(
                        <Select placeholder="商品状态">
                          <Option value={true}>上架</Option>
                          <Option value={false}>下架</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="配送范围">
                      {getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Please choose delivery scope' }],
                      })(
                        <Select placeholder="请选择商品配送的范围">
                          <Option value={true}>市区</Option>
                          <Option value={false}>外县</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="商品类目">
                      {getFieldDecorator('approver', {
                        rules: [{ required: true, message: '请选择正确的分类标准' }],
                      })(
                        <Select placeholder="请选择商品的类目">
                          <Option value="jack">Jack Ma</Option>
                          <Option value="tom">Tom Liu</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="上下架日期">
                      {getFieldDecorator('goodsStatusDate', {
                        rules: [{ required: true, message: '请选择正确的日期' }],
                      })(
                        <DatePicker
                          // defaultValue = { moment('2015-01-01', 'YYYY-MM-DD') }
                          placeholder="请选择日期"
                          style={{ width: '100%' }}
                          getPopupContainer={trigger => trigger.parentNode}
                          // locale = {locale}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="上下架时间">
                      {getFieldDecorator('goodsStatusTime', {
                        rules: [{ required: true, message: '请选择正确的时间' }],
                      })(
                        <TimePicker
                          // defaultValue = { moment('16:30:24', 'HH:mm:ss') }
                          placeholder="请选择时间"
                          style={{ width: '100%' }}
                          getPopupContainer={trigger => trigger.parentNode}
                          // locale={locale}
                        />,
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="商品库存 :">
                      {getFieldDecorator('goodsStock', {
                        rules: [
                          {
                            required: true,
                            message: '请输入正确的商品库存数量',
                          },
                        ],
                      })(
                        <InputNumber
                          style={{ width: '100%' }}
                          required
                          placeholder="请输入商品库存数量"
                          min={0}
                          max={100}
                        />,
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="商品价格 :">
                      {getFieldDecorator('goodsPrice', {
                        rules: [
                          {
                            required: true,
                            message: '请输入正确的商品价格',
                          },
                        ],
                      })(
                        <InputNumber
                          style={{ width: '100%' }}
                          required
                          placeholder="请输入商品价格"
                          min={0}
                          max={100}
                        />,
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item label="商品规格">
                      {getFieldDecorator('goodsSpecs', {
                        rules: [{ required: true, message: '请选择正确的商品规格' }],
                      })(
                        <Select placeholder="请选择商品的规格">
                          <Option value="jack">Jack Ma</Option>
                          <Option value="tom">Tom Liu</Option>
                        </Select>,
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="修改原因">
                      {getFieldDecorator('description', {
                        rules: [
                          {
                            required: true,
                            message: '请输入正确的修改原因',
                          },
                        ],
                      })(<Input.TextArea rows={4} placeholder="描述 ..." />)}
                    </Form.Item>
                  </Col>
                </Row>

                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                  }}
                >
                  <Button
                    onClick={() => {
                      changeDrawerStatus(false);
                    }}
                    style={{ marginRight: 8 }}
                  >
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Drawer>
          </div>
        );
      },
    },
  ];

  const test = () => {
    console.log('test ...');
  };

  // change drawer status 's callback
  const changeDrawerStatus = val => {
    props.form.resetFields(); // reset form fields value of empty
    props.dispatch({
      type: GOODS$_CHANGE_DRAWER_STATUS,
      payload: val,
    });
  };

  const handleDrawerForm = ev => {
    ev.preventDefault();
    console.log('--99--99--');
    // console.log(props.form.);validateFields
    console.warn(props);
    props.form.validateFields((err, values) => {
      // console.log(values);
      // if(!err) {
      alert(1);
      props.dispatch({
        type: 'goods/_updateGoodsData',
        payload: values,
      });
      // }
    });
    console.log('--99--99--');
  };

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
    const pager = { ...props.goods.pagination };
    pager.current = pagination.current;

    props.dispatch({
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
    props.dispatch({
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
      const pagination = { ...props.goods.pagination };
      // Read total count from server
      pagination.total = data.totalCount;
      props.dispatch({
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
        goods={props.goods}
        dispatch={props.dispatch}
        handleSubmit={handleSubmit}
        handleTabChange={handleTabChange}
        fetch={fetch}
        routes={routes}
        columns={columns}
      />
    </div>
  );
};

let GoodsListRouter = Form.create({})(GoodsListParentComponent);

export default connect(({ goods }) => ({
  goods,
}))(GoodsListRouter);
