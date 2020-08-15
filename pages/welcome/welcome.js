// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  getUserInfo(e) {
    const { type } = e.currentTarget.dataset
    wx.getUserInfo({
      success(res) {
        console.log(res);
        console.log(wx.getStorageSync('wxcode'));
        
        wx.loadingAPI(wx.$post('/api/wx/login', {
          code: wx.getStorageSync('wxcode'),
          encryptedData: res.encryptedData,
          iv: res.iv,
          type
        }), '登录中')
         .then(res => {
           if(res.msg != '成功'){
             throw res.msg
           }
          wx.type = type
          wx.userInfo = res.data.userInfo
          wx.hotelInfo = res.data.hotelInfo
          if(type == 1){
            console.log(res);
            if(res.data.userInfo.hotelId){
              wx.switchTab({
                url: '/pages/index/index',
              })
            }else{
              wx.navigateTo({
                url: '/pages/hotel/hotelSearch/hotelSearch',
              })
            }
            // wx.navigateTo({
            //   url: '/pages/hotel/hotelSelect/hotelSelect',
            // })
          }else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }).catch(err=>{
          console.log(err);
          
          wx.showToast({
            icon: 'none',
            title: '登录失败',
          })
        })
      }
    })
    
  },
  getPhoneNumber (e) {
    console.log(e)
    if(e.detail.iv){ // 用户同意手机号授权
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
  setToken (res) {
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
      } else if (authentication == 4){
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
      }else {
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