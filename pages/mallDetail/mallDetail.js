// pages/mallDetail/mallDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    banner: [],
  },
  commit() {
    wx.delAPI('确认兑换，不可取消')
    .then(() => {
      wx.loadingAPI(wx.$post('/system/exchangeIntegralProduct', {

      }), '提交中').then(res => {
        
      })
    })
  },
  getDetail() {
    wx.loadingAPI(wx.$get('/system/getIntegralDetail', {
      integralProductId: this.data.id
    }))
    .then(res => {
      this.setData({
        data: {
          ...res.data,
          integralImgStr: JSON.parse(res.data.integralImgStr)
        }
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.getDetail()
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