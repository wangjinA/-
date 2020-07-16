// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    steps: [{
        text: '第2次报价￥23000（点击可查看明细）',
        desc: '等待客户查看',
      },
      {
        text: '客户不接受报价',
        desc: '价格太高，预算20000(5月24日15:00)',
      },
      {
        text: '第1次报价￥25000（点击可查看明细）',
        desc: '客户已查看(5月24日 14:00)',
      },
      {
        text: '客户咨询',
        desc: '5月24日 10:00',
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      status: options.status || 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    console.log(options)
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