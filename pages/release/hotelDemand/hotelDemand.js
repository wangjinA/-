import { formatSelectData } from "../../../utils/util";
import { day } from "../../../utils/config";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [
    //   {
    //   label: '会场',
    //   key: 'hc',
    //   type: 'select',
    //   data: formatSelectData(['主会场', '主会场2'])
    // },
    {
      label: '会议时间',
      key: 'dayLong',
      type: 'checkbox',
      // data: formatSelectData(['全天', '上午', '下午', '晚上']),
      data: day(),
    }, {
      label: '容纳人数',
      key: 'containNumbers',
      type: 'select',
      data: formatSelectData(app.globalData.numberOfPeople)
    }, {
      label: '会场类型',
      key: 'venues',
      type: 'select',
      data: formatSelectData(["宴会式", "酒会式", "剧院式", "课桌式", "岛屿式", "U型", "鱼骨式"])
    }, {
      label: '预算',
      key: 'budget',
      inputType: 'number',
      company: '元/场'
    }, 
    // {
    //   label: '面积需求',
    //   key: 'mianji',
    //   typeInput: 'number',
    //   company: '㎡'
    // }, 
    {
      label: '备注',
      key: 'notes',
      inputType: 'textarea'
    }],
    activeNames: [0],
    timeList: []
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
  onChange(event) {
    console.log(event)
    this.setData({
      activeNames: event.detail,
    });
    
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('postQuery', data => {
      this.setData({
        timeList: wx.getAllDate(data.start, data.end)
      })
      if(data.data){
        console.log(data);
        
        const wjForms = this.selectAllComponents('#wjForm')
        data.data.forEach((item, i) => {
          let formItem = wjForms[i]
          formItem.setData({
            formData: data.data[i]
          })
          console.log(formItem)
        })
      }
    })
  },

  commit() {
    const wjForms = this.selectAllComponents('#wjForm')
    const { timeList } = this.data
    let data = timeList.map((item, i) => {
      return {
        dates: item,
        ...wjForms[i].data.formData
      }
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('pageData', data);
    wx.navigateBack()
  },
  onReady: function () {
    console.log(getCurrentPages())
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