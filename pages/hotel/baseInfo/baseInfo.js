import { jdxj, defaultCity } from "../../../utils/config";

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
      label: '星级',
      placeholder: '请选择',
      key: 'starType',
      type: 'select',
      data: jdxj(),
      required: true,
    }, {
      label: '所在商圈',
      placeholder: '请输入商圈名称',
      key: 'businessCircle',
    }, {
      label: '最近地标建筑',
      key: 'zjdb',
      type: 'relation',
      data: ['地铁站', '火车站', '机场'],
      placeholder: '最近直线距离',
      company: '米'
    }, {
      label: '最常举办会议类型',
      placeholder: '请选择',
      key: 'meetingType',
      type: 'select',
      data: [{
        name: '公司年会',
        value: '公司年会'
      }, {
        name: '培训/讲座',
        value: '培训/讲座'
      }, {
        name: '工作会/总结会',
        value: '工作会/总结会'
      }, {
        name: '经销商会议/招商会/推介会',
        value: '经销商会议/招商会/推介会'
      }, {
        name: '发布会/颁奖/庆典',
        value: '发布会/颁奖/庆典'
      }, {
        name: '研讨/交流/论坛',
        value: '研讨/交流/论坛'
      }, {
        name: '沙龙',
        value: '沙龙'
      }, {
        name: '同学会/好友聚会',
        value: '同学会/好友聚会'
      }, {
        name: '团队建设/拓展/休闲会议',
        value: '团队建设/拓展/休闲会议'
      }]
    }, {
      label: '酒店简介卖点',
      key: 'sellingPoint',
      inputType: 'textarea'
    }, {
      label: '会议餐标',
      inputType: 'number',
      placeholder: '请输入数量',
      key: 'parkingNum',
    },  {
      label: 'VR展示链接',
      key: 'vrLink',
    }]
  },
  commit() {
    console.log(1);
    
    let wjForm = this.selectComponent('#wjForm')
    wjForm.getData()
    .then(data => {
      let params = {
        ...data,
        id: this.data.hotelId,
        starType: jdxj(data.starType),
        city: data.city.join(' ')
      }
      console.log(params);
      
      wx.loadingAPI(wx.$post('/hotel/updateHotelBasisInfo', params), '保存中')
      .then(data => {
        wx.showToast({
          title: '保存成功',
        })
        this.init()
      })
    })
    
  },
  init() {
    wx.loadingAPI(wx.$get('/hotel/getHotelBasisInfo', {
      hotelId: this.data.hotelId
    })).then(data => {
      let wjForm = this.selectComponent('#wjForm')
      data.data.city = data.data.city ? data.data.city.split(' ') : defaultCity
      data.data.starType = jdxj(data.data.starType)
      data.data.decorateTime = data.data.decorateTime ? wx.formatTime(new Date(data.data.decorateTime), true, false) : ''
      data.data.openingTime = data.data.openingTime ? wx.formatTime(new Date(data.data.openingTime), true, false) : ''
      wjForm.setData({
        formData: data.data
      })
    })
  },
  onLoad: function (options) {
    this.data.hotelId = options.hotelId || 2
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