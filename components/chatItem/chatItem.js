// components/chatItem/chatItem.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true,
  },
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage() {
      this.triggerEvent('previewImage', this.data.data.content)
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
