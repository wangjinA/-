import {
  rs,
  day
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
    type: 0,
    steps: [{
        text: '等待接单',
      },
      {
        text: '接受报价',
      },
      {
        text: '会议完成',
      },
      {
        text: '上传消费单',
      },
      {
        text: '订单完成',
      }
    ],
    bjList: [],
    data: {},
    status: 0,
    statusText: '',
    isUser: false, // 是否是发布需求的用户
    isHotel: false, // 是否是报价的酒店
    currentUserId: '',
    currentHotelId: '',
    active: 0,
    showXq: true,
    showReason: false,
    reason: '',
  },
  reasonInputChange(e) {
    this.setData({
      reason: e.detail
    })
  },
  jujueCommit() {
    if(!this.data.reason){
      return wx.showToast({
        title: '点击输入拒绝理由',
        icon: 'none'
      })
    }
    wx.delAPI('确认拒绝？')
    .then(() => {
      wx.$post('/order/hotelRejected', {
        reason: this.data.reason,
        demandConfirmId: this.data.data.orderDemandConfirm.demandConfirmId
      }).then(() => {
        wx.showToast({
          title: '操作成功',
          icon:'none'
        })
        setTimeout(() => {
          this.init()
        }, 1500);
      })
    })
  },
  jujueXfd() {
    this.setData({
      showReason: true
    })
  },
  addBeixuan(e) {
    const {orderdemandid, poolflag, index} = e.currentTarget.dataset
    wx.$get('/order/selectPoolDemand', { // type 拉入状态 0待选择 1拉入 2 拒绝
      orderDemandId: orderdemandid,
      type: poolflag == 0 ? 1 : 0
    }).then(() => {
      wx.showToast({
        title: '操作成功',
        icon:'none'
      })
      setTimeout(() => {
        this.showBj(index, true)
        this.init()
      }, 1500);
    })
  },
  // 查看需求 隐藏需求
  lookXq() {
    this.setData({
      showXq: !this.data.showXq
    })
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
  // 查看酒店
  goHotelDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotel/hotelDetail/hotelDetail?id=' + id,
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
    if(this.data.data.orderDemandConfirm){
      wx.xfdList = this.data.data.orderDemandConfirm.userInvoice
      wx.xfdPrice = this.data.data.orderDemandConfirm.price
    }

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
    if(!eIsIndex && !this.data.isUser){
      const hotelId = e.currentTarget.dataset.hotelid
      if(hotelId && hotelId != wx.hotelId){
        wx.navigateTo({
          url: '/pages/hotel/hotelDetail/hotelDetail?id='+hotelId,
        })
        return 
      }
    }
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
        let isXfdJujue = false
        if(data.orderDemandConfirm){
          data.orderDemandConfirm.userInvoice = wx.$parse(data.orderDemandConfirm.userInvoice)
          isXfdJujue = data.orderDemandConfirm.reason
        }else {
          data.orderDemandConfirm = {}
        }
        data.hcTotal = 0
        data.kfTotal = 0
        data.cyTotal = 0
        data.singleDemandVenueVos.forEach(item => { // 会议
          let total = item.budget || 0
          item.dayLong = wx.$parse(item.dayLong)
          if(item.dayLong.length){
            total = total * (item.dayLong.length || 1)
          }
          data.hcTotal += total
          item._show = !!(
            item.containNumbers ||
            item.dayLong.length ||
            item.notes ||
            item.venues ||
            item.venueType || 
            item.budget
          )
        })
        data.singleDemandRoomsVos.forEach(item => { // 客房
          let price = item.budget || 0
          let total = 0
          item.rooms = wx.$parse(item.rooms)
          item.rooms && item.rooms.forEach(item => { // 乘以房间数
            total += price * item.value
          })
          data.kfTotal += total
          item._show = !!(
            item.budget ||
            item.networkFlag == 1 ||
            item.notes ||
            (item.rooms && item.rooms.length)
          )
        })
        data.singleDemandRepastVos.forEach(item => { // 餐饮
          // let total = item.budget || 0
          // total = total * item.containNumbers
          // data.cyTotal += total
          
          let price = item.budget || 0
          let total = 0
          item.dining = wx.$parse(item.dining)
          item.dining && item.dining.forEach(() => { // 乘以人数
            total += price * item.containNumbers
          })
          data.cyTotal += total

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
        const activeStatus = [1, 3, 4, 5, [6, 9]]
        this.setData({
          isUser,
          statusText,
          status: data.status,
          showXq: !(data.status > 4),
          data,
          isXfdJujue: isXfdJujue,
          active: activeStatus.findIndex((item) => {
            if(typeof item === 'number'){
              return data.status == item
            }else {
              return item.filter(i => i == data.status).length
            }
          }),
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
      res.data.hotelQuteInfoVoList.forEach(item => {
        item.orderDemandGuestList.forEach(item => {
          item.guestNumber = wx.$parse(item.guestNumber)
          item.price =  wx.$parse(item.price)
        })
        item.orderDemandRepastList.forEach(item => {
          item.price =  wx.$parse(item.price)
        })
      })
      this.setData({
        bjList: res.data.hotelQuteInfoVoList,
        isHotel
      })
      console.log(this.data.bjList)
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
    this.data.id = options.id
    wx.meetingId = options.id
    this.setData({
      currentUserId: wx.userInfo.id,
      currentHotelId: wx.hotelId
    })
    // this.init()
  },

  onShow() {
    this.setData({
      type: wx.type,
    })
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