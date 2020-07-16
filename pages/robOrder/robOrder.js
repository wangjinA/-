// pages/robOrder/robOrder.js
import { rs } from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    pageSize: 10,
    type: 0, // 0会议 1婚宴
    hyList: [],
  },
  init() {
    wx.$get('/order/grabSingleDemand', {
      current: this.data.current,
      pageSize: this.data.pageSize,

    }).then(data=> {
      data.data.list.forEach(item => {
        item.meetingPeople = rs(wx.$parse(item.meetingPeople))
        item.meetingStartTime = wx.formatTime(new Date(item.meetingStartTime), true)
        item.meetingEndTime = wx.formatTime(new Date(item.meetingEndTime), true)
      })
      let hyList = [...this.data.hyList, ...data.data.list]
      
      this.setData({
        hyList
      })
    })
  },
  toDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/robOrderDetail/robOrderDetail?id=' + id,
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})