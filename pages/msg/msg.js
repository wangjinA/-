// pages/chat/chat.js
Page({
  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  onShow() {
    wx.$post('/chat/getChatRoom', {
      current: 1,
      pageSize: 100
    }).then(res=>{
      this.setData({
        list: res.data.list
      })
    })
  },
  clickHandler(e) {
    let beUserId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/chat/chat?beUserId='+beUserId,
    })
  }
})
