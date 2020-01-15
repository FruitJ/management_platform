import React, { Component, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  Button,
  Alert,
  Tooltip,
  Icon,
  Tree,
  Modal,
  Divider,
  Input,
  Popconfirm,
} from 'antd';
import { PageHeader } from 'antd';

import '../static/GoodsCategory.less';

const { TreeNode } = Tree;
const data = [
  { key: '0', value: '未分类' },
  {
    key: '1',
    value: '电子',
    children: [
      {
        key: '10',
        value: '手机',
        children: [
          {
            key: '100',
            value: '智能机',
            children: [
              {
                key: '1000',
                value: '华为 mete 30',
              },
              {
                key: '1001',
                value: 'iPhone 11 plus',
              },
            ],
          },
          {
            key: '101',
            value: '老年机',
            children: [
              {
                key: '1010',
                value: '诺基亚',
              },
              {
                key: '1011',
                value: '摩托罗拉',
              },
            ],
          },
        ],
      },
      {
        key: '11',
        value: '电脑',
        children: [
          {
            key: '110',
            value: 'i3',
            children: [
              {
                key: '1100',
                value: 'Hasee',
              },
            ],
          },
          {
            key: '111',
            value: 'i5',
          },
          {
            key: '112',
            value: 'i9',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    value: '食品',
    children: [
      {
        key: '20',
        value: '饮品',
        children: [
          {
            key: '200',
            value: '酒水',
            children: [
              {
                key: '2000',
                value: '白酒',
              },
              {
                key: '2001',
                value: '啤酒',
              },
            ],
          },
          {
            key: '201',
            value: '饮料',
            children: [
              {
                key: '2010',
                value: '可口可乐',
              },
              {
                key: '2011',
                value: '雪碧',
              },
            ],
          },
        ],
      },
      {
        key: '21',
        value: '熟食',
        children: [
          {
            key: '210',
            value: '鸡类',
            children: [
              {
                key: '2100',
                value: '德州扒鸡',
              },
              {
                key: '2101',
                value: '陈家熏鸡',
              },
            ],
          },
        ],
      },
    ],
  },
];
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
let parentId = 0;
let currentId = 0;
let del_currentId = 0;

let prevKey = 0;
const isSave = false;
let count = 0;
let max_category = 3;
let parentText = '';

class GoodsCategory extends Component {
  // const GoodsCategory = (props) => {

  // const btnRef = useRef(null);
  constructor(props) {
    super(props);
  }


  componentDidMount() {
  }

  onSelect = (selectedKeys, info) => {
    const { target: tar } = info.nativeEvent;
    if (Array.from(tar.classList).includes('category-addChild')) {
      this.props.onShowAddCategoryModal();
      if (this.props.goodsCategory.isShowAddChildCategoryModel) {
        if (!this.props.isShowAddChildCategory) {
          parentId = Number(selectedKeys[0]);
          this.props.onChangeTagCategoryStatus(true);
          // this.props.isShowAddChildCategory = true;
        }
      }

    } else if (Array.from(tar.classList).includes('category-edit')) {
      // 打开弹框
      this.props.onShowEditCategoryModal();
      try {
        parentText =
          info.node.selectHandle.parentNode.parentNode.parentNode.children[1].firstChild.firstChild
            .firstChild.firstChild.innerHTML;
      } catch (err) {
        parentText = '无';
      }
      // isShowEditGoodsCategory

      if (this.props.goodsCategory.isShowEditCategoryModel) {
        if (!this.props.isShowEditGoodsCategory) {
          currentId = Number(selectedKeys[0]);
          this.props.onChangeTagEditCategoryStatus(true);
        }
      }

      // onDelCategory
    } else if (Array.from(tar.classList).includes('category-remove')) {
      this.props.onShowDelCategoryModal();
      if (this.props.goodsCategory.isShowDelCategoryModel) {
        if (!this.props.isShowDelGoodsCategory) {
          // del_currentId
          del_currentId = Number(selectedKeys[0]);
          this.props.onChangeTagDelCategoryStatus(true);
        }
      }
    }
  };

  dynamicTreeNodeGenerator = data =>
    data.map((item, index) => {
      count += 1;

      return (
        <TreeNode
          title={
            <Row>
              <Col span={6}>
                <span>{item.value}</span>
              </Col>
              <Col
                offset={19}
                style={{
                  width: '90% !important',
                }}
              >
                {Number(item.key) !== 0 ? (
                  <div
                    style={{
                      position: 'absolute',
                      right: '20px',
                      marginRight: '20px',
                      // marginLeft: "40px",
                      width: '90% !important',
                    }}
                  >
                    {item.step < 4 ? (
                      <>
                        <Button
                          type="link"
                          style={{
                            padding: '0',

                            marginTop: '-4.5px',
                            lineHeight: '32px',
                          }}
                          className="category-addChild"
                        >
                          <span className="addCategory">新增子分类</span>
                        </Button>
                        <Modal
                          title="新增子分类"
                          visible={this.props.goodsCategory.isShowAddChildCategoryModel}
                          onOk={ev => {
                            this.props.onAddChildCategoryModalOk(ev, parentId);
                          }}
                          onCancel={() => {
                            this.props.onAddChildCategoryModalCancel;
                          }}
                          style={{
                            position: 'relative',
                            zIndex: '100000',
                          }}
                        >
                          <Row>
                            <Col span={4} offset={1}>
                              <span
                                style={{
                                  display: 'block',
                                  marginTop: '5px',
                                }}
                              >
                                分类名称:
                              </span>
                            </Col>
                            <Col span={18}>
                              <Input
                                value={this.props.goodsCategory.input_addChildCategoryVal}
                                onChange={ev => {
                                  this.props.onChangeAddChildCategoryVal(ev);
                                }}
                                placeholder="请输入分类名称"
                                id="category"
                              />
                            </Col>
                          </Row>
                        </Modal>
                        <Divider type="vertical" />
                      </>
                    ) : null}
                    <Button
                      type="link"
                      style={{
                        padding: '0',
                        marginTop: '-4.5px',
                        lineHeight: '32px',
                      }}
                      className="category-edit"
                    >
                      编辑
                    </Button>
                    <Modal
                      title="编辑分类"
                      visible={this.props.goodsCategory.isShowEditCategoryModel}
                      onOk={() => {
                        this.props.onEditCategoryModalOk(currentId);
                      }}
                      onCancel={this.props.onEditCategoryModalCancel}
                    >
                      <Row>
                        <Col span={4} offset={1}>
                          <span
                            style={{
                              display: 'block',
                              marginTop: '5px',
                            }}
                          >
                            分类名称:
                          </span>
                        </Col>
                        <Col span={18}>
                          <Input
                            placeholder="请输入分类名称"
                            onChange={ev => {
                              this.props.onChangeEditCategoryVal(ev);
                            }}
                          />
                        </Col>
                      </Row>
                      <Row
                        style={{
                          marginTop: '20px',
                        }}
                      >
                        <Col span={4} offset={1}>
                          <span
                            style={{
                              display: 'block',
                              marginTop: '5px',
                            }}
                          >
                            上级分类:
                          </span>
                        </Col>
                        <Col span={18}>
                          <Input placeholder={parentText} disabled={true} />
                        </Col>
                      </Row>
                    </Modal>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="确定删除该分类 ? "
                      icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                      onConfirm={() => {
                        this.props.onDelCategoryModalOk(del_currentId);
                      }}
                      onCancel={() => {
                        this.props.onDelCategoryModalCancel();
                      }}
                    >
                      <Button
                        type="link"
                        style={{
                          padding: '0',
                          marginTop: '-4.5px',
                          lineHeight: '32px',
                        }}
                        className="category-remove"
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  </div>
                ) : null}
              </Col>
            </Row>
          }
          key={item.key}
          style={
            {
              // marginLeft: "40px",
            }
          }
        >
          {item.children ? this.dynamicTreeNodeGenerator(item.children) : null}
        </TreeNode>
      );
      // }
    });

  render() {
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
        <div
          className="manage-category"
          style={{
            backgroundColor: '#FFF',
            marginTop: '24px',
            paddingTop: '24px',
            paddingBottom: '45px',
          }}
        >
          <Row
            style={
              {
                // marginTop: "24px",
                // marginLeft: "20px"
              }
            }
          >
            <Col span={24}>
              <Button
                type="primary"
                style={{
                  marginLeft: '20px',
                }}
                onClick={() => {
                  this.props.onOpenNewAddCategoryModal();
                }}
              >
                新增分类
              </Button>
              <Modal
                title="新增分类"
                visible={this.props.goodsCategory.isShowAddCategoryModel}
                onOk={() => {
                  this.props.onAddCategoryModalOk();
                }}
                // onCancel={this.handleCancel}
              >
                <Row>
                  <Col span={4} offset={1}>
                    <span
                      style={{
                        display: 'block',
                        marginTop: '5px',
                      }}
                    >
                      分类名称:
                    </span>
                  </Col>
                  <Col span={18}>
                    <Input
                      placeholder={parentText}
                      value={this.props.goodsCategory.input_addCategoryVal}
                      onChange={ev => {
                        this.props.onChangeAddCategoryVal(ev);
                      }}
                    />
                  </Col>
                </Row>
              </Modal>
            </Col>
          </Row>
          <Row>
            <Col span={23} offset={0}>
              <Alert
                message={
                  <>
                    <Row>
                      <Col span={6}>
                        <span
                          style={{
                            marginLeft: '35px',
                          }}
                        >
                          分类
                        </span>
                      </Col>
                      <Col
                        span={2}
                        offset={16}
                        style={{
                          width: '5%',
                        }}
                      >
                        <Tooltip title="提示：长按可以对同级分类进行拖动排序">
                          <Icon type="info-circle" />
                        </Tooltip>
                        <span
                          style={{
                            marginLeft: '5px',
                          }}
                        >
                          操作
                        </span>
                      </Col>
                    </Row>
                  </>
                }
                type="info"
                style={{
                  marginTop: '15px',
                  width: '100.5%',
                  marginLeft: '20px',
                  backgroundColor: '#F2F2F2',
                  borderColor: '#F2F2F2',
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col
              span={22}
              offset={1}
              style={{
                marginTop: '20px',
              }}
            >
              <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}>
                {/* 动态生成 TreeNode */}
                {this.dynamicTreeNodeGenerator(this.props.goodsCategory.categoryData)}
              </Tree>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default GoodsCategory;
