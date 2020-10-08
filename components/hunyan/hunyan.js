// components/huiyi/huiyi.js
Component({
  /**
   * 组件的属性列表
   */

  options: {
    addGlobalClass: true,
  },
  properties: {
    data: Object,
    showBtn: {
      type: Boolean,
      value: true
    }
  },

  data: {
    currentUserId: ''
  },

  attached() {
    this.setData({
      currentUserId: wx.userInfo.id
    }, )
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/hunyanDetail/hunyanDetail?id=' + id,
      })
    },
  }
})