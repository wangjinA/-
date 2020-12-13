// components/footerButton/footerButton.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持

  },
  properties: {
    isFixed: {
      type: Boolean,
      value: true
    },
    type: {
      type: Number,
      value: 1
    },
    leftButtonType: {
      type: String,
      value: 'info'
    },
    rightButtonType: {
      type: String,
      value: 'primary'
    }
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
    clickHandler(e) {
      this.triggerEvent('click', e)
    },
    clickHandler1(e) {
      this.triggerEvent('clickright', e)
    }
  }
})
