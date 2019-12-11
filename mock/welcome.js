const Mock = require('mockjs');

let list = Mock.mock({
  app_title: '宽广三方商户管理平台',
  chatContact: 'Contact us',
  chatJoin: 'Join us',
  app_content_title: 'Welcome KG',
  ctlGoods: '商品管理',
  cptAppoah: '多方协作',
  absSafe: '绝对安全',
  cldService: '云端服务',
  app_copyright: 'Copyright © 2019 河北宽广控股集团 - 信息管理中心',
});

module.exports = {
  ['GET /api/initWelcomeData'](req, res) {
    console.log(req.body);
    res.status(200).json(list);
  },
};
