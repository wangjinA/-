// pages/hotel/hotelAdd/hotelAdd.js
import {
  jdxj
} from '../../../utils/config'
Page({

  data: {
    formList: [{
      label: '酒店名称',
      key: 'hotelName',
      required: true,
    }, {
      label: '所在城市',
      key: 'city',
      required: true,
      type: 'city',
      address: true,
      addressRequired: true
    }, {
      label: '总机号码',
      required: true,
      key: 'htelPhone',
    }, {
      label: '酒店星级',
      required: true,
      key: 'starType',
      type: 'select',
      data: jdxj()
    }, {
      label: '客房总数',
      required: true,
      key: 'guestRoom',
      inputType: 'number',
      company: '间'
    }]
  },
  commit() {
    let contactsInfo = this.selectComponent('#contactsInfo')
    let form = this.selectComponent('#wjForm')
    form.getData()
      .then(formData => {
        contactsInfo.getData()
          .then(contactsData => {
            let params = {
              ...formData,
              ...contactsData,
              url: wx.$stringify(contactsData.fileList)
            }
            params.city = params.city.join(' ')
            params.starType = jdxj(params.starType)
            console.log(form.data.formData)
            console.log(params);

            wx.$post('/api/user/submitApply', params)
              .then(data => {
                console.log(data);

                form.clearData()
                contactsInfo.clearData()
                wx.showModal({
                  title: '温馨提示',
                  content: '提交成功，请耐心等待后台审核',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.navigateBack({
                        delta: 3
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }).catch(() => {
                wx.showToast({
                  icon: 'none',
                  title: '提交失败',
                })
              })
          })

      })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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