import {hyrs} from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBaitai: false,
    showLeixing: false,
    showShuxing: false,
    formList: [],
    baitaiFormList: [{
      label: '面积',
      key: 'areas',
      company: '㎡'
    }, {
      label: '所在楼层',
      placeholder: '请输入楼层',
      key: 'floor',
      company: '楼'
    }, {
      label: '层高',
      placeholder: '请输入距离',
      key: 'highly',
      company: 'm'
    }, {
      label: '长',
      placeholder: '请输入距离',
      key: 'length',
      company: 'm'
    }, {
      label: '宽',
      placeholder: '请输入距离',
      key: 'wide',
      company: 'm'
    }],
    leixingFormList: hyrs().map(item => ({
      ...item,
      key: `r_${item.type}`,
      placeholder: '请输入'
    })),
    shuxingFormList: [{
      label: '是否有柱',
      key: 'columnStatus',
      type: 'switch'
    }, {
      label: '是否能进车',
      key: 'intoCar',
      type: 'switch'
    }]
  },
  commit() {
    let wjForm = this.selectComponent('#wjForm')
    let btForm = this.selectComponent('#btForm')
    let lxForm = this.selectComponent('#lxForm')
    let sxData = this.selectComponent('#sxForm')
    let addImg = this.selectComponent('#addImg')
    let imgList = addImg.getData('请添加会议厅图片')
    if(!imgList) return;
    let keys = Object.keys(lxForm.data.formData)
    let hotelChamberType = keys.map(key => {
      let val = lxForm.data.formData[key]
      let type = parseInt(key.replace('r_', ''))
      return {
        numbers: val,
        type
      }
    })
    wjForm.getData()
    .then(data => {
      data.dayPrice = parseInt(data.dayPrice)
      data.halfDayPrice = parseInt(data.halfDayPrice)
      wx.loadingAPI(wx.$post('/hotel/addHotelChamertInfo', {
        imgUrl: wx.$stringify(imgList),
        ...data,
        ...sxData.data.formData,
        hotelId: this.data.hotelId,
        hotelChamberType,
        hotelChamberTable: btForm.data.formData
      }), '保存中')
      .then(data=>{
        wjForm.clearData()
        btForm.clearData()
        lxForm.clearData()
        sxData.clearData()
        addImg.clearData()
        wx.showToast({
          icon: 'success',
          title: '保存成功',
          complete() {
            wx.navigateBack()
          }
        })
      })
    })
  },
  closeShuxing() {
    this.setData({
      showShuxing: false
    })
  },
  closeLeixing() {
    this.setData({
      showLeixing: false
    })
  },
  closeBaitai() {
    this.setData({
      showBaitai: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.hotelId = options.hotelId
    console.log(options)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      formList: [{
        label: '名称',
        key: 'chamberName',
        required: true
      }, {
        label: '半天参考价',
        key: 'halfDayPrice',
        inputType: 'number',
        required: true
      }, {
        label: '全天参考价',
        key: 'dayPrice',
        inputType: 'number',
        required: true
      }, {
        label: '摆台',
        key: 'bt',
        type: 'event',
        click: () =>  {
          this.setData({
            showBaitai: true
          })
        }
      }, {
        label: '类型',
        key: 'leixing',
        type: 'event',
        click: () =>  {
          this.setData({
            showLeixing: true
          })
        }
      }, {
        label: '属性',
        key: 'shuxing',
        type: 'event',
        click: () =>  {
          this.setData({
            showShuxing: true
          })
        }
      }]
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