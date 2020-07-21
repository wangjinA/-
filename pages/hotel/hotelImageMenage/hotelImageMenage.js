import { imgTypes } from '../../../utils/config'
console.log(imgTypes);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgTypes: imgTypes.data
  },
  addImg(e) {
    let type = e.currentTarget.dataset.type
    let imgItem = e.detail
    wx.loadingAPI(wx.$post('/hotel/updateOrAddHotelImgUrltInfo', {
      imgUrl: imgItem.url,
      type,
      hotelId: this.data.hotelId
    }), '上传中')
  },
  delImg(e) {
    console.log(e);
  },
  init() {
    wx.loadingAPI(wx.$get('/hotel/getHotelImgUrlInfo', {
      hotelId: this.data.hotelId
    })).then(data => {

    })
  },
  onLoad: function (options) {
    this.data.hotelId = options.hotelId || 2
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