//logs.js
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
Page({
  data: {
    steps: [],
  },
  onLoad() {
    let steps = wx.getStorageSync("steps");
    this.setData({ steps })
  },
});
