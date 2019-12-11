import * as qiniu from 'qiniu-js';

export function uploadPics(file, token) {
  console.log('()()');
  console.log(file);
  // const len = files.length;

  const putExtra = {
    // 上传文件的配置
    fname: '', // 文件的原文件名
    params: {}, // 存放自定义变量
    mimeType: ['image/png', 'image/jpeg', 'image/gif'], // 上传文件类型, null 自动判断
  };
  // const token = TOKEN; // 上传凭证
  const config = {
    // 上传时的配置
    useCdnDomain: true, // 使用 CDN 加速
    region: qiniu.region.z1, // 上传域名区域 ( null, undefined ) 自动判断
  };

  // 迭代上传
  // for (let i = 0; i < len; i++) {

  // const key = files[i].name; // 上传文件的名称
  const observable = qiniu.upload(file, null, token, putExtra, config);

  observable.subscribe({
    next: res => {
      // 上传中的回调 ( 可获取上传进度信息 )
      // 进度 ...
      console.log(res);
    },
    error: err => {
      // 上传失败的回调 ( 可获取上传失败的信息 )
      console.warn(err.message);
    },
    complete: res => {
      // 上传成功的回调 ( 可获群上传成功的信息 )
      console.log(res);
    },
  });
  // }
  // return `images.ikuanguang.com/${ res.hash }`;
}
