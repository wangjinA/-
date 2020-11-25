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
      type: 'switch',
      true: '是',
      false: '否'
    }, {
      label: '是否能进车',
      key: 'intoCar',
      type: 'switch',
      true: '能',
      false: '否'
    }],
    hotelChamberId: ''
  },
  commit() {
    let wjForm = this.selectComponent('#wjForm')
    let btForm = this.selectComponent('#btForm')
    let lxForm = this.selectComponent('#lxForm')
    let sxForm = this.selectComponent('#sxForm')
    let addImg = this.selectComponent('#addImg')
    let imgList = addImg.getData('请添加会议厅图片')
    console.log(imgList);
    
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
    let maxNumber = Math.max(...hotelChamberType.map(item=>item.numbers)) // 最大人数
    let maxNumberTargetType = Math.max(...hotelChamberType.map(item=>item.type)) // 最大人数对应的桌型
    wjForm.getData()
    .then(data => {
      data.dayPrice = parseInt(data.dayPrice)
      data.halfDayPrice = parseInt(data.halfDayPrice)
      wx.loadingAPI(wx.$post('/hotel/addHotelChamertInfo', {
        ...data,
        imgUrl: wx.$stringify(imgList),
        ...sxForm.data.formData,
        hotelId: wx.hotelId,
        hotelChamberType,
        hotelChamberTable: btForm.data.formData,
        hotelChamberId: this.data.hotelChamberId,
        maxNumber, // 嘉盛要的会议最大人数
        type: maxNumberTargetType, // 对应的最大人数
      }), '保存中')
      .then(data=>{
        wjForm.clearData()
        btForm.clearData()
        lxForm.clearData()
        sxForm.clearData()
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
  del() {
    wx.delAPI()
    .then(res=>{
      wx.$get('/hotel/deleteHotelChamerlInfoByHotelChamberId', {
        hotelChamberId: this.data.hotelChamberId
      }).then(res=>{
        wx.showToast({
          title: '删除成功',
        })
        wx.navigateBack()
      }).catch(()=>{
        wx.showToast({
          icon: 'none',
          title: '删除失败',
        })
      })
    })
  },
  init() {

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
  init() {
    let wjForm = this.selectComponent('#wjForm')
    let btForm = this.selectComponent('#btForm')
    let lxForm = this.selectComponent('#lxForm')
    let sxForm = this.selectComponent('#sxForm')
    let addImg = this.selectComponent('#addImg')
    wx.loadingAPI(wx.$get('/hotel/getgetHotelChamerlInfoByHotelChamberId', {
      hotelChamberId: this.data.hotelChamberId
    })).then(({data}) => {
      wjForm.setData({
        formData: data
      })
      btForm.setData({
        formData: data.hotelChamberTable
      })
      addImg.setData({
        fileList: data.imgUrl ? wx.$parse(data.imgUrl) : []
      })
      sxForm.setData({
        formData: {
          columnStatus: data.columnStatus,
          intoCar: data.intoCar
        }
      })
      let lxFormData = {}
      data.hotelChamberTypes && data.hotelChamberTypes.forEach(item => {
        lxFormData[`r_${item.type}`] = item.numbers
      })
      lxForm.setData({
        formData: lxFormData
      })
    })
  },
  onLoad(options) {
    if(options.hotelChamberId && options.hotelChamberId!="undefined") {
      this.setData({
        hotelChamberId: options.hotelChamberId
      })
      this.init()
    }
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