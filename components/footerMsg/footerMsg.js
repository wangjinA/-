// components/footerMsg/footerMsg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone: String,
    beUserId: Number,
    hotelId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  methods: {
    checkRelation() {
      if(!wx.getStorageSync('token')){
        return wx.navigateTo({
          url: '/pages/welcome/welcome'
        })
      }
      return wx.loadingAPI(wx.$get('/api/user/phoneCall', {
        hotelId: this.data.hotelId
      }))
    },
    callPhone() {
      this.checkRelation().then(res => {
        if (res.data) {
          wx.makePhoneCall({
            phoneNumber: this.data.phone,
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '暂未和该酒店建立关系，请先发布您的需求',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/release/release'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    },
    sendMsgBtn() {
      this.checkRelation().then(res => {
        if (res.data) {
          wx.navigateTo({
            url: '/pages/chat/chat?beUserId=' + this.data.beUserId,
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '暂未和该酒店建立关系，请先发布您的需求',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.switchTab({
                  url: '/pages/release/release'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  }
})