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
      // 是否是婚宴
      let url = this.data.isHunyan ? '/order/userWeddingQutoe' : '/order/userDetermineQutoe'
      wx.loadingAPI(wx.$post(url, {
        invoiceUrl: wx.$stringify(imgList),
        meetingId: this.data.id,
        weddingBanquetId: this.data.id,
        ...data
      })).then(res=>{
        if(res.msg === '成功'){
          wx.showToast({
            title: '提交成功',
          })
          wx.navigateBack()
        }
      })
    })
    
  },
  onLoad: function (options) {
    this.data.id = options.id
    this.data.isHunyan = options.isHunyan // 是否是婚宴
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