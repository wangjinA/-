// pages/order/order.js
Page({
  
  data: {
    tabs: ['待报价', '已报价', '已完成'],
    current: 1,
    pageSize: 8,
    type: 1,
    activeIndex: 0
  },
  getData() {
    wx.$post('/demandorder/getUserDemand', {
      current: this.data.current,
      pageSize: this.data.pageSize,
      type: this.data.activeIndex + 1, // 类型 1待报价 2已报价 3已完成
    })
  },
  onChange(event) {
    const index = event.detail.index
    console.log(index);
    this.setData({
      activeIndex: index
    })
    this.getData()
  },
  goDetail() {
    wx.navigateTo({
      url: '/pages/robOrderDetail/robOrderDetail',
    })
  },
  goChat() {
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getData()
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