// components/wjPopup/wjPopup.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true
  },
  properties: {
    title: String,
    'customStyle': {
      type: String,
      value: `
        height: 60%;
      `
    },
    show: Boolean
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
    closeHandler() {
      this.triggerEvent('close')
    }
  }
})
