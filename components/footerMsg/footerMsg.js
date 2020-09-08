// components/footerMsg/footerMsg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phone: String,
    beUserId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },


  methods: {
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: this.data.phone,
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })
    },
    sendMsgBtn() {
      wx.navigateTo({
        url: '/pages/chat/chat?beUserId='+ this.data.beUserId,
      })
    }
  }
})