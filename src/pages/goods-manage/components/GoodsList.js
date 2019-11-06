import React, { useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import { Row, Col, Table, Form, Input, Icon, Button, PageHeader } from 'antd';

import '../static/GoodsList.less';

/*const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
		// console.warn(selectedRows);
		console.log(selectedRowKeys);
		selectedRowKeys.push(selectedRows);
	},
	/!*getCheckboxProps: record => {
		
		console.warn("--------");
		console.warn(record);
		console.warn("--------");
		return {
			disabled: record.goodsShelfStatus === false, // Column configuration not to be checked
			name: record.goodsName,
			
		};
	},*!/
};*/

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// GoodsList's Component
const GoodsListComponent = props => {
  useEffect(() => {
    props.form.validateFields();
    props.fetch();
  }, []);

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    props.dispatch({
      type: 'goods/_selectRows',
      payload: {
        selectedRowKeys,
      },
    });
    // this.setState({ selectedRowKeys });
  };

  const rowSelection = {
    selectedRowKeys: props.goods.selectedRowKeys,
    onChange: onSelectChange,
  };

  // req data
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password');

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
              <Row>
                <Col
                  span={23}
                  style={{
                    marginLeft: '25px',
                    padding: '24px',
                  }}
                >
                  {/* 查询表单区域 */}
                  <Form
                    layout="inline"
                    onSubmit={ev => {
                      props.handleSubmit({
                        ev,
                        form: props.form,
                      });
                    }}
                  >
                    <Form.Item
                      validateStatus={usernameError ? 'error' : ''}
                      help={usernameError || ''}
                      label="商品名称"
                    >
                      {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="商品名称"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item
                      validateStatus={passwordError ? 'error' : ''}
                      help={passwordError || ''}
                      label="价格"
                    >
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          type="password"
                          placeholder="价格"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                      >
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>

                  {/* 商品列表区域 */}
                  <Table
                    columns={props.columns}
                    rowKey={(record, index) => {
                      console.log('--++--++--', index);
                      console.log(record);
                      return `rowKey$${record.goodsName}${index}`;
                    }}
                    dataSource={props.goods.data}
                    pagination={props.goods.pagination}
                    loading={props.goods.loading}
                    onChange={props.handleTabChange}
                    expandedRowRender={record => <p style={{ margin: 0 }}>上架时间 : 123</p>}
                    rowSelection={rowSelection}
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
const GoodsList = Form.create({})(GoodsListComponent);
export default GoodsList;
