// pages/user/user.js
const app = getApp()
Page({

  /**
   * 组件的初始数据
   */
  data: {
    user: app.globalData.user,
    type: wx.type,
    userInfo: {},
    hotelInfo: {},
    sign: false,
    roles: '',
    isHuiyi: false, // 是否有会议权限
    isHunyan: false, // 是否有婚宴权限
    isLogin: false, // 
    showCode: false
  },
  observers: {
    type(type) {
      this.init()
    }
  },
  init() {
    return wx.$get('/api/user/getUserInfo')
      .then(res => {
        this.setData({
          userInfo: res.data.userInfo,
          hotelInfo: res.data.hotelInfo,
          sign: res.data.sign
        })
      })

  },
  toMyTeam() {
    if (this.checkLogin()) {
      return
    }
    wx.navigateTo({
      url: '/pages/user/myTeam/myTeam',
    })
  },
  goSchool() {
    if (this.checkLogin()) {
      return
    }
    wx.showToast({
      icon: 'none',
      title: '开发中...',
    })
  },
  goScoreHistory() {
    if (this.checkLogin()) {
      return
    }
    wx.navigateTo({
      url: '/pages/user/scoreHistory/scoreHistory',
    })
  },
  toMyRelease() {

  },
  copyCode(e) {
    if (this.checkLogin()) {
      return
    }
    return this.setData({
      showCode: true
    })
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
    if (this.checkLogin()) {
      return
    }
    wx.navigateTo({
      url: '/pages/user/userInfo/userInfo',
    })
  },
  userToggle() {
    if (wx.type == 2) {
      wx.loadingAPI(wx.$loadUserInfo())
        .then(() => {
          if (wx.hotelId) {
            this.setUser(1)
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else {
            wx.navigateTo({
              url: '/pages/hotel/hotelSearch/hotelSearch',
            })
          }
        }).catch(() => {
          wx.showToast({
            title: '登录失效',
            icon:'none'
          })
        })
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
    wx.setStorageSync('type', type)
    this.setData({
      type
    })
  },
  goGetScore() {
    wx.navigateTo({
      url: '/pages/mall/mall?index=0',
    })
  },
  // 签到
  openSignin() {
    if (this.data.userInfo.sign) return;
    wx.loadingAPI(wx.$get('/api/user/signin'), '签到中')
      .then(data => {
        this.setData({
          userInfo: {
            ...this.data.userInfo,
          }
        })
        wx.showModal({
          content: '签到成功，积分+300',
          showCancel: false,
          success: () => {
            this.init()
          }
        })
      })
  },
  toOrder() {
    if (this.checkLogin()) {
      return
    }
    // if(wx.type == 1) {
    //   if(wx.roles.filter(item => item.id === 1).length)
    //     itemList = ['会议订单', '婚宴订单'] 
    //   else if (wx.roles.filter(item => item.id === 2).length){
    //     check = 1
    //   }else if(wx.roles.filter(item => item.id === 3).length){
    //     check = 2
    //   }else{
    //     return wx.showToast({
    //       icon: 'none',
    //       title: '权限不足',
    //       duration: 2000
    //     })
    //   }
    // }else {
    //   itemList = ['会议需求', '婚宴需求']
    // }

    let itemList = ['会议需求', '婚宴需求']

    if (wx.type == 1) {
      if (!wx.roles || !wx.roles.length) {
        return wx.showToast({
          icon: 'none',
          title: '权限不足',
          duration: 2000
        })
      }
      if (wx.roleId == 1) {
        wx.showActionSheet({
          itemList: itemList,
          success(res) {
            wx.navigateTo({
              url: `/pages/order/order?index=${res.tapIndex}`,
            })
          }
        })
      } else {
        // wx.roleId-2 对应下标
        wx.navigateTo({
          url: `/pages/order/order?index=${wx.roleId-2}`,
        })
      }
    } else {
      wx.showActionSheet({
        itemList: itemList,
        success(res) {
          wx.navigateTo({
            url: `/pages/order/order?index=${res.tapIndex}`,
          })
        }
      })
    }
    console.log(11);

  },
  goLogin() {
    wx.delAPI('确认退出登录')
      .then(() => {
        wx.clearStorageSync('token')
        wx.clearStorageSync('type')
        clearTimeout(wx.globalTimer)
        clearTimeout(wx.msgTimer)
        wx.globalTimer = ''
        wx.msgTimer = ''
        wx.reLaunch({
          url: '/pages/welcome/welcome'
        })

      })
  },
  checkLogin() {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      })
      return true
    }
  },
  onShow() {
    this.setData({
      type: wx.type,
      isLogin: !!wx.getStorageSync('token')
    })
    if (!wx.getStorageSync('token')) {
      return
    }
    this.init()
    this.setData({
      roles: wx.roles.map(item => item.roleName),
      isHuiyi: wx.roleId == 1 || wx.roleId == 2,
      isHunyan: wx.roleId == 1 || wx.roleId == 3,
    })
  },
  onReady() {
    this.init()
  }
})