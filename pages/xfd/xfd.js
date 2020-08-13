// pages/xfd/xfd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList:[{
      label: '总金额',
      key: 'price',
      required: true,
      inputType: 'number',
    }]
  },

  commit() {
    let addImg = this.selectComponent('#addImg')
    let wjForm = this.selectComponent('#wjForm')
    let imgList = addImg.getData('请上传消费单')
    if(!imgList) return;
    wjForm.getData()
    .then(data => {
      wx.loadingAPI(wx.$post('/order/userDetermineQutoe', {
        invoiceUrl: wx.$stringify(imgList),
        meetingId: this.data.meetingId,
        ...data
      })).then(res=>{
        
      })
    })
    
  },
  onLoad: function (options) {
    this.data.meetingId = options.id
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