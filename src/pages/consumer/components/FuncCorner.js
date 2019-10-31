// 导入官方包
import React, { Component } from 'react';

// 导入自定义包
import './FuncCorner.less';

/**
 * @author 刘杰
 * @date 2019-10-29
 * @Description: Login 登录界面的【功能角】组件
 */
const FuncCorner = ({
  config,
  handleBack,
  handleSwitchSkin,
  handleForgetPassword,
  handleRegister,
}) => {
  return (
    <div
      style={{
        overflow: 'hidden',
      }}
    >
      {/* 根据传入的值判断生成的功能角的配置信息 */}
      {config === 'leftTop' ? (
        <div
          className="func-corner f-corner-leftTop"
          onClick={() => {
            handleBack();
          }}
          onTouchStart={() => {
            handleBack();
          }}
        >
          <p
            style={{
              right: '110px',
              bottom: '10px',
            }}
          >
            {' '}
          </p>
        </div>
      ) : config === 'leftBottom' ? (
        <div
          className="func-corner f-corner-leftBottom"
          onClick={() => {
            handleSwitchSkin();
          }}
          onTouchStart={handleSwitchSkin()}
        >
          <p
            style={{
              right: '110px',
              top: '25px',
            }}
          >
            {' '}
          </p>
        </div>
      ) : config === 'rightTop' ? (
        <div
          className="func-corner f-corner-rightTop"
          onClick={() => {
            handleForgetPassword();
          }}
          onTouchStart={() => {
            handleForgetPassword();
          }}
        >
          <p
            style={{
              zIndex: '2000',
              top: '105px',
              left: '25px',
              transform: 'rotate(95deg)',
            }}
          >
            {' '}
          </p>
        </div>
      ) : (
        <div
          className="func-corner f-corner-rightBottom"
          onClick={() => {
            handleRegister();
          }}
          onTouchStart={() => {
            handleRegister();
          }}
        >
          <p
            style={{
              zIndex: '2000',
              top: '105px',
              left: '25px',
              transform: 'rotate(0deg)',
            }}
          >
            {' '}
          </p>
        </div>
      )}
    </div>
  );
};
export default FuncCorner;
