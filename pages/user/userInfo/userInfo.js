import { formatSelectData} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [{
      label: '姓名',
      key: 'contacts',
      required: true
    }, {
      label: '公司名称',
      key: 'companyName',
      placeholder: '公司名称，没有请填无',
      required: true
    },{
      label: '联系号码',
      key: 'phone',
      required: true
    },{
      label: '性别',
      key: 'sex',
      type: 'select',
      data: formatSelectData(['男', '女'])
    }, {
      label: '出生日期',
      key: 'dateBirth',
      type: 'date',
    }, {
      label: '邮箱',
      key: 'finitude',
    }]
  },
  commit() {
    this.wjForm.getData()
    .then(data => {
      if(!data.phone || data.phone.length != 11){
        return wx.showToast({
          icon: 'none',
          title: '请输入正确的手机号',
        })
      }
      if(!wx.$isEmail(data.finitude)){
        return wx.showToast({
          icon: 'none',
          title: '请输入正确的邮箱',
        })
      }
      let params = {...data}
      if(data.sex != undefined) {
        params.sex = params.sex == '男' ? 1 : 0
      }
      
      wx.loadingAPI(wx.$post('/api/user/updateUserInfo', {
        sysUser: params
      }), '保存中').then(data=>{
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
      })
    })
  },
  
  init() {
    wx.loadingAPI(wx.$get('/api/user/getUserInfo'))
      .then(data => {
        let userInfo = {}
        this.data.formList.forEach(({key}) =>{
          userInfo[key] = data.data.userInfo[key]
        })
        userInfo.sex = userInfo.sex === 1 ? '男' : '女'
        this.wjForm.setData({
          formData: userInfo
        })
      })

  },
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    this.wjForm = this.selectComponent('#wjForm')
    this.init()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})