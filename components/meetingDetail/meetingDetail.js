// components/meetingDetail/meetingDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的初始数据
   */
  data: {
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
    previewImage(e) {
      wx.previewImage({
          current: e.currentTarget.dataset.url, // 当前显示图片的http链接
          urls: this.data.data.imgUrl.map(item=>item.url) // 需要预览的图片http链接列表
      })
  },
  }
})
