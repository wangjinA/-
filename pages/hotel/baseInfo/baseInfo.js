import {
  jdxj,
  defaultCity,
  hylx
} from "../../../utils/config";

// pages/hotel/baseInfo/baseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '酒店中文名称',
      placeholder: '请输入酒店名称',
      required: true,
      key: 'hotelName',
    }, {
      label: '所在城市',
      key: 'city',
      type: 'city',
      address: true,
      required: true,
      addressRequired: true,
      addressKey: 'address'
    }, {
      label: '总机号码',
      key: 'htelPhone',
      required: true,
    }, {
      label: '开业时间',
      placeholder: '请选择',
      key: 'openingTime',
      type: 'date',
      required: true,
    }, {
      label: '最近装修时间',
      placeholder: '请选择',
      key: 'decorateTime',
      type: 'date',
      required: true,
    }, {
      label: '酒店星级',
      placeholder: '请选择',
      key: 'starType',
      type: 'select',
      data: jdxj(),
      required: true,
    }, {
      label: '承办类型',
      placeholder: '请选择',
      required: true,
      notChek: true, // wjForm内部不判断
      key: 'undertakeType', // 0 全选 1 2 会议和婚宴
      type: 'checkbox',
      data: [{
        name: '会议',
        value: 1,
        checked: false, // 选中状态
      }, {
        name: '婚宴',
        value: 2,
        checked: false, // 选中状态
      }],
      required: true,
    }, {
      label: '所在商圈',
      placeholder: '请输入商圈名称',
      key: 'businessCircle',
    }, 
    // {
    //   label: '最近地标建筑',
    //   key: 'zjdb',
    //   type: 'relation',
    //   data: ['地铁站', '火车站', '机场'],
    //   placeholder: '最近直线距离',
    //   company: '米'
    // }, 
    
    {
      label: '最近地标建筑',
      key: 'zjdb',
    }, 
    {
      label: '最常举办类型',
      placeholder: '请选择',
      key: 'oftenMeetingType',
      type: 'select',
      data: hylx()
    }, {
      label: '酒店简介卖点',
      key: 'details',
      inputType: 'textarea'
    }, {
      label: '会议餐标',
      inputType: 'number',
      placeholder: '请输入数量',
      key: 'yprice',
      company: '元/桌起'
    }, {
      label: '婚宴餐标',
      inputType: 'number',
      placeholder: '请输入数量',
      key: 'hprice',
      company: '元/桌起'
    }, {
      label: 'VR展示链接',
      key: 'vrLink',
    }]
  },
  commit() {
    let wjForm = this.selectComponent('#wjForm')
    wjForm.getData()
      .then(data => {
        if(data.undertakeType instanceof Array && !data.undertakeType.length){ // 如果是手动选择就是数组， init后是number 0全选 12会议和婚宴
          return wx.showToast({
            title: '请选择承办类型',
            icon: 'none'
          })
        }
        let params = {
          ...data,
          id: wx.hotelId,
          starType: data.starType ? jdxj(data.starType) : '',
          city: data.city.join(' '),
          oftenMeetingType: data.oftenMeetingType ? hylx(data.oftenMeetingType) : '',
          undertakeType: data.undertakeType.length == 2 ? 0 : data.undertakeType[0]
        }
        if (data.zjdb && data.zjdb.length) {
          if (data.zjdb[0].name && data.zjdb[0].value) {
            params.landmark = data.zjdb[0].name
            params.distance = data.zjdb[0].value
          }
        }
        console.log(params);

        wx.loadingAPI(wx.$post('/hotel/updateHotelBasisInfo', params), '保存中')
          .then(data => {
            wx.showToast({
              duration: 1500,
              title: '保存成功',
            })
            setTimeout(() => {
              this.init()
            }, 1500)
          })
      })

  },
  init() {
    wx.loadingAPI(wx.$get('/hotel/getHotelBasisInfo', {
      hotelId: wx.hotelId
    })).then(({
      data
    }) => {
      let wjForm = this.selectComponent('#wjForm')
      data.city = data.city ? data.city.split(' ') : defaultCity
      data.starType = jdxj(data.starType)
      data.oftenMeetingType = data.oftenMeetingType ? hylx(data.oftenMeetingType) : ''
      data.decorateTime = data.decorateTime ? wx.formatTime(new Date(data.decorateTime), true, false) : ''
      data.openingTime = data.openingTime ? wx.formatTime(new Date(data.openingTime), true, false) : ''
      if (data.landmark) {
        data.zjdb = [{ // 最近地标
          name: data.landmark,
          value: data.distance,
        }]
      }
      wjForm.setData({
        formData: data
      })
      // 承办类型，设置多选框默认选中
      this.data.formList.forEach(item => {
        if(item.key === 'undertakeType') {
          item.data.forEach(_item => {
            if(data.undertakeType == 0) { // 全选
              _item.checked = true
            }else {
              _item.checked = _item.value == data.undertakeType
            }
          })
        }
      })
      this.setData({
        formList: [...this.data.formList]
      })
    })
  },
  onLoad: function (options) {
    this.init()
  },

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