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

  methods: {
    clearData() {
      this.setData({
        fileList: []
      })
    },
    getData(params = true) {
      let list = this.data.fileList
      if(typeof params === 'boolean'){
        if(params === true && !list.length) {
          wx.showToast({
            icon: 'none',
            title: '请选择图片',
          })
        }
      }
      if(typeof params === 'string' && !list.length) {
        wx.showToast({
          icon: 'none',
          title: params || '请选择图片',
        })
        return false
      }
      return list
    },
    delImg(e) {
      console.log(e);
      this.data.fileList.splice(e.detail.index, 1)
      this.setData({
        fileList: this.data.fileList
      })
    },
    afterRead(event) {
      const { file } = event.detail;
      console.log(file);
      wx.$uploadFile({
        file,
      }).then(data => {
        let url = data.data
        this.data.fileList.push({
          url
        })
        this.setData({
          fileList: this.data.fileList
        })
      },)
    },
  }
})
