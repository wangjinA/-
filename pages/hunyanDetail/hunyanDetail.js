import {
  hyjgqj,
  rnzs
} from '../../utils/config'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: wx.type,
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
    bjList: [],
    data: {},
    userInfo: {},
    isUser: false, // 是否是发布需求的用户
    isHotel: false, // 是否是报价的酒店
  },
  orderEnd() {
    wx.showModal({
      title: '温馨提示',
      content: '确认订单完成，提交后不可更改！',
      success(res) {
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
      if (i == index) {
        item.show = !item.show
      }
    })
    this.setData({
      bjList: this.data.bjList
    })
  },
  init() {
    wx.loadingAPI(wx.$get('/order/getWeddingBanquet', {
        weddingBanquetId: this.data.id
      }))
      .then(({
        data
      }) => {
        let detail = data.weddingBanque
        let userInfo = data.sysUserVo
        detail.priceRange = hyjgqj(wx.$parse(detail.priceRange))
        detail.tablesNumber = rnzs(wx.$parse(detail.tablesNumber))
        detail.startTime = wx.formatTime(new Date(detail.startTime), true)
        detail.endTime = wx.formatTime(new Date(detail.endTime), true)
        let hideInfo = wx.$hideInfo(userInfo)
        let isUser = false
        if(userInfo && wx.userInfo && userInfo.id == wx.userInfo.id){
          isUser = true
        }
        this.setData({
          hideInfo,
          isUser,
          data: detail,
          userInfo
        })
        this.getBaojiaList()
      })

  },
  getBaojiaList() {
    wx.$get('/order/getUserWeddingBanquet', {
      weddingBanquetId: this.data.data.weddingBanquetId
    }).then(res => {
      console.log(res);
      
      console.log(res.data);
      
      let isHotel = !!(res.data.orderWeddingList.filter(item => item.hotelId === wx.hotelId).length)
      this.setData({
        bjList: res.data.orderWeddingList,
        isHotel
      })
    })
  },
  onLoad: function (options) {
    this.data.id = options.id
    wx.meetingId = options.id
    this.init()
    // this.getBaojiaList()
    this.setData({
      status: options.status || 0
    })
  },
  qiangdan() {
    wx.weddingBanque = this.data.data
    if (true)
      wx.navigateTo({
        url: '/pages/hunyanBaojia/hunyanBaojia',
      })
    else {
      wx.showToast({
        icon: 'none',
        title: '未找到具体需求',
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */

  onShow() {},

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