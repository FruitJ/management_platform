// 导入官方包
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import WelcomeNav from '@/components/Navigation/WelcomeNav';
import WelcomeFooter from '@/components/PageFooter/WelcomeFooter';
import WelcomeContent from '@/pages/welcome/components/WelcomeContent';

// 导入自定义包
import './WelcomeRealize.less';

/**
 * @author 刘杰
 * @date 2019-10-22
 * @Description: NewWelcome 的子组件 (欢迎页面)
 */
const WelcomeRealize = ({ onChangeLogoStyle, welcome, onRegister, onLogin }) => {
  return (
    <div className="container">
      <div className="substance">
        {/* 导航区域 */}
        <WelcomeNav welcome={welcome} onRegister={onRegister} onLogin={onLogin} />
        {/* 内容区域 */}
        <WelcomeContent onChangeLogoStyle={onChangeLogoStyle} welcome={welcome} />
        {/* 页脚区域 */}
        <WelcomeFooter welcome={welcome} />
      </div>
    </div>
  );
};
export default WelcomeRealize;
