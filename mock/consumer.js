const Mock = require('mockjs');

// 模拟登录的返回数据
const list = Mock.mock({
  msg: 'ok',
  role: 'business',
  user: {
    userName: '习大大',
    userPhone: '110',
    userAddress: '北京五道口',
  },
});

module.exports = {
  /* 拦截登录请求并返回模拟数据 */
  ['POST /api/login/account'](req, res) {
    res.status(200).json(list);
  },
};
