// 导入官方包
import React, { Component } from 'react';

// 导入自定义包
import './static/WelcomeFooter.less';

/**
 * @author 刘杰
 * @date 2019-10-22
 * @Description: 页脚组件 - 欢迎页
 */
const WelcomeFooter = ({ welcome }) => {
  return (
    <div className="content-footer-welcome">
      {/* 底部箭头模型 - 左 */}
      <div className="footer-left-arrow"> </div>
      {/* 底部箭头模型 - 右 */}
      <div className="footer-right-arrow"> </div>
      {/* 底部箭头模型 - 左 ( 覆盖 ) */}
      <div className="footer-left-cover"> </div>
      {/* 版权信息 */}
      <div className="copyright"> {welcome.list.app_copyright} </div>
    </div>
  );
};
export default WelcomeFooter;
