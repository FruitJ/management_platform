import React, {useEffect} from 'react';
import {
	Divider,
	Form,
	Icon,
	Input,
	PageHeader,
	Row,
	Col,
	Upload,
	Modal,
	Button,
} from 'antd';

const routes = [
	{
		path: 'index',
		breadcrumbName: '商品管理',
	},
	{
		path: 'first',
		breadcrumbName: 'spu 详情',
	},
];

// const SpuDetailsForm = ({ props }) => {
const SpuDetailsForm = props => {
// class SpuDetails extends Component {
	
	useEffect(() => {
		console.log(props);
		
		// 解析路径参数
		const spu_id = Number(props.urlParam.replace(":", ""));
		props.handleReReqSpuDetailsInfo(spu_id);
		
		// 打印当前页面的数据
		console.log("^&^ 分割线 ^&^");
		console.log(spu_id);
		console.log(props.spuDetails.spuDetailsInfo);
	}, []);
	
	
	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
	
	// Only show error after a field is touched.
	const spuBarCodeError = isFieldTouched('spuBarCode') && getFieldError('spuBarCode');
	const goodsNameError = isFieldTouched('goodsName') && getFieldError('goodsName');
	const goodsPicsError = isFieldTouched('goodsPics') && getFieldError('goodsPics');
	
	// const { previewVisible, previewImage, fileList } = this.state;
	const uploadButton = (
		<div>
			<Icon type="plus" />
			<div className="ant-upload-text">Upload</div>
		</div>
	);
	
	const handleClick = () => {
		console.log("分割线");
		console.log(props.spuDetails.spuDetailsInfo);
	};
	
	return (
        <div>
	        <PageHeader
		        style={{
			        border: '1px solid rgb(235, 237, 240)',
			        backgroundColor: '#FFF',
		        }}
		        title="商品管理"
		        breadcrumb={{ routes }}
		        subTitle="spu 详情"
	        />
	        <div style={{
	        	marginTop: "24px",
		        paddingTop: "10px",
	        	width: "100%",
		        height: "100%",
		        background: "#FFF"
	        }}>
				<div className = "basic-info">
					<Divider orientation="left">基本信息</Divider>
					<Form layout="horizontal"
					>
						<Row>
							<Col span = { 9 }
							     offset = { 2 }
							>
								<Form.Item validateStatus={spuBarCodeError ? 'error' : ''}
								           help={spuBarCodeError || ''}
								           label = "spu 条码"
								>
									{getFieldDecorator('spuBarCode', {
										rules: [{ required: false, message: 'Please input your username!' }],
									})(
										<Input
											prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="spu 条码"
										/>,
									)}
								</Form.Item>
							</Col>
							<Col span = { 9 }
							     offset = { 2 }
							     style={{
							        // marginLeft: "30px"
								    paddingLeft: "20px"
							     }}
							>
								<Form.Item validateStatus={goodsNameError ? 'error' : ''}
								           help={goodsNameError || ''}
								           label = "商品名称"
								>
									{getFieldDecorator('goodsName', {
										rules: [{ required: true, message: 'Please input your username!' }],
									})(
										<Input
											prefix={<Icon type="shop" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="商品名称"
										/>,
									)}
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span = { 9 }
								offset = { 2 }
							>
								<Form.Item validateStatus={goodsPicsError ? 'error' : ''}
								           help={goodsPicsError || ''}
								           label = "商品图片"
								>
									{getFieldDecorator('goodsPics', {
										rules: [{ required: true, message: 'Please input your username!' }],
									})(
										<>
											<Upload
												action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
												listType="picture-card"
												fileList={props.spuDetails.spu_picsFileList}
												// onPreview={this.handlePreview}
												// onChange={this.handleChange}
											>
												{props.spuDetails.spu_picsFileList.length >= 8 ? null : uploadButton}
											</Upload>
											<Modal visible={ false } footer={null} >
												<img alt="example" style={{ width: '100%' }}  />
											</Modal>
										</>
									)}
								</Form.Item>
							</Col>
							{/*<Col>
							
							</Col>*/}
						</Row>
					</Form>
				</div>
		       <div className = "specs-info">
			       <Divider orientation="left">规格信息</Divider>
			       <Button type="primary" onClick = { handleClick }>点我啊</Button>
			       
		       </div>
	        </div>
        </div>
    );
};

const SpuDetails = Form.create()(SpuDetailsForm);
export default SpuDetails;
