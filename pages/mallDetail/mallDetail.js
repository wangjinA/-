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
    wx.chooseAddress({
      success: (res) =>{
        console.log(res);
        let address = res.provinceName + res.cityName + res.countyName + res.detailInfo
        let phone = res.telNumber
        let contact = res.userName
        wx.delAPI(`${contact}, ${phone}, ${address}`)
        .then(() => {
          wx.loadingAPI(wx.$post('/system/exchangeIntegralProduct', {
            address,
            phone,
            contact,
            integralProductId: this.data.id
          }), '提交中')
          .then(res => {
            if(res.msg === '成功'){
              wx.showToast({
                icon: 'success',
                title: '兑换成功',
                duration: 2000
              })
              setTimeout(() => {
                wx.navigateBack()
              }, 2000);
            }else {
              wx.showToast({
                icon: 'none',
                title: res.data
              })
            }
          }).catch(() =>{
            wx.showToast({
              icon: 'none',
              title: res.data
            })
          })
        })
      }
    })
  },
  getDetail() {
    wx.loadingAPI(wx.$get('/system/getIntegralDetail', {
      integralProductId: this.data.id
    }))
    .then(res => {
    wx.setNavigationBarTitle({title: res.data.productName})
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