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
      key: 'meetingRoomNum',
    }, {
      label: '客房总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'guestRoomNum',
    }, {
      label: '标准双床房总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'doubleBedRoomNum',
      labelWidth: '230rpx'
    }, {
      label: '大床房总数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '间',
      key: 'largeRoomNum',
    }, {
      label: '能否进车',
      placeholder: '请输入数量',
      key: 'parkingNum',
      type: 'select',
      data: [{
        name: '是',
        value: 1
      }, {
        name: '否',
        value: 0
      }]
    }, {
      label: '配套总车位数',
      inputType: 'number',
      placeholder: '请输入数量',
      company: '个',
      key: 'parkingNum',
    }]

  },

  /**
   * 生命周期函数--监听页面加载
   */
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