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
  goHistory() {
    wx.navigateTo({
      url: '/pages/mallHistory/mallHistory',
    })
  },
  onChange(e) {
    const index = e.detail.index
    wx.setNavigationBarTitle({
      title: index == 0 ? '花积分' : '赚积分'
    })
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/mallDetail/mallDetail?id=' + id,
    })
  },
  async getData() {
    wx.$get('/system/getIntegralPage', {
      current: this.data.current,
      pageSize: this.data.pageSize
    }).then(res => {
      let list = res.data.list.map(item => ({
        ...item,
        integralImgStr: JSON.parse(item.integralImgStr)
      }))
      if (this.data.current == 1) {
        this.setData({
          list: list
        })
      } else {
        this.setData({
          list: [...this.data.list, ...list]
        })

      }
    })

    const qiandao = await wx.$get('/system/selectSetUpByType', {
      type: 1
    }).then(res => res.data.value)
    const haoyou = await wx.$get('/system/selectSetUpByType', {
      type: 2
    }).then(res => res.data.value * 100)
    const chengjiao = await wx.$get('/system/selectSetUpByType', {
      type: 3
    }).then(res => res.data.value * 100)


    this.setData({
      getScore: [{
          name: '活跃度',
          tips: '每天登录得积分',
          score: qiandao,
          color: 'rgba(255, 163, 161, 1)',
          icon: 'fire-o'
        },
        {
          name: '确认成交',
          tips: '与平台签约供应商（带标识的酒店）成交订单，可获得积分.积分在商城里可提现',
          score: chengjiao + '%',
          color: 'rgba(132, 217, 210, 1)',
          icon: 'passed'
        },
        {
          name: '邀请好友',
          tips: '邀请好友在平台签约供应商（带标识的酒店）成交订单，邀请人和好友均可获得积分，积分在商城里可提现',
          score: haoyou + '%',
          color: 'rgba(147, 183, 227, 1)',
          icon: 'friends-o'
        }
      ]
    })
  },
  onLoad: function (options) {
    this.getData()
    const tabIndex = options.index ? parseInt(options.index) : 0
    this.setData({
      tabIndex: tabIndex
    })
    wx.setNavigationBarTitle({
      title: tabIndex == 0 ? '花积分' : '赚积分'
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