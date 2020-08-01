import {
  rs
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
    }],
    data: {}
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
    wx.loadingAPI(wx.$get('/order/getGrabSingleDemandInfo', {
        meetingId: this.data.id
      }))
      .then(({
        data
      }) => {
        console.log(data);
        data.meetingPeople_filter = data.meetingPeople && rs(wx.$parse(data.meetingPeople))
        data.meetingStartTime_filter = wx.formatTime(new Date(data.meetingStartTime), true)
        data.meetingEndTime_filter = wx.formatTime(new Date(data.meetingEndTime), true)
        data.userInfo = data.sysUserVo
        data.hcTotal = 0
        data.kfTotal = 0
        data.cyTotal = 0
        data.singleDemandVenueVos.forEach(item => { // 会议
          data.hcTotal += item.budget || 0
          item._show = !!(
            item.containNumbers ||
            item.dayLong ||
            item.notes ||
            item.venues ||
            item.venueType
          )
        })
        data.singleDemandRoomsVos.forEach(item => { // 客房
          data.kfTotal += item.kfTotal || 0
          item.rooms = wx.$parse(item.rooms)
          item._show = !!(
            item.budget ||
            item.networkFlag == 1 ||
            item.notes ||
            (item.rooms && item.rooms.length)
          )
        })
        data.singleDemandRepastVos.forEach(item => { // 餐饮
          data.cyTotal += item.cyTotal || 0
          item.dining = wx.$parse(item.dining)
          item._show = !!(
            item.containNumbers ||
            (item.dining && item.dining.length) ||
            item.notes ||
            item.tableType
          )
        })
        data.hcShow = !!(data.singleDemandVenueVos.filter(item => item._show).length)
        data.kfShow = !!(data.singleDemandRoomsVos.filter(item => item._show).length)
        data.cyShow = !!(data.singleDemandRepastVos.filter(item => item._show).length)
        wx.singleDemandVenueVos = data.singleDemandVenueVos.filter(item => item._show)
        wx.singleDemandRoomsVos = data.singleDemandRoomsVos.filter(item => item._show)
        wx.singleDemandRepastVos = data.singleDemandRepastVos.filter(item => item._show)
        wx.hcTotal = data.hcTotal
        wx.kfTotal = data.kfTotal
        wx.cyTotal = data.cyTotal

        wx.hcShow = data.hcShow
        wx.kfShow = data.kfShow
        wx.cyShow = data.cyShow
        this.setData({
          data
        })

      })
  },
  onLoad: function (options) {
    this.data.id = options.id
    wx.meetingId = options.id
    this.init()
    this.setData({
      status: options.status || 0
    })
  },
  qiangdan() {
    if (this.data.data.hcShow)
      wx.navigateTo({
        url: '/pages/quote/hotelQuote/hotelQuote',
      })
    else if (this.data.data.kfShow) {
      wx.navigateTo({
        url: '/pages/quote/roomQuote/roomQuote',
      })
    } else if (this.data.data.cyShow) {
      wx.navigateTo({
        url: '/pages/quote/eatQuote/eatQuote',
      })
    }else {
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