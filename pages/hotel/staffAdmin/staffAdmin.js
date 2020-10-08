// import { yggl } from '../../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: []
  },

  commit() {
    let wjForm = this.selectComponent('wjForm')
  },
  selectData({detail}) {
    let userId = detail.key
    let roleId = this.data.roleList.filter(item => item.roleName == detail.value)[0].id
    wx.loadingAPI(wx.$post('/api/user/operateUserHostRole', {
      roleId,
      userIds: [userId]
    }), '保存中')
    .then(res=>{
      wx.showToast({
        duration: 2000,
        title: '保存成功'
      })
    })
    .catch(() => {
      wx.showToast({
        duration: 2000,
        icon: 'none',
        title: '保存失败'
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.$get('/hotel/getHoteSysUserById',{
      hotelId: wx.hotelId
    })
    .then(res=>{
      this.setData({
        formList: res.data.list.map(item =>({
          label: item.contacts,
          value: item.sysRoles.map(item => item.roleName),
          type: item.id==1 ? 'text' : 'select',
          key: item.id, // 用户id作为key
          data: []
        }))
      })
      // 获取角色列表
      wx.loadingAPI(wx.$get('/api/user/select/role/list'))
      .then(res=>{
        this.data.roleList = res.data.list // 记录一下
        this.setData({
          formList: this.data.formList.map(item => ({
            ...item,
            data: res.data.list.map(item => ({ // 设置可选列表
              name: item.roleName,
              value: item.roleName
            }))
          }))
        })
        
      })
    })
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