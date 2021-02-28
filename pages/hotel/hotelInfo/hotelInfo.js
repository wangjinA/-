// pages/hotelInfo/hotelInfo.js
let formList = [{
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
}]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    formList,
    fileList: [],
    tabs: ['会议厅'],
    yhList: [],
    kfList: [],
  },
  goAddGuestRoom(e) {
    let hotelGuestId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/hotel/hotelGuestRoom/hotelGuestRoom?hotelId=${this.data.hotelId}&hotelGuestId=${hotelGuestId}`
    })
  },
  goAddMeeting(e) {
    let hotelChamberId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/addMeeting/addMeeting?hotelId=${this.data.hotelId}&hotelChamberId=${hotelChamberId}`
    })
  },
  goAddHotelImage() {
    wx.navigateTo({
      url: '/pages/hotel/hotelImageMenage/hotelImageMenage?hotelId=' + this.data.hotelId,
    })
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        // 上传完成需要更新 fileList
        const {
          fileList = []
        } = this.data;
        fileList.push({
          ...file,
          url: res.data
        });
        this.setData({
          fileList
        });
      },
    });
  },
  initData() {
    wx.$get('/hotel/getHotelChamerlInfo', { // 会议厅信息
      hotelId: wx.hotelId,
      current: 1,
      pageSize: 50,
    }).then(data => {
      this.setData({
        yhList: data.data.list.map(item => ({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        }))
      })
    })
    wx.$get('/hotel/getHotelGuestlInfo', { // 客房信息信息
      hotelId: wx.hotelId,
      current: 1,
      pageSize: 50,
    }).then(data => {
      this.setData({
        kfList: data.data.list.map(item => ({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        }))
      })
    })
    wx.loadingAPI(wx.$get('/hotel/getHotelImgUrlInfo', {
      hotelId: wx.hotelId
    })).then(data => {
      if (data.data.list && data.data.list.length) {
        this.setData({
          banner: data.data.list,
          formList: [{
              label: '图片管理',
              key: 'imgList',
              type: 'link',
              value: '',
              url: '/pages/hotel/hotelImageMenage/hotelImageMenage?hotelId=' + this.data.hotelId,
            },
            ...formList
          ]
        })
      }
      if (wx.roles && wx.roleId == 1 && !this.data.formList.some(item => item.label === '账户权限设置')) {
        this.setData({
          formList: [{
            label: '账户权限设置',
            key: 'hotelName',
            type: 'link',
            value: '',
            url: '/pages/hotel/staffAdmin/staffAdmin',
          }, ...this.data.formList]
        })
      }
    })
  },
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.roles && wx.roles.filter(item => item.id === 1).length);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.$loadUserInfo()
      .then(() => {
        this.data.hotelId = wx.hotelId
        this.initData()
      }).catch(() => {
        wx.showModal({
          content: '暂未登录，去登录',
          showCancel: false,
          success: () => {
            wx.navigateTo({
              url: '/pages/welcome/welcome?type=' + 1
            })
          }
        })
      })
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