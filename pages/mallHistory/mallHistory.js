// pages/user/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.$get('/system/getIntegralOrderList', {
      current: 1,
      pageSize: 200,
      type: 0 // 区分用户端或后台 0用户端 1后台
    }).then(res => {
      this.setData({
        list: res.data.list.map(item => {
          return {
            ...item,
            integralProduct: {
              ...item.integralProduct,
              integralImgStr: JSON.parse(item.integralProduct.integralImgStr)[0]
            }
          }
        })
      })
    })
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mallDetail/mallDetail?id='+id,
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