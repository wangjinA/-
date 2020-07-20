// pages/hotelGuestRoom/hotelGuestRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [],
    showShuxing: false
  },
  
  commit() {
    let wjForm = this.selectComponent('#wjForm')
    let addImg = this.selectComponent('#addImg')
    let imgList = addImg.getData('请添加客房图片')
    if(!imgList) return;
    wjForm.getData()
    .then(data => {
      wx.loadingAPI(wx.$post('/hotel/addHotelGuesttInfo', {
        ...data,
        hotelId: this.data.hotelId,
        imgUrl: wx.$stringify(imgList)
      }), '保存中')
      .then(data=> {
        wjForm.clearData()
        addImg.clearData()
        wx.showToast({
          icon: 'success',
          title: '保存成功',
          complete() {
            wx.navigateBack()
          }
        })
      })
    })
  },
  closeShuxing() {
    this.setData({
      showShuxing: false
    })
  },
  
  onLoad(options) {
    this.data.hotelId = options.hotelId
    console.log(options);
    
  },
  onReady () {
    this.setData({
      formList: [{
        label: '房型',
        required: true,
        key: 'houseType',
      }, {
        label: '价格',
        required: true,
        key: 'price',
      }, 
      // {
      //   label: '属性',
      //   required: true,
      //   key: 'hotelName',
      //   type: 'event',
      //   click: () => {
      //     this.setData({
      //       showShuxing: true
      //     })
      //   }
      // },
       {
        label: '描述',
        key: 'describes',
      }]
    })
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