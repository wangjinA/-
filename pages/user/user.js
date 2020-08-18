// pages/user/user.js
const app = getApp()
Page({

  /**
   * 组件的初始数据
   */
  data: {
    signin: false,
    user: app.globalData.user,
    type: wx.type,
    userInfo: {},
    hotelInfo: {}
  },
  observers: {
    type(type) {
      this.init()
    }
  },
  init() {
    wx.$get('/api/user/getUserInfo')
      .then(data => {
        this.setData({
          userInfo: data.data.userInfo,
          hotelInfo: data.data.hotelInfo,
        })
      })

  },
  toMyTeam() {
    wx.navigateTo({
      url: '/pages/user/myTeam/myTeam',
    })
  },
  toMyRelease() {

  },
  copyCode(e) {
    const {
      code
    } = e.currentTarget.dataset
    wx.setClipboardData({
      data: code,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  toUserInfo() {
    wx.navigateTo({
      url: '/pages/user/userInfo/userInfo',
    })
  },
  userToggle() {
    if (wx.type == 2) {
      if (wx.userInfo.hotelId) {
        this.setUser(1)
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.navigateTo({
          url: '/pages/hotel/hotelSearch/hotelSearch',
        })
      }
      // wx.navigateTo({
      //   url: '/pages/hotel/hotelSelect/hotelSelect',
      // })
    } else {
      this.setUser(2)
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },
  setUser(type) {
    wx.type = type
    this.setData({
      type
    })
  },
  goGetScore() {
    wx.navigateTo({
      url: '/pages/mall/mall?index=1',
    })
  },
  closeSignin() {
    this.setData({
      signin: false
    })
  },
  openSignin() {
    if (this.data.userInfo.sign) return;
    wx.loadingAPI(wx.$get('/api/user/signin'), '签到中')
      .then(data => {
        this.setData({
          userInfo: {
            ...this.data.userInfo,
            sign: true
          }
        })
      })
  },
  toOrder() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  onShow() {
    this.setData({
      type: wx.type
    })
  },
  onReady() {
    this.init()
  }
})