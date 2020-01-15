const Mock = require('mockjs');

// 模拟登录的返回数据
const list = Mock.mock('/api/login/account', 'POST', option => {

  return {
    msg: 'ok',
    role: 'business',
    user: {
      userName: '习大大',
      userPhone: '110',
      userAddress: '北京五道口',
    },
  };
});

module.exports = {
  /* 拦截登录请求并返回模拟数据 */
  ['POST /api/login/account'](req, res) {
    const { userPwd, userName } = req.body.data;
    const { type } = req.body;
    if (userPwd === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (userPwd === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user', // 权限 - 宽广
      });
      return;
    }

    if (userPwd === 'e10adc3949ba59abbe56e057f20f883e' && userName === '张无忌') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'KG',
        user: {
          name: '张无忌',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
        },
      });
      return;
    }
    if (userPwd === 'e10adc3949ba59abbe56e057f20f883e' && userName === '张三') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'Tripartite', // 权限 - 三方商户
        user: {
          name: '张三',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
        },
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });

  },
};
