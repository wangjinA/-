const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '报价',
      key: 'dinnerPrice',
      required: true,
      inputType: 'number',
      company: '/人'
    }],
    activeNames: [0],
    list: [],
    meetingIndex: 0
  },
  copyPrev(e) {
    const { index } = e.target.dataset
    const wjForms = this.selectAllComponents('#wjForm')
    let prevCom = wjForms[index - 1]
    let com = wjForms[index]
    com.setData({
      formData: {...prevCom.data.formData},
      formList: [...prevCom.data.formList]
    })
  },
  async next() {
    let forms = this.selectAllComponents('#wjForm')
    let cybj = []
    for (let i = 0; i < forms.length; i++) {
      const formItem = forms[i];
      try {
        cybj.push({
          ...(await formItem.getData()),
          date: this.data.list[i].dates
        })
      } catch (error) {
        return false
      }
    }
    wx.cybj = cybj
    
    wx.navigateTo({
      url: '/pages/quote/otherRemark/otherRemark',
    })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      activeNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.setData({
      list:wx.singleDemandRepastVos
    })
  },
  closePopup() {
    this.setData({
      showPopup: false
    })
  },
  meetingClick(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      meetingIndex: index,
      showPopup: false
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