//index.js
//获取应用实例
let app = getApp();
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
let markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    city: '',
    markerId: 0,
    controls: [
      {
        id: 0,
        position: {
          left: 10,
          top: 200,
          width: 40,
          height: 40
        },
        iconPath: "/images/circle1.png",
        clickable: true
      }
    ]
  },
  onLoad(e) {
    amap.getRegeo()
      .then(d => {
        console.log(d);
        let { name, desc, latitude, longitude } = d[0];
        let { city } = d[0].regeocodeData.addressComponent;
        this.setData({
          city,
          latitude,
          longitude,
          textData: { name, desc }
        })
      })
      .catch(e => {
        console.log(e);
      })
  },
  bindInput() {
    let { latitude, longitude, city } = this.data;
    let url = `/pages/inputtip/inputtip?city=${city}&lonlat=${longitude},${latitude}`;
    wx.navigateTo({ url });
  },
  makertap(e) {
    // console.log(e);
    let { markerId } = e;
    let { markers } = this.data;
    let marker = markers[markerId];
    // console.log(marker);
    this.showMarkerInfo(marker);
    this.changeMarkerColor(markerId);
  },
  showMarkerInfo(data) {
    let { name, address: desc } = data;
    this.setData({
      textData: { name, desc }
    })
  },
  changeMarkerColor(markerId) {
    let { markers } = this.data;
    markers.forEach((item, index) => {
      item.iconPath = "/images/marker.png";
      if (index == markerId) item.iconPath = "/images/marker_checked.png";
    })
    this.setData({ markers, markerId });
  },
  getRoute() {
    // 起点
    let { latitude, longitude, markers, markerId, city, textData } = this.data;
    let { name, desc } = textData;
    if (!markers.length) return;
    // 终点
    let { latitude: latitude2, longitude: longitude2 } = markers[markerId];
    let url = `/pages/routes/routes?longitude=${longitude}&latitude=${latitude}&longitude2=${longitude2}&latitude2=${latitude2}&city=${city}&name=${name}&desc=${desc}`;
    wx.navigateTo({ url });
  },
  clickcontrol(e) {
    console.log("回到用户当前定位点");
    let { controlId } = e;
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },
  mapchange() {
    // console.log("改变视野");
  }
})
