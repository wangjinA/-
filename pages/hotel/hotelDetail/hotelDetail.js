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
    showRoomDetail: false,
    holteId: 0,
    data: {},
    kfList: [],
    hyList: [],
    meetingData: {},
    roomData: {}
  }, 
  goMap() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  clickMeeting(e) {
    let id = e.currentTarget.dataset.id
    wx.loadingAPI(wx.$get('/hotel/getgetHotelChamerlInfoByHotelChamberId', {
      hotelChamberId: id
    })).then(({data}) => {
      this.setData({
        meetingData: {
          ...data,
          imgUrl: data.imgUrl ? wx.$parse(data.imgUrl) : []
        }
      })
    })
    this.setData({
      showMeetingDetail: true
    })
  },
  clickRoom(e) {
    let id = e.currentTarget.dataset.id
    wx.loadingAPI(wx.$get('/hotel/getHotelGuestlInfoById', {
      hotelGuestId: id
    })).then(({data}) => {
      this.setData({
        roomData: {
          ...data,
        imgUrl: data.imgUrl ? wx.$parse(data.imgUrl) : []
        },
      })
    })
    this.setData({
      showRoomDetail: true
    })
  },
  closeDetail() {
    this.setData({
      showMeetingDetail: false,
      showRoomDetail: false,
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
      holteId: this.data.hotelId
    }).then(res=>{
      this.setData({
        data: res.data
      })
    })
  },
  getOhterInfo() {
    wx.$get('/hotel/getHotelChamerlInfo', { // 会议厅信息
      hotelId: this.data.hotelId,
      current: 1,
      pageSize: 50,
    }).then(data => {
      this.setData({
        hyList: data.data.list.map(item =>({
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
    this.getDetail()
    this.getOhterInfo()
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