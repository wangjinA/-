// pages/quote/otherRemark/otherRemark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remark: ''
  },
  commit() {
    wx.showModal({
      title: '温馨提示',
      content: '您的报价提交成功，请耐心等待客户查看',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: '/pages/robOrderDetail/robOrderDetail?status=1',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  inputOnChange(e) {
    this.setData({
      remark: e.detail
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