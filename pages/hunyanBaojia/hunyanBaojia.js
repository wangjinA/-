// pages/hunyanBaojia/hunyanBaojia.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '报价',
      required: true,
      key: 'price',
      inputType: 'number',
      company: '元/桌'
    }, {
      label: '其他说明',
      key: 'notes',
      inputType: 'textarea'
    }],
    weddingBanque: {}
  },
  commit() {
    let wjForm = this.selectComponent('#wjForm')
    wjForm.getData()
    .then(data=>{
      console.log(data);
      wx.loadingAPI(wx.$post('/order/addOrderWedding', {
        weddingBanquetId: this.data.weddingBanque.weddingBanquetId,
        ...data
      }), '提交中').then(res=>{
        console.log(res);
        wx.showModal({
          title: '温馨提示',
          content: '您的报价提交成功，请耐心等待客户查看',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 2,
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      weddingBanque: wx.weddingBanque
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