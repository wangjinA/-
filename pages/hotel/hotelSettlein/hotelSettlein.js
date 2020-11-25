// pages/hotel/hotelSettlein/hotelSettlein.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelName: ''
  },

  commit() {
    const contactsInfo = this.selectComponent('#contactsInfo')
    contactsInfo.getData()
    .then(data => {
      wx.loadingAPI(wx.$post('/api/user/applyEnter', {
        ...data,
        hotelId: this.data.hotelId,
        url: wx.$stringify(data.fileList)
      }), '提交中')
        .then(res => {
          if(res.code == 20){
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
            return 
          }

          wx.showModal({
            title: '温馨提示',
            content: '提交成功，请耐心等待后台审核',
            showCancel: false,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  delta: 3
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.data.hotelId = options.hotelId
    this.setData({
      hotelName: options.hotelName
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