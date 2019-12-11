// 导入官方包
import React, { Component, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

// 导入自定义包

/**
 * 商品规格表格生成组件
 */

const GoodsSpecsGenerator = () => {
  useEffect(() => {
    // 导入处理组件的 js 脚本文件
    require('./utils');
  }, []);

  return (
    <div>
      <div className="home-container">
        <button className="home-addGoodsSpecs btn btn-default">添加商品规格</button>
      </div>

      <div className="home-table"></div>
      <button
        className="show-specs-data btn btn-default"
        style={{
          marginTop: '20px',
        }}
      >
        获取最终的商品规格数据
      </button>
    </div>
  );
};

export default GoodsSpecsGenerator;
