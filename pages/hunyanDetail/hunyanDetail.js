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
    currentUserId: '',
    OrderDemandConfirm: {}
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
    wx.delAPI('确认会议结束，提交后不可更改！')
    .then(()=>{
      this.setOrderStatus(this.data.data.orderWeddingId, 4)
    })
  },
  // 上传消费单    -------------------没写
  shangchuan() {
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
        this.setData({
          isUser,
          data: detail,
          OrderDemandConfirm: data.OrderDemandConfirm,
          hideInfo,
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
    // this.init()
    // this.getBaojiaList()
    this.setData({
      status: options.status || 0,
      currentUserId: wx.userInfo.id
    })
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