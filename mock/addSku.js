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

let data = {
  spu_name: "Oppo R17",
  spu_barCode: "1a1a1a11a11a11a1a11a1",
  top_urls: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
  bottom_urls: ["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],
  specs: [
    {
      spec_id: 1,
      spec_name: "颜色",
      spec_option: [
        {
          name: "红色",
          id: 1,
        },
        {
          name: "紫色",
          id: 3,
        }
      ],
    },
    {
      spec_id: 2,
      spec_name: "尺寸",
      spec_option: [
        {
          name: "32 寸",
          id: 4,
        },
        {
          name: "56 寸",
          id: 5,
        }
      ],
    },
    {
      spec_id: 3,
      spec_name: "版本",
      spec_option: [
        {
          name: "7.0",
          id: 7,
        },
        {
          name: "8.0",
          id: 8,
        }
      ],
    },
  ],
  common: [
    {
      price: "1",
      stock: "12",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [1, 4, 7],
    },
    {
      price: "2",
      stock: "22",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [1, 4, 8],
    },
    {
      price: "3",
      stock: "32",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [1, 5, 7],
    },
    {
      price: "4",
      stock: "42",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [1, 5, 8],
    },
    {
      price: "5",
      stock: "52",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [3, 4, 7],
    },
    {
      price: "6",
      stock: "62",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [3, 4, 8],
    },
    {
      price: "7",
      stock: "72",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [3, 5, 7],
    },
    {
      price: "8",
      stock: "82",
      sku_url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      specs_id_arr: [3, 5, 8],
    },
  ],
};

let count = dataSource.length;
let num = childDataSource.length;

module.exports = {
  ['POST /api/getToken'](req, res) {
    // 测试接收的参数
    // 返回 token 值
    return res.status(200).json({ token: 'abcdefg123hijklmn456' });
  },


  ['POST /api/initIdDataService'](req, res) {
    return res.status(200).json(idData);
  },

  
  ['POST /api/loadParentNodeDataService'](req, res) {
    res.status(200).json(dataSource);
  },
  ['POST /api/getNewParentNamesEleService'](req, res) {
    
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
    
    
    let data = childDataSource.filter(
        (item, index) => item.parent_id === Number(req.body.parent_id),
    );
    
    res.status(200).json(data);
  },
  ['POST /api/getNewChildNamesEleService'](req, res) {
    
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
    res.status(200).json(newElements);
  },
  
  ['POST /api/reqSpuDetailsInfoService'] (req, res) {
    
    res.status(200).json(data);
  },
  
};
