// 导入官方包
import React, { Component } from 'react';

// 导入自定义包
import './static/WelcomeFooter.less';

/**
 * @author 刘杰
 * @date 2019-10-22
 * @Description: 欢迎页页脚组件
 */
const WelcomeFooter = () => {
	
	return (
		<div className = "content-footer-welcome">
			<div className = "footer-left-arrow"> </div>
			<div className = "footer-right-arrow"> </div>
			<div className = "footer-left-cover"> </div>
			<div className = "copyright">Copyright © 2019 河北宽广控股集团 - 信息管理中心</div>
		</div>
	);
};
export default WelcomeFooter;