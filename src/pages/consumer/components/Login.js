// 导入官方包
import React, { Component } from 'react';
import { Row, Col, Form, Input, Icon, Button, Checkbox } from 'antd';

// 导入自定义包
import FuncCorner from './FuncCorner';
import './Login.less';

/*Form.create({
	mapPropsToFields: (props) => {
		return transferFormData(props.formData, (v, l) => {
			return v;
		})
	},
	onValuesChange: (props, fields) => {
		_.each(fields, (v, k) => {
			props.formData[k] = v
		})
	}
})(Login);*/

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// const Login = ({ config }) => {
class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.props.form.validateFields();
  }

  // console.log(this.props);
  render() {
    // const { config } = this.props;

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const userPwdError = isFieldTouched('userPwd') && getFieldError('userPwd');
    console.log(this.props);
    return (
      /* 登录组件 - 主体部分 */
      <div className="content-login">
        <div className="content-cover">
          {/* 四周的功能角区域 */}
          {/* region */}
          <FuncCorner config={'leftTop'} />

          <FuncCorner config={'leftBottom'} />
          <FuncCorner config={'rightTop'} />
          <FuncCorner config={'rightBottom'} />

          {/* endregion */}

          {/* 登录页面内容区域 */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {/* region */}
            {/* 登录页面宣传标语 */}
            <div
              style={{
                padding: '5px',
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                top: '25%',
                marginTop: '-37.5px',
                fontSize: '50px',
                fontFamily: '华文行楷, serif',
                fontWeight: 'bold',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <Row
                style={{
                  width: '100%',
                }}
              >
                <Col span={12} offset={6}>
                  <div>梦想从不一蹴而就</div>
                </Col>
              </Row>
            </div>
            {/* endregion */}

            {/* 登录页面表单区域 */}
            <div
              style={{
                position: 'absolute',
                top: '45%',
                width: '100%',
                height: '120px',
                textAlign: 'center',
              }}
            >
              <Row
                style={{
                  height: '100%',
                }}
              >
                <Col
                  span={12}
                  offset={6}
                  style={{
                    // width: "100%",
                    height: '100%',
                    // backgroundColor: "rgba(255, 255, 255, 0.3)",
                    // borderRadius: "10px",
                    // boxShadow: "0 0 5px rgba(0, 0, 255, 0.3)"
                  }}
                >
                  <p
                    style={{
                      marginTop: '15px',
                      textAlign: 'center',
                      color: 'rgba(255, 255, 255, .9)',
                      textShadow: '0 0 1px rgba(0, 0, 0, .7)',
                    }}
                  >
                    登录 • 三方商户管理平台
                  </p>

                  <Form layout="inline">
                    <Form.Item
                      validateStatus={userNameError ? 'error' : ''}
                      help={userNameError || ''}
                    >
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your userName' }],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                          placeholder="用户名"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item
                      validateStatus={userPwdError ? 'error' : ''}
                      help={userPwdError || ''}
                    >
                      {getFieldDecorator('userPwd', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your password',
                          },
                        ],
                      })(
                        <Input
                          type="password"
                          placeholder="密码"
                          prefix={
                            <Icon
                              type="lock"
                              style={{
                                color: 'rgba( 0, 0, 0, .25)',
                              }}
                            />
                          }
                        />,
                      )}
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                      >
                        login
                      </Button>
                    </Form.Item>

                    <Row>
                      <Col span={14} offset={5}>
                        <div
                          style={{
                            position: 'relative',
                          }}
                        >
                          <Checkbox
                            style={{
                              position: 'absolute',
                              left: '0',
                              marginTop: '25px',
                              color: 'rgba(255, 255, 255, .9)',
                              textShadow: '0 0 1px rgba(0, 0, 0, .7)',
                            }}
                            checked={true}
                          >
                            接受宽广控股集团关于 - 三方商户管理平台的管理约定
                          </Checkbox>

                          <Checkbox
                            style={{
                              position: 'absolute',
                              left: '0',
                              marginTop: '70px',
                              marginLeft: '0px',
                              color: 'rgba(255, 255, 255, .9)',
                              textShadow: '0 0 1px rgba(0, 0, 0, .7)',
                            }}
                          >
                            自动登录
                          </Checkbox>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const Login = Form.create({})(LoginComponent);
export default Login;
