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


let dataSource = [
  {
    parent_id: 1,
    parent_name: '颜色',
  },
  {
    parent_id: 2,
    parent_name: '尺寸',
  },
  {
    parent_id: 3,
    parent_name: '版本',
  },
  {
    parent_id: 4,
    parent_name: 'color',
  },
  {
    parent_id: 5,
    parent_name: 'size',
  },
  {
    parent_id: 6,
    parent_name: 'version',
  },
];

let childDataSource = [
  {
    parent_id: 1,
    child_name: '红色',
    child_id: 1,
  },
  {
    parent_id: 1,
    child_name: '蓝色',
    child_id: 2,
  },
  {
    parent_id: 1,
    child_name: '紫色',
    child_id: 3,
  },
  {
    parent_id: 2,
    child_name: '32 寸',
    child_id: 4,
  },
  {
    parent_id: 2,
    child_name: '56 寸',
    child_id: 5,
  },
  {
    parent_id: 2,
    child_name: '128 寸',
    child_id: 6,
  },
  {
    parent_id: 3,
    child_name: '7.0',
    child_id: 7,
  },
  {
    parent_id: 3,
    child_name: '8.0',
    child_id: 8,
  },
  {
    parent_id: 3,
    child_name: '9.0',
    child_id: 9,
  },
];

let count = dataSource.length;
let num = childDataSource.length;

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
  
  
  ['POST /api/loadParentNodeDataService'](req, res) {
    res.status(200).json(dataSource);
  },
  ['POST /api/getNewParentNamesEleService'](req, res) {
    console.log('嘻嘻嘻嘻嘻嘻');
    console.log(req.body);
    
    if (dataSource.some((item, index) => item.parent_name !== req.body.parent_name)) {
      count += 1;
      
      let obj = {
        parent_id: count,
        parent_name: req.body.parent_name,
        // id: count,
      };
      dataSource.push(obj);
      delete obj.parent_name;
      res.status(200).json(obj);
    }
  },
  ['POST /api/loadChildNodeDataService'](req, res) {
    console.log('啦啦啦');
    console.log(req.body);
    
    /*childDataSource.forEach((item, index) => {
      if (item.parent_id === Number(req.body.parent_id)) {
        item.prop = req.body.prop;
      }
    });*/
    
    console.log("--------------------");
    console.log(req.body.parent_id);
    console.log(childDataSource);
    let data = childDataSource.filter(
        (item, index) => item.parent_id === Number(req.body.parent_id),
    );
    
    console.log("---");
    console.log(data);
    res.status(200).json(data);
  },
  ['POST /api/getNewChildNamesEleService'](req, res) {
    console.log('/api/getNewChildNamesEleService');
    console.log(req.body);
    
    let { newElements, prop } = req.body;
    newElements = newElements.map((item, index) => {
      num += 1;
      
      let obj = {
        child_id: num,
        child_name: item.child_name,
        parent_id: Number(item.parent_id),
      };
      
      return obj;
    });
    childDataSource.push(...newElements);
    /*newElements.forEach((item, index) => {
      delete item.child_name;
      delete item.parent_id;
    });*/
    console.log('呵呵');
    console.log(newElements);
    // console.log(Array.from(req.body));
    res.status(200).json(newElements);
  },
  
};
