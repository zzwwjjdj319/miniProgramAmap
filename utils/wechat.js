/**
 * Promise化小程序接口
 */
class Wechat {
  /**
   * 登陆
   * @return {Promise} 
   */
  static login() {
    return new Promise((resolve, reject) => wx.login({ success: resolve, fail: reject }));
  };

  /**
   * 获取用户信息
   * @return {Promise} 
   */
  static getUserInfo() {
    return new Promise((resolve, reject) => wx.getUserInfo({ success: resolve, fail: reject }));
  };

  /**
   * 设置本地数据缓存
   * @param {string} key 
   * @param {string} value 
   * @return {Promise} 
   */
  static setStorage(key, value) {
    return new Promise((resolve, reject) => wx.setStorage({ key: key, data: value, success: resolve, fail: reject }));
  };

  /**
   * 获取本地数据缓存
   * @param {string} key 
   * @return {Promise} 
   */
  static getStorage(key) {
    return new Promise((resolve, reject) => wx.getStorage({ key: key, success: resolve, fail: reject }));
  };

  /**
   * 获取当前位置
   * @param {string} type 
   * @return {Promise} 
   */
  static getLocation(type) {
    return new Promise((resolve, reject) => wx.getLocation({ type: type, success: resolve, fail: reject }));
  };

  /**
   * 发起网络请求
   * @param {string} api 
   * @param {string} path 
   * @param {object} params 
   * @return {Promise} 
   */
  static request(api, path, params) {
    return new Promise((resolve, reject) => {
      let opts = {
        url: `${api}/${path}`,
        data: Object.assign({}, params),
        header: { 'Content-Type': 'json' },
        success: resolve,
        fail: reject
      }
      wx.request(opts);
    });
  };
};

module.exports = Wechat;