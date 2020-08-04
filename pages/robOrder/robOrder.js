// pages/robOrder/robOrder.js
import { rs,hyjgqj,rnzs } from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    pageSize: 10,
    type: 0, // 0会议 1婚宴
    huiyiList: [],
    hunyanList: [],
    notMore: false,
    activeIndex: 0
  },
  onChange(event) {
    const index = event.detail.index
    this.data.current = 1
    this.data.notMore = false
    this.setData({
      activeIndex: index
    })
    this.init()
  },
  init() {
    if(this.data.activeIndex === 0) {
      this.getHuiyi()
    }else {
      this.getHunyan()
    }
  },
  getHunyan() {
    wx.$get('/order/grabSingleWedding', {
      current: this.data.current,
      pageSize: this.data.pageSize,
    })
    .then(res=>{
        this.data.pages = res.data.pages
      let list = res.data.list
      list.forEach(item => {
          item.priceRange = hyjgqj(wx.$parse(item.priceRange))
          item.tablesNumber = rnzs(wx.$parse(item.tablesNumber))
          item.startTime = wx.formatTime(new Date(item.startTime), true)
          item.endTime = wx.formatTime(new Date(item.endTime), true)
        })
        let hunyanList = null
        if(this.data.current === 1){
          hunyanList = list
        }else {
          hunyanList = [...this.data.hunyanList, ...list]
        }
        this.setData({
          hunyanList
        })
    })
  },
  getHuiyi () {
    wx.loadingAPI(wx.$get('/order/grabSingleDemand', {
      current: this.data.current,
      pageSize: this.data.pageSize,
    })).then(res=> {
      let list = res.data.list
      this.data.pages = res.data.pages
      list.forEach(item => {
        item.meetingPeople = rs(wx.$parse(item.meetingPeople))
        item.meetingStartTime = wx.formatTime(new Date(item.meetingStartTime), true)
        item.meetingEndTime = wx.formatTime(new Date(item.meetingEndTime), true)
      })
      let huiyiList = null
      if(this.data.current === 1){
        huiyiList = list
      }else {
        huiyiList = [...this.data.huiyiList, ...list]
      }
      this.setData({
        huiyiList
      })
    })
  },
  toHuiyiDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/robOrderDetail/robOrderDetail?id=' + id,
    })
  },
  toHunyanDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hunyanDetail/hunyanDetail?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    if(this.data.current >= this.data.pages){
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