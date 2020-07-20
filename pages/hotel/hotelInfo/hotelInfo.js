// pages/hotelInfo/hotelInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [
      '/images/hotel/hotel1.jpg',
      '/images/hotel/hotel2.png',
      '/images/hotel/hotel3.jpg',
      '/images/hotel/hotel4.jpg',
      '/images/hotel/hotel5.jpg',
    ],
    formList: [{
      label: '基本信息',
      key: 'hotelName',
      type: 'link',
      value: '',
      url: '/pages/hotel/baseInfo/baseInfo',
    }, {
      label: '配套信息',
      key: 'hotelName',
      type: 'link',
      value: '',
      url: '/pages/hotel/roomInfo/roomInfo',
    }],
    fileList: [],
    tabs: ['会议厅'],
    yhList: [],
    kfList: [],
  },
  goAddGuestRoom() {
    wx.navigateTo({
      url: '/pages/hotel/hotelGuestRoom/hotelGuestRoom?hotelId='+this.data.hotelId
    })
  },
  goAddHotelImage() {
    wx.navigateTo({
      url: '/pages/hotel/hotelImageMenage/hotelImageMenage?hotelId='+this.data.hotelId,
    })
  },
  goAddMeeting() {
    wx.navigateTo({
      url: '/pages/addMeeting/addMeeting?hotelId='+this.data.hotelId,
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  initData() {
    wx.$get('/hotel/getHotelChamerlInfo', { // 会议厅信息
      hotelId: this.data.hotelId,
      current: 1,
      pageSize: 50,
    }).then(data => {
      this.setData({
        yhList: data.data.list.map(item =>({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        }))
      })
    })
    wx.$get('/hotel/getHotelGuestlInfo', { // 客房信息信息
      hotelId: this.data.hotelId,
      current: 1,
      pageSize: 50,
    }).then(data => {
      this.setData({
        kfList: data.data.list.map(item =>({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        }))
      })
    })
  },
  onLoad (options) {
    this.data.hotelId = options.id || 2
    this.initData()
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
    this.initData()
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