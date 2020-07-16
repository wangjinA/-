import { formatSelectData } from "../../../utils/util";

// pages/hotel/baseInfo/baseInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '酒店中文名称',
      placeholder: '请输入酒店名称',
      key: 'hotelName',
    }, {
      label: '酒店地址',
      placeholder: '完整酒店地址',
      key: 'hotelAddress',
    }, {
      label: '所在商圈',
      placeholder: '请输入商圈名称',
      key: 'shangquan',
    }, {
      label: '开业时间',
      placeholder: '请选择',
      key: 'createTime',
      type: 'date'
    }, {
      label: '最近装修时间',
      placeholder: '请选择',
      key: 'updateTime',
      type: 'date'
    }, {
      label: '星级',
      placeholder: '请选择',
      key: 'star',
      type: 'select',
      data: [{
        name: '三星/舒适',
        value: '三星/舒适'
      }, {
        name: '四星/高档',
        value: '四星/高档'
      }, {
        name: '五星/豪华',
        value: '五星/豪华'
      }, {
        name: '五星/顶级',
        value: '五星/顶级'
      }]
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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