// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['花积分', '赚积分'],
    tabIndex: 0,
    getScore: [{
      name: '活跃度',
      tips: '每天登录得积分',
      score: 300
    }, {
      name: '报价速度',
      tips: '在半小时之内报价获得积分',
      score: 300
    }, {
      name: '入驻酒店奖励',
      tips: '填写酒店资料通过平台审核获得',
      score: 300
    }, {
      name: '确认成交',
      tips: '成交订单后，会议真实有效得积分',
      score: 300
    }]
  },
  onChange() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      tabIndex: options.index ? parseInt(options.index) : 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})