/*
 * @Author: Smile
 * @Date: 2020-12-14 09:12:02
 * @LastEditTime: 2020-12-14 09:37:19
 * @LastEditors: Smile
 * @Description: remarks
 */

const nodemailer = require("nodemailer");
const { default: Axios } = require("axios");
const schedule = require("node-schedule");

/**
 * 发送邮件函数
 * @param text 内容
 */
async function sendMail(text) {
  var user = "@qq.com";//自己的邮箱
  var pass = ""; //qq邮箱授权码,如何获取授权码下面有讲
  var to = "@qq.com";//对方的邮箱
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, //授权码,通过QQ获取
    },
  });
  let info = await transporter.sendMail({
    from: `亲爱的老公<${user}>`, // sender address
    to: `亲爱的老婆<${to}>`, // list of receivers
    subject: "亲爱的老婆", // Subject line
    text: text, // plain text body
  });
  console.log("发送成功");
}

/**
 * 获取彩虹屁
 */
function getHoneyedWords() {
  var url = "https://chp.shadiao.app/api.php";
  //获取这个接口的信息
  return Axios.get(url);
}

/**
 * node index.js
 * 即时发送获取的情话
 */
getHoneyedWords().then(res=>{
  console.log(res.data)
  //发送邮件
  sendMail(res.data);
})


// /**
//  * 每天定时发送
//  * 这样每天下午5点21分就会自动发送一句情话！
//  */
// schedule.scheduleJob({ hour: 17, minute: 21 }, function () {
//   console.log("启动任务:" + new Date());
//   getHoneyedWords().then((res) => {
//     console.log(res.data);
//     sendMail(res.data);
//   });
// });


