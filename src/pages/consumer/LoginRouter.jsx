// 导入官方的包
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

// 导入自定义的包
import Login from './components/Login';
import './static/LoginRouter.less';
import {
  CONSUMER_LOGIN$_LOGIN_SWITCH_LOGIN_WAY,
  CONSUMER_LOGIN$_LOGIN_IS_AGREE_KG_AGREEMENT,
  CONSUMER_LOGIN$_SHOW_MODEL,
  CONSUMER_LOGIN$_MODEL_STATE,
  CONSUMER_LOGIN$BACK,
  CONSUMER_LOGIN$TO_FORGET_PASSWORD_PAGE,
  CONSUMER_LOGIN$TO_REGISTER,
  CONSUMER_LOGIN$LOGIN,
  CONSUMER_LOGIN$_AUTO_LOGIN,
} from './static/config';

/**
 * @author 刘杰
 * @date 2019-10-29
 * @Description: 登录组件 ( 路由组件、有状态组件 )
 */
const LoginRouter = ({ dispatch, consumerLogin }) => {
  // 切换登录方式的回调函数
  function handleSwitchWay(val) {
    dispatch({
      type: CONSUMER_LOGIN$_LOGIN_SWITCH_LOGIN_WAY,
      payload: {
        val,
      },
    });
  }

  // 用户是否同意 "宽广集团关于三方商户管理平台若干规定" 的回调函数
  function handleAgreement(val) {
    dispatch({
      type: CONSUMER_LOGIN$_LOGIN_IS_AGREE_KG_AGREEMENT,
      payload: {
        val: val,
      },
    });
  }

  function handleAgreementOK() {
    dispatch({
      type: CONSUMER_LOGIN$_SHOW_MODEL,
    });
  }

  // 消除 "规定" 内容 + 更改关于 "规定" 的多选框的状态的回调函数
  function handleModelState(val) {
    dispatch({
      type: CONSUMER_LOGIN$_MODEL_STATE,
      payload: {
        val: val,
      },
    });
  }

  function handleAutoLogin(val) {
    dispatch({
      type: CONSUMER_LOGIN$_AUTO_LOGIN,
      payload: {
        val: val,
      },
    });
  }

  // 回退上一页的回调函数
  function handleBack() {
    dispatch({
      type: CONSUMER_LOGIN$BACK,
    });
  }

  // 切换皮肤的回调函数
  function handleSwitchSkin() {
    // ...
  }

  // 忘记密码的回掉函数
  function handleForgetPassword() {
    dispatch({
      type: CONSUMER_LOGIN$TO_FORGET_PASSWORD_PAGE,
    });
  }

  // 注册功能的回调函数
  function handleRegister() {
    dispatch({
      type: CONSUMER_LOGIN$TO_REGISTER,
    });
  }

  // 登录功能的回调函数
  function handleSubmit(data) {
    // data.type = 'account';
    dispatch({
      type: CONSUMER_LOGIN$LOGIN,
      payload: data,
    });
  }

  return (
    <div className="container-login">
      <Login
        consumerLogin={consumerLogin}
        handleSwitchWay={handleSwitchWay}
        handleAgreement={handleAgreement}
        handleAgreementOK={handleAgreementOK}
        handleModelState={handleModelState}
        handleBack={handleBack}
        handleSwitchSkin={handleSwitchSkin}
        handleForgetPassword={handleForgetPassword}
        handleRegister={handleRegister}
        handleSubmit={handleSubmit}
        handleAutoLogin={handleAutoLogin}
      />
    </div>
  );
};

export default connect(({ consumerLogin }) => ({
  consumerLogin,
}))(LoginRouter);
