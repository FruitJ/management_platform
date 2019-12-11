import Mock from 'mockjs';
const list = Mock.mock({});

let category = [
  {
    name: 'Zhejiang',
    id: 1,
    child: {
      name: 'Hangzhou',
      id: 10,
      child: {
        name: 'West Lake',
        id: 1001,
      },
    },
  },
  {
    name: 'Jiangsu',
    id: 2,
    child: {
      name: 'Nanjing',
      id: 20,
      child: {
        name: 'Zhong Hua Men',
        id: 2001,
      },
    },
  },
];

let brand = [
  {
    name: '蒙牛',
    id: 1,
  },
  {
    name: '舒肤佳',
    id: 2,
  },
];

let specs = [
  {
    name: '红色',
    id: 1,
  },
  {
    name: '绿色',
    id: 2,
  },
  {
    name: '紫色',
    id: 3,
  },
  {
    name: '金色',
    id: 4,
  },
  {
    name: '32 寸',
    id: 21,
  },
  {
    name: '56 寸',
    id: 22,
  },
  {
    name: '96 寸',
    id: 23,
  },
  {
    name: '128 寸',
    id: 24,
  },
  {
    name: '7.0',
    id: 31,
  },
  {
    name: '8.0',
    id: 32,
  },
  {
    name: '9.0',
    id: 33,
  },
];

let idData = {
  category,
  brand,
  specs,
};

module.exports = {
  ['POST /api/getToken'](req, res) {
    // 测试接收的参数
    console.log(req.body);
    // 返回 token 值
    return res.status(200).json({ token: 'abcdefg123hijklmn456' });
  },
  /*['POST /api/uploadTopPicService'](req, res) {
	
		// 返回图片地址
		return res.status(200).json({
			uid: new Date().getTime(),
			name: "test.png",
			status: 'done',
			url: "https://cdn.pixabay.com/photo/2019/12/05/00/36/leaves-4673997__340.jpg"
		});
	},*/

  /*['POST /api/uploadBottomPicService'](req, res) {
	
		// 返回图片地址
		return res.status(200).json({
			uid: new Date().getTime(),
			name: "test.png",
			status: 'done',
			url: "https://cdn.pixabay.com/photo/2019/12/05/00/36/leaves-4673997__340.jpg"
		});
	},*/

  ['POST /api/initIdDataService'](req, res) {
    return res.status(200).json(idData);
  },

  /*['POST /api/createNewCategoryService'](req, res) {
		let temp = {
			name: req.body.category,
			id: 3,
		};
		category.push(temp);
		return res.status(200).json(category);
	},*/
};
