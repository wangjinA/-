// components/meetingDetail/meetingDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
    banner: [
      '/images/hotel/hotel1.jpg',
      '/images/hotel/hotel2.png',
      '/images/hotel/hotel3.jpg',
      '/images/hotel/hotel4.jpg',
      '/images/hotel/hotel5.jpg',
    ],
    current: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      var that = this;
      if (e.detail.source == 'touch') {
        that.setData({
          current: e.detail.current
        })
      }
    },
  }
})
