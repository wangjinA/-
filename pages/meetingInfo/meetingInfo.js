// pages/meetingInfo/meetingInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelFormList: [{
      label: '会议室中文名称',
      placeholder: '请输入酒店会议室全称',
      key: 'hotelName',
    }, {
      label: '会议室建筑面积',
      placeholder: '请输入面积 （m²）',
      key: 'hotelName',
    }, {
      label: '会议室层高',
      placeholder: '请输入层高（m）',
      key: 'hotelName',
    }, {
      label: '平面图',
      placeholder: '请输入面积 （m²）',
      key: 'hotelName',
    }, {
      label: '会议室长边长度',
      placeholder: '请输入长边长度 （m²）',
      key: 'hotelName',
    }, {
      label: '会议室短边长度',
      placeholder: '请输入短边长度 （m²）',
      key: 'hotelName',
    }, {
      label: '会场是否有柱子',
      key: 'hotelName',
      type: 'select',
      data: [{
        name: '是',
        value: 1
      }, {
        name: '否',
        value: 0
      }]
    }, {
      label: '可拆分最大数量',
      placeholder: '请输入最大数量',
      key: 'hotelName',
    }, {
      label: '剧院式容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '课桌式容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '宴会式容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '宴会式最多容纳桌数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '鱼骨式容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: 'U型容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '回字形容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '董事会型容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '酒会容纳人数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '宴会圆桌餐起订桌数',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '婚宴餐标起步价格',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '会议餐标',
      placeholder: '请输入',
      key: 'hotelName',
    }, {
      label: '是否能进车',
      placeholder: '请输入',
      key: 'hotelName',
      type: 'select',
      data: [{
        name: '是',
        value: 1
      }, {
        name: '否',
        value: 0
      }]
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