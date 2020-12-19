const app = getApp();
import { deepClone } from "../../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formLists: [],
    // formLists: [{
    //   label: '报价',
    //   key: 'price',
    //   required: true,
    //   inputType: 'number',
    //   company: '元/人'
    // }],
    activeNames: [0],
    list: [],
    meetingIndex: 0
  },
  copyPrev(e) {
    const {
      index
    } = e.target.dataset
    const wjForms = this.selectAllComponents('#wjForm')
    let prevCom = wjForms[index - 1]
    let com = wjForms[index]
    let tag = true
    com.data.formList.forEach(item => {
      let comFormData = com.data.formData
      let xdItem = prevCom.data.formList.filter(_item => {
        return _item.label == item.label && _item.placeholder == item.placeholder
      })[0]
      if(xdItem){
        let data = prevCom.data.formData[xdItem.key]
        if(data){
          comFormData[item.key] = data
          tag = false
        }
      }
    })
    if(tag){
      console.log('数据不匹配，无法复制') 
    }
    com.setData({
      formData: com.data.formData,
      // formList: deepClone(prevCom.data.formList)
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
          dates: this.data.list[i].dates
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
    wx.singleDemandRepastVos.forEach((warp, i) => {
      let target = []
      this.data.formLists[i] = target
      warp.dining.forEach((item, index) => {
        target.push({
          label: `${item.name} 报价`,
          key: 'price' + index,
          inputType: 'number',
          placeholder: `${item.value} 价格`,
          required: true,
          company: '元/人'
        })
      })

    })
    this.setData({
      formLists: this.data.formLists,
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