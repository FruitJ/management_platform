// 导入官方包
import React, { Component } from 'react';

// 导入自定义包
import FuncCorner from './FuncCorner';
import './Login.less';

const Login = ({ config }) => {
  return (
    /* 登录组件 - 主体部分 */
    <div>
      <div className="content-login">
        <FuncCorner config="leftTop" />
        <FuncCorner config="leftBottom" />
        <FuncCorner config="rightTop" />
        <FuncCorner config="rightBottom" />
      </div>
    </div>
  );
};
export default Login;
