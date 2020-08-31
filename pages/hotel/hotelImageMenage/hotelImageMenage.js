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
      hotelId: wx.hotelId
    }), '上传中').then(data => {
      wx.showToast({
        title: '已上传',
      })
      this.init()
    })
  },
  delImg(e) {
    let imgId = e.detail[0].imgId
    wx.loadingAPI(wx.$get('/hotel/deleteUrlById', {
      hotelId: wx.hotelId,
      imgId,
    })).then(data => {
      wx.showToast({
        title: '已删除',
      })
      // this.init()
    })
  },
  init() {
    wx.loadingAPI(wx.$get('/hotel/getHotelImgUrlInfo', {
      hotelId: wx.hotelId
    })).then(data => {
      let obj = {}
      data.data.list.forEach(item => {
        imgTypes.data.filter(f=>f.value == item.type)[0].type
        let target = obj[imgTypes.data.filter(f=>f.value ==item.type)[0].id]
        let push_item = {
          url: item.imgUrl,
          imgId: item.imgId
        }
        if(target){
          target.push(push_item)
        }else {
          obj[imgTypes.data.filter(f=>f.value ==item.type)[0].id] = [push_item]
        }
      });
      // obj = {wg: [{...}, {...}], dt: [{...}]} ←转换成这样的格式
      Object.keys(obj).forEach(key => {
        let form = this.selectComponent(`#${key}`)
        form.setData({
          fileList: obj[key]
        })
      })
    })
  },
  onLoad: function (options) {
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