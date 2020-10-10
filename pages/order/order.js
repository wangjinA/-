// pages/order/order.js
import {
  hyjgqj,
  rnzs,
  rs
} from '../../utils/config'
Page({
  
  data: {
    tabs: ['已报价', '已完成'],
    current: 1,
    pageSize: 8,
    type: 1,
    activeIndex: 0,
    list: [],
    isHuiyi: true // 默认会议 否则婚宴
  },
  init() {
    let result
    let type =this.data.activeIndex + 1
    if(wx.type == 1){ // 酒店
      if(this.data.isHuiyi) {
        result = wx.loadingAPI(wx.$get('/demandorder/getMyOrderDemand', {
          current: this.data.current,
          pageSize: this.data.pageSize,
          type // 类型 1已报价 2 已完成
        }))
      }else {
        result = wx.loadingAPI(wx.$get('/demandorder/getMyWeddingOrderDemand',{
          current: this.data.current,
          pageSize: this.data.pageSize,
          type // 类型 1已报价 2 已完成
        }))
      }
    }else { // 用户
      if(this.data.isHuiyi) {
        result = wx.loadingAPI(wx.$post('/demandorder/getUserDemand', {
          current: this.data.current,
          pageSize: this.data.pageSize,
          type // 类型 1.未报价，2.已报价，3.已完成
        }))
      }else {
        result = wx.loadingAPI(wx.$post('/demandorder/getUserWeddingDemand',{
          current: this.data.current,
          pageSize: this.data.pageSize,
          type // 类型 1.未报价，2.已报价，3.已完成
        }))
      }
    }
    if(result){
      if(this.data.isHuiyi){
        result.then(res=>{
          this.data.pages = res.data.pages
          let list = res.data.list
          list.forEach(item => {
            item.priceRange = hyjgqj(wx.$parse(item.priceRange))
            item.tablesNumber = rnzs(wx.$parse(item.tablesNumber))
            item.meetingPeople = rs(wx.$parse(item.meetingPeople))
            item.startTime = wx.formatTime(new Date(item.startTime), true)
            item.endTime = wx.formatTime(new Date(item.endTime), true)
          })
          if (this.data.current != 1) {
            list = [...this.data.list, ...list]
          } else {
          }
          this.setData({
            list
          })
        })
      }else {
        result.then(res => {
          this.data.pages = res.data.pages
          let list = res.data.list
          list.forEach(item => {
            item.priceRange = hyjgqj(wx.$parse(item.priceRange))
            item.tablesNumber = rnzs(wx.$parse(item.tablesNumber))
            item.startTime = wx.formatTime(new Date(item.startTime), true)
            item.endTime = wx.formatTime(new Date(item.endTime), true)
          })
          if (this.data.current != 1) {
            list = [...this.data.list, ...list]
          } else {
          }
          this.setData({
            list
          })
        })
      }
    }
  },
  onChange(event) {
    const index = event.detail.index
    console.log(index);
    this.setData({
      activeIndex: index
    })
    this.init()
  },
  goChat() {
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },
  onLoad: function (options) {
    console.log(options.index);
    this.setData({
      isHuiyi: options.index == 0 // 0 会议 1 婚宴
    })
    if(wx.type == 2){
      this.setData({
        tabs: ['未报价','已报价', '已完成']
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.init()
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

  onReachBottom() {
    if (this.data.current >= this.data.pages) {
      return this.setData({
        notMore: true
      })
    }
    this.data.current++
    this.init()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})