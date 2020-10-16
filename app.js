import './utils/request.js'
import './utils/util.js'
wx.type = 2
wx.hotelId = ''
App({
  
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    const that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getSystemInfo({
      success: function(res) {
      that.systemInfo = res;
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    numberOfPeople: [
      '10~50人',
      '51~100人',
      '101~150人',
      '151~300人',
      '301~500人',
      '501~1000人',
      '1000人以上',
    ],
    type: 2, // 1酒店, 2用户
  },
  systemInfo:null,
})