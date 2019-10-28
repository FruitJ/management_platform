// 导入官方包
import React, {Component, useEffect} from 'react';
import { connect } from "dva";

// 导入自定义包
import WelcomeRealize from "@/pages/welcome/components/WelcomeRealize";
import './static/NewWelcome.less';

/**
 * @author 刘杰
 * @date 2019-10-22
 * @Description: 欢迎页组件 (路由组件、有状态组件)
 */

const NewWelcome = ({ dispatch, welcome}) => {
  
  // 定义改变欢迎页面的悬浮 logo 标的动态样式
  function handleChangeLogoStyle(action, suffix) {
    if(action === 'up') {
      dispatch({
        type: "welcome/changeStyleUp",
        payload: suffix
      });
    }else if(action === 'down') {
      dispatch({
        type: "welcome/changeStyleDown",
        payload: suffix
      });
    }
  }
  
  
  
  return (
      <div className = "welcome">
        <WelcomeRealize onChangeLogoStyle = { handleChangeLogoStyle }
                        welcome = { welcome }
        />
      </div>
  );
};
export default connect(({welcome}) => ({
  welcome,
}))(NewWelcome);
