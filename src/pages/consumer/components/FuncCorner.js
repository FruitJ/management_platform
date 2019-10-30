// 导入官方包
import React, { Component } from 'react';

// 导入自定义包
import './FuncCorner.less';

const CornerStyle = {
  leftTop: {
    top: '0',
    transform: 'rotate(-45deg) translate(0px, -205px)',
    backgroundColor: '#000',
  },
};

/**
 * @author 刘杰
 * @date 2019-10-29
 * @Description: Login 登录界面的【功能角】组件
 */
const FuncCorner = ({ config }) => {
  let styleObj = config === 'leftTop' ? CornerStyle.leftTop : null;

  console.log(styleObj);
  return (
    <div>
      {config === 'leftTop' ? (
        <div
          className="func-corner"
          style={{
            top: '0',
            transform: 'rotate(-45deg) translate(0px, -205px)',
          }}
        >
          <p>back</p>
        </div>
      ) : config === 'leftBottom' ? (
        <div
          className="func-corner"
          style={{
            bottom: '0',
            transform: 'rotate(45deg) translate(0px, 205px)',
          }}
        >
          <p>back</p>
        </div>
      ) : config === 'rightTop' ? (
        <div
          className="func-corner"
          style={{
            top: '0',
            right: '0',
            transform: 'rotate(-45deg) translate(205px, 0px)',
          }}
        >
          <p>back</p>
        </div>
      ) : (
        <div
          className="func-corner"
          style={{
            bottom: '0',
            right: '0',
            transform: 'rotate(45deg) translate(205px, 0px)',
          }}
        >
          <p>back</p>
        </div>
      )}
    </div>
  );
};
export default FuncCorner;
