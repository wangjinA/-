// pages/hotel/components/contactsInfo/contactsInfo.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    formList: [{
      label: '真实姓名',
      required: true,
      key: 'contacts'
    }, {
      label: '联系电话',
      required: true,
      key: 'phone',
      inputType: 'number'
    }, {
      label: '职位',
      required: true,
      key: 'position',
      placeholder: '请输入酒店职位'
    }, {
      label: '邮箱',
      key: 'finitude',
      required: true,
      placeholder: '请输入办公邮箱'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getData() {
      let form = this.selectComponent('#wjForm')
      return new Promise((resolve, reject) => {
        form.getData()
          .then(data => {
            if(!data.phone || data.phone.length != 11){
              return wx.showToast({
                icon: 'none',
                title: '请输入正确的手机号',
              })
            }
            let img = this.selectComponent('#addImg')
            if (img.data.fileList && img.data.fileList.length) {
              resolve(Object.assign(data, {
                callingCard: JSON.stringify(img.data.fileList)
              }))
            } else {
              wx.showToast({
                icon: 'none',
                title: '请上传名片'
              })
              reject()
            }
          }).catch(reject)
      })
    },
    clearData() {
      let form = this.selectComponent('#wjForm')
      let img = this.selectComponent('#addImg')
      form.clearData()
      img.setData({
        fileList: []
      })
    }
  }
})