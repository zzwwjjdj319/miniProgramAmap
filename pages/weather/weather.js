let app = getApp();
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");

Page({
  data: {
    weather: {}
  },
  onLoad() {
    amap.getWeather()
      .then(d => {
        console.log(d);
        this.setData({
          weather: d
        });
      })
      .catch(e => {
        console.log(e);
      })
  }
})