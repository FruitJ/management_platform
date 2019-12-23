import React, { Component } from 'react';
import { Card, Typography, Alert, PageHeader } from 'antd';
import { connect } from 'dva';
const routes = [
  {
    path: 'index',
    breadcrumbName: '三方商户管理平台',
  },
  {
    path: 'first',
    breadcrumbName: '首页',
  },
];

class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 获取当前登录用户名称
    this.props.dispatch({
      type: 'subWelcome/_getCurrentUserName',
    });
  }

  render() {
    return (
      <>
        {/*<PageHeaderWrapper />*/}

        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          title={`尊敬的 • ${this.props.subWelcome.current_userName} • 很开心又和您见面啦😃!`}
          breadcrumb={{ routes }}
        />
      </>
    );
  }
}
export default connect(({ subWelcome }) => ({
  subWelcome,
}))(Welcome);
