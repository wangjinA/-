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
    statusText: '',
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
    currentUserId: ''
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
  // 用户确认报价
  okBaojia(e) {
    const {id, index} = e.currentTarget.dataset
    wx.delAPI('确认使用该报价！')
    .then(()=>{
      this.setOrderStatus(id, 3)
      .then(()=>{
        this.showBj(index, true)
      })
    })
  },
  // 酒店确认婚宴完成    -------------------没写
  jdok() {
    wx.delAPI('确认会议结束，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderDemandId, 4)
    })
  },
  // 上传消费单    -------------------没写
  shangchuan() {
    wx.navigateTo({
      url: '/pages/xfd/xfd?id='+ this.data.meetingId,
    })
  },
  // 订单结束    -------------------没写
  orderOver() {
    wx.delAPI('确认订单完成，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderDemandId, 6)
    })
  },
  setOrderStatus(weddingBanquetId, status) {
    return wx.loadingAPI(wx.$post('/demandorder/updateOrderWeddinfStatus ', {
      weddingBanquetId,
      status
    })).then(() => {
      this.init()
    })
  },
  showBj(e, eIsIndex = false) {
    const index = !eIsIndex ? e.currentTarget.dataset.index : e
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
        let statusText = wx.$getStatus(detail.status)
        this.setData({
          hideInfo,
          isUser,
          data: detail,
          userInfo,
          status: detail.status,
          statusText
        })
        let isHotel = !!(data.weddingHotelVos.filter(item => item.hotelId === wx.hotelId).length)
        this.setData({
          bjList: data.weddingHotelVos,
          isHotel
        })
        // this.getBaojiaList()
      })
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.userInfo.phone,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
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
      status: options.status || 0,
      currentUserId: wx.userInfo.id
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