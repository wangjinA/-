// components/footerButton/footerButton.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true
  },
  properties: {
    isFixed: {
      type: Boolean,
      value: true
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
    }
  }
})
