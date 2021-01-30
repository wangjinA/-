// pages/order/order.js
import {
  hyjgqj,
  rnzs,
  rs
} from '../../utils/config'
Page({

  data: {
    tabs: [{
      name: '已报价',
      key: 'alreadyOffer'
    }, {
      name: '已完成',
      key: 'complete',
    }, {
      name: '全部',
      key: 'all'
    }],
    current: 1,
    pageSize: 8,
    type: 1,
    activeIndex: 0,
    list: [],
    isHuiyi: true, // 默认会议 否则婚宴
    total: {}
  },
  // 首次加载，isTwo第一页没有数据就加载第二页
  async init(isTwo = false, isInit = false) {
    let result
    let type = isTwo ? 2 : (this.data.activeIndex + 1) // 类型 0全部 1.未报价，2.已报价，3.已完成
    if (wx.type == 1) { // 酒店
      let _type = type
      if(type == 3 ){
        _type = 0
      }
      if (this.data.isHuiyi) {
        result = wx.loadingAPI(wx.$get('/demandorder/getMyOrderDemand', {
          current: this.data.current,
          pageSize: this.data.pageSize,
          type: _type // 没有未报价 所以 + 1
        }))
        wx.setNavigationBarTitle({title: '会议报价'})
      } else {
        result = wx.loadingAPI(wx.$get('/demandorder/getMyWeddingOrderDemand', {
          current: this.data.current,
          pageSize: this.data.pageSize,
          type: _type // 没有未报价 所以 + 1
        }))
        wx.setNavigationBarTitle({title: '婚宴报价'})
      }
    } else { // 用户
      
      let _type = type
      if(type == 4 ){
        _type = 0
      }
      if (this.data.isHuiyi) {
        result = wx.loadingAPI(wx.$post('/demandorder/getUserDemand', {
          current: this.data.current,
          pageSize: this.data.pageSize,
          type: _type // 类型 1.未报价，2.已报价，3.已完成
        }))
        wx.setNavigationBarTitle({title: '会议需求'})
      } else {
        result = wx.loadingAPI(wx.$post('/demandorder/getUserWeddingDemand', {
          current: this.data.current,
          pageSize: this.data.pageSize,
          type: _type // 类型 1.未报价，2.已报价，3.已完成
        }))
        wx.setNavigationBarTitle({title: '婚宴需求'})
      }
    }
    if (result) {
      if (wx.type == 2 && type == 1 && isInit) { // 是用户 并且 [未报价] 结果列表返回长度为0
        const res = await result
        if (!res.data.list.length) {
          this.init(true)
          return
        }
      } else if (wx.type == 2 && isTwo == true) {
        const res = await result
        if (res.data.list.length) {
          this.setData({
            activeIndex: 1
          })
        }
      }
      if (this.data.isHuiyi) {
        result.then(res => {
          this.data.pages = res.data.pages
          let list = res.data.list
          list.forEach(item => {
            item.priceRange = hyjgqj(wx.$parse(item.priceRange))
            item.tablesNumber = rnzs(wx.$parse(item.tablesNumber))
            item.meetingPeople = rs(wx.$parse(item.meetingPeople))
            item.startTime = wx.formatTime(new Date(item.startTime), true)
            item.endTime = wx.formatTime(new Date(item.endTime), true)
          })
          if (this.data.current != 1) {
            list = [...this.data.list, ...list]
          } else {}
          this.setData({
            list
          })
        })
      } else {
        result.then(res => {
          this.data.pages = res.data.pages
          let list = res.data.list
          list.forEach(item => {
            item.priceRange = hyjgqj(wx.$parse(item.priceRange))
            item.tablesNumber = rnzs(wx.$parse(item.tablesNumber))
            item.startTime = wx.formatTime(new Date(item.startTime), true)
            item.endTime = wx.formatTime(new Date(item.endTime), true)
          })
          if (this.data.current != 1) {
            list = [...this.data.list, ...list]
          } else {}
          this.setData({
            list
          })
        })
      }
    }
  },
  onChange(event) {
    const index = event.detail.index
    console.log(index);
    this.setData({
      activeIndex: index
    })
    this.init()
  },
  goChat() {
    wx.navigateTo({
      url: '/pages/chat/chat',
    })
  },
  onLoad: function (options) {
    console.log(options.index);
    this.setData({
      isHuiyi: options.index == 0 // 0 会议 1 婚宴
    })
    if (wx.type == 2) {
      this.setData({
        tabs: [{
          name: '未报价',
          key: 'noQuotation'
        },{
          name: '已报价',
          key: 'alreadyOffer'
        }, {
          name: '已完成',
          key: 'complete',
        }, {
          name: '全部',
          key: 'all'
        }]
      })
    }
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
    this.init(false, true)
    wx.$get('/order/statisticalOrder', {
      userType: wx.type,
      type: this.data.isHuiyi ? 1 : 2 // 1会议2婚宴
    }).then(res => {
      console.log(res);
      this.setData({
        total: res.data
      })
    })
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

  onReachBottom() {
    if (this.data.current >= this.data.pages) {
      return this.setData({
        notMore: true
      })
    }
    this.data.current++
    this.init()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})