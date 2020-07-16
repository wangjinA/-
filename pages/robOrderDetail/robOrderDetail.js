// pages/robOrderDetail/robOrder.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: app.globalData.user,
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
    }],
    bjList: [{
      hotelName: '南昌保利酒店',
      num: 3,
      price: '32000',
      show: false
    }, {
      hotelName: '维也纳酒店',
      num: 2,
      price: '43996',
      show: false
    }, {
      hotelName: '国际大酒店',
      num: 1,
      price: '12000',
      show: false
    }]
  },
  orderEnd() {
    wx.showModal({
      title: '温馨提示',
      content: '确认订单完成，提交后不可更改！',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/order/orderEnd/orderEnd',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  useBj() {
    console.log('使用这个报价')
  },
  showBj(e) {
    const index = e.currentTarget.dataset.index
    this.data.bjList.forEach((item, i) => {
      if(i == index){
        item.show = !item.show
      }
    })
    this.setData({
      bjList: this.data.bjList
    })
  },
  init() {
    wx.loadingAPI(wx.$get('/order/getGrabSingleDemandInfo', {
      meetingId: this.data.id
    }))
    .then(data => {
      
    })
  },
  onLoad: function (options) {
    this.data.id = options.id
    this.init()
    this.setData({
      status: options.status || 0
    })
  },
  qiangdan() {
    wx.navigateTo({
      url: '/pages/quote/hotelQuote/hotelQuote',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow() {
    this.setData({
      user: app.globalData.user
    })
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