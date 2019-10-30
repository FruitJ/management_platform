// 导入官方的包
import React, { Component } from 'react';
import { Row, Col } from 'antd';

// 导入自定义包
import './static/WelcomeNav.less';

/**
 * @author 刘杰
 * @date 2019-10-22
 * @Description: 导航组件 - 欢迎页
 */

const WelcomeNav = ({ welcome, onRegister, onLogin }) => {
  return (
    <div className="content-nav-welcome">
      <Row>
        {/* 导航栏区域 */}
        <Col span={24}>
          <Row>
            {/* 导航栏 - 左 【应用标题、contact us、Join us】 */}
            <Col span={12}>
              <Row>
                <Col span={12}>
                  <div className="nav-app-content">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjNTU2YmU0MC1kMzY1LTQ4NDUtYjZkNi1iOGVmZjFkNjM5ODIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzJGMkUyQTRCMUEzMTFFOUIxN0U5MjUyQjI5RTAxRTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzJGMkUyQTNCMUEzMTFFOUIxN0U5MjUyQjI5RTAxRTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YzU1NmJlNDAtZDM2NS00ODQ1LWI2ZDYtYjhlZmYxZDYzOTgyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmM1NTZiZTQwLWQzNjUtNDg0NS1iNmQ2LWI4ZWZmMWQ2Mzk4MiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ppng+8EAAAN0SURBVHjaxJdLSFRRGMdndMSyDLOyFpZFSmhmJr0X0VslAouUqEWPRVBEiyKIhOiBLaKEWtQiKoIKqmUrpSdhPsOsUTOjNCNS08pH+b79v/hfONzumfGOM/TBb+bOvd+c893zPc533IZhuEYpE8BasBosAjNBDJ/9BC2gBjwhXaMaVQzwwxxwAbQbo5cOcBEk+Rvf3+T5YNAYm5wMxIA4UGIETypAvN1cbpsYmA3KwHRXcOU7WAEa1JtWAySoGsFUV2ikGySCNvNGmEXhcQgnF4kGT9UbqgHHmV6qDIN2WvxDkob3v/GZyAhoVejwY0QyKLC6QPz91Ua5HPzin3rAI/AWHARN4DaYBzaAacAD3oG7vHaDfrAfLLSMPetv7WA0XtJEr5kJdeAoKKB+FcjgdSV1epXrPEu0V9iMfc1Mw0jQpzGgCRSDcJAC7nPAaH6XUq8MRIF0vkyuMrkHVNuMPQwmSgysB5Eaf0WAjfS3pFC4Es0iH/hdSFdVgzywRhNn1vjLlo9MHwEzBJ7RwBcMOJHzIBXs5O8t/D7MWEi2BLJOssSADB8Kn8Aq8AbkgHrePwJu8voQ2A5u8K3ClBUyDejXjJ8mWSDRnKBRKOdOJ8WjDzxnFmwCcZxUln4339rgc3FNlbKK+8ACuxcUAzpxMdn1f6TTzFWd1DP3h5j3D+j3GAZoNlenkW8ttaSS/9sGouiSXDDObgIPG4cYjQF3wC0QD6aAzXTLIGgGveAYI/8VA1BcMsDfYTQ0U2NArxjwmVXJTtIZiB9BLEhh59PNziiJeq1M1yKHLmjz0NKVGoVE5r4EXynLbAmf7WJbZq5kRAAx4JU/FoMDGoVa8Bos5iqlcjLJiDpG+lIu9XAABhRJqRwPBjSleCvLqUgza7wpcn85rxNAVgCd0iSx/De4rrFwr1JwJJDuMTBdXLl8pWQPOHx7Ce4us06f1iglcX+PZUpdZhpKYXkJ5lPvPd3iRE6oG8UXcMZGqYkBuIMTyr5+lqnmZQZJSu4BpxxMXsjM+qcnrGWqOZERHzuenUjBmqtrSuO4nNEhKr39dGuLbq+W3m8J+79gi7htmTq5rlloYP9WHcTJvRyzxunZsCAIp6JzYzkbutgLXgHdDiaVBvUqSPM3vtvB8VwOLOt4RJfmYoYSrD3cir08mj9UTz++5I8AAwD0Ok0PRKbEqgAAAABJRU5ErkJggg=="
                      alt="宽广"
                      title="宽广"
                      className="kg-logo"
                    />
                    <h3 className="nav-app-title">{welcome.list.app_title}</h3>
                  </div>
                </Col>
                <Col span={12}>
                  <Row className="nav-func-module">
                    <Col span={8} className="contact">
                      <span>Contact us</span>
                    </Col>
                    <Col span={8} className="join">
                      <span>Join us</span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            {/* 导航栏 - 右 【register、login】 */}
            <Col span={12}>
              <Row className="nav-account-module">
                <Col span={6}> </Col>
                <Col span={4}> </Col>
                <Col span={4}> </Col>
                <Col span={4} className="nav-btn-register">
                  <div>Register</div>
                </Col>
                <Col
                  span={4}
                  className="nav-btn-login"
                  onTouchStart={() => {
                    onLogin();
                  }}
                  onClick={() => {
                    onLogin();
                  }}
                >
                  <div>Login</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WelcomeNav;
