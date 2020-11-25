// pages/hotel/hotelSearch/hotelSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    // region: '南昌',
    region: '',
    hotelList: [],
    pageSize: 20,
    current: 1,
  },
  toHotelSettlein(e) {
    let {id, name} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/hotel/hotelSettlein/hotelSettlein?hotelId=${id}&hotelName=${name}`,
    })
  },
  onChange(e) {
    this.setData({
      keyword: e.detail
    })
  },
  toHotelCreate() {
    wx.navigateTo({
      url: '/pages/hotel/hotelCreate/hotelCreate',
    })
  },
  onLoad: function (options) {

  },

  searchCommit() { // 搜索
    wx.loadingAPI(wx.$get('/hotel/getHotelBySearch', {
      key: this.data.keyword,
      region: this.data.region,
      current:this.data.current,
      pageSize: this.data.pageSize
    }),'搜索中')
      .then(data => {
        if(this.data.current == 1) {
          this.data.hotelList = []
        }
        this.setData({
          hotelList: [...this.data.hotelList, ...data.data.list]
        })
      })
  },
  onReady: function () {
    this.searchCommit()
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