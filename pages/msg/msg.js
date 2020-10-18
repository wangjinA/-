// pages/chat/chat.js
Page({
  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  onShow() {
    if(!wx.msgTimer) {
      this.lunxun()
      console.log(wx.globalTimer);
      clearTimeout(wx.globalTimer) // 清除在welcome创建的轮询
    }
  },
  lunxun() {
    let lunxunTime = 1000
    clearTimeout(wx.msgTimer)
    // 在tabbar页面的时候才发送请求
    if(getCurrentPages().length !== 1){
      return wx.msgTimer = setTimeout(() => {
        this.lunxun()
      }, lunxunTime);
    }
    wx.$post('/chat/getChatRoom', {
      current: 1,
      pageSize: 100
    }).then(res=>{
      this.setData({
        list: res.data.list
      })
      let allUnReadCount = 0
      res.data.list.forEach(item => {
        allUnReadCount+=item.unreadCount
      })
      try {
        if(getCurrentPages().length === 1){
          if(allUnReadCount){
            wx.setTabBarBadge({
              index: 3,
              text: allUnReadCount+''
            })
          }else {
            wx.removeTabBarBadge({
              index: 3
            })
          }
        }
      } catch (error) {
        
      }
      wx.msgTimer = setTimeout(() => {
        this.lunxun()
      }, lunxunTime);
    }).catch(() => {
      wx.msgTimer = setTimeout(() => {
        this.lunxun()
      }, lunxunTime);
    })
  },
  clickHandler(e) {
    let beUserId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/chat/chat?beUserId='+beUserId,
    })
  }
})
