const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList: [],
    activeNames: [0],
    list: [],
    showPopup: false,
    meetingIndex: -1,
    nextText: '',
    cdList: []
  },
  copyPrev(e) {
    const { index } = e.target.dataset
    const wjForms = this.selectAllComponents('#wjForm')
    let prevCom = wjForms[index - 1]
    let com = wjForms[index]
    com.setData({
      formData: {...prevCom.data.formData},
      formList: [...prevCom.data.formList]
    })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      activeNames: event.detail,
    });
  },
  async next() {
    let forms = this.selectAllComponents('#wjForm')
    let hcbj = []
    for (let i = 0; i < forms.length; i++) {
      const formItem = forms[i];
      try {
        hcbj.push({
          ...await formItem.getData(),
          dates: this.data.list[i].dates,
          hotelId: wx.hotelId
        })
      } catch (error) {
        return false
      }
    }
    wx.hcbj = hcbj
    
    if(wx.kfShow){
      wx.navigateTo({
        url: '/pages/quote/roomQuote/roomQuote',
      })
    }else if(wx.cyShow){
      wx.navigateTo({
        url: '/pages/quote/eatQuote/eatQuote',
      })
    }else {
      wx.navigateTo({
        url: '/pages/quote/otherRemark/otherRemark',
      })
    }
  },
  
  onLoad (options) {

  },

  getCd() { // 获取场地
    wx.loadingAPI(wx.$get('/hotel/getHotelChamerlInfo', { // 会议厅信息
      hotelId: wx.hotelId,
      current: 1,
      pageSize: 50,
    }).then(data => {
      this.setData({
        cdList: data.data.list.map(item =>({
          ...item,
          imgUrl: wx.$parse(item.imgUrl),
          img: wx.$parse(item.imgUrl)[0].url,
        }))
      })
    }))
  },
  onReady () {
    this.getCd()
    let nextText = ''
    if(wx.kfShow){
      nextText = '客房报价'
    }else if(wx.cyShow) {
      nextText = '餐饮报价'
    }else {
      nextText = '其他说明'
    }
    this.setData({
      nextText,
      list: wx.singleDemandVenueVos,
      formList: [{
        label: '选择场地',
        key: 'chamberId',
        type: 'event',
        required: true,
        click: () => {
          this.setData({
            showPopup: true
          })
        }
      }, {
        label: '报价',
        required: true,
        key: 'price',
        inputType: 'number',
        company: '元/场'
      }]
    })
  },
  closePopup() {
    this.setData({
      showPopup: false
    })
  },
  formClick(e) { // 通过点击form来判断当前选择场地的index
    let index = e.currentTarget.dataset.index
    this.data.currentIndex = index
  },
  meetingClick(e) {
    const { index } = e.currentTarget.dataset // 选择场地的下标
    const currentIndex = this.data.currentIndex // form表单的下标
    this.setData({
      meetingIndex: index,
      showPopup: false
    })
    let meetingItem = this.data.cdList[index]
    let formItem = this.selectAllComponents('#wjForm')[currentIndex]
    formItem.data.formList.forEach(item =>{
      if(item.key === 'chamberId'){
        item.value = meetingItem.chamberName // 设置名称
      }
    })
    formItem.data.formData.chamberId = meetingItem.hotelChamberId // 设置id

    // 自动通过上午或者下午设置报价
    let dayLong = this.data.list[currentIndex].dayLong
    if(!dayLong || dayLong === '全天') { // 如果客户没有填写半天或者全天这个字段 默认设置全天价格
      formItem.data.formData.price = meetingItem.dayPrice
    }else { // 设置半天价格
      formItem.data.formData.price = meetingItem.halfDayPrice
    }


    formItem.setData({
      formList: formItem.data.formList,
      formData: formItem.data.formData
    })

  },
  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})