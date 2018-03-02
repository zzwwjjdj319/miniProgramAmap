//app.js
let wechat = require('./utils/wechat.js');
App({
  onLaunch() {
    //调用API从本地缓存中获取数据
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo() {

    if (this.globalData.userInfo) return Promise.resolve(this.globalData.userInfo);
    return wechat.login()
      .then(data => wechat.getUserInfo())
      .then(data => {
        this.globalData.userInfo = data.userInfo;
        return Promise.resolve(this.globalData.userInfo);
      })
      .catch((e) => console.log(e));
  },
  globalData: {
    userInfo: null
  }
})