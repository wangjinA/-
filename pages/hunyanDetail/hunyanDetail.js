import {
  hyjgqj,
  rnzs,
  jdxj
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
        text: '等待接单',
      },
      {
        text: '接受报价',
      },
      {
        text: '婚宴完成',
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
    userInfo: {},
    isUser: false, // 是否是发布需求的用户
    isHotel: false, // 是否是报价的酒店
    currentUserId: '',
    currentHotelId: '',
    OrderDemandConfirm: {},
    active: 0,
    showReason: false,
    reason: '',
  },
  cancelOrder() {
    wx.delAPI('确认取消订单？')
    .then(() => {
      wx.$get('/order/cancelWedding', {
        id: this.data.id
      })
      .then(() => {
        this.init()
        wx.showToast({
          title: '订单已取消',
          icon:'success'
        })
      })
    })
  },
  sendInfo() {
    wx.navigateTo({
      url: '/pages/chat/chat?beUserId=' + this.data.userInfo.id,
    })
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
        demandConfirmId: this.data.OrderDemandConfirm.demandConfirmId
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
    const {id, poolflag, index} = e.currentTarget.dataset
    wx.$get('/order/selectPoolWedding', { // type 拉入状态 0待选择 1拉入 2 拒绝
      orderWeedingId: id,
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
  // 查看酒店
  goHotelDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotel/hotelDetail/hotelDetail?id=' + id,
    })
  },
  copyCode() {
    wx.setClipboardData({
      data: this.data.data.weddingBanquetId.toString(),
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
    wx.delAPI('确认婚宴结束，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderWeddingId, 4)
    })
  },
  // 上传消费单    -------------------没写
  shangchuan() {
    if(this.data.OrderDemandConfirm){
      wx.xfdList = this.data.OrderDemandConfirm.userInvoice
      wx.xfdPrice = this.data.OrderDemandConfirm.price
    }
    wx.navigateTo({
      url: `/pages/xfd/xfd?id=${this.data.id}&isHunyan=1`,
    })
  },
  // 查看消费单
  previewXfd(e) {
    const index = e.currentTarget.dataset.index
    let imgs = this.data.OrderDemandConfirm.userInvoice
    wx.previewImage({
      current: imgs[index].url, // 当前显示图片的http链接
      urls: imgs.map(item => item.url) // 需要预览的图片http链接列表
    })
  },
  // 订单结束    -------------------没写
  orderOver() {
    wx.delAPI('确认订单完成，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderWeddingId, 6)
    })
  },
  setOrderStatus(orderWeddingId, status) {
    return wx.loadingAPI(wx.$post('/demandorder/updateOrderWeddinfStatus ', {
      orderWeddingId,
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
  init() {
    wx.loadingAPI(wx.$get('/order/getWeddingBanquet', {
        weddingBanquetId: this.data.id
      }))
      .then(({
        data
      }) => {
        let detail = data.weddingBanque
        detail.orderWeddingId = data.orderWeddingId // 报价的id
        let userInfo = data.sysUserVo
        detail.priceRange = hyjgqj(wx.$parse(detail.priceRange))
        detail.tablesNumber = rnzs(wx.$parse(detail.tablesNumber))
        detail.startTime = wx.formatTime(new Date(detail.startTime), true)
        detail.endTime = wx.formatTime(new Date(detail.endTime), true)
        detail.hotelStar = jdxj(detail.hotelStar)
        let hideInfo = wx.$hideInfo(userInfo)
        let isUser = false
        if(userInfo && wx.userInfo && userInfo.id == wx.userInfo.id){
          isUser = true
        }
        let statusText = wx.$getStatus(detail.status)
        // 消费单
        if(data.OrderDemandConfirm){
          data.OrderDemandConfirm.userInvoice = wx.$parse(data.OrderDemandConfirm.userInvoice)
        }else {
          data.OrderDemandConfirm = {}
        }
        const activeStatus = [1, 3, 4, 5, [6, 9]]
        this.setData({
          isUser,
          data: detail,
          OrderDemandConfirm: data.OrderDemandConfirm,
          hideInfo,
          userInfo,
          status: detail.status,
          statusText,
          active: activeStatus.findIndex((item) => {
            if(typeof item === 'number'){
              return detail.status == item
            }else {
              return item.filter(i => i == detail.status).length
            }
          }),
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

  onLoad: function (options) {
    this.data.id = options.id
    wx.meetingId = options.id
    if(options.type) {
      wx.type = options.type
    }
    // this.init()
    // this.getBaojiaList()
    this.setData({
      status: options.status || 0,
      currentUserId: wx.userInfo.id,
      currentHotelId: wx.hotelId
    })
  },
  onShow() {
    this.setData({
      type: wx.type,
    })
    
    if(!wx.getStorageSync('token')){
      return wx.showModal({
        content: '暂未登录，去登录',
        showCancel: false,
        success: () => {
          wx.navigateTo({
            url: '/pages/welcome/welcome?type=' + wx.type
          })
        }
      })
    }
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