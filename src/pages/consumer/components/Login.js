// 导入官方包
import React, { Component } from 'react';
import { Row, Col, Form, Input, Icon, Button, Checkbox, Tooltip, Modal, message } from 'antd';

// 导入自定义包
import FuncCorner from './FuncCorner';
import './Login.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

// 登录组件
/**
 * @author 刘杰
 * @date 2019-10-31
 * @Description: LoginRouter.jsx 的子组件 ( 登录页面 )
 */
class LoginComponent extends Component {
  // 初始化参数
  constructor(props) {
    super(props);
    // 这里的 validateFields 是校验指定的输入域的值并且收集其 error 。但是如果没有指定输入域，则默认目标对象为全部表单组件
    this.props.form.validateFields();
  }

  // 登录的回调函数
  handleSubmit = ev => {
    ev.preventDefault(); // 阻止表单默认提交的行为

    const { consumerLogin } = this.props;

    this.props.form.validateFields((err, values) => {
      // values.isAutoLogin = consumerLogin.isAutoLogin; // 是否自动登录
      
      if (!err) {
        if (consumerLogin.isAgreeKGAgreement) {
          this.props.handleSubmit(values);
        } else {
          message.warning('请同意宽广集团关于三方商户管理平台的若干规定!');
        }
      }
    });
  };

  render() {
    // 获取 antd 中 form 中的属性用来校验表单和收集错误
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // 取出父组件 【LoginRouter.jsx】 传递过来的参数
    const {
      consumerLogin, // 登录组件的状态对象
      handleSwitchWay, // 切换登录方式的回调函数的引用
      handleAgreement, // 选择是否同意 KG 对协议的要求
      handleAgreementOK, // 同意宽广规定
      handleModelState, // model: ok
      handleBack, // 回退到上一界面 - 功能角
      handleSwitchSkin, // 切换皮肤 - 功能角
      handleForgetPassword, // 忘记密码 - 功能角
      handleRegister, // 注册 - 功能角
      handleAutoLogin, // 选择是否同意自动登录
    } = this.props;

    // 这里的 isFieldTouched 与 getFieldError 分别代表 "这个表单被收集过值吗"、"收集指定表单域的异常"
    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const userPwdError = isFieldTouched('userPwd') && getFieldError('userPwd');
    const userPhoneError = isFieldTouched('userPhone') && getFieldError('userPhone');
    const userCaptchaError = isFieldTouched('userCaptcha') && getFieldError('userCaptcha');

    return (
      /* 登录组件 - 主体部分 */
      <div className="content-login">
        <div className="content-cover">
          {/* 功能角 */}
          <FuncCorner config={'leftTop'} handleBack={handleBack} />
          <FuncCorner config={'leftBottom'} handleSwitchSkin={handleSwitchSkin} />
          <FuncCorner config={'rightTop'} handleForgetPassword={handleForgetPassword} />
          <FuncCorner config={'rightBottom'} handleRegister={handleRegister} />

          {/* 登录页面内容区域 */}
          <div>
            {/* 登录页面宣传标语 */}
            <div className="propaganda-slogan">
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

            {/* 登录页面表单区域 */}
            <div className="form-login">
              <Row
                style={{
                  height: '100%',
                }}
              >
                <Col
                  span={12}
                  offset={6}
                  style={{
                    height: '100%',
                  }}
                >
                  {/* 表单标题 */}
                  <p className="form-title-login">登录 • 三方商户管理平台</p>

                  <Form layout="inline" onSubmit={this.handleSubmit}>
                    {/* 根据用户的操作生成对应的登录策略 */
                    !consumerLogin.isSwitchLoginWay ? (
                      /* 用户名和密码的登录方式 */
                      <>
                        {/* 表单 - 用户名 */}
                        <Form.Item
                          validateStatus={userNameError ? 'error' : ''}
                          help={userNameError || ''}
                        >
                          {getFieldDecorator('userName', {
                            rules: [
                              {
                                required: true,
                                message: '请输入 2 ~ 6 个中文字符',
                                pattern: /^[\u4e00-\u9fa5]{2,8}$/,
                              },
                            ],
                          })(
                            <Input
                              prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                              placeholder="用户名"
                              maxLength={8}
                              required
                            />,
                          )}
                        </Form.Item>

                        {/* 表单 - 密码 */}
                        <Form.Item
                          validateStatus={userPwdError ? 'error' : ''}
                          help={userPwdError || ''}
                        >
                          {getFieldDecorator('userPwd', {
                            rules: [
                              {
                                required: true,
                                message: 'Please input your password',
                                pattern: /^[0-9a-zA-Z_]{6}$/,
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
                              maxLength={6}
                              required
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
                      </>
                    ) : (
                      /* 手机验证码的登录方式 */
                      <>
                        {/* 表单 - 手机号 */}
                        <Form.Item
                          validateStatus={userPhoneError ? 'error' : ''}
                          help={userPhoneError || ''}
                        >
                          {getFieldDecorator('userPhone', {
                            rules: [
                              {
                                required: true,
                                message: '请输入 11 位数字手机号',
                                validator(rule, value, callback) {
                                  return /^1[3456789]\d{9}$/.test(value);
                                },
                              },
                            ],
                          })(
                            <Input
                              prefix={<Icon type="phone" style={{ color: 'rgba(0, 0, 0, .25)' }} />}
                              placeholder="手机号"
                              maxLength={11}
                              required
                            />,
                          )}
                        </Form.Item>

                        {/* 表单 - 验证码 */}
                        <Form.Item
                          validateStatus={userCaptchaError ? 'error' : ''}
                          help={userCaptchaError || ''}
                        >
                          {getFieldDecorator('userCaptcha', {
                            rules: [
                              {
                                required: false,
                                message: '请输入 4 位数字验证码',
                                pattern: /^\d{4}$/,
                              },
                            ],
                          })(
                            <div>
                              <Input
                                placeholder="验证码"
                                style={{
                                  width: '60%',
                                }}
                                prefix={
                                  <Icon
                                    type="code"
                                    style={{
                                      color: 'rgba( 0, 0, 0, .25)',
                                    }}
                                  />
                                }
                                maxLength={4}
                                required
                              />
                              <Button
                                style={{
                                  marginLeft: '2.5%',
                                }}
                              >
                                验证码
                              </Button>
                            </div>,
                          )}
                        </Form.Item>

                        {/* 登录按钮 */}
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                          >
                            login
                          </Button>
                        </Form.Item>
                      </>
                    )}

                    <Row>
                      <Col span={14} offset={5}>
                        <div
                          style={{
                            position: 'relative',
                          }}
                        >
                          {/* 用户选择是否同意 KG 协议 -> (同意 - 默认) */}
                          <Checkbox
                            style={{
                              marginTop: '25px',
                            }}
                            className="check-func-login"
                            defaultChecked={consumerLogin.isAgreeKGAgreement}
                            onChange={ev => {
                              handleAgreement(ev.target.checked);
                            }}
                          >
                            我同意此 "
                            {
                              /* "宽广规定" 的提示组件 */
                              <Tooltip title=" 宽广集团关于三方商户管理平台的若干规定 ">
                                <span
                                  style={{
                                    color: 'rgba(24, 144, 255,1)',
                                    textShadow: '0 0 0 rgba(0, 0, 0, 0)',
                                  }}
                                  onClick={() => {
                                    handleAgreementOK();
                                  }}
                                >
                                  规定
                                </span>
                              </Tooltip>
                            }
                            " !{/* "宽广规定" 的内容,模态框的形式弹出 */}
                            <Modal
                              title="宽广集团关于三方商户管理平台的若干规定 : "
                              visible={consumerLogin.isShowModel}
                              centered={true}
                              keyboard={true}
                              onOk={() => handleModelState(true)}
                              onCancel={() => handleModelState(false)}
                            >
                              <div
                                style={{
                                  width: '100%',
                                  height: '400px',
                                  overflow: 'scroll',
                                  overflowX: 'hidden',
                                }}
                              >
                                <p
                                  style={{
                                    height: '200px',
                                  }}
                                >
                                  规定一 :
                                </p>
                                <p
                                  style={{
                                    height: '200px',
                                  }}
                                >
                                  规定二 :
                                </p>
                                <p
                                  style={{
                                    height: '200px',
                                  }}
                                >
                                  规定三 :
                                </p>
                              </div>
                            </Modal>
                          </Checkbox>

                          {/* 用户选择下次是否自动登录 */}
                          <Checkbox
                            style={{
                              marginTop: '70px',
                            }}
                            className="check-func-login"
                            onChange={ev => {
                              handleAutoLogin(ev.target.checked);
                            }}
                          >
                            自动登录
                          </Checkbox>

                          {/* 用户选择切换登录方式 */}
                          <Checkbox
                            style={{
                              marginTop: '115px',
                            }}
                            className="check-func-login"
                            onChange={ev => {
                              handleSwitchWay(ev.target.checked);
                            }}
                          >
                            切换登录方式
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
        <Row
          style={{
            width: '100%',
          }}
        >
          <Col span={12} offset={6}>
            <div className="copyright-login">Copyright © 2019 河北宽广控股集团 - 信息管理中心</div>
          </Col>
        </Row>
      </div>
    );
  }
}
const Login = Form.create({})(LoginComponent);
export default Login;
