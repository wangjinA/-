// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['花积分', '赚积分'],
    tabIndex: 0,
    getScore: [{
      name: '活跃度',
      tips: '每天登录得积分',
      score: 300
    }
    // , {
    //   name: '报价速度',
    //   tips: '在半小时之内报价获得积分',
    //   score: 300
    // }, {
    //   name: '入驻酒店奖励',
    //   tips: '填写酒店资料通过平台审核获得',
    //   score: 300
    // }
    , 
    {
      name: '确认成交',
      tips: '成交订单后，会议真实有效得积分',
      score: 300
    }
  ],
  list: [],
  current: 1,
  pageSize: 10
  },
  onChange() {

  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mallDetail/mallDetail?id='+id,
    })
  },
  getData() {
    wx.$get('/system/getIntegralPage', {
      current: this.data.current,
      pageSize: this.data.pageSize
    }).then(res => {
      let list = res.data.list.map(item => ({
        ...item,
        integralImgStr: JSON.parse(item.integralImgStr)
      }))
      if(this.data.current == 1){
        this.setData({
          list: list
        })
      }else {
        this.setData({
          list: [...this.data.list, ...list]
        })

      }
    })
  },
  onLoad: function (options) {
    this.getData()
    this.setData({
      tabIndex: options.index ? parseInt(options.index) : 0
    })
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