import Mock from 'mockjs';

// const list = Mock.mock({
// 	goodsList: [
// 		{
// 			key: "0",
// 			goodsName: "农夫山泉17.5°苹果",
// 			goodsBrand: "农夫山泉",
// 			goodsShelfStatus: true,
// 			goodsPrice: "99.9",
// 			goodsSpecs: {
// 				size_mm_little: 80,
// 				size_mm_big: 84
// 			},
// 			goodsClasses: "生鲜/水果",
// 			goodsPics: [
// 				"http://m.360buyimg.com/babel/jfs/t1/7962/38/13142/249249/5c4046a7E2fc70ca3/d3ad6a4d86f75023.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年11月05日 05:30:23",
// 		},
// 		{
// 			key: "1",
// 			goodsName: "森海塞尔（Sennheiser）MomentumTrueWireless 真无线蓝牙hifi发烧入耳式耳机",
// 			goodsBrand: "森海塞尔",
// 			goodsShelfStatus: true,
// 			goodsPrice: "1999",
// 			goodsSpecs: {
// 				model_BlueTooth: 5.0,
// 				color: "黑色"
// 			},
// 			goodsClasses: "非食/数码/耳机",
// 			goodsPics: [
// 				"http://img14.360buyimg.com/n7/jfs/t30643/211/1006570376/203633/67e43a6f/5c0498a8N619250cf.jpg"
// 			],
// 			goodRange: "外县",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年1月05日 05:30:23",
// 		},
// 		{
// 			key: "2",
// 			goodsName: "萤石 CP1云台网络摄像机 高清wifi家用安防监控摄像头 双向语音 水平全景 人形追踪 海康威视-智能安防品牌",
// 			goodsBrand: "萤石",
// 			goodsShelfStatus: false,
// 			goodsPrice: "179",
// 			goodsSpecs: {
//
// 			},
// 			goodsClasses: "非食/数码/摄像头",
// 			goodsPics: [
// 				"http://m.360buyimg.com/babel/jfs/t1/98529/17/1344/227701/5dbd3639E7c71339b/fd091ce3cf032760.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年06月06日 05:30:23",
// 		},
// 		{
// 			key: "3",
// 			goodsName: "伟嘉 宠物猫粮",
// 			goodsBrand: "伟嘉",
// 			goodsShelfStatus: true,
// 			goodsPrice: "161.00",
// 			goodsSpecs: {
// 				quality_kg: 5,
// 				flavor: "海鲜"
// 			},
// 			goodsClasses: "食品/宠物",
// 			goodsPics: [
// 				"http://img11.360buyimg.com/n7/jfs/t1/68078/20/2156/154049/5d07423cE7b6892e0/74d4ab591a70ebc2.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年08月05日 06:05:23",
// 		},
// 		{
// 			key: "4",
// 			goodsName: "崂山啤酒",
// 			goodsBrand: "崂山",
// 			goodsShelfStatus: true,
// 			goodsPrice: "73.00",
// 			goodsSpecs: {
// 				quality_ml: 500,
// 				single_num: 12
// 			},
// 			goodsClasses: "食品/酒水",
// 			goodsPics: [
// 				"http://img14.360buyimg.com/jdcms/s130x130_jfs/t1/53788/25/2180/147440/5d01aea1E66513c97/f1f6ff7a4645b22b.jpg!q80"
// 			],
// 			goodRange: "外县",
// 			goodsStock: "32",
// 			description: "test data ...",
// 			upperTime: "2019年11月05日 05:30:23",
// 		},
// 		{
// 			key: "5",
// 			goodsName: "博朗（BRAUN）电动剃须刀",
// 			goodsBrand: "博朗",
// 			goodsShelfStatus: false,
// 			goodsPrice: "699.00",
// 			goodsSpecs: {
// 				color: [
// 					"5040S", "5050CC", "5145", "52s", "52b"
// 				]
// 			},
// 			goodsClasses: "非食/洗化",
// 			goodsPics: [
// 				"http://img12.360buyimg.com/n7/jfs/t1/99240/36/1545/154116/5dc13401E08cbd5f1/0a59ccfe9b552ea0.jpg"
// 			],
// 			goodRange: "外县",
// 			goodsStock: "200",
// 			description: "test data ...",
// 			upperTime: "2017年12月05日 05:05:23",
// 		},
// 		{
// 			key: "6",
// 			goodsName: "徐福记 沙皇礼盒 沙琪玛礼盒整箱糕点心",
// 			goodsBrand: "徐福记",
// 			goodsShelfStatus: true,
// 			goodsPrice: "69.90",
// 			goodsSpecs: {
// 				quality_g: 1471,
//
// 			},
// 			goodsClasses: "食品/零食",
// 			goodsPics: [
// 				"http://img10.360buyimg.com/jdcms/s150x150_jfs/t1/15694/38/2510/334274/5c1db3d0E6e16b307/d7016e8ee2562ede.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "200",
// 			description: "test data ...",
// 			upperTime: "2018年12月05日 11:30:23",
// 		},
// 		{
// 			key: "7",
// 			goodsName: "五粮液52度普五",
// 			goodsBrand: "五粮液",
// 			goodsShelfStatus: true,
// 			goodsPrice: "1268.00",
// 			goodsSpecs: {
// 				degree: 52,
// 				quality_ml: 500
// 			},
// 			goodsClasses: "食品/酒水",
// 			goodsPics: [
// 				"http://img13.360buyimg.com/n2/jfs/t1/119/18/11273/74838/5bcd65c4E230d9279/01c78d613e673803.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "600",
// 			description: "test data ...",
// 			upperTime: "2019年11月05日 16:30:23",
// 		},
// 		{
// 			key: "8",
// 			goodsName: "白猫柠檬红茶洗洁精",
// 			goodsBrand: "白猫",
// 			goodsShelfStatus: true,
// 			goodsPrice: "31.90",
// 			goodsSpecs: {
// 				quality_kg: 5,
// 			},
// 			goodsClasses: "非食/洗化",
// 			goodsPics: [
// 				"http://img12.360buyimg.com/jdcms/s130x130_jfs/t21757/217/520900166/314564/f5ba129/5b0fca25Nef50547b.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "800",
// 			description: "test data ...",
// 			upperTime: "2019年11月04日 05:39:23",
// 		},
// 		{
// 			key: "9",
// 			goodsName: "加多宝 凉茶植物饮料",
// 			goodsBrand: "加多宝",
// 			goodsShelfStatus: true,
// 			goodsPrice: "40.00",
// 			goodsSpecs: {
// 				quality_ml: 310,
// 				single_num: 15
// 			},
// 			goodsClasses: "食品/饮料",
// 			goodsPics: [
// 				"http://img11.360buyimg.com/jdcms/s130x130_jfs/t16144/106/2484891868/179359/6759343c/5ab4b23dN83b9b0fc.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "90",
// 			description: "test data ...",
// 			upperTime: "2018年03月05日 05:30:23",
// 		},
// 		{
// 			key: "10",
// 			goodsName: "加多宝 凉茶植物饮料",
// 			goodsBrand: "加多宝",
// 			goodsShelfStatus: true,
// 			goodsPrice: "40.00",
// 			goodsSpecs: {
// 				quality_ml: 310,
// 				single_num: 15
// 			},
// 			goodsClasses: "食品/饮料",
// 			goodsPics: [
// 				"http://img11.360buyimg.com/jdcms/s130x130_jfs/t16144/106/2484891868/179359/6759343c/5ab4b23dN83b9b0fc.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "90",
// 			description: "test data ...",
// 			upperTime: "2018年03月05日 05:30:23",
// 		},
// 		{
// 			key: "11",
// 			goodsName: "白猫柠檬红茶洗洁精",
// 			goodsBrand: "白猫",
// 			goodsShelfStatus: true,
// 			goodsPrice: "31.90",
// 			goodsSpecs: {
// 				quality_kg: 5,
// 			},
// 			goodsClasses: "非食/洗化",
// 			goodsPics: [
// 				"http://img12.360buyimg.com/jdcms/s130x130_jfs/t21757/217/520900166/314564/f5ba129/5b0fca25Nef50547b.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "800",
// 			description: "test data ...",
// 			upperTime: "2019年11月04日 05:39:23",
// 		},
// 		{
// 			key: "12",
// 			goodsName: "五粮液52度普五",
// 			goodsBrand: "五粮液",
// 			goodsShelfStatus: true,
// 			goodsPrice: "1268.00",
// 			goodsSpecs: {
// 				degree: 52,
// 				quality_ml: 500
// 			},
// 			goodsClasses: "食品/酒水",
// 			goodsPics: [
// 				"http://img13.360buyimg.com/n2/jfs/t1/119/18/11273/74838/5bcd65c4E230d9279/01c78d613e673803.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "600",
// 			description: "test data ...",
// 			upperTime: "2019年11月05日 16:30:23",
// 		},
// 		{
// 			key: "13",
// 			goodsName: "徐福记 沙皇礼盒 沙琪玛礼盒整箱糕点心",
// 			goodsBrand: "徐福记",
// 			goodsShelfStatus: true,
// 			goodsPrice: "69.90",
// 			goodsSpecs: {
// 				quality_g: 1471,
//
// 			},
// 			goodsClasses: "食品/零食",
// 			goodsPics: [
// 				"http://img10.360buyimg.com/jdcms/s150x150_jfs/t1/15694/38/2510/334274/5c1db3d0E6e16b307/d7016e8ee2562ede.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "200",
// 			description: "test data ...",
// 			upperTime: "2018年12月05日 11:30:23",
// 		},
// 		{
// 			key: "14",
// 			goodsName: "博朗（BRAUN）电动剃须刀",
// 			goodsBrand: "博朗",
// 			goodsShelfStatus: false,
// 			goodsPrice: "699.00",
// 			goodsSpecs: {
// 				color: [
// 					"5040S", "5050CC", "5145", "52s", "52b"
// 				]
// 			},
// 			goodsClasses: "非食/洗化",
// 			goodsPics: [
// 				"http://img12.360buyimg.com/n7/jfs/t1/99240/36/1545/154116/5dc13401E08cbd5f1/0a59ccfe9b552ea0.jpg"
// 			],
// 			goodRange: "外县",
// 			goodsStock: "200",
// 			description: "test data ...",
// 			upperTime: "2017年12月05日 05:05:23",
// 		},
// 		{
// 			key: "15",
// 			goodsName: "崂山啤酒",
// 			goodsBrand: "崂山",
// 			goodsShelfStatus: true,
// 			goodsPrice: "73.00",
// 			goodsSpecs: {
// 				quality_ml: 500,
// 				single_num: 12
// 			},
// 			goodsClasses: "食品/酒水",
// 			goodsPics: [
// 				"http://img14.360buyimg.com/jdcms/s130x130_jfs/t1/53788/25/2180/147440/5d01aea1E66513c97/f1f6ff7a4645b22b.jpg!q80"
// 			],
// 			goodRange: "外县",
// 			goodsStock: "32",
// 			description: "test data ...",
// 			upperTime: "2019年11月05日 05:30:23",
// 		},
// 		{
// 			key: "16",
// 			goodsName: "伟嘉 宠物猫粮",
// 			goodsBrand: "伟嘉",
// 			goodsShelfStatus: true,
// 			goodsPrice: "161.00",
// 			goodsSpecs: {
// 				quality_kg: 5,
// 				flavor: "海鲜"
// 			},
// 			goodsClasses: "食品/宠物",
// 			goodsPics: [
// 				"http://img11.360buyimg.com/n7/jfs/t1/68078/20/2156/154049/5d07423cE7b6892e0/74d4ab591a70ebc2.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年08月05日 06:05:23",
// 		},
// 		{
// 			key: "17",
// 			goodsName: "萤石 CP1云台网络摄像机 高清wifi家用安防监控摄像头 双向语音 水平全景 人形追踪 海康威视-智能安防品牌",
// 			goodsBrand: "萤石",
// 			goodsShelfStatus: false,
// 			goodsPrice: "179",
// 			goodsSpecs: {
//
// 			},
// 			goodsClasses: "非食/数码/摄像头",
// 			goodsPics: [
// 				"http://m.360buyimg.com/babel/jfs/t1/98529/17/1344/227701/5dbd3639E7c71339b/fd091ce3cf032760.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年06月06日 05:30:23",
// 		},
// 		{
// 			key: "18",
// 			goodsName: "森海塞尔（Sennheiser）MomentumTrueWireless 真无线蓝牙hifi发烧入耳式耳机",
// 			goodsBrand: "森海塞尔",
// 			goodsShelfStatus: true,
// 			goodsPrice: "1999",
// 			goodsSpecs: {
// 				model_BlueTooth: 5.0,
// 				color: "黑色"
// 			},
// 			goodsClasses: "非食/数码/耳机",
// 			goodsPics: [
// 				"http://img14.360buyimg.com/n7/jfs/t30643/211/1006570376/203633/67e43a6f/5c0498a8N619250cf.jpg"
// 			],
// 			goodRange: "外县",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年1月05日 05:30:23",
// 		},
// 		{
// 			key: "19",
// 			goodsName: "农夫山泉17.5°苹果",
// 			goodsBrand: "农夫山泉",
// 			goodsShelfStatus: true,
// 			goodsPrice: "99.9",
// 			goodsSpecs: {
// 				size_mm_little: 80,
// 				size_mm_big: 84
// 			},
// 			goodsClasses: "生鲜/水果",
// 			goodsPics: [
// 				"http://m.360buyimg.com/babel/jfs/t1/7962/38/13142/249249/5c4046a7E2fc70ca3/d3ad6a4d86f75023.jpg"
// 			],
// 			goodRange: "市区",
// 			goodsStock: "100",
// 			description: "test data ...",
// 			upperTime: "2018年11月05日 05:30:23",
// 		},
// 	],
// 	totalCount: 200
// });
const list = Mock.mock({
  goodsList: [
    {
      goodsName: '农夫山泉17.5°苹果',
      goodsBrand: '农夫山泉',
      goodsShelfStatus: true,
      goodsPrice: '99.9',
      goodsSpecs: {
        size_mm_little: 80,
        size_mm_big: 84,
      },
      goodsClasses: '生鲜/水果',
      goodsPics: [
        'http://m.360buyimg.com/babel/jfs/t1/7962/38/13142/249249/5c4046a7E2fc70ca3/d3ad6a4d86f75023.jpg',
      ],
      goodRange: '市区',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年11月05日 05:30:23',
    },
    {
      goodsName: '森海塞尔（Sennheiser）MomentumTrueWireless 真无线蓝牙hifi发烧入耳式耳机',
      goodsBrand: '森海塞尔',
      goodsShelfStatus: true,
      goodsPrice: '1999',
      goodsSpecs: {
        model_BlueTooth: 5.0,
        color: '黑色',
      },
      goodsClasses: '非食/数码/耳机',
      goodsPics: [
        'http://img14.360buyimg.com/n7/jfs/t30643/211/1006570376/203633/67e43a6f/5c0498a8N619250cf.jpg',
      ],
      goodRange: '外县',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年1月05日 05:30:23',
    },
    {
      goodsName:
        '萤石 CP1云台网络摄像机 高清wifi家用安防监控摄像头 双向语音 水平全景 人形追踪 海康威视-智能安防品牌',
      goodsBrand: '萤石',
      goodsShelfStatus: false,
      goodsPrice: '179',
      goodsSpecs: {},
      goodsClasses: '非食/数码/摄像头',
      goodsPics: [
        'http://m.360buyimg.com/babel/jfs/t1/98529/17/1344/227701/5dbd3639E7c71339b/fd091ce3cf032760.jpg',
      ],
      goodRange: '市区',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年06月06日 05:30:23',
    },
    {
      goodsName: '伟嘉 宠物猫粮',
      goodsBrand: '伟嘉',
      goodsShelfStatus: true,
      goodsPrice: '161.00',
      goodsSpecs: {
        quality_kg: 5,
        flavor: '海鲜',
      },
      goodsClasses: '食品/宠物',
      goodsPics: [
        'http://img11.360buyimg.com/n7/jfs/t1/68078/20/2156/154049/5d07423cE7b6892e0/74d4ab591a70ebc2.jpg',
      ],
      goodRange: '市区',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年08月05日 06:05:23',
    },
    {
      goodsName: '崂山啤酒',
      goodsBrand: '崂山',
      goodsShelfStatus: true,
      goodsPrice: '73.00',
      goodsSpecs: {
        quality_ml: 500,
        single_num: 12,
      },
      goodsClasses: '食品/酒水',
      goodsPics: [
        'http://img14.360buyimg.com/jdcms/s130x130_jfs/t1/53788/25/2180/147440/5d01aea1E66513c97/f1f6ff7a4645b22b.jpg!q80',
      ],
      goodRange: '外县',
      goodsStock: '32',
      description: 'test data ...',
      upperTime: '2019年11月05日 05:30:23',
    },
    {
      goodsName: '博朗（BRAUN）电动剃须刀',
      goodsBrand: '博朗',
      goodsShelfStatus: false,
      goodsPrice: '699.00',
      goodsSpecs: {
        color: ['5040S', '5050CC', '5145', '52s', '52b'],
      },
      goodsClasses: '非食/洗化',
      goodsPics: [
        'http://img12.360buyimg.com/n7/jfs/t1/99240/36/1545/154116/5dc13401E08cbd5f1/0a59ccfe9b552ea0.jpg',
      ],
      goodRange: '外县',
      goodsStock: '200',
      description: 'test data ...',
      upperTime: '2017年12月05日 05:05:23',
    },
    {
      goodsName: '徐福记 沙皇礼盒 沙琪玛礼盒整箱糕点心',
      goodsBrand: '徐福记',
      goodsShelfStatus: true,
      goodsPrice: '69.90',
      goodsSpecs: {
        quality_g: 1471,
      },
      goodsClasses: '食品/零食',
      goodsPics: [
        'http://img10.360buyimg.com/jdcms/s150x150_jfs/t1/15694/38/2510/334274/5c1db3d0E6e16b307/d7016e8ee2562ede.jpg',
      ],
      goodRange: '市区',
      goodsStock: '200',
      description: 'test data ...',
      upperTime: '2018年12月05日 11:30:23',
    },
    {
      goodsName: '五粮液52度普五',
      goodsBrand: '五粮液',
      goodsShelfStatus: true,
      goodsPrice: '1268.00',
      goodsSpecs: {
        degree: 52,
        quality_ml: 500,
      },
      goodsClasses: '食品/酒水',
      goodsPics: [
        'http://img13.360buyimg.com/n2/jfs/t1/119/18/11273/74838/5bcd65c4E230d9279/01c78d613e673803.jpg',
      ],
      goodRange: '市区',
      goodsStock: '600',
      description: 'test data ...',
      upperTime: '2019年11月05日 16:30:23',
    },
    {
      goodsName: '白猫柠檬红茶洗洁精',
      goodsBrand: '白猫',
      goodsShelfStatus: true,
      goodsPrice: '31.90',
      goodsSpecs: {
        quality_kg: 5,
      },
      goodsClasses: '非食/洗化',
      goodsPics: [
        'http://img12.360buyimg.com/jdcms/s130x130_jfs/t21757/217/520900166/314564/f5ba129/5b0fca25Nef50547b.jpg',
      ],
      goodRange: '市区',
      goodsStock: '800',
      description: 'test data ...',
      upperTime: '2019年11月04日 05:39:23',
    },
    {
      goodsName: '加多宝 凉茶植物饮料',
      goodsBrand: '加多宝',
      goodsShelfStatus: true,
      goodsPrice: '40.00',
      goodsSpecs: {
        quality_ml: 310,
        single_num: 15,
      },
      goodsClasses: '食品/饮料',
      goodsPics: [
        'http://img11.360buyimg.com/jdcms/s130x130_jfs/t16144/106/2484891868/179359/6759343c/5ab4b23dN83b9b0fc.jpg',
      ],
      goodRange: '市区',
      goodsStock: '90',
      description: 'test data ...',
      upperTime: '2018年03月05日 05:30:23',
    },
    {
      goodsName: '加多宝 凉茶植物饮料',
      goodsBrand: '加多宝',
      goodsShelfStatus: true,
      goodsPrice: '40.00',
      goodsSpecs: {
        quality_ml: 310,
        single_num: 15,
      },
      goodsClasses: '食品/饮料',
      goodsPics: [
        'http://img11.360buyimg.com/jdcms/s130x130_jfs/t16144/106/2484891868/179359/6759343c/5ab4b23dN83b9b0fc.jpg',
      ],
      goodRange: '市区',
      goodsStock: '90',
      description: 'test data ...',
      upperTime: '2018年03月05日 05:30:23',
    },
    {
      goodsName: '白猫柠檬红茶洗洁精',
      goodsBrand: '白猫',
      goodsShelfStatus: true,
      goodsPrice: '31.90',
      goodsSpecs: {
        quality_kg: 5,
      },
      goodsClasses: '非食/洗化',
      goodsPics: [
        'http://img12.360buyimg.com/jdcms/s130x130_jfs/t21757/217/520900166/314564/f5ba129/5b0fca25Nef50547b.jpg',
      ],
      goodRange: '市区',
      goodsStock: '800',
      description: 'test data ...',
      upperTime: '2019年11月04日 05:39:23',
    },
    {
      goodsName: '五粮液52度普五',
      goodsBrand: '五粮液',
      goodsShelfStatus: true,
      goodsPrice: '1268.00',
      goodsSpecs: {
        degree: 52,
        quality_ml: 500,
      },
      goodsClasses: '食品/酒水',
      goodsPics: [
        'http://img13.360buyimg.com/n2/jfs/t1/119/18/11273/74838/5bcd65c4E230d9279/01c78d613e673803.jpg',
      ],
      goodRange: '市区',
      goodsStock: '600',
      description: 'test data ...',
      upperTime: '2019年11月05日 16:30:23',
    },
    {
      goodsName: '徐福记 沙皇礼盒 沙琪玛礼盒整箱糕点心',
      goodsBrand: '徐福记',
      goodsShelfStatus: true,
      goodsPrice: '69.90',
      goodsSpecs: {
        quality_g: 1471,
      },
      goodsClasses: '食品/零食',
      goodsPics: [
        'http://img10.360buyimg.com/jdcms/s150x150_jfs/t1/15694/38/2510/334274/5c1db3d0E6e16b307/d7016e8ee2562ede.jpg',
      ],
      goodRange: '市区',
      goodsStock: '200',
      description: 'test data ...',
      upperTime: '2018年12月05日 11:30:23',
    },
    {
      goodsName: '博朗（BRAUN）电动剃须刀',
      goodsBrand: '博朗',
      goodsShelfStatus: false,
      goodsPrice: '699.00',
      goodsSpecs: {
        color: ['5040S', '5050CC', '5145', '52s', '52b'],
      },
      goodsClasses: '非食/洗化',
      goodsPics: [
        'http://img12.360buyimg.com/n7/jfs/t1/99240/36/1545/154116/5dc13401E08cbd5f1/0a59ccfe9b552ea0.jpg',
      ],
      goodRange: '外县',
      goodsStock: '200',
      description: 'test data ...',
      upperTime: '2017年12月05日 05:05:23',
    },
    {
      goodsName: '崂山啤酒',
      goodsBrand: '崂山',
      goodsShelfStatus: true,
      goodsPrice: '73.00',
      goodsSpecs: {
        quality_ml: 500,
        single_num: 12,
      },
      goodsClasses: '食品/酒水',
      goodsPics: [
        'http://img14.360buyimg.com/jdcms/s130x130_jfs/t1/53788/25/2180/147440/5d01aea1E66513c97/f1f6ff7a4645b22b.jpg!q80',
      ],
      goodRange: '外县',
      goodsStock: '32',
      description: 'test data ...',
      upperTime: '2019年11月05日 05:30:23',
    },
    {
      goodsName: '伟嘉 宠物猫粮',
      goodsBrand: '伟嘉',
      goodsShelfStatus: true,
      goodsPrice: '161.00',
      goodsSpecs: {
        quality_kg: 5,
        flavor: '海鲜',
      },
      goodsClasses: '食品/宠物',
      goodsPics: [
        'http://img11.360buyimg.com/n7/jfs/t1/68078/20/2156/154049/5d07423cE7b6892e0/74d4ab591a70ebc2.jpg',
      ],
      goodRange: '市区',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年08月05日 06:05:23',
    },
    {
      goodsName:
        '萤石 CP1云台网络摄像机 高清wifi家用安防监控摄像头 双向语音 水平全景 人形追踪 海康威视-智能安防品牌',
      goodsBrand: '萤石',
      goodsShelfStatus: false,
      goodsPrice: '179',
      goodsSpecs: {},
      goodsClasses: '非食/数码/摄像头',
      goodsPics: [
        'http://m.360buyimg.com/babel/jfs/t1/98529/17/1344/227701/5dbd3639E7c71339b/fd091ce3cf032760.jpg',
      ],
      goodRange: '市区',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年06月06日 05:30:23',
    },
    {
      goodsName: '森海塞尔（Sennheiser）MomentumTrueWireless 真无线蓝牙hifi发烧入耳式耳机',
      goodsBrand: '森海塞尔',
      goodsShelfStatus: true,
      goodsPrice: '1999',
      goodsSpecs: {
        model_BlueTooth: 5.0,
        color: '黑色',
      },
      goodsClasses: '非食/数码/耳机',
      goodsPics: [
        'http://img14.360buyimg.com/n7/jfs/t30643/211/1006570376/203633/67e43a6f/5c0498a8N619250cf.jpg',
      ],
      goodRange: '外县',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年1月05日 05:30:23',
    },
    {
      goodsName: '农夫山泉17.5°苹果',
      goodsBrand: '农夫山泉',
      goodsShelfStatus: true,
      goodsPrice: '99.9',
      goodsSpecs: {
        size_mm_little: 80,
        size_mm_big: 84,
      },
      goodsClasses: '生鲜/水果',
      goodsPics: [
        'http://m.360buyimg.com/babel/jfs/t1/7962/38/13142/249249/5c4046a7E2fc70ca3/d3ad6a4d86f75023.jpg',
      ],
      goodRange: '市区',
      goodsStock: '100',
      description: 'test data ...',
      upperTime: '2018年11月05日 05:30:23',
    },
  ],
  totalCount: 200,
});

module.exports = {
  ['GET /api/index/goodsList'](req, res) {
    res.status(200).json(list);
  },
};
