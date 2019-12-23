// 导入 React 官方包
import React, { useEffect } from 'react';
// import uuidv4 from 'uuid/v4';
import {
  Row,
  Col,
  Table,
  Form,
  Switch,
  Cascader,
  Icon,
  Button,
  PageHeader,
  Select,
  Tag,
  Tooltip,
} from 'antd';

// 导入自定义包
import '../static/SpuList.less';

const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// GoodsList's Component
const SpuListComponent = props => {
  const SPU_LENGTH = 10;

  useEffect(() => {
    props.form.validateFields(); // 校验表单字段
    props.fetch();
    // 获取 spu 名称数据
    props.handleInitSpuName();

    // 获取商品类目
    props.handleGetSpuClasses();
  }, []);

  const log = ev => {
    ev.preventDefault();
    // 清空当前 spu 标签 与 spu 下拉框的内容, 同时更新 spu 列表数据
    console.log(ev);
  };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  const spuClassesError = isFieldTouched('spuClasses') && getFieldError('spuClasses');

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {/* 页头区域 */}
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          background: '#FFF',
        }}
        title="商品"
        breadcrumb={{ routes: props.routes }}
        subTitle="商品列表"
      />

      <Row>
        <Col
          span={24}
          style={{
            marginTop: '24px',
          }}
        >
          <Row>
            <Col
              span={24}
              style={{
                background: '#FFF',
              }}
            >
              {/* 筛选区域 */}
              <Row>
                {/* spu 下拉选框区域 */}
                <Col
                  span={7}
                  style={{
                    // marginTop: '6px',
                    marginLeft: '24px',
                    padding: '24px',
                    paddingBottom: '10px',
                  }}
                  offset={0}
                >
                  <Row>
                    <Col span={12}>
                      <Select
                        style={{ width: 120 }}
                        value={props.spu.selectorSpu}
                        onChange={(val, selectObj) => {
                          props.handleSelectSpu(val, selectObj);
                        }}
                      >
                        {props.spu.spuNames.map((item, index) => (
                          <Option value={item.spuName} key={item.spu_id}>
                            {item.spuName}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col span={12}>
                      <Tag
                        closable
                        onClose={props.handleReset}
                        color="geekblue"
                        style={{
                          marginTop: '5px',
                          marginLeft: '14px',
                          width: '100%',
                          textAlign: 'center',
                        }}
                      >
                        <Tooltip title={props.spu.tagSpu} placement="top">
                          {props.spu.tagSpu.length > SPU_LENGTH
                            ? props.spu.tagSpu.substring(0, SPU_LENGTH) + '...'
                            : props.spu.tagSpu}
                        </Tooltip>
                      </Tag>
                    </Col>
                  </Row>
                </Col>
                <Col
                  span={16}
                  style={{
                    padding: '24px',
                    paddingBottom: '10px',
                  }}
                >
                  {/* 表单查询区域 */}
                  <Row>
                    <Col span={8} offset={4}>
                      {/*<label htmlFor="spuClasses">
                        spu 类目 :
                        <Cascader
                          id="spuClasses"
                          options={props.spu.spuClasses}
                          placeholder="Please select"
                          onChange={props.handleSelectClasses}
                          style={{
                            marginLeft: '10px',
                            width: '65%',
                          }}
                        />
                        
                      </label>*/}
                    </Col>
                    {/*<Col span={3} offset={3}>
                      <Switch
                        checkedChildren="spu 模式"
                        unCheckedChildren="商品模式"
                        onChange={props.handleSwitchShowModel}
                        style={{
                          marginLeft: '5px',
                          marginTop: '6px',
                          backgroundColor: 'rgb(24, 144, 255)',
                        }}
                      />
                    </Col>
                    <Col span={3} offset={1}>
                      <Tag
                        color="geekblue"
                        style={{
                          marginTop: '6px',
                        }}
                      >
                        当前为 {props.spu.isShowModel}
                      </Tag>
                    </Col>*/}
                  </Row>
                </Col>
              </Row>

              {/* 商品列表区域 */}
              <Row>
                <Col
                  span={23}
                  style={{
                    marginLeft: '25px',
                    padding: '24px',
                    paddingTop: '0',
                  }}
                >
                  <Table
                    columns={props.columns}
                    dataSource={props.spu.data}
                    pagination={props.spu.pagination}
                    loading={props.spu.loading}
                    onChange={props.handleTabChange}
                    style={{
                      marginTop: '16px',
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
const SpuList = Form.create({})(SpuListComponent);
export default SpuList;
