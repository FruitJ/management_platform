import Mock from 'mockjs';

const list = Mock.mock({
  spuList: [
    // spu
    {
      spuName: 'Mac Book Pro 13.3',
      spuStatus: true,
      spuUpperTime: '1571469754000',
      spuClasses: '电子/电脑',
      spuPic:
        'http://img12.360buyimg.com/n1/jfs/t1/93918/20/2243/70494/5dccce6cEf5057d9c/bbfa8b1f949930d5.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 1,
      key: 1,
    },
    {
      spuName: '联想拯救者 Y7000P',
      spuStatus: true,
      spuUpperTime: '1574148154000',
      spuClasses: '电子/电脑',
      spuPic:
        'http://img12.360buyimg.com/n1/s450x450_jfs/t1/79105/5/1549/275769/5cfe0819E05803cb2/d56d258b14bad253.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 2,
      key: 2,
    },
    {
      spuName: '程序员的数学 1+2+3',
      spuStatus: true,
      spuUpperTime: '1574025756000',
      spuClasses: '教育/书本',
      spuPic:
        'http://img13.360buyimg.com/n1/jfs/t5803/288/2020235664/69868/ed880319/592bf16eN6273526f.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 3,
      key: 3,
    },
    {
      spuName: '华为 HUAWEI Mate 30 5G',
      spuStatus: true,
      spuUpperTime: '1573873355000',
      spuClasses: '电子/手机',
      spuPic:
        'http://img14.360buyimg.com/n1/s450x450_jfs/t1/74488/24/15904/249552/5dd2a694Eacbfc3df/8148d30b435844f1.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 4,
      key: 4,
    },
    {
      spuName: '炫迈（Stride）无糖口香糖',
      spuStatus: true,
      spuUpperTime: '1566180514000',
      spuClasses: '食品/口香糖',
      spuPic:
        'http://img14.360buyimg.com/n1/jfs/t15730/192/2497693438/171725/28f9189c/5aaf8c76N7d1dd75b.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 5,
      key: 5,
    },
    {
      spuName: '山庄老酒 白酒 铁帽子 浓香型 38度',
      spuStatus: true,
      spuUpperTime: '1563600274000',
      spuClasses: '饮品/酒水',
      spuPic:
        'http://img10.360buyimg.com/n1/jfs/t1/66810/9/2604/487699/5d0d7c3dEd67447fc/319d49c1c127306b.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 6,
      key: 6,
    },
    {
      spuName: 'Beats Solo3 Wireless 头戴式 蓝牙无线耳机',
      spuStatus: true,
      spuUpperTime: '1573878992000',
      spuClasses: '电子/耳麦',
      spuPic:
        'http://img12.360buyimg.com/n1/s450x450_jfs/t21451/161/877158157/428151/c0b73065/5b1a4227Ncef783af.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 7,
      key: 7,
    },
    {
      spuName: '法国原瓶进口红酒干红葡萄酒 礼盒整箱装',
      spuStatus: true,
      spuUpperTime: '1570673434000',
      spuClasses: '饮品/酒水',
      spuPic:
        'http://img10.360buyimg.com/n1/jfs/t1/81429/5/14466/123824/5dbf789cE059bb9f1/256186f1f4abd3ea.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 8,
      key: 8,
    },
    {
      spuName: 'VANS（万斯）低帮情侣板鞋',
      spuStatus: true,
      spuUpperTime: '1568700905000',
      spuClasses: '衣服/鞋子',
      spuPic:
        'http://img11.360buyimg.com/n5/s450x450_jfs/t1/9205/9/8616/89163/5c0e0c94Ea426d825/1ec5c6b50f0c7ec0.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 9,
      key: 9,
    },
    {
      spuName: '新款正宗越南铁木砧板厨房家用实木圆形切菜板蚬木案板',
      spuStatus: true,
      spuUpperTime: '1555291205000',
      spuClasses: '厨房/菜板',
      spuPic:
        'http://img14.360buyimg.com/n1/jfs/t1/62373/10/11521/183907/5d8dacbdE4bed0a68/cfb0e3e68acc7e3d.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 10,
      key: 10,
    },
    {
      spuName: '山水（SANSUI）M99蓝牙麦克风唱吧无线话筒音响一体全民K歌神器',
      spuStatus: true,
      spuUpperTime: '1568009166000',
      spuClasses: '音乐/麦克风',
      spuPic:
        'http://img13.360buyimg.com/n1/jfs/t1/70609/24/14928/165011/5dc77494Eaae00717/8d2cf624a1644f6c.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 11,
      key: 11,
    },
    {
      spuName: 'Orion 好丽友 休闲零食大礼包',
      spuStatus: true,
      spuUpperTime: '1560853354000',
      spuClasses: '零食/薯片',
      spuPic:
        'http://img13.360buyimg.com/n1/jfs/t1/32847/9/6510/482610/5c8f6f4bEc031c8d9/90141e53b04f0520.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 12,
      key: 12,
    },
    {
      spuName: '玉兰油OLAY护肤套装新生塑颜礼盒化妆品套装4件套',
      spuStatus: true,
      spuUpperTime: '1521015694000',
      spuClasses: '化妆品/护肤',
      spuPic:
        'http://img12.360buyimg.com/n1/jfs/t1/61909/15/15155/311904/5dc843e5Eb92d03aa/ed77da0079b54b8b.jpg',
      spuStock: 100,
      spuRealTimeStock: 98,
      spu_id: 13,
      key: 13,
    },
  ],
  totalCount: 200,
});

module.exports = {
  ['POST /api/index/spuList'](req, res) {
    return res.status(200).json(list);
  },
  ['POST /api/spuList/get'](req, res) {
    let data = {
      spuList: [],
    };
    let spu_id = Number(req.body.spu_id);
    data.spuList = list.spuList.slice(0, list.spuList.length);
    if (spu_id === 0) {
      return res.status(200).json(data);
    } else {
      data.spuList = data.spuList.filter((item, index) => item.spu_id === spu_id);
      return res.status(200).json(data);
    }
  },
  ['POST /api/initSpuNames'](req, res) {
    return res.status(200).json(
      list.spuList.map((item, index) => ({
        spuName: item.spuName,
        spu_id: item.spu_id,
      })),
    );
  },
  ['POST /api/goods/update'](req, res) {
    return res.status(200).json('1');
  },
  ['POST /api/getSpuClasses'](req, res) {
    return res.status(200).json([
      {
        value: '电子',
        label: '电子',
        children: [
          {
            value: '电脑',
            label: '电脑',
          },
          {
            value: '手机',
            label: '手机',
          },
          {
            value: '耳麦',
            label: '耳麦',
          },
        ],
      },
      {
        value: '教育',
        label: '教育',
        children: [
          {
            value: '书本',
            label: '书本',
          },
        ],
      },
      {
        value: '食品',
        label: '食品',
        children: [
          {
            value: '口香糖',
            label: '口香糖',
          },
        ],
      },
      {
        value: '饮品',
        label: '饮品',
        children: [
          {
            value: '酒水',
            label: '酒水',
          },
        ],
      },
    ]);
  },
  ['POST /api/selectClassesUpdateSpu'](req, res) {

    return res.status(200).json('1');
  },
};
