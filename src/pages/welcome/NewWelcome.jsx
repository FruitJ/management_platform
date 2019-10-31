// 导入官方包
import React, { Component, useEffect } from 'react';
import { connect } from 'dva';

// 导入自定义包
import WelcomeRealize from '@/pages/welcome/components/WelcomeRealize';
import './static/NewWelcome.less';
import {
  WELCOME$CHANGE_STYLE_UP,
  WELCOME$CHANGE_STYLE_DOWN,
  WELCOME$TO_LOGIN,
} from './static/config';
import { push } from 'umi/src/router';

/**
 * @author 刘杰
 * @date 2019-10-22
 * @Description: 欢迎页组件 (路由组件、有状态组件)
 */

const NewWelcome = ({ dispatch, welcome }) => {
  // 定义改变欢迎页面的悬浮 logo 标的动态样式
  function handleChangeLogoStyle(action, suffix) {
    if (action === 'up') {
      dispatch({
        type: WELCOME$CHANGE_STYLE_UP,
        payload: suffix,
      });
    } else if (action === 'down') {
      dispatch({
        type: WELCOME$CHANGE_STYLE_DOWN,
        payload: suffix,
      });
    }
  }

  // 注册
  function handleRegister() {
    /*dispatch({
      type: "welcome/toRegister"
    });*/
  }

  // 登录
  function handleLogin() {
    dispatch({
      type: WELCOME$TO_LOGIN,
    });
  }

  return (
    <div className="welcome">
      <WelcomeRealize
        onChangeLogoStyle={handleChangeLogoStyle}
        welcome={welcome}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default connect(({ welcome }) => ({
  welcome,
}))(NewWelcome);
