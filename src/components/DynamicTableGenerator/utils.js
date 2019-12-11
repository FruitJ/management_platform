const Mock = require('mockjs');
import axios from 'axios';
import './utils.less';
import 'bootstrap/dist/css/bootstrap.css';
// alert(0);
// 当前页面资源加载完毕后执行此脚本
// window.onload = function() {

// 获取目标元素 ( 添加商品规格按钮、根容器 )
let dom$btn_addGoodsSpecs = document.querySelectorAll('.home-addGoodsSpecs')[0];
let dom$div_homeContainer = document.querySelectorAll('.home-container')[0];

// 拦截 ajax 请求
Mock.mock(/\.json/, 'post', options => {
  // 定义模拟数据
  let data$arr_goodsSpecs = {
    specs_init: '请选择商品规格',
    specs_color: '颜色',
    specs_size: '尺寸',
    specs_edition: '版本',
  };
  // 返回模拟数据
  return data$arr_goodsSpecs;
});

// 初始化存储上一个 selector 父节点的 id
let prevSelectorId = '';
// 定义计数器 ()
let count = 0;
// 定义计数器 ( 记录创建商品规格按钮的点击次数 )
let maxSpecsNum = 0;
// 定义收集规格信息的数据集合数组
let temp = [];
// 存储删除商品规格的数量
let temp_num = 0;
// 定义所能创建的最大规格数量
const MAX_SPECS_NUM = 3;

let globalTag = false;

// 为添加商品规格的按钮绑定点击事件
dom$btn_addGoodsSpecs.addEventListener(
  'click',
  function() {
    // 生成存储当前信息数据的临时对象
    let obj = {
      key: '',
      val: '',
      specsData: [],
    };
    if (maxSpecsNum < MAX_SPECS_NUM) {
      // 当当前创建的商品规格小于创建的最大规格数
      // 为每个生成的 top_container 创建外层包装 outerPackage。
      let virtualDom$div_outerPackage = domGenerator('div');
      // 为当前的 outerPackage 添加 id
      count = count >= MAX_SPECS_NUM ? 0 : count;
      virtualDom$div_outerPackage.id = `outerPackage${count}`;
      virtualDom$div_outerPackage.className = `outerPackage`;
      // 生成包裹规格节点的 ( 顶级容器 ) top_container
      let virtualDom$div_topContainer = domGenerator('div');
      // 为 top_container 添加 id
      count = count >= MAX_SPECS_NUM ? 0 : count;
      virtualDom$div_topContainer.id = `select${count}`;
      // top_container 添加 class
      virtualDom$div_topContainer.className = 'top-container';
      // 生成 select 商品规格选择节点
      let virtualDom$select_specs = domGenerator('select');
      // 异步请求数据
      axios
        .post('../static/resource/data.json')
        .then(res => {
          // 解构刚刚获取的商品规格的数据
          let { data } = res;
          // 获取商品规格的 keys 集合
          let keys = Object.keys(data);
          // 获取商品规格的 values 集合
          let values = Object.values(data);
          // 迭代生成 select 中的表单项
          for (let i = 0; i < keys.length; i++) {
            // 生成 option 虚拟 dom 元素
            let virtualDom$option_specs = domGenerator('option');
            // 添加 dom 值
            virtualDom$option_specs.innerText = values[i];
            // 添加 data 值
            virtualDom$option_specs.value = values[i];
            // 为刚刚生成的虚拟 dom 元素( option )添加 class
            virtualDom$option_specs.className = keys[i];
            // 将生成的 option 插入 select 中
            virtualDom$select_specs.appendChild(virtualDom$option_specs);
          }
          // 将虚拟 dom 元素( select )插入虚拟 dom 元素( top_container ) 中
          let dom$select_specs = virtualDom$div_topContainer.appendChild(virtualDom$select_specs);

          // 为选择具体的商品规格 selector 绑定 onChange 事件
          dom$select_specs.addEventListener(
            'change',
            function() {
              // 获取当前添加规格的按钮
              if (this.value !== '请选择商品规格') {
                // 获取添加商品规格值的按钮
                let dom$add_goodsSpecsBtn = this.parentNode.querySelectorAll(
                  '.add-goodsSpecs-val',
                )[0];
                // 初始状态将其置为不可操作状态
                dom$add_goodsSpecsBtn.disabled = false;
                // 检测是否已经添加过相同规格的数据
                let tag = temp.some((item, index) => item.key === keys[values.indexOf(this.value)]);

                if (tag) {
                  // 添加过相同规格
                  console.warn('对不起已添加过该规格不允许重复添加!');
                } else {
                  // 未添加过相同规格

                  // 清空上一个规格添加的规格值
                  obj.specsData = [];
                  // 添加商品规格的 key
                  obj.key = keys[values.indexOf(this.value)];
                  // 添加商品规格的值
                  obj.val = this.value;
                  // 检测当前进行规格选择的操作项是否为同一操作项
                  if (prevSelectorId === this.parentNode.parentNode.id) {
                    // 同一操作项

                    if (temp.length === 0) {
                      // temp 中是空的则为第一次添加
                      temp.push(obj);
                    } else {
                      // temp 中已经有元素(说明用户当前是在同一个操作项上来回选择不能添加)替换掉原来的元素
                      if (!globalTag) {
                        temp.pop();
                      } else {
                        temp_num = 0;
                      }
                      temp.push(obj);
                    }
                  } else {
                    // 不同操作项
                    temp.push(obj);
                    // 存储当前操作项的 id
                    prevSelectorId = this.parentNode.parentNode.id;
                  }
                }
              } else {
                // 获取添加商品规格值的按钮
                let dom$add_goodsSpecsBtn = this.parentNode.querySelectorAll(
                  '.add-goodsSpecs-val',
                )[0];
                // 将按钮的状态置可用
                dom$add_goodsSpecsBtn.disabled = true;
              }
            },
            false,
          );

          // 将虚拟 dom 元素( top_container ) 插入虚拟 dom 元素 ( outerPackage ) 中
          virtualDom$div_outerPackage.appendChild(virtualDom$div_topContainer);
          // 将虚拟 dom 元素( outerPackage ) 插入 home-container 根容器中
          let dom$div_outerPackage = dom$div_homeContainer.insertBefore(
            virtualDom$div_outerPackage,
            dom$btn_addGoodsSpecs,
          );
          // 添加删除外层包装 outerPackage 的按钮 btn_rmOuterPackage
          // let virtualDom$btn_rmOuterPackage = domGenerator("button");
          // 取出 div_topContainer 的 id 中的索引
          let reg = /\d/;
          let str = virtualDom$div_topContainer.id;
          let index = str.substring(reg.exec(str).index, str.length);

          // 获取 top-container 顶级容器节点
          let dom$div_topContainer = document.querySelector(`#${virtualDom$div_topContainer.id}`);

          // 重置样式
          dom$btn_addGoodsSpecs.style.cssText = `
						position: relative;
						left: ${0}px;
					`;

          // 为移除 outerPackage 外层包装节点的按钮绑定点击事件
          // 插入 br 节点
          dom$div_topContainer.appendChild(domGenerator('br'));

          // 生成添加商品规格值的按钮 btn_addGoodsSpecsVal
          let dom$btn_addGoodsSpecsVal = domGenerator('button');

          // 添加 dom 值
          dom$btn_addGoodsSpecsVal.innerText = '添加商品规格值';

          // 获取父节点
          dom$btn_addGoodsSpecsVal.className = 'add-goodsSpecs-val';
          // 将添加规格值的按钮的状态置为可用
          dom$btn_addGoodsSpecsVal.disabled = true;
          // 将添加商品规格值的按钮 btn_addGoodsSpecsVal 插入 top-container 中
          dom$div_topContainer.appendChild(dom$btn_addGoodsSpecsVal);

          // 定义计数器
          let add_count = 0;
          // 删除商品规格值的数量
          let rm_count = 0;
          // 为添加商品规格值的按钮 ( btn_addGoodsSpecsVal ) 绑定点击事件
          dom$btn_addGoodsSpecsVal.addEventListener(
            'click',
            function() {
              // 将车当前操作项中有误可用的 input 表单，如果有则代表当前的商品规格值未被添加
              if (this.parentNode.querySelectorAll('input')[0] === undefined) {
                // 生成添加商品规格值的 input 输入框 input_addGoodsSpecsVal
                let dom$input_addGoodsSpecsVal = domGenerator('input');
                // 设置 input_addGoodsSpecsVal 类型为 text
                dom$input_addGoodsSpecsVal.type = 'text';
                // 为 input_addGoodsSpecsVal 添加 class
                dom$input_addGoodsSpecsVal.className = `input${add_count}`;
                // 在当前节点 (btn_addGoodsSpecsVal) 之前插入 input_addGoodsSpecsVal
                dom$div_topContainer.insertBefore(dom$input_addGoodsSpecsVal, this);
                // 生成添加 input_addGoodsSpecsVal 内容值的按钮 btn_func
                let virtualDom$btn_func = domGenerator('button');
                // 为 btn_func 添加 dom 值
                virtualDom$btn_func.innerText = '添加';
                // 在当前节点 (btn_addGoodsSpecsVal) 之前插入 input_addGoodsSpecsVal 节点
                dom$div_topContainer.insertBefore(dom$input_addGoodsSpecsVal, this);
                // 在当前节点 (btn_addGoodsSpecsVal) 之前插入 btn_func 节点
                let dom$btn_func = dom$div_topContainer.insertBefore(virtualDom$btn_func, this);
                // 生成 br 节点
                let virtualDom$br = domGenerator('br');
                // 为当前生成的 br 节点添加 class
                virtualDom$br.className = `br${add_count}`;
                // 在当前节点 (btn_addGoodsSpecsVal) 之前插入 br 节点
                dom$div_topContainer.insertBefore(virtualDom$br, this);

                // 定义功能切换标志
                let tag = false;

                // 为添加 input_addGoodsSpecsVal 内容值的 btn 绑定点击事件
                dom$btn_func.addEventListener(
                  'click',
                  function() {
                    // 生成选中的内容标签 div_specsTag 节点
                    let virtualDom$div_specsTag = domGenerator('div');
                    // 添加 dom 值
                    virtualDom$div_specsTag.innerText = dom$input_addGoodsSpecsVal.value;

                    // 取出 input_addGoodsSpecsVal 中的索引
                    let reg = /\d/;
                    let str = dom$input_addGoodsSpecsVal.className;
                    let index = str.substring(reg.exec(str).index, str.length);
                    // 为 div_specsTag 节点添加 class
                    virtualDom$div_specsTag.className = `specsTag${index}`;
                    virtualDom$btn_func.className = `btn_func${index}`;
                    // 取出添加和删除商品规格值按钮的父节点的 id 中的索引
                    const { id } = this.parentNode;
                    let temp_index = id.substring(/\d/.exec(id).index, id.length);
                    if (!tag) {
                      // 添加
                      tag = true; // 重置标识
                      dom$btn_func.innerText = '移除'; // 重置状态
                      // 将 input_addGoodsSpecsVal 节点替换成 div_specsTag 节点
                      dom$div_topContainer.replaceChild(
                        virtualDom$div_specsTag,
                        dom$input_addGoodsSpecsVal,
                      );
                      // 检测当前添加的数据的索引

                      temp_num = temp_num >= MAX_SPECS_NUM ? 0 : temp_num;

                      console.warn(temp_index, temp_num);
                      if (temp_num !== 0) {
                        temp_index = temp_index - temp_num >= 0 ? temp_index - temp_num : 0;
                      }
                      // 向对应的商品规格中添加商品规格值数据
                      temp[temp_index].specsData.push(dom$input_addGoodsSpecsVal.value);
                      // 执行 table 生成策略

                      domTableGenerator(temp);
                    } else {
                      // 删除
                      tag = false; // 重置标识

                      // 同步表格状态

                      // region
                      let dom$select_goodsSpecs = this.parentNode.firstElementChild;

                      const { value: select_val } = dom$select_goodsSpecs;
                      // 获取当前的 div_specsTag 节点
                      let dom$div_specsTag = dom$div_topContainer.querySelectorAll(
                        `.${virtualDom$div_specsTag.className}`,
                      )[0];

                      // 获取表头
                      let dom$tr_tabHeader = document.querySelector('#generateHeaderTr');
                      let dom$table_goodsSpecs = document.querySelector('#table-goodsSpecs');

                      let dom$tr_headerFirst = dom$tr_tabHeader.firstElementChild;
                      let dom$tr_headerSecond =
                        dom$tr_tabHeader.firstElementChild.nextElementSibling;

                      const { innerHTML: headerTrVal } = dom$tr_headerFirst;
                      const { innerHTML: secondHeaderTrVal } = dom$tr_headerSecond;

                      if (select_val === headerTrVal) {
                        // 首列
                        // 获取目标元素
                        let dom$firstPropertyTds = document.querySelectorAll('.firstPropertyTd');

                        for (let i = 0; i < dom$firstPropertyTds.length; i++) {
                          if (dom$firstPropertyTds[i].innerHTML === dom$div_specsTag.innerHTML) {
                            let index = Number(
                              /\d+/.exec(dom$firstPropertyTds[i].className.split(' ')[1])[0],
                            );
                            // 1. 删除之前确定是否有其他的兄弟元素 。有 : 则直接删掉当前大规格中的所有的内容 。
                            //                                  没有 : 则判断是否还有其它规格 。
                            // 2. 没有 : 则直接删掉当前大规格下的所有内容 。
                            // 3.   有 : 则判断剩余规格的内容是否为空 。是 : 直接删除当前大规格下的所有内容
                            //                                       否 : 不删除元素将内容置空

                            let trs = document.querySelectorAll('tr');
                            trs = Array.from(trs);
                            trs.shift();

                            if (dom$firstPropertyTds.length > 1) {
                              // 非单一元素
                              // 直接删掉当前大规格中的所有的内容
                              for (let j = 0; j < dom$firstPropertyTds[i].rowSpan - 1; j++) {
                                dom$table_goodsSpecs.removeChild(
                                  dom$firstPropertyTds[i].parentNode.nextElementSibling,
                                );
                              }
                              dom$table_goodsSpecs.removeChild(dom$firstPropertyTds[i].parentNode);
                            } else {
                              // 单一元素
                              let dom$td_secondSpecs = dom$firstPropertyTds[i].nextElementSibling;
                              try {
                                let dom$td_thirdSpecs = dom$td_secondSpecs.nextElementSibling;
                                // 判断是否还有其它规格
                                try {
                                  if (
                                    dom$td_secondSpecs.className.split(' ')[0] ===
                                    'secondPropertyTd'
                                  ) {
                                    // 有其他规格 ( 第二种规格 )

                                    // 获取所有的第二规格的表格元素 firstPropertyTd0-secondSpecs
                                    let secondSpecsTds = document.querySelectorAll(
                                      `.firstPropertyTd${index}-secondSpecs`,
                                    );

                                    let thirdSpecsTds = [];
                                    if (
                                      dom$td_thirdSpecs.className.split(' ')[0] ===
                                      'thirdPropertyTd'
                                    ) {
                                      // ( 第三种规格 )
                                      for (let j = 0; j < secondSpecsTds.length; j++) {
                                        let arr = secondSpecsTds[j].className.split(' ');
                                        let index = Number(/\d+/.exec(arr[arr.length - 1])[0]);
                                        thirdSpecsTds.push(
                                          ...Array.from(
                                            document.querySelectorAll(
                                              `.secondPropertyTd${index}-thirdSpecs`,
                                            ),
                                          ),
                                        );
                                      }
                                    }
                                    let surplusTds = [
                                      ...Array.from(secondSpecsTds),
                                      ...thirdSpecsTds,
                                    ];
                                    // 判断剩余规格的内容是否为空
                                    if (surplusTds.some((item, index) => item.innerHTML !== '')) {
                                      // 不删除元素将内容置空
                                      dom$firstPropertyTds[i].innerHTML = '';
                                    } else {
                                      // 删除当前大规格下的所有内容
                                      for (
                                        let j = 0;
                                        j < dom$firstPropertyTds[i].rowSpan - 1;
                                        j++
                                      ) {
                                        dom$table_goodsSpecs.removeChild(
                                          dom$firstPropertyTds[i].parentNode.nextElementSibling,
                                        );
                                      }
                                      dom$table_goodsSpecs.removeChild(
                                        dom$firstPropertyTds[i].parentNode,
                                      );
                                      // 删除表头
                                      dom$table_goodsSpecs.removeChild(
                                        document.querySelector('#generateHeaderTr'),
                                      );

                                      let dom$div_outerPackage = document.querySelectorAll(
                                        '.outerPackage',
                                      );
                                      let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                      let len = arr$dom_outerPackage.length;
                                      for (let j = 0; j < len; j++) {
                                        arr$dom_outerPackage[j].parentNode.removeChild(
                                          arr$dom_outerPackage[j],
                                        );
                                      }
                                      // 清除数据
                                      maxSpecsNum = 0;
                                      temp = [];
                                      count = 0;
                                      dom$btn_addGoodsSpecs.style.cssText = `
																				position: relative;
																				left: -${61}px;
																			`;
                                    }
                                  } else {
                                    // 没有其他规格
                                    // 删掉当前大规格下的所有内容
                                    for (let j = 0; j < dom$firstPropertyTds[i].rowSpan - 1; j++) {
                                      dom$table_goodsSpecs.removeChild(
                                        dom$firstPropertyTds[i].parentNode.nextElementSibling,
                                      );
                                    }
                                    dom$table_goodsSpecs.removeChild(
                                      dom$firstPropertyTds[i].parentNode,
                                    );
                                    dom$table_goodsSpecs.removeChild(
                                      document.querySelector('#generateHeaderTr'),
                                    );
                                    let dom$div_outerPackage = document.querySelectorAll(
                                      '.outerPackage',
                                    );
                                    let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                    let len = arr$dom_outerPackage.length;
                                    for (let j = 0; j < len; j++) {
                                      arr$dom_outerPackage[j].parentNode.removeChild(
                                        arr$dom_outerPackage[j],
                                      );
                                    }
                                    // 清除数据
                                    maxSpecsNum = 0;
                                    temp = [];
                                    count = 0;
                                    dom$btn_addGoodsSpecs.style.cssText = `
																			position: relative;
																			left: -${61}px;
																		`;
                                    // // 置空元素
                                  }
                                } catch (err) {
                                  for (let j = 0; j < dom$firstPropertyTds[i].rowSpan - 1; j++) {
                                    dom$table_goodsSpecs.removeChild(
                                      dom$firstPropertyTds[i].parentNode.nextElementSibling,
                                    );
                                  }
                                  dom$table_goodsSpecs.removeChild(
                                    dom$firstPropertyTds[i].parentNode,
                                  );
                                  dom$table_goodsSpecs.removeChild(
                                    document.querySelector('#generateHeaderTr'),
                                  );
                                  let dom$div_outerPackage = document.querySelectorAll(
                                    '.outerPackage',
                                  );
                                  let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                  let len = arr$dom_outerPackage.length;
                                  for (let j = 0; j < len; j++) {
                                    arr$dom_outerPackage[j].parentNode.removeChild(
                                      arr$dom_outerPackage[j],
                                    );
                                  }
                                  // 清除数据
                                  maxSpecsNum = 0;
                                  temp = [];
                                  count = 0;
                                  dom$btn_addGoodsSpecs.style.cssText = `
																		position: relative;
																		left: -${61}px;
																	`;
                                }
                              } catch (err) {
                                // 删除全部内容
                                console.warn(err.message);
                                // 判断其所属的第二规格的表格是否为空
                                let secSpecsTdsOfFirstSpecs = [];
                                let tempSaveSecSpecs = dom$firstPropertyTds[i];
                                try {
                                  for (let j = 0; j < dom$firstPropertyTds[i].rowSpan; j++) {
                                    secSpecsTdsOfFirstSpecs.push(tempSaveSecSpecs);
                                    tempSaveSecSpecs = tempSaveSecSpecs.nextElementSibling;
                                  }
                                } catch (err) {
                                  secSpecsTdsOfFirstSpecs.push(
                                    ...Array.from(document.querySelectorAll('.secondPropertyTd')),
                                  );
                                }
                                secSpecsTdsOfFirstSpecs = secSpecsTdsOfFirstSpecs.filter(
                                  (item, index) => item !== null,
                                );
                                if (
                                  secSpecsTdsOfFirstSpecs.every(
                                    (item, index) => item.innerHTML !== '',
                                  )
                                ) {
                                  dom$firstPropertyTds[i].innerHTML = '';
                                } else {
                                  // 置空元素
                                  for (let j = 0; j < dom$firstPropertyTds[i].rowSpan - 1; j++) {
                                    dom$table_goodsSpecs.removeChild(
                                      dom$firstPropertyTds[i].parentNode.nextElementSibling,
                                    );
                                  }
                                  dom$table_goodsSpecs.removeChild(
                                    dom$firstPropertyTds[i].parentNode,
                                  );
                                  dom$table_goodsSpecs.removeChild(
                                    document.querySelector('#generateHeaderTr'),
                                  );
                                  let dom$div_outerPackage = document.querySelectorAll(
                                    '.outerPackage',
                                  );
                                  let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                  let len = arr$dom_outerPackage.length;
                                  for (let j = 0; j < len; j++) {
                                    arr$dom_outerPackage[j].parentNode.removeChild(
                                      arr$dom_outerPackage[j],
                                    );
                                  }

                                  maxSpecsNum = 0;
                                  temp = [];
                                  count = 0;
                                }
                              }
                            }
                          }
                        }
                      } else if (select_val === secondHeaderTrVal) {
                        // 第二列
                        // count += 1;
                        let dom$tr_headerSecond = dom$tr_headerFirst.nextElementSibling;
                        const { innerHTML: headerTrVal } = dom$tr_headerSecond;

                        // 获取当前的 td 元素
                        if (select_val === headerTrVal) {
                          // 获取目标元素
                          let dom$secondPropertyTds = document.querySelectorAll(
                            '.secondPropertyTd',
                          );
                          // 找到当前将要被删除的表格
                          let arr$td_willDel = []; // dom$div_specsTag
                          for (let i = 0; i < dom$secondPropertyTds.length; i++) {
                            if (dom$div_specsTag.innerHTML === dom$secondPropertyTds[i].innerHTML) {
                              arr$td_willDel.push(dom$secondPropertyTds[i]);
                            }
                          }
                          let dom$tr_headerThird =
                            dom$tr_headerFirst.nextElementSibling.nextElementSibling;
                          let dom$td_thirdProperty = document.querySelectorAll('.thirdPropertyTd');
                          let trs = document.querySelectorAll('tr');
                          trs = Array.from(trs);
                          trs.shift();

                          // 判断当前行是否是第一行
                          for (let i = 0; i < arr$td_willDel.length; i++) {
                            let dom$td_firstChild = arr$td_willDel[i].parentNode.firstElementChild;

                            if (dom$td_firstChild.className.split(' ')[0] === 'firstPropertyTd') {
                              // 开头元素
                              // const { innerHTML: headerTrVal } = dom$tr_headerThird;
                              // 判断当前 rowspan 属性值是否为一

                              let dom$arr_secondProperty = document.querySelectorAll(
                                '.secondPropertyTd',
                              );

                              if (
                                dom$arr_secondProperty.length /
                                  document.querySelectorAll(`.firstPropertyTd`).length <=
                                1
                              ) {
                                // 不删除直接置空
                                // 判断上一个规格与下一个规格的值是否为空
                                // 获取对应的第一个规格的表格
                                let firstTdClassName = arr$td_willDel[i].className.split(' ')[1];
                                let dom$td_firstSpecs = document.querySelectorAll(
                                  `.${firstTdClassName.substring(
                                    0,
                                    firstTdClassName.indexOf('-'),
                                  )}`,
                                )[0];

                                try {
                                  if (
                                    arr$td_willDel[i].nextElementSibling.className.split(' ')[0] ===
                                    'thirdPropertyTd'
                                  ) {
                                    // 有第三个规格

                                    // 获取第三个规格的表格集合
                                    let temp_arr = [];
                                    // let temp = arr$td_willDel[i];
                                    let current_willDelTd = arr$td_willDel[i];
                                    for (let j = 0; j < arr$td_willDel[i].rowSpan; j++) {
                                      temp_arr.push(
                                        ...Array.from(current_willDelTd.nextElementSibling),
                                      );
                                      current_willDelTd = current_willDelTd.nextElementSibling;
                                    }

                                    if (temp_arr.length === 0) {
                                      temp_arr = Array.from(
                                        document.querySelectorAll('.thirdPropertyTd'),
                                      );
                                    }

                                    // 判断值是否为空
                                    if (
                                      dom$td_firstSpecs.innerHTML !== '' ||
                                      temp_arr.some((item, index) => item.innerHTML !== '')
                                    ) {
                                      // 置空
                                      arr$td_willDel[i].innerHTML = '';
                                    } else {
                                      // 删除

                                      let current_tr = dom$td_firstSpecs.parentNode;
                                      for (let j = 0; j < dom$td_firstSpecs.rowSpan - 1; j++) {
                                        dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                      }
                                      dom$table_goodsSpecs.removeChild(current_tr);
                                      dom$table_goodsSpecs.removeChild(
                                        document.querySelector('#generateHeaderTr'),
                                      );
                                      let dom$div_outerPackage = document.querySelectorAll(
                                        '.outerPackage',
                                      );
                                      let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                      let len = arr$dom_outerPackage.length;
                                      for (let j = 0; j < len; j++) {
                                        arr$dom_outerPackage[j].parentNode.removeChild(
                                          arr$dom_outerPackage[j],
                                        );
                                      }
                                      maxSpecsNum = 0;
                                      temp = [];
                                      count = 0;
                                      dom$btn_addGoodsSpecs.style.cssText = `
																				position: relative;
																				left: -${61}px;
																			`;
                                    }
                                  } else {
                                    // 无第三个规格
                                    if (dom$td_firstSpecs.innerHTML !== '') {
                                      arr$td_willDel[i].innerHTML = '';
                                    } else {
                                      // 删除
                                      let current_tr = dom$td_firstSpecs.parentNode;
                                      for (let j = 0; j < dom$td_firstSpecs.rowSpan - 1; j++) {
                                        dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                      }
                                      dom$table_goodsSpecs.removeChild(current_tr);
                                      dom$table_goodsSpecs.removeChild(
                                        document.querySelector('#generateHeaderTr'),
                                      );
                                      let dom$div_outerPackage = document.querySelectorAll(
                                        '.outerPackage',
                                      );
                                      let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                      let len = arr$dom_outerPackage.length;
                                      for (let j = 0; j < len; j++) {
                                        arr$dom_outerPackage[j].parentNode.removeChild(
                                          arr$dom_outerPackage[j],
                                        );
                                      }
                                      maxSpecsNum = 0;
                                      temp = [];
                                      count = 0;
                                      // 清除数据
                                      dom$btn_addGoodsSpecs.style.cssText = `
																				position: relative;
																				left: -${61}px;
																			`;
                                    }
                                  }
                                } catch (err) {
                                  let current_tr = dom$td_firstSpecs.parentNode;
                                  for (let j = 0; j < dom$td_firstSpecs.rowSpan - 1; j++) {
                                    dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                  }
                                  dom$table_goodsSpecs.removeChild(current_tr);
                                  dom$table_goodsSpecs.removeChild(
                                    document.querySelector('#generateHeaderTr'),
                                  );
                                  let dom$div_outerPackage = document.querySelectorAll(
                                    '.outerPackage',
                                  );
                                  let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                  let len = arr$dom_outerPackage.length;
                                  for (let j = 0; j < len; j++) {
                                    arr$dom_outerPackage[j].parentNode.removeChild(
                                      arr$dom_outerPackage[j],
                                    );
                                  }
                                  // 清除数据
                                  maxSpecsNum = 0;
                                  temp = [];
                                  count = 0;
                                  dom$btn_addGoodsSpecs.style.cssText = `
																		position: relative;
																		left: -${61}px;
																	`;
                                }

                                // 不删除直接置空
                                arr$td_willDel[i].innerHTML = '';
                              } else {
                                if (arr$td_willDel[i].rowSpan === 1) {
                                  // 无第三种规格或者第三种规格为的属性值为 1

                                  // 删除当前行 ( 除第一个表格之外 )，并且更改表格的 rowspan 值

                                  let current_tr = arr$td_willDel[i].parentNode;
                                  let children = Array.from(current_tr.children);
                                  let num = children.length;
                                  for (let j = 0; j < num; j++) {
                                    if (j > 0) {
                                      current_tr.removeChild(children[j]);
                                    }
                                  }
                                } else {
                                  // 有多个第三种规格
                                  // 删除除了第一个表格之外的所有表格
                                  let current_tr = arr$td_willDel[i].parentNode;
                                  let children = Array.from(current_tr.children);
                                  let num = children.length;
                                  for (let j = 0; j < num; j++) {
                                    if (j > 0) {
                                      current_tr.removeChild(children[j]);
                                    }
                                  }
                                  // 删除剩余的所有行

                                  // 更新第一个表格的 rowspan 的值
                                  let index = Number(/\d/.exec(current_tr.className)[0]);

                                  for (let j = 0; j < arr$td_willDel[i].rowSpan - 1; j++) {
                                    dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                    dom$td_firstChild.rowSpan -= 1;
                                  }
                                }
                              }
                            } else {
                              // 非开头元素
                              // 检测是否为最后一个元素
                              let current_tr = arr$td_willDel[i].parentNode;
                              let dom$arr_secondProperty = document.querySelectorAll(
                                '.secondPropertyTd',
                              );

                              if (
                                dom$arr_secondProperty.length /
                                  document.querySelectorAll(`.firstPropertyTd`).length <=
                                1
                              ) {
                                // 判断上一个规格与下一个规格的值是否为空
                                // 获取对应的第一个规格的表格
                                let firstTdClassName = arr$td_willDel[i].className.split(' ')[1];
                                let dom$td_firstSpecs = document.querySelectorAll(
                                  `.${firstTdClassName.substring(
                                    0,
                                    firstTdClassName.indexOf('-'),
                                  )}`,
                                )[0];

                                try {
                                  if (
                                    arr$td_willDel[i].nextElementSibling.className.split(' ')[0] ===
                                    'thirdPropertyTd'
                                  ) {
                                    // 有第三个规格

                                    // 获取第三个规格的表格集合
                                    let temp_arr = [];
                                    let current_willDelTd = arr$td_willDel[i];
                                    for (let j = 0; j < arr$td_willDel[i].rowSpan; j++) {
                                      temp_arr.push(
                                        ...Array.from(current_willDelTd.nextElementSibling),
                                      );
                                      current_willDelTd = current_willDelTd.nextElementSibling;
                                    }

                                    if (temp_arr.length === 0) {
                                      temp_arr = Array.from(
                                        document.querySelectorAll('.thirdPropertyTd'),
                                      );
                                    }
                                    // 判断值是否为空
                                    if (
                                      dom$td_firstSpecs.innerHTML !== '' ||
                                      temp_arr.some((item, index) => item.innerHTML !== '')
                                    ) {
                                      // 置空
                                      arr$td_willDel[i].innerHTML = '';
                                    } else {
                                      // 删除
                                      let current_tr = dom$td_firstSpecs.parentNode;
                                      for (let j = 0; j < dom$td_firstSpecs.rowSpan - 1; j++) {
                                        dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                      }
                                      dom$table_goodsSpecs.removeChild(current_tr);
                                      dom$table_goodsSpecs.removeChild(
                                        document.querySelector('#generateHeaderTr'),
                                      );
                                      dom$btn_addGoodsSpecs.style.cssText = `
																				position: relative;
																				left: -${61}px;
																			`;
                                    }
                                  } else {
                                    // 无第三个规格
                                    if (dom$td_firstSpecs.innerHTML !== '') {
                                      arr$td_willDel[i].innerHTML = '';
                                    } else {
                                      // 删除
                                      let current_tr = dom$td_firstSpecs.parentNode;
                                      for (let j = 0; j < dom$td_firstSpecs.rowSpan - 1; j++) {
                                        dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                      }
                                      dom$table_goodsSpecs.removeChild(current_tr);
                                      dom$table_goodsSpecs.removeChild(
                                        document.querySelector('#generateHeaderTr'),
                                      );
                                      let dom$div_outerPackage = document.querySelectorAll(
                                        '.outerPackage',
                                      );
                                      let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                      let len = arr$dom_outerPackage.length;
                                      for (let j = 0; j < len; j++) {
                                        arr$dom_outerPackage[j].parentNode.removeChild(
                                          arr$dom_outerPackage[j],
                                        );
                                      }
                                      // 清除数据
                                      maxSpecsNum = 0;
                                      temp = [];
                                      count = 0;
                                      dom$btn_addGoodsSpecs.style.cssText = `
																				position: relative;
																				left: -${61}px;
																			`;
                                    }
                                  }
                                } catch (err) {
                                  // 获取前一个元素
                                  let arr = arr$td_willDel[i].className.split(' ');
                                  let str = arr[arr.length - 1];
                                  let thirdsSpecsTds = document.querySelectorAll(
                                    `.secondPropertyTd${str.substring(
                                      /\d+/.exec(str).index,
                                      str.length,
                                    )}-thirdSpecs`,
                                  );
                                  thirdsSpecsTds = Array.from(thirdsSpecsTds);
                                  let firstSpecsTds = document.querySelectorAll(
                                    `.${arr[1].substring(0, arr[1].indexOf('-'))}`,
                                  );
                                  thirdsSpecsTds = thirdsSpecsTds.filter(
                                    (item, index) => item !== null,
                                  );
                                  if (
                                    firstSpecsTds[0].innerHTML !== '' ||
                                    thirdsSpecsTds.every((item, index) => item.innerHTML !== '')
                                  ) {
                                    arr$td_willDel[i].innerHTML = '';
                                  } else {
                                    let current_tr = dom$td_firstSpecs.parentNode;
                                    for (let j = 0; j < dom$td_firstSpecs.rowSpan - 1; j++) {
                                      dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                    }
                                    dom$table_goodsSpecs.removeChild(current_tr);
                                    dom$table_goodsSpecs.removeChild(
                                      document.querySelector('#generateHeaderTr'),
                                    );
                                    let dom$div_outerPackage = document.querySelectorAll(
                                      '.outerPackage',
                                    );
                                    let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                    let len = arr$dom_outerPackage.length;
                                    for (let j = 0; j < len; j++) {
                                      arr$dom_outerPackage[j].parentNode.removeChild(
                                        arr$dom_outerPackage[j],
                                      );
                                    }
                                    maxSpecsNum = 0;
                                    temp = [];
                                    count = 0;
                                  }

                                  // 清除数据
                                  dom$btn_addGoodsSpecs.style.cssText = `
																		position: relative;
																		left: -${61}px;
																	`;
                                }

                                // 直接删除所有行

                                // 不删除直接置空
                                arr$td_willDel[i].innerHTML = '';
                              } else {
                                // 不是最后一个元素 ( 整行删除 )

                                let current_tr = arr$td_willDel[i].parentNode;

                                let index = Number(/\d+/.exec(current_tr.className)[0]);
                                let dom$td_firstChild = null;

                                let firstTdClassName = arr$td_willDel[i].className.split(' ')[1];
                                dom$td_firstChild = document.querySelectorAll(
                                  `.${firstTdClassName.substring(
                                    0,
                                    firstTdClassName.indexOf('-'),
                                  )}`,
                                )[0];

                                for (let j = 0; j < arr$td_willDel[i].rowSpan - 1; j++) {
                                  try {
                                    dom$table_goodsSpecs.removeChild(current_tr.nextSibling);
                                  } catch (err) {
                                    dom$td_firstChild = document.querySelectorAll(
                                      '.firstPropertyTd',
                                    )[0];
                                  }
                                  dom$td_firstChild.rowSpan -= 1;
                                }

                                try {
                                  dom$table_goodsSpecs.removeChild(current_tr);
                                } catch (err) {
                                  dom$td_firstChild = document.querySelectorAll(
                                    '.firstPropertyTd',
                                  )[0];
                                }
                                dom$td_firstChild.rowSpan -= 1;
                                // 判断后面是否有多个第三种规格或者只有一个第三种规格
                              }
                              // 是最后一个元素 ( 保留最后一行，并将第二项的值置空 )
                            }
                          }
                        }
                      } else {
                        // 第三列

                        // 判断当前元素是否是行首元素

                        // 拿到当前的操作单位
                        // 获取目标元素
                        let dom$thirdPropertyTds = document.querySelectorAll('.thirdPropertyTd');
                        let dom$firstPropertyTds = document.querySelectorAll('.firstPropertyTd');
                        // 找到当前将要被删除的表格
                        let arr$td_willDel = []; // dom$div_specsTag
                        for (let i = 0; i < dom$thirdPropertyTds.length; i++) {
                          if (dom$div_specsTag.innerHTML === dom$thirdPropertyTds[i].innerHTML) {
                            arr$td_willDel.push(dom$thirdPropertyTds[i]);
                          }
                        }

                        for (let j = 0; j < arr$td_willDel.length; j++) {
                          if (
                            arr$td_willDel[j].parentNode.firstElementChild.className.split(
                              ' ',
                            )[0] === 'firstPropertyTd' ||
                            arr$td_willDel[j].parentNode.firstElementChild.className.split(
                              ' ',
                            )[0] === 'secondPropertyTd'
                          ) {
                            let current_tr = arr$td_willDel[j].parentNode;
                            let willDelAmountTds = current_tr.children;
                            let children = Array.from(willDelAmountTds);
                            let len = children.length;
                            let temp_num = 0;
                            let dom$secondPropertyTds = document.querySelectorAll(
                              '.secondPropertyTd',
                            );
                            let dom$thirdPropertyTds = document.querySelectorAll(
                              '.thirdPropertyTd',
                            );
                            // 判断当前表格是否是最后一个表格

                            // 不是: 就执行既定策略
                            if (dom$thirdPropertyTds.length / dom$secondPropertyTds.length > 1) {
                              // 判断当前元素是不是第一个元素
                              if (
                                arr$td_willDel[j].parentNode.firstElementChild.className.split(
                                  ' ',
                                )[0] === 'firstPropertyTd'
                              ) {
                                temp_num = 2;
                              } else {
                                temp_num = 1;
                              }
                              // 删除除当前行外的其他表格
                              for (let o = 0; o < len; o++) {
                                if (o > temp_num) {
                                  current_tr.removeChild(children[o]);
                                }
                              }
                              // 删除当前表格
                              current_tr.removeChild(arr$td_willDel[j]);
                            } else {
                              // 是: 就判断当前的前两个规格是否为空，
                              // 如果不为空就将内容置空
                              // 如果为空则删除当前第一个大规格中的所有内容

                              let arr = arr$td_willDel[j].className.split(' ');
                              let str = arr[arr.length - 2];
                              let current_firstTd = document.querySelectorAll(
                                `.${str.substring(0, str.indexOf('-'))}`,
                              )[0];
                              let dom$td_secondSpecsArr = document.querySelectorAll(
                                '.secondPropertyTd',
                              );
                              let arr_secondSpecs = Array.from(dom$td_secondSpecsArr);
                              let temp_arr = [];
                              let index = Number(
                                /\d+/.exec(current_firstTd.className.split(' ')[1])[0],
                              );

                              // 获取当前规格的表格数量
                              let dom$thirdPropertyTds = document.querySelectorAll(
                                '.thirdPropertyTd',
                              );
                              for (
                                let o = 0;
                                o <
                                dom$thirdPropertyTds.length /
                                  document.querySelectorAll('.firstPropertyTd').length;
                                o++
                              ) {
                                temp_arr.push(
                                  arr_secondSpecs[
                                    index *
                                      (dom$thirdPropertyTds.length /
                                        document.querySelectorAll('.firstPropertyTd').length) +
                                      o
                                  ],
                                );
                              }

                              if (
                                current_firstTd.innerHTML === '' &&
                                temp_arr.some(
                                  (item, index) => item === undefined || item.innerHTML === '',
                                )
                              ) {
                                // 前两个规格为空
                                // 删除所有行

                                for (let o = 0; o < current_firstTd.rowSpan; o++) {
                                  if (o >= 1) {
                                    dom$table_goodsSpecs.removeChild(
                                      current_firstTd.parentNode.nextSibling,
                                    );
                                  }
                                }
                                dom$table_goodsSpecs.removeChild(current_firstTd.parentNode);
                                // 如果当前表格中只剩下一个 tr 元素，则删除该表头
                                if (dom$table_goodsSpecs.children.length === 1) {
                                  dom$table_goodsSpecs.removeChild(
                                    document.querySelector('#generateHeaderTr'),
                                  );
                                  let dom$div_outerPackage = document.querySelectorAll(
                                    '.outerPackage',
                                  );
                                  let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                  let len = arr$dom_outerPackage.length;
                                  for (let j = 0; j < len; j++) {
                                    arr$dom_outerPackage[j].parentNode.removeChild(
                                      arr$dom_outerPackage[j],
                                    );
                                  }
                                  // 清除数据
                                  maxSpecsNum = 0;
                                  temp = [];
                                  count = 0;
                                  dom$btn_addGoodsSpecs.style.cssText = `
																		position: relative;
																		left: -${61}px;
																	`;
                                }
                              } else {
                                // 前两个规格不为空
                                // 不删除元素，置空即可

                                arr$td_willDel[j].innerHTML = '';
                              }
                            }
                          } else {
                            // 非开头元素

                            // 判断当前将要删除的元素是否是最后一个元素
                            // 获取第一个规格的表格数量
                            let dom$secondPropertyTds = document.querySelectorAll(
                              '.secondPropertyTd',
                            );
                            // 获取当前规格的表格数量
                            let dom$thirdPropertyTds = document.querySelectorAll(
                              '.thirdPropertyTd',
                            );

                            if (dom$thirdPropertyTds.length / dom$secondPropertyTds.length > 1) {
                              // 当前表格所属行中的非最后一个元素

                              // 直接删除当前行, 并更改 第一个规格与第二个规格的 rowspan 的状态

                              let arr = arr$td_willDel[j].className.split(' ');
                              let str = arr[arr.length - 1];

                              let current_secondTd = document.querySelectorAll(
                                `.${str.substring(0, str.indexOf('-'))}`,
                              );
                              str = arr[arr.length - 2];
                              let current_firstTd = document.querySelectorAll(
                                `.${str.substring(0, str.indexOf('-'))}`,
                              )[0];

                              let arr_secondSpecs = Array.from(current_secondTd);
                              for (let o = 0; o < arr_secondSpecs.length; o++) {
                                let temp_str = arr_secondSpecs[o].className.split(' ')[1];
                                if (
                                  str.substring(0, str.indexOf('-')) ===
                                  temp_str.substring(0, temp_str.indexOf('-'))
                                ) {
                                  // 更改第二个规格的 rowspan 的状态
                                  arr_secondSpecs[o].rowSpan -= 1;
                                }
                              }

                              // 重置 rowspan 的状态
                              current_firstTd.rowSpan -= 1;
                              // 删除当前行
                              dom$table_goodsSpecs.removeChild(arr$td_willDel[j].parentNode);
                            } else {
                              // 当前表格所属行中的最后一个元素
                              // 不删除置空即可
                              // 判断前两种规格集合是否有值
                              // 获取第一种规格
                              let arr = arr$td_willDel[j].className.split(' ');
                              let str = arr[arr.length - 2];
                              let current_firstTd = document.querySelectorAll(
                                `.${str.substring(0, str.indexOf('-'))}`,
                              )[0];
                              let dom$td_secondSpecsArr = document.querySelectorAll(
                                '.secondPropertyTd',
                              );
                              let arr_secondSpecs = Array.from(dom$td_secondSpecsArr);
                              let temp_arr = [];
                              let index = Number(
                                /\d+/.exec(current_firstTd.className.split(' ')[1])[0],
                              );

                              // 获取当前规格的表格数量
                              let dom$thirdPropertyTds = document.querySelectorAll(
                                '.thirdPropertyTd',
                              );
                              for (
                                let o = 0;
                                o <
                                dom$thirdPropertyTds.length /
                                  document.querySelectorAll('.firstPropertyTd').length;
                                o++
                              ) {
                                temp_arr.push(
                                  arr_secondSpecs[
                                    index *
                                      (dom$thirdPropertyTds.length /
                                        document.querySelectorAll('.firstPropertyTd').length) +
                                      o
                                  ],
                                );
                              }

                              if (
                                current_firstTd.innerHTML === '' &&
                                temp_arr.some(
                                  (item, index) => item !== undefined || item.innerHTML === '',
                                )
                              ) {
                                // 前两个规格为空
                                // 删除所有行
                                alert('天灵灵');
                                for (let o = 0; o < current_firstTd.rowSpan; o++) {
                                  if (o >= 1) {
                                    dom$table_goodsSpecs.removeChild(
                                      current_firstTd.parentNode.nextSibling,
                                    );
                                  }
                                }
                                dom$table_goodsSpecs.removeChild(current_firstTd.parentNode);
                                // 如果当前表格中只剩下一个 tr 元素，则删除该表头
                                if (dom$table_goodsSpecs.children.length === 1) {
                                  dom$table_goodsSpecs.removeChild(
                                    document.querySelector('#generateHeaderTr'),
                                  );
                                  let dom$div_outerPackage = document.querySelectorAll(
                                    '.outerPackage',
                                  );
                                  let arr$dom_outerPackage = Array.from(dom$div_outerPackage);
                                  let len = arr$dom_outerPackage.length;
                                  for (let j = 0; j < len; j++) {
                                    arr$dom_outerPackage[j].parentNode.removeChild(
                                      arr$dom_outerPackage[j],
                                    );
                                  }
                                  // 清除数据
                                  maxSpecsNum = 0;
                                  temp = [];
                                  count = 0;
                                }
                              } else {
                                // 前两个规格不为空

                                // 不删除元素，置空即可

                                arr$td_willDel[j].innerHTML = '';
                              }
                            }
                          }
                        }
                      }
                      // endregion

                      // 获取将要删除的 br 节点
                      let br = dom$div_topContainer.querySelectorAll(`.br${index}`)[0];
                      // 删除多余的 br 节点
                      br.parentNode.removeChild(br);
                      // 删除 div_specsTag 节点
                      dom$div_specsTag.parentNode.removeChild(dom$div_specsTag);
                      // 删除当前 (input_addGoodsSpecsVal) 节点
                      this.parentNode.removeChild(this);
                      // 删除指定索引处的商品规格值数据
                      if (temp.length !== 0) {
                        temp[temp_index].specsData.splice(
                          Number(index) === 0 ? 0 : index - rm_count,
                          1,
                        );
                      }

                      rm_count += 1;
                    }
                  },
                  false,
                );

                add_count += 1;
              }
            },
            false,
          );

          // 获取当前 top-container (顶级容器节点在页面中的位置)

          // 获取 top_container 左部距离浏览器右部的距离
          let toBrowserWidth_X = dom$div_topContainer.offsetLeft;
          // 获取 top_container 本身的高度
          let topContainerHeight = dom$div_topContainer.clientHeight;
          // 获取 top_container 本身的宽度
          let topContainerWidth = dom$div_topContainer.clientWidth;
          // 为 outerPackage 添加样式 (用于定位内部子元素的位置)
          dom$div_outerPackage.style.cssText = `
						position: relative;
					`;
          // 为 rmOuterPackage 添加样式 ( 确定删除 outerPackage 的按钮的位置 )
        })
        .catch(err => {
          console.error(err.message);
        });

      count += 1;
    } else {
      console.warn('只能生成 3 个商品规格 ! ');
    }
    maxSpecsNum += 1;
  },
  false,
);

// 定义 dom 元素生成器
function domGenerator(domStr) {
  return document.createElement(domStr);
}

// 定义生成 table 列表的 dom 元素生成器
// 定义生成的固定单位表格数量 ( 规格编码、规格条码、售价、商品库存、sku 顶图)
let FIXED_TABLE_NUM = 3;
let th_content = ['售价', '库存', '商品图片'];
function domTableGenerator(data) {
  // 获取目标元素
  let dom$div_homeTable = document.querySelectorAll('.home-table')[0];
  // 执行对应的生成策略
  // 定义 specsArr 存储生成的每个商品规格值数量的集合
  let specsArr = [];
  let { length: len } = data;
  // 循环检测商品规格数据集合数组中商品规格值的数量
  for (let i = 0; i < len; i++) {
    specsArr.push(data[i].specsData.length);
  }
  GenerateVirtualTable(specsArr, dom$div_homeTable, data);
}

// 生成虚拟表格
function GenerateVirtualTable(specsArr, dom$div_homeTable, data) {
  // 根据 specsArr 中的数据集合生成对应的 table 列表
  let { length: tab_len } = specsArr;
  dom$div_homeTable.innerHTML = '';
  // 创建 table 节点
  let virtualDom$table_goodsSpecs = document.createElement('table');
  // 设置虚拟表格 id
  virtualDom$table_goodsSpecs.id = 'table-goodsSpecs';
  // 显示边框
  // virtualDom$table_goodsSpecs.border = 1;
  // 插入 table 表格到页面
  let dom$table_goodsSpecs = dom$div_homeTable.appendChild(virtualDom$table_goodsSpecs);
  dom$table_goodsSpecs.style.cssText = `
				display: table;
				box-sizing: border-box;
				border-spacing: 0;
                border-collapse: collapse;
                border-color: grey;
                width: 100%;
			    max-width: 100%;
			    margin-bottom: 20px;
			`;
  // 生成表头行
  let virtualDom$tr_goodsSpecs = document.createElement('tr');
  // 设置表头 id
  virtualDom$tr_goodsSpecs.id = `generateHeaderTr`;

  let temp_Arr = [];
  // 生成表内容

  // 生成表头
  for (let i = 0; i < FIXED_TABLE_NUM; i++) {
    let virtualDom$th_goodsSpecs = document.createElement('th');
    virtualDom$th_goodsSpecs.innerText = th_content[i];
    virtualDom$tr_goodsSpecs.appendChild(virtualDom$th_goodsSpecs);
  }
  let dom$th_goodsSpecs = dom$table_goodsSpecs.appendChild(virtualDom$tr_goodsSpecs);

  // 计算应该生成的公共部分表格
  let shouldCreateTabNum = 0;
  if (tab_len === 1) {
    shouldCreateTabNum = specsArr[0];
  } else if (tab_len === 2) {
    shouldCreateTabNum = specsArr[0] * specsArr[1];
    if (specsArr[0] !== 0 && specsArr[1] === 0) {
      shouldCreateTabNum = specsArr[0];
    }
  } else if (tab_len === 3) {
    shouldCreateTabNum = specsArr[0] * specsArr[1] * specsArr[2];
    if (specsArr[0] !== 0 && (specsArr[2] === 0 || specsArr[1] === 0)) {
      shouldCreateTabNum = specsArr[0];
    }
  } else {
    shouldCreateTabNum = 0;
  }

  for (let i = 0; i < shouldCreateTabNum; i++) {
    // 生成对应的公共部分的表格
    let virtualDom$tr_goodsSpecs = document.createElement('tr');
    virtualDom$tr_goodsSpecs.style.cssText = `
					display: table-row;
					vertical-align: inherit;
                    border-color: inherit;
					box-sizing: border-box;
					
				`;
    // 指定 class
    virtualDom$tr_goodsSpecs.className = `generateBodyTr${i}`;
    // 生成每一行的 td
    for (let j = 0; j < th_content.length; j++) {
      let virtualDom$td_common = document.createElement('td');
      virtualDom$td_common.style.cssText = `
						display: table-cell;
						box-sizing: border-box;
						padding: 8px;
					    line-height: 1.42857143;
					    vertical-align: top;
					    border-top: 1px solid #ddd;
					`;
      switch (j) {
        case 0:
          let virtualDom$input_goodsPrice = document.createElement('input');
          virtualDom$input_goodsPrice.className = 'goods-price';
          virtualDom$input_goodsPrice.type = 'number';
          virtualDom$td_common.appendChild(virtualDom$input_goodsPrice);
          break;
        case 1:
          let virtualDom$input_goodsStock = document.createElement('input');
          virtualDom$input_goodsStock.className = 'goods-stock';
          virtualDom$input_goodsStock.type = 'number';
          virtualDom$td_common.appendChild(virtualDom$input_goodsStock);
          break;
        case 2:
          let virtualDom$input_goodsPics = document.createElement('input');
          virtualDom$input_goodsPics.className = 'goods-pics';
          virtualDom$input_goodsPics.type = 'file';
          virtualDom$input_goodsPics.multiple = 'multiple';
          virtualDom$td_common.appendChild(virtualDom$input_goodsPics);
          break;
        default:
          break;
      }
      virtualDom$tr_goodsSpecs.appendChild(virtualDom$td_common);
    }
    dom$table_goodsSpecs.appendChild(virtualDom$tr_goodsSpecs);
  }

  /**
   * 计算 tr : => 最后一重属性值的数量 / 第一行属性值的数量 = 倍数
   *              arr
   *              for(i i<第一重属性值的数量 i++ ) {
   *                 arr.push(i * 倍数)
   *              } = 预设索引
   */

  // 添加表头

  if (tab_len === 1) {
    let virtualDom$th_createFirst = document.createElement('th');
    virtualDom$th_createFirst.innerText = data[0].val;
    let tr_header = document.querySelector('#generateHeaderTr');
    let td = tr_header.firstElementChild;
    tr_header.insertBefore(virtualDom$th_createFirst, td);
  }
  if (tab_len === 2) {
    let virtualDom$th_createSecond = document.createElement('th');
    virtualDom$th_createSecond.innerText = data[1].val;
    let tr_header = document.querySelector('#generateHeaderTr');
    let td = tr_header.firstElementChild;
    tr_header.insertBefore(virtualDom$th_createSecond, td);

    let virtualDom$th_createFirst = document.createElement('th');
    virtualDom$th_createFirst.innerText = data[0].val;
    let tr_header2 = document.querySelector('#generateHeaderTr');
    let td2 = tr_header.firstElementChild;
    tr_header2.insertBefore(virtualDom$th_createFirst, td2);
  }
  if (tab_len === 3) {
    let virtualDom$th_createThird = document.createElement('th');
    virtualDom$th_createThird.innerText = data[2].val;
    let tr_header = document.querySelector('#generateHeaderTr');
    let td = tr_header.firstElementChild;
    tr_header.insertBefore(virtualDom$th_createThird, td);

    let tr_header2 = document.querySelector('#generateHeaderTr');
    let td2 = tr_header.firstElementChild;
    let virtualDom$th_createSecond = document.createElement('th');
    virtualDom$th_createSecond.innerText = data[1].val;
    tr_header2.insertBefore(virtualDom$th_createSecond, td2);

    let tr_header3 = document.querySelector('#generateHeaderTr');
    let td3 = tr_header.firstElementChild;
    let virtualDom$th_createFirst = document.createElement('th');
    virtualDom$th_createFirst.innerText = data[0].val;
    tr_header3.insertBefore(virtualDom$th_createFirst, td3);
  }

  // 获取 table 中每一行 tr
  let trs = dom$table_goodsSpecs.querySelectorAll('tr');
  trs = Array.from(trs);
  trs.shift();
  for (let i = 0; i < specsArr[0]; i++) {
    // 生成第一列数据
    let virtualDom$td_firstCol = document.createElement('td');
    virtualDom$td_firstCol.innerText = data[0].specsData[i];
    virtualDom$td_firstCol.className = `firstPropertyTd firstPropertyTd${i}`;
    if (tab_len >= 2 && data[1].specsData.length !== 0) {
      for (let j = 0; j < specsArr[1]; j++) {
        // 生成第二列数据
        let virtualDom$td_secondCol = document.createElement('td');
        virtualDom$td_secondCol.innerText = data[1].specsData[j];
        virtualDom$td_secondCol.className = `secondPropertyTd ${
          virtualDom$td_firstCol.className.split(' ')[1]
        }-secondSpecs secondPropertyTd${j}`;
        if (tab_len >= 3) {
          let len = 0;
          if (data[2].specsData.length === 0) {
            len = 1;
          } else {
            len = specsArr[2];
          }

          for (let o = 0; o < len; o++) {
            // 生成第三列数据
            let virtualDom$td_thirdCol = document.createElement('td');
            virtualDom$td_thirdCol.innerText =
              data[2].specsData[o] === undefined ? '' : data[2].specsData[o];
            // virtualDom$td_thirdCol.className = `thirdPropertyTd thirdPropertyTd${ o } ${ virtualDom$td_firstCol.className.split(" ")[1] }-thirdSpecs ${ virtualDom$td_secondCol.className.split(" ")[1] }-thirdSpecs`;
            virtualDom$td_thirdCol.className = `thirdPropertyTd thirdPropertyTd${o} ${
              virtualDom$td_firstCol.className.split(' ')[1]
            }-thirdSpecs ${virtualDom$td_secondCol.className.split(' ')[2]}-thirdSpecs`;
            let td = null;
            /*if(globalTag) {
								td = trs[0].firstElementChild;
							}*/
            if (globalTag) {
              td =
                trs[0].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
              trs[0].insertBefore(virtualDom$td_thirdCol, td);
            } else {
              td = trs[(i * specsArr[1] + j) * len + o].firstElementChild;
              trs[(i * specsArr[1] + j) * len + o].insertBefore(virtualDom$td_thirdCol, td);
            }

            if (((i * specsArr[1] + j) * len + o) % len === 0) {
              console.warn(j);
              virtualDom$td_secondCol.rowSpan = len;
              let td_second =
                trs[(((i * specsArr[1] + j) * len + o) / len) * len].firstElementChild;
              trs[(((i * specsArr[1] + j) * len + o) / len) * len].insertBefore(
                virtualDom$td_secondCol,
                td_second,
              );
              if ((((i * specsArr[1] + j) * len + o) / len) % specsArr[1] === 0) {
                virtualDom$td_firstCol.rowSpan = len * specsArr[1];
                let td_first =
                  trs[(((i * specsArr[1] + j) * len + o) / len / specsArr[1]) * len * specsArr[1]]
                    .firstElementChild;
                trs[
                  (((i * specsArr[1] + j) * len + o) / len / specsArr[1]) * len * specsArr[1]
                ].insertBefore(virtualDom$td_firstCol, td_first);
              }
            }
          }
        } else {
          // 插入第二列
          let td_second = trs[i * specsArr[1] + j].firstElementChild;
          trs[i * specsArr[1] + j].insertBefore(virtualDom$td_secondCol, td_second);
          // 插入第一列
          if ((i * specsArr[1] + j) % specsArr[1] === 0) {
            virtualDom$td_firstCol.rowSpan = specsArr[1];
            let td_first = trs[i * specsArr[1]].firstElementChild;
            trs[i * specsArr[1]].insertBefore(virtualDom$td_firstCol, td_first);
          }
        }
      }
    } else {
      let td = trs[i].firstElementChild;
      trs[i].insertBefore(virtualDom$td_firstCol, td);

      // 清空 data 后两个规格值
    }
  }
}

// 获取目标元素
let btn = document.querySelectorAll('.show-specs-data')[0];
btn.addEventListener(
  'click',
  function() {
    // 数据提取
    // 获取当前表格
    let oTable = document.querySelector('#table-goodsSpecs');
    // 获取所有的 tr
    let oTr = oTable.querySelectorAll('tr');

    let firstSpecsTds = document.querySelectorAll('.firstPropertyTd');
    let secondSpecsTds = document.querySelectorAll('.firstPropertyTd');
    let thirdSpecsTds = document.querySelectorAll('.firstPropertyTd');
    let data = [];
    let trs = [];

    // 按规格提取对应表格
    for (let i = 0; i < firstSpecsTds.length; i++) {
      let obj = firstSpecsTds[i].parentNode;
      let temps = [];
      alert(firstSpecsTds[i].rowSpan);
      for (let j = 0; j < firstSpecsTds[i].rowSpan; j++) {
        temps.push(obj);
        obj = obj.nextElementSibling;
      }
      trs[i] = temps;
    }

    let index = 0;
    // 提取数据
    for (let i = 0; i < trs.length; i++) {
      for (let j = 0; j < trs[i].length; j++) {
        let goods_price = trs[i][j].querySelectorAll('.goods-price')[0];
        let goods_stock = trs[i][j].querySelectorAll('.goods-stock')[0];
        let goods_pics = trs[i][j].querySelectorAll('.goods-pics')[0];
        let dom$td_secondSpecs = trs[i][j].querySelectorAll('.secondPropertyTd')[0];
        let dom$td_thirdSpecs = trs[i][j].querySelectorAll('.thirdPropertyTd')[0];

        // 创建数据对象
        if (dom$td_thirdSpecs !== undefined) {
          if (dom$td_secondSpecs !== undefined) {
            index = j;
            // index = Number(/\d+/.exec(dom$td_secondSpecs.className.split(" ")[2])[0]);
            // console.log(index + "sa1sa1sa1");
          }

          // if(dom$td_secondSpecs !== undefined || trs[i][j - temp[temp.length - 1].specsData.length + 1].querySelectorAll(".secondPropertyTd")[0] !== undefined) {
          let data_object = {
            first_levelSpecs: trs[i][0].querySelectorAll('.firstPropertyTd')[0].innerHTML,
            second_levelSpecs:
              dom$td_secondSpecs !== undefined
                ? dom$td_secondSpecs.innerHTML
                : trs[i][index].querySelectorAll('.secondPropertyTd')[0].innerHTML,
            third_levelSpecs: dom$td_thirdSpecs.innerHTML,
            goods_price: goods_price !== undefined ? goods_price.value : '无',
            goods_stock: goods_stock !== undefined ? goods_stock.value : '无',
            goods_pics: goods_pics !== undefined ? goods_pics.value : '无',
          };
          data.push(data_object);
          // }
        }
        // 添加数据
      }
    }

    // 过滤 data 中的数据
    data = data.filter((item, index) => item.goods_price !== '无');

    console.log(data);
    // 1. 判断当前的 tr 是否为一个完整的 tr ( 如果是一个完整的 tr 则记为最终数据计算，否则不记为 )

    // 2. 第一个规格的 rowspan 的数值为一个单位添加
  },
  false,
);
// };
