// 导入官方包
import React, { Component } from 'react';
import { Row, Col } from 'antd';

// 导入自定义包
import './WelcomeContent.less';

/**
 * @author 刘杰
 * @date 2019-10-31
 * @Description: 内容组件 - 欢迎页
 */
const WelcomeContent = ({ onChangeLogoStyle, welcome }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // backgroundColor: "red"
      }}
    >
      <div>
        <Row>
          <Col span={8}> </Col>
          {/* 欢迎页面 - 宣传标语 */}
          <Col
            span={8}
            style={{
              textAlign: 'center',
            }}
          >
            <div className="content-show-welcome"> {welcome.list.app_content_title} </div>
          </Col>
          <Col span={8}> </Col>
        </Row>
        <Row>
          <Col span={8}> </Col>
          <Col
            span={8}
            style={{
              textAlign: 'center',
            }}
          >
            {/* 欢迎页面四个功能图标 */}
            <div className="content-func-welcome">
              <Row>
                <Col
                  span={4}
                  onMouseEnter={() => onChangeLogoStyle('up', 'ctlGoods')}
                  onMouseLeave={() => onChangeLogoStyle('down', 'ctlGoods')}
                  className={welcome.moveLogoCtlGoods}
                >
                  <div className="control-goods">
                    <i> </i>
                    <span>{welcome.list.ctlGoods}</span>
                  </div>
                </Col>
                <Col
                  span={4}
                  onMouseEnter={() => onChangeLogoStyle('up', 'cptAppoah')}
                  onMouseLeave={() => onChangeLogoStyle('down', 'cptAppoah')}
                  className={welcome.moveLogoCptAppoah}
                >
                  <div className="corporation-approach">
                    <i> </i>
                    <span>{welcome.list.cptAppoah}</span>
                  </div>
                </Col>
                <Col
                  span={4}
                  onMouseEnter={() => onChangeLogoStyle('up', 'absSafe')}
                  onMouseLeave={() => onChangeLogoStyle('down', 'absSafe')}
                  className={welcome.moveLogoAbsSafe}
                >
                  <div className="absolute-safety">
                    <i> </i>
                    <span>{welcome.list.absSafe}</span>
                  </div>
                </Col>
                <Col
                  span={4}
                  onMouseEnter={() => onChangeLogoStyle('up', 'cldService')}
                  onMouseLeave={() => onChangeLogoStyle('down', 'cldService')}
                  className={welcome.moveLogoCldService}
                >
                  <div className="cloud-services">
                    <i> </i>
                    <span>{welcome.list.cldService}</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}> </Col>
        </Row>
      </div>
    </div>
  );
};
export default WelcomeContent;
