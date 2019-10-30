// 导入官方的包
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

// 导入自定义的包
import Login from './components/Login';
import './static/LoginRouter.less';

/**
 * @author 刘杰
 * @date 2019-10-29
 * @Description: 登录组件 ( 路由组件、有状态组件 )
 */
class LoginRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-login">
        <Login />
      </div>
    );
  }
}
export default connect(({ consumer }) => ({
  consumer,
}))(LoginRouter);
