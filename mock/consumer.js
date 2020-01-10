const Mock = require('mockjs');

// 模拟登录的返回数据
/*const list = Mock.mock({
  msg: 'ok',
  role: 'business',
  user: {
    userName: '习大大',
    userPhone: '110',
    userAddress: '北京五道口',
  },
});*/
const list = Mock.mock('/api/login/account', 'POST', option => {
  console.log('sdadasdasda');

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
    const { userPwd, userName, type } = req.body;
    console.log(`userPwd: ${userPwd}; userName: ${userName}; type: ${type}`);
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
          email: 'antdesign@alipay.com',
          signature: '海纳百川，有容乃大',
          title: '交互专家',
          group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          tags: [
            {
              key: '0',
              label: '很有想法的',
            },
            {
              key: '1',
              label: '专注设计',
            },
            {
              key: '2',
              label: '辣~',
            },
            {
              key: '3',
              label: '大长腿',
            },
            {
              key: '4',
              label: '川妹子',
            },
            {
              key: '5',
              label: '海纳百川',
            },
          ],
          notifyCount: 12,
          unreadCount: 11,
          country: 'China',
          geographic: {
            province: {
              label: '浙江省',
              key: '330000',
            },
            city: {
              label: '杭州市',
              key: '330100',
            },
          },
          address: '西湖区工专路 77 号',
          phone: '0752-268888888',
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

    // console.log("s21d35a65d46a");
    // let str = JSON.stringify(req);
    // res.status(200).json(list);
  },
};
