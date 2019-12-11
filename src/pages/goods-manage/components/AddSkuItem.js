// 导入官方包
import React, { useEffect } from 'react';
import {
  Col,
  Divider,
  Form,
  Input,
  PageHeader,
  Row,
  Button,
  Icon,
  Cascader,
  Modal,
  Upload,
} from 'antd';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// 导入自定义包
import GoodsSpecsGenerator from '@/components/DynamicTableGenerator/GoodsSpecsGenerator';
import '@/pages/goods-manage/static/AddSkuItem.less';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

/*const options = [
	{
		value: "未分类",
		label: "未分类",
	},
	{
		value: 'zhejiang',
		label: 'Zhejiang',
		children: [
			{
				value: 'hangzhou',
				label: 'Hangzhou',
				children: [
					{
						value: 'xihu',
						label: 'West Lake',
					},
				],
			},
		],
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
				children: [
					{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men',
					},
				],
			},
		],
	},
];*/

/*const options = [
	{
		children: [
			{
				children: [
					{
						children: [
							{
								children: [
									{
										children: null,
										key: 12,
										value: "低度酒",
										label: "低度酒"
									},
									{
										children: null,
										key: 13,
										value: "高度酒",
										label: "高度酒"
									}
								],
								key: 8,
								value: "白酒",
								label: "白酒"
							},
							{
								children: null,
								key: 10,
								value: "啤酒",
								label: "啤酒"
							}
						],
						key: 5,
						value: "酒",
						label: "酒"
					},
					{
						children: null,
						key: 6,
						value: "饮用水",
						label: "饮用水"
					},
					{
						children: [
							{
								children: null,
								key: 11,
								value: "可乐",
								label: "可乐"
							}
						],
						key: 7,
						value: "饮料",
						label: "饮料"
					}
				],
				key: 4,
				value: "酒水饮料",
				label: "酒水饮料"
			}
		],
		key: 1,
		value: "食品类",
		label: "食品类"
	},
	{
		children: null,
		key: 2,
		value: "日用品类",
		label: "日用品类"
	},
	{
		children: [
			{
				children: null,
				key: 9,
				value: "手机",
				label: "手机"
			}
		],
		key: 3,
		value: "家电 / 数码 / 手机",
		label: "家电 / 数码 / 手机"
	}
];*/
// const AddSkuItemComponent = props => {

const SkuClassesForm = props => {
  console.log(props);

  return (
    <div
      style={{
        width: '35%',
      }}
    >
      <Button
        type="default"
        style={{
          marginTop: '3px',
        }}
        onClick={props.onShowSkuClassModal}
      >
        新建分类
      </Button>
      <Modal
        visible={props.isShowSkuClassModal}
        title="新增分类"
        okText="确定"
        onCancel={props.onCancel}
        onOk={() => props.onSubmit(props.addSku.newCategoryVal)}
      >
        <Input placeholder="请输入分类名称" onChange={props.onChangeNewInputVal} />
        {/*<Input placeholder="请输入分类名称" ref = "newCreateCategory" />*/}
      </Modal>
    </div>
  );
};
let AddSkuClassesForm = Form.create({})(SkuClassesForm);

const SkuForm = props => {
  useEffect(() => {
    props.form.validateFields(); // 校验表单字段
  }, []);

  const handleSubmit = ev => {
    ev.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  // Only show error after a field is touched.
  const goodsCodeError = isFieldTouched('goodsCode') && getFieldError('goodsCode');
  const goodsBarCodeError = isFieldTouched('goodsBarCode') && getFieldError('goodsBarCode');

  const {
    topPreviewVisible,
    topPreviewImage,
    topFileList,
    bottomPreviewVisible,
    bottomPreviewImage,
    bottomFileList,
  } = props.addSku;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <div>
      <Divider orientation="left">基本信息</Divider>
      <Form
        layout="vertical"
        onSubmit={handleSubmit}
        labelAlign="right"
        // layout={}
      >
        <Row>
          {/* 商品编码和商品条码 */}
          {/*<Col span={12}
					     style={{
						     textAlign: "center",
					     }}
					>
						<Form.Item validateStatus={goodsCodeError ? 'error' : ''}
						           help={goodsCodeError || ''}
						           label = "商品编码"
						>
							{getFieldDecorator('goodsCode', {
								rules: [{ required: false, message: 'Please input your username!' }],
							})(
								<Input
									prefix={
										<Icon type="number"
										      style={{ color: 'rgba(0,0,0,.25)' }}
										/>}
									placeholder="商品编码"
									style={{
										width: "300px"
									}}
								/>,
							)}
						</Form.Item>
						<br />
						<span style={{
							marginLeft: "70px",
							fontSize: "12px",
							color: "#969799"
						}}>用于商家内部管理使用，具体编码规则需要商家自定义</span>
					</Col>
					<Col span={12} style={{
						textAlign: "center"
					}}>
						<Form.Item validateStatus={goodsBarCodeError ? 'error' : ''}
						           help={goodsBarCodeError || ''}
						           label = "商品条码"
						>
							{getFieldDecorator('goodsBarCode', {
								rules: [{ required: false, message: 'Please input your Password!' }],
							})(
								<Input
									prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
									type="password"
									placeholder="商品条码"
									style={{
										width: "300px"
									}}
								/>,
							)}
						</Form.Item>
						<br />
						<span style={{
							marginLeft: "60px",
							fontSize: "12px",
							color: "#969799"
						}}>输入标准商品条码，系统会自动匹配商品信息并填充</span>
					</Col>*/}
          <Col
            span={6}
            offset={2}
            style={{
              marginTop: '25px',
              textAlign: 'center',
            }}
          >
            <Form.Item
              validateStatus={goodsBarCodeError ? 'error' : ''}
              help={goodsBarCodeError || ''}
              label="商品名称"
              style={{
                marginLeft: '-11px',
              }}
            >
              {getFieldDecorator('goodsBarCode', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="shopping" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="例如 : Oppo R17"
                  style={{
                    width: '300px',
                  }}
                />,
              )}
            </Form.Item>
          </Col>
          <Col
            span={12}
            style={{
              marginTop: '25px',
              textAlign: 'center',
            }}
          >
            <Row>
              <Col span={12} offset={17}>
                <Form.Item
                  label="商品分类"
                  style={{
                    marginLeft: '0',
                    marginBottom: '0',
                    paddingBottom: '0',
                  }}
                >
                  {getFieldDecorator('goodsCategory', {
                    initialValue: ['未分类'],
                    rules: [
                      {
                        type: 'array',
                        required: true,
                        message: 'Please select your habitual residence!',
                      },
                    ],
                  })(<Cascader options={props.addSku.goodsCategory} />)}
                </Form.Item>

                <br />
                <span
                  style={{
                    position: 'relative',
                    top: '-10px',
                    marginLeft: '-35px',
                    fontSize: '12px',
                    color: '#969799',
                  }}
                >
                  用于店铺内部经营管理与财务利润核算
                </span>
              </Col>
              {/*<Col span={4} style={{
								marginLeft: "-25px"
							}}>
								<AddSkuClassesForm onCancel= { props.onCancel }
								                   onSubmit = { props.onSubmit }
								                   onShowSkuClassModal = { props.onShowSkuClassModal }
								                   isShowSkuClassModal = { props.isShowSkuClassModal }
								                   onChangeNewInputVal = { props.onChangeNewInputVal }
								                   addSku = { props.addSku }
								/>
								
								<Button type="default"
								        style={{
									        marginTop: "3px",
								        }}
								        // onClick={ props.onShowSkuClassModal }
								>
									新建分类
								</Button>
								
							</Col>*/}
            </Row>
          </Col>
          <Col
            span={6}
            offset={2}
            style={{
              marginTop: '25px',
              textAlign: 'center',
            }}
          >
            <Form.Item
              label="顶部图片"
              style={{
                marginLeft: '0',
              }}
            >
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: props.normFileTopPic,
              })(
                <>
                  <Upload
                    action="https://up-z1.qiniup.com"
                    listType="picture-card"
                    multiple={true}
                    openFileDialogOnClick={true}
                    fileList={props.addSku.topFileList}
                    onChange={props.onChangeTopSkuPic}
                    onPreview={props.onPreviewTopSkuPic}
                    onRemove={props.onRemoveTopSkuPic}
                    beforeUpload={props.onBeforeUploadTopSkuPic}
                    customRequest={props.onCustomTopUpload}
                  >
                    {topFileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={topPreviewVisible}
                    footer={null}
                    onCancel={props.onCancelTopSkuPic}
                    // beforeUpload = { props.onBeforeUploadBottomSkuPic }
                    // onOk = {props.onGetTopSkuPic}
                  >
                    <img alt="example" style={{ width: '100%' }} src={topPreviewImage} />
                  </Modal>
                </>,
              )}
            </Form.Item>
          </Col>
          <Col
            span={6}
            offset={9}
            style={{
              marginTop: '25px',
              textAlign: 'center',
            }}
          >
            <Form.Item
              label="底部图片"
              style={{
                // width: "336px",
                marginLeft: '-10px',
              }}
            >
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: props.normFileTopPic,
              })(
                <>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      // overflow: "scroll"
                    }}
                  >
                    <Upload
                      action="https://up-z1.qiniup.com"
                      listType="picture-card"
                      fileList={props.addSku.bottomFileList}
                      multiple={true}
                      onPreview={props.onPreviewBottomSkuPic}
                      onRemove={props.onRemoveBottomSkuPic}
                      onBeforeUploadBottomSkuPic={props.onBeforeUploadBottomSkuPic}
                      customRequest={props.onCustomBottomUpload}
                    >
                      {bottomFileList.length >= 8 ? null : uploadButton}
                    </Upload>

                    <Modal
                      visible={bottomPreviewVisible}
                      footer={null}
                      onCancel={props.onCancelBottomSkuPic}
                    >
                      <img alt="example" style={{ width: '100%' }} src={bottomPreviewImage} />
                    </Modal>
                  </div>
                </>,
              )}
            </Form.Item>
          </Col>

          {/* 库存单位 */}
          {/*<Col span={12}
					     style={{
						     marginTop: "25px",
						     textAlign: "center",
					     }}>
						<Form.Item label="库存单位"
						           style={{
						                marginLeft: "-100px"
						           }}>
							{getFieldDecorator('residence', {
								initialValue: ['件'],
								rules: [
									{ type: 'array', required: false, message: 'Please select your habitual residence!' },
								],
							})(
								<Cascader options={options}
								/>)}
						</Form.Item>
					</Col>*/}

          {/* 商品品牌 */}
          {/*<Col span={6}
					     offset={2}
					     style={{
						     marginTop: "25px",
						     textAlign: "center",
					     }}>
						<Form.Item label="商品品牌" style={{
							marginLeft: "0"
						}}>
							{getFieldDecorator('goodsBrand', {
								initialValue: ['未分类'],
								rules: [
									{ type: 'array', required: false, message: 'Please select your habitual residence!' },
								],
							})(
								<Cascader options={options}
								/>)}
						</Form.Item>
					</Col>*/}
        </Row>
        <Divider
          orientation="left"
          style={{
            marginTop: '50px',
          }}
        >
          规格信息 (SKU)
        </Divider>
        {/* 添加商品规格组件 */}
        {/*<GoodsSpecsGenerator />*/}
        {/*<Form.Item>
							        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
								        Log in
							        </Button>
						        </Form.Item>*/}
      </Form>
      <GoodsSpecsGenerator />

      <Row>
        <Col
          span={12}
          offset={6}
          style={{
            marginBottom: '30px',
            marginTop: '25px',
            textAlign: 'center',
          }}
        >
          <Button type="primary">保存</Button>
        </Col>
      </Row>
    </div>
  );
};
let AddSkuItemForm = Form.create({})(SkuForm);

const AddSkuItem = props => {
  const routes = [
    {
      path: 'index',
      breadcrumbName: '商品管理',
    },
    {
      path: 'first',
      breadcrumbName: '添加 sku 商品',
    },
  ];

  // 获取 token
  useEffect(() => {
    // 获取路由中的参数
    console.log(props);

    // 初始化商品分类信息
    props.onReqGoodsCategory();

    // 获取上传图片的 token
    // 判断当前 token 是否已经过期
    props.onGetToken();

    // 获取初始数据 ( id 数据 )
    props.onInitIdData();
  }, []);

  const handleCancelSkuForm = () => {};

  const handleSubmitSkuForm = () => {};

  const handleShowSkuClassModal = () => {};

  return (
    <div>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#FFF',
        }}
        title="商品管理"
        breadcrumb={{ routes }}
        subTitle="添加 sku 商品"
      />

      <Row>
        {/*<Divider />*/}
        <Col
          span={24}
          style={{
            marginTop: '24px',
            // height: "50px",
            backgroundColor: '#FFF',
          }}
        >
          <Row>
            <Col span={22} offset={1}>
              {/* 添加 sku 商品的表单域 */}
              <AddSkuItemForm
                onCancel={props.onCancel}
                onSubmit={props.onSubmit}
                onShowSkuClassModal={props.onShowSkuClassModal}
                onBeforeUploadTopSkuPic={props.onBeforeUploadTopSkuPic}
                onBeforeUploadBottomSkuPic={props.onBeforeUploadBottomSkuPic}
                onChangeTopSkuPic={props.onChangeTopSkuPic}
                onPreviewTopSkuPic={props.onPreviewTopSkuPic}
                onPreviewBottomSkuPic={props.onPreviewBottomSkuPic}
                onCancelTopSkuPic={props.onCancelTopSkuPic}
                onCancelBottomSkuPic={props.onCancelBottomSkuPic}
                onRemoveTopSkuPic={props.onRemoveTopSkuPic}
                onRemoveBottomSkuPic={props.onRemoveBottomSkuPic}
                onGetToken={props.onGetToken}
                onInitIdData={props.onInitIdData}
                onCustomTopUpload={props.onCustomTopUpload}
                onCustomBottomUpload={props.onCustomBottomUpload}
                onChangeNewInputVal={props.onChangeNewInputVal}
                isShowSkuClassModal={props.isShowSkuClassModal}
                addSku={props.addSku}
                normFileTopPic={props.normFileTopPic}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddSkuItem;
