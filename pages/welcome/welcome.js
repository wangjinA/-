// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo(e) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.login({
          success: res => {
            if (res.code) {
              wx.setStorageSync('wxcode', res.code)
              const {
                type
              } = e.currentTarget.dataset
              // 获取用户信息
              wx.getUserInfo({
                success: res => {
                  console.log(res);
                  console.log(wx.getStorageSync('wxcode'));
                  console.log(6);
                  
                  console.log((this.data.scene && this.data.scene.toString()))
                  console.log(7);
                  // 调取后台接口登录
                  wx.loadingAPI(wx.$post('/api/wx/login', {
                      code: wx.getStorageSync('wxcode'),
                      encryptedData: res.encryptedData,
                      iv: res.iv,
                      type,
                      invitationCode: (this.data.scene && this.data.scene.toString()) || '0'
                    }), '登录中')
                    .then(res => {
                      if (res.msg != '成功') {
                        throw res.msg
                      }
                      wx.type = type
                      wx.userInfo = res.data.userInfo
                      wx.roles = res.data.roles || [] // 1管理 2会议 3婚宴
                      wx.roleId = res.data.roles && res.data.roles[0] && res.data.roles[0].id
                      wx.hotelId = res.data.userInfo && res.data.userInfo.hotelId
                      wx.hotelInfo = res.data.hotelInfo || {}
                      wx.setStorageSync('type', type)
                      if (type == 1) {
                        console.log(res);
                        if (res.data.userInfo && res.data.userInfo.hotelId) {
                          wx.switchTab({
                            url: '/pages/index/index',
                          })
                        } else {
                          wx.type = 2
                          wx.setStorageSync('type', 2)
                          wx.navigateTo({
                            url: '/pages/hotel/hotelSearch/hotelSearch',
                          })
                        }
                      } else {
                        wx.switchTab({
                          url: '/pages/index/index',
                        })
                      }
                      this.lunxun()
                    }).catch(err => {
                      console.log(err);

                      wx.showToast({
                        icon: 'none',
                        duration: 3000,
                        title: (err && JSON.stringify(err) + '登录失败') || '登录失败',
                      })
                    })
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  lunxun() {
    let lunxunTime = 1000
    clearTimeout(this.timer)
    clearTimeout(wx.msgTimer)
    // 在tabbar页面的时候才发送请求
    if (getCurrentPages().length !== 1) {
      return wx.globalTimer = setTimeout(() => {
        this.lunxun()
      }, lunxunTime);
    }
    console.log('welcome页面轮询');
    
    wx.$post('/chat/getChatRoom', {
        current: 1,
        pageSize: 100
      })
      .then(res => {
        let allUnReadCount = 0
        res.data.list.forEach(item => {
          allUnReadCount += item.unreadCount
        })
        try {
          if (getCurrentPages().length === 1) {
            if (allUnReadCount) {
              wx.setTabBarBadge({
                index: 3,
                text: allUnReadCount + ''
              })
            } else {
              wx.removeTabBarBadge({
                index: 3
              })
            }
          }
        } catch (error) {

        }
        wx.globalTimer = setTimeout(() => {
          this.lunxun()
        }, lunxunTime);
      }).catch(() => {
        wx.globalTimer = setTimeout(() => {
          this.lunxun()
        }, lunxunTime);
      })
  },
  getPhoneNumber(e) {
    console.log(e)
    if (e.detail.iv) { // 用户同意手机号授权
      request('POST', '/api/mini/wxPhoneLogin', {
        codeKey: wx.getStorageSync('codeKey'),
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      }).then(res => {
        this.setToken(res)
      })
    } else { // 用户拒绝手机号授权

    }
  },
  setToken(res) {
    wx.setStorageSync('token', res.data.access_token)
    wx.setStorageSync('tokenType', res.data.token_type)
    util.successToast('登录成功', 1500)

    request('GET', '/api/mini/me')
      .then(res => {
        let authentication = res.data.authentication
        if (authentication == 0) {
          util.modal('是否前往完善个人信息？')
            .then(_ => {
              wx.redirectTo({
                url: '/pages/agreement/agreement?status=' + authentication
              })
            })
            .catch(_ => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            })
        } else if (authentication == 4) {
          util.modal('认证信息未通过，是否继续认证？')
            .then(_ => {
              wx.redirectTo({
                url: '/pages/agreement/agreement?status=' + authentication
              })
            })
            .catch(_ => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            })
        } else {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })

    request('GET', '/api/mini/qiniu')
      .then(res => {
        wx.setStorageSync('qiniuToken', res.data.token)
      })
  },
  onLoad: function (options) {
    console.log(1);
    console.log(options);
    console.log(options.scene);
    this.data.scene = options.scene
    console.log(2);
  },
  getScene: function (scene = "") {
    if (scene == "") return {}
    let res = {}
    let params = decodeURIComponent(scene).split("&")
    params.forEach(item => {
      let pram = item.split("=")
      res[pram[0]] = pram[1]
    })
    return res
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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