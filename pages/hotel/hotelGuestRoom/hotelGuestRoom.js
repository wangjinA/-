// pages/hotelGuestRoom/hotelGuestRoom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [],
    showShuxing: false,
    hotelGuestId: ''
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
        hotelId: wx.hotelId,
        imgUrl: wx.$stringify(imgList),
        hotelGuestId: this.data.hotelGuestId || '',
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
  init() {
    let wjForm = this.selectComponent('#wjForm')
    let addImg = this.selectComponent('#addImg')
    wx.loadingAPI(wx.$get('/hotel/getHotelGuestlInfoById', {
      hotelGuestId: this.data.hotelGuestId
    })).then(({data}) => {
      wjForm.setData({
        formData: data
      })
      addImg.setData({
        fileList: data.imgUrl ? wx.$parse(data.imgUrl) : []
      })
    })
  },
  del() {
    wx.delAPI()
    .then(()=>{
      wx.$get('/hotel/deleteHotelGuestlInfoById',{
        hotelGuestId: this.data.hotelGuestId 
      }).then(()=>{
        wx.showToast({
          title: '删除成功',
        })
        wx.navigateBack()
      }).catch(()=>{
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
      })
    })
  },
  onLoad(options) {
    console.log(options);
    if(options.hotelGuestId && options.hotelGuestId!="undefined") {
      this.data.hotelGuestId = options.hotelGuestId
      this.setData({
        hotelGuestId: options.hotelGuestId
      })
      this.init()
    }
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