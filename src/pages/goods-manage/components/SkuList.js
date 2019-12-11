import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const SkuList = props => {
  return (
    <div>
      <h1>Sku ({props.sku.current_spu_id}) ...</h1>
    </div>
  );
};
export default SkuList;
