import { formatSelectData } from "../../../utils/util";
import { rs } from "../../../utils/config";
const app = getApp();
// pages/release/hotelDemand/hotelDemand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '用餐',
      key: 'dining',
      type: 'relation',
      data: ['午餐' , '晚餐'],
      rightData: ['自助式', '围桌式' , '商务简餐', '盒饭'],
      type: 'relation',
      isAdd: '新增用餐',
    }, 
    // {
    //   label: '桌型',
    //   key: 'tableType',
    //   type: 'select',
    //   data: formatSelectData(['圆桌式', '自助式'])
    // }, 
    {
      label: '人数',
      key: 'containNumbers',
      type: 'select',
      data: rs()
    }, {
      label: '预算',
      key: 'budget',
      inputType: 'number',
      company: '元/人'
    }, {
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
  commit() {
    const wjForms = this.selectAllComponents('#wjForm')
    const { timeList } = this.data
    let data = timeList.map((item, i) => {
      // 客房类型需要转成字符串
      // let dining = wjForms[i].data.formData.dining
      // if(dining && dining.length){
      //   wjForms[i].data.formData.dining = wx.$stringify(dining)
      // }
      let formData = {...wjForms[i].data.formData}
      if(formData.containNumbers) {
        formData.containNumbers = formData.containNumbers
      } 
      return {
        dates: item,
        ...formData
      }
    })
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('pageData', data);
    wx.navigateBack()
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
          // item.dining = wx.$parse(item.dining)
          formItem.data.formList.forEach((item, i) => { // isAdd 有可以添加的列额外处理
            if(item.isAdd) {
              let _data = data.data[i][item.key]
              if(_data && _data.length){
                
                item.list = _data.map(obj => item.list[0])
              }
            }
          })
          if(item.containNumbers) {
            console.log(item.containNumbers)
            item.containNumbers = item.containNumbers
          } 
          formItem.setData({
            formData: item,
            formList: formItem.data.formList
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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