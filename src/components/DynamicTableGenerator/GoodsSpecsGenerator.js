// 导入官方包
import React, { Component, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

// 导入自定义包

/**
 * 商品规格表格生成组件
 */

const DOMAIN_NAME = 'https://images.ikuanguang.com/';
const GoodsSpecsGenerator = props => {
  const submitRef = useRef();

  useEffect(() => {
    // console.log(props.addSku.goodsSpecs);
    // 导入处理组件的 js 脚本文件
    const { dynamicSpecs } = require('./utils');
    console.log('哈哈');
    console.log(props.addSku.goodsSpecs);
    console.log(dynamicSpecs(props.addSku.goodsSpecs));
    console.log('哈哈哈哈');
  }, []);

  const handleClick = () => {
    // alert("啦啦啦啦啦");
    const { change } = require('./utils');
    change(props.addSku.goodsSpecs, props.addSku.token.token, DOMAIN_NAME);

    // 获取添加商品规格 dom 节点
    console.log(submitRef);
    console.log(submitRef.current.getBoundingClientRect());
    console.log(submitRef.current.offsetTop);
    console.log('哈哈');
  };

  const handleGetGoodsSpecs = () => {
    const { getGoodsSpecsData } = require('./utils');
    console.log(getGoodsSpecsData());
  };

  return (
    <div
      style={{
        marginBottom: '50px',
        // position: "relative",
        // marginTop: "-65px"
      }}
    >
      <div className="home-container">
        <button
          className="home-addGoodsSpecs btn btn-default"
          ref={submitRef}
          onClick={handleClick}
        >
          添加商品规格
        </button>
      </div>

      <div className="home-table"></div>
      {/*<button
        className="show-specs-data btn btn-default"
        style={{
          marginTop: '20px',
        }}
        onClick = { handleGetGoodsSpecs }
      >
        获取最终的商品规格数据
      </button>*/}
    </div>
  );
};

export default GoodsSpecsGenerator;
