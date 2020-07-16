// pages/order/orderEnd/orderEnd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '会议费用',
      key: 'hyfy',
      inputType: 'number'
    }, {
      label: '餐饮费用',
      key: 'cyfy',
      inputType: 'number'
    }, {
      label: '住房费用',
      key: 'zffy',
      inputType: 'number'
    }, {
      label: '杂费',
      key: 'zf',
      inputType: 'number'
    }, {
      label: '总费用',
      key: 'zfy',
      inputType: 'number'
    }]
  },

  commit() {
    wx.showToast({
      title: '提交成功',
    })
  },
  onLoad: function (options) {

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