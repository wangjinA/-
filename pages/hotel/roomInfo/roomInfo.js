// pages/hotel/roomInfo/roomInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '会议室总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'chamberCount',
    }, {
      label: '客房总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'guestCount',
    }, {
      label: '标准双床房总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'doubleBed',
      labelWidth: '230rpx'
    }, {
      label: '大床房总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'bigDedCount',
    }, {
      label: '配套总车位数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '个',
      key: 'parkingSpace',
    }, {
      label: '能否进车',
      key: 'intoCar',
      type: 'switch',
    }]

  },

  submit() {
    let wjForm = this.selectComponent('#wjForm')
    wjForm.getData()
      .then(data => {
        wx.loadingAPI(wx.$post('/hotel/updateHotelAssortInfo', {
          ...data,
          intoCar: data.intoCar ? 1: 0,
          hotelId: wx.hotelId,
          hotelAssortId: this.data.hotelAssortId
        }), '保存中')
        .then(data => {
          this.init()
        })
      })
  },
  init() {
    wx.loadingAPI(wx.$get('/hotel/getHotelAssortInfo', {
      hotelId: wx.hotelId
    })).then(({
      data
    }) => {
      this.data.hotelAssortId = data && data.hotelAssortId
      let wjForm = this.selectComponent('#wjForm')
      wjForm.setData({
        formData: {
          ...data,
          intoCar: !!data.intoCar
        }
      })
    })
  },
  onLoad: function (options) {
    this.data.hotelId = options.hotelId
    this.init()
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