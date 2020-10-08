import {
  hylx
} from "../../../utils/config";

Page({
  data: {
    duration: "500",
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
    roomData: {},
    bannerList: [],
    peitao: {}, // 配套信息
  },
  lookVR() {
    wx.navigateTo({
      url: '/pages/VR/VR?VR='+this.data.data.vrLink,
    })
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
    })).then(({
      data
    }) => {
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
    })).then(({
      data
    }) => {
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
  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.bannerList // 需要预览的图片http链接列表
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
    }).then(res => {
      let hotelDetaiil = res.data.hotelDetaiil
      this.setData({
        data: {
          ...hotelDetaiil,
          openingTime: wx.formatTime(new Date(hotelDetaiil.openingTime), true, false),
          decorateTime: wx.formatTime(new Date(hotelDetaiil.decorateTime), true, false),
          oftenMeetingType: hotelDetaiil.oftenMeetingType ?  hylx(hotelDetaiil.oftenMeetingType) : ''
        },
        userInfo: res.data.userInfo || {},
        bannerList: [...this.data.bannerList, ...hotelDetaiil.hotelImgUrlList.map(item=>item.imgUrl)],
        hyList: hotelDetaiil.hotelChamberList ? hotelDetaiil.hotelChamberList.map(item => ({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        })) : [],
        kfList: hotelDetaiil.hotelGuestList ? hotelDetaiil.hotelGuestList.map(item => ({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        })) : []
      })
      this.setData({
        bannerList: [
          ...this.data.hyList.map(item=>item.img),
          ...this.data.kfList.map(item=>item.img),
          ...res.data.hotelDetaiil.hotelImgUrlList.map(item=>item.imgUrl)
        ]
      })
    })
    // 获取酒店配套信息
    wx.loadingAPI(wx.$get('/hotel/getHotelAssortInfo', {
      hotelId: this.data.hotelId
    })).then(({
      data
    }) => {
      if(data){
        this.setData({
          peitao: {
            ...data,
            intoCar: !!data.intoCar
          }
        })
      }
    })
  },
  getOhterInfo() {
    wx.$get('/hotel/getHoteSysUserById', {
      hotelId: this.data.hotelId
    }).then(res=>{
      
    })

    // wx.$get('/hotel/getHotelChamerlInfo', { // 会议厅信息
    //   hotelId: this.data.hotelId,
    //   current: 1,
    //   pageSize: 50,
    // }).then(data => {
    //   this.setData({
    //     hyList: data.data.list.map(item => ({
    //       ...item,
    //       imgUrl: wx.$parse(item.imgUrl),
    //       img: wx.$parse(item.imgUrl)[0].url,
    //     }))
    //   })
    //   this.setData({
    //     bannerList: [...this.data.hyList.map(item=>item.img),...this.data.bannerList]
    //   })
    // })
    // wx.$get('/hotel/getHotelGuestlInfo', { // 客房信息信息
    //   hotelId: this.data.hotelId,
    //   current: 1,
    //   pageSize: 50,
    // }).then(data => {
    //   this.setData({
    //     kfList: data.data.list.map(item => ({
    //       ...item,
    //       imgUrl: wx.$parse(item.imgUrl),
    //       img: wx.$parse(item.imgUrl)[0].url,
    //     }))
    //   })
    //   this.setData({
    //     bannerList: [...this.data.kfList.map(item=>item.img),...this.data.bannerList]
    //   })
    // })
  },
  onLoad(options) {
    this.data.hotelId = options.id
    this.getDetail()
    // this.getOhterInfo()
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