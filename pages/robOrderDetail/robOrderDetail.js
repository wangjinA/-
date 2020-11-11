import {
  rs
} from '../../utils/config'
const app = getApp()
// 1  有效 - 可以报价
// 2  无效
// 3  用户确认酒店报价
// 4  酒店确认会议结束
// 5  等待客户上传消费单
// 6  酒店再次确定 - 完成结束
// 7  酒店拒绝消费单
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: wx.type,
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
    data: {},
    status: 0,
    statusText: '',
    isUser: false, // 是否是发布需求的用户
    isHotel: false, // 是否是报价的酒店
    currentUserId: ''
  },
  copyCode() {
    wx.setClipboardData({
      data: this.data.data.meetingId.toString(),
      success(res) {
        wx.getClipboardData({
          success(res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
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
  orderEnd() {
    wx.delAPI('确认订单完成，提交后不可更改！')
    .then(()=>{
      wx.navigateTo({
        url: '/pages/order/orderEnd/orderEnd',
      })
    })
  },
  useBj() {
    console.log('使用这个报价')
  },
  // 用户确认报价
  okBaojia(e) {
    const {orderdemandid, index} = e.currentTarget.dataset
    wx.delAPI('确认使用该报价！')
    .then(()=>{
      this.setOrderStatus(orderdemandid, 3)
      .then(()=>{
        this.showBj(index, true)
      })
    })
  },
  // 酒店确认会议完成
  jdok() {
    wx.delAPI('确认会议结束，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderDemandId, 4)
    })
  },
  // 上传消费单
  shangchuan() {
    wx.navigateTo({
      url: '/pages/xfd/xfd?id='+ this.data.data.meetingId,
    })
  },
  // 订单结束
  orderOver() {
    wx.delAPI('确认订单完成，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderDemandId, 6)
    })
  },
  setOrderStatus(orderDemandId, status) {
    return wx.loadingAPI(wx.$post('/demandorder/updateOrderDemandStatus', {
      orderDemandId,
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
  // 查看消费单
  previewXfd(e) {
    const index = e.currentTarget.dataset.index
    let imgs = this.data.data.orderDemandConfirm.userInvoice
    wx.previewImage({
      current: imgs[index].url, // 当前显示图片的http链接
      urls: imgs.map(item => item.url) // 需要预览的图片http链接列表
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
        if(data.userInfo) {
          data.hideInfo = wx.$hideInfo(data.userInfo)
        }
        if(data.orderDemandConfirm){
          data.orderDemandConfirm.userInvoice = wx.$parse(data.orderDemandConfirm.userInvoice)
        }else {
          data.orderDemandConfirm = {}
        }
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
            item.venueType || 
            item.budget
          )
        })
        data.singleDemandRoomsVos.forEach(item => { // 客房
          data.kfTotal += item.budget || 0
          item.rooms = wx.$parse(item.rooms)
          item._show = !!(
            item.budget ||
            item.networkFlag == 1 ||
            item.notes ||
            (item.rooms && item.rooms.length)
          )
        })
        data.singleDemandRepastVos.forEach(item => { // 餐饮
          data.cyTotal += item.budget || 0
          item.dining = wx.$parse(item.dining)
          item._show = !!(
            item.containNumbers ||
            (item.dining && item.dining.length) ||
            item.notes ||
            item.tableType || 
            item.budget
          )
        })
        data.hcShow = !!(data.singleDemandVenueVos.filter(item => item._show).length)
        data.kfShow = !!(data.singleDemandRoomsVos.filter(item => item._show).length)
        data.cyShow = !!(data.singleDemandRepastVos.filter(item => item._show).length)
        wx.singleDemandVenueVos = data.singleDemandVenueVos.filter(item => item._show)
        wx.singleDemandRoomsVos = data.singleDemandRoomsVos.filter(item => item._show)
        wx.singleDemandRepastVos = data.singleDemandRepastVos.filter(item => item._show)
        wx.hcTotal = data.hcTotal // 单个需求总报价
        wx.kfTotal = data.kfTotal
        wx.cyTotal = data.cyTotal

        wx.hcShow = data.hcShow // 是否显示
        wx.kfShow = data.kfShow
        wx.cyShow = data.cyShow

        let statusText = wx.$getStatus(data.status)
        let isUser = false
        if(data.userInfo && wx.userInfo && data.userInfo.id == wx.userInfo.id){
          isUser = true
        }
        console.log(data.status);
        
        this.setData({
          isUser,
          statusText,
          status: data.status,
          data
        })
        console.log(this.data.status);
      })
    this.getBaojiaList()
  },
  getBaojiaList() {
    wx.$get('/order/getUserSelfDemandInfo', {
      meetingId: this.data.id
    }).then(res => {
      let isHotel = !!res.data.hotelQuteInfoVoList.filter(item => item.hotelId === wx.hotelId).length
      this.setData({
        bjList: res.data.hotelQuteInfoVoList,
        isHotel
      })
    })
  },
  // 立即抢单
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
    } else {
      wx.showToast({
        icon: 'none',
        title: '未找到详细需求，无法报价',
      })
    }
  },
  onLoad: function (options) {
    this.data.id = 37 || options.id
    wx.meetingId = options.id
    this.setData({
      currentUserId: wx.userInfo.id
    })
    // this.init()
  },

  onShow() {
    if (this.data.id) {
      this.init()
    }
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