// pages/hotelGuestRoom/hotelGuestRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [],
    showShuxing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  closeShuxing() {
    this.setData({
      showShuxing: false
    })
  },
  onReady: function () {
    this.setData({
      formList: [{
        label: '房型',
        required: true,
        key: 'hotelName',
      }, {
        label: '价格',
        required: true,
        key: 'hotelName',
      }, {
        label: '属性',
        required: true,
        key: 'hotelName',
        type: 'event',
        click: () => {
          this.setData({
            showShuxing: true
          })
        }
      }, {
        label: '描述',
        required: true,
        key: 'hotelName',
      }]
    })
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