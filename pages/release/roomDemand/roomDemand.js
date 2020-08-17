import { formatSelectData } from "../../../utils/util";
const app = getApp();
// pages/release/hotelDemand/hotelDemand.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '房型',
      type: 'relation',
      key: 'rooms',
      isAdd: '新增房型',
      company: '间',
      placeholder: '所需房间数',
      data: ['双床房', '单人房'],
    }, 
    // {
    //   label: '是否需要网络',
    //   key: 'networkFlag',
    //   type: 'switch',
    // }, 
    {
      label: '预算',
      key: 'budget',
      inputType: 'number'
    }, {
      label: '备注',
      key: 'notes',
      inputType: 'textarea',
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
      // let rooms = wjForms[i].data.formData.rooms
      // if(rooms && rooms.length){
      //   wjForms[i].data.formData.rooms = wx.$stringify(rooms)
      // }
      return {
        dates: item,
        ...wjForms[i].data.formData,
      }
    })
    console.log(data)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('pageData', data);
    wx.navigateBack()
  },
  onLoad (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('postQuery', data => {
      this.setData({
        timeList: wx.getAllDate(data.start, data.end)
      })
      if(data.data){
        const wjForms = this.selectAllComponents('#wjForm')
        data.data.forEach((item, i) => {
          let formItem = wjForms[i]
          // item.rooms = wx.$parse(item.rooms)
          formItem.data.formList.forEach((item, i) => { // isAdd 有可以添加的列额外处理
            if(item.isAdd) {
              let _data = data.data[i][item.key]
              if(_data && _data.length){
                
                item.list = _data.map(obj => item.list[0])
              }
            }
          })
          
          
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