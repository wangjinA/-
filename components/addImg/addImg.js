// components/addImg/addImg.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true,
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '图片上传'
    },
    rightText: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    fileList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    afterRead(event) {
      const { file } = event.detail;
      console.log(file);
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      wx.$uploadFile({
        file
      })
    },
  }
})
