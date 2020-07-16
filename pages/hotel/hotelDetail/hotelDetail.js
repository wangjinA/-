Page({ 
  data: {
    duration:"500",
    banner: [
      '/images/hotel/hotel1.jpg',
      '/images/hotel/hotel2.png',
      '/images/hotel/hotel3.jpg',
      '/images/hotel/hotel4.jpg',
      '/images/hotel/hotel5.jpg',
    ],
    current: 0,
    tabs: [{
      title: '会议厅',
      count: 19
    }, {
      title: '客房',
      count: 2
    }],
    showMeetingDetail: false,
    holteId: 0
  }, 
  goMap() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  clickMeeting() {
    this.setData({
      showMeetingDetail: true
    })
  },
  closeMeetingDetail() {
    this.setData({
      showMeetingDetail: false
    })
  },
  swiperChange: function (e) {
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current
      })
    }
  },
  getDetail() {
    wx.$get('/site/searchHotelDetail', {
      holteId: this.data.holteId
    })
  },
  onLoad (options) {
    this.data.holteId = options.id
    this.getDetail()
  }, 
  onReady: function () {

  }, 
  onShow: function () {

  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})