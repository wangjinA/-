// pages/release/release.js
import {
  hyjgqj,
  rnzs,
  jdxj,
  rs,
  address
} from '../../utils/config'
let keys = ['hcxq', 'kfxq', 'cyxq']
const app = getApp()
import {
  formatTime,
  formatSelectData,
  getAllDate
} from '../../utils/util'
Page({
  /**
   * 组件的属性列表
   */
  onChange(e) {
    wx.setNavigationBarTitle({
      title: e.detail.title
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  /**
   * 组件的初始数据
   */

  data: {
    meetingformList: [], // 会议需求
    weddingFormList: [{ // 婚宴需求
      label: '宴会日期',
      type: 'timeScope',
      // timeType: 'multiple',
      key: 'date',
      required: true
    }, {
      label: '宴会地点',
      key: 'place',
      type: 'city',
      // address: true,
      // addressRequired: true,
      required: true
    }, {
      label: '价格区间',
      type: 'select',
      key: 'priceRange',
      required: true,
      data: hyjgqj()
    }, {
      label: '容纳桌数',
      type: 'select',
      key: 'tablesNumber',
      required: true,
      data: rnzs()
    }, {
      label: '酒店星级',
      key: 'hotelStar',
      type: 'select',
      required: true,
      data: jdxj()
    }, {
      label: '备注',
      inputType: 'textarea',
      placeholder: '其他宴会要求',
      key: 'notes',
    }],
    address: address,
    persons: [
      '10~50人',
      '51~100人',
      '101~150人',
      '151~300人',
      '301~500人',
      '501~1000人',
      '1000人以上',
    ],
    calendarShow: false,
    startDate: '',
    endDate: '',
    userType: 'jiudian',
    labelWidth: '200rpx',
    hotelFormData: {},
    isLogin: false, // 
  },
  nextPage() {
    wx.navigateTo({
      url: '/pages/meetingInfo/meetingInfo',
    })
  },
  calendarClose() {
    this.setData({
      calendarShow: false,
    });
  },
  calendarConfirm(event) {
    const [start, end] = event.detail;
    console.log(formatTime(start))
    console.log(formatTime(end))
    this.setData({
      calendarShow: false,
      startDate: start,
      endDate: end
    });
  },
  calendarOpen(event) {
    this.setData({
      calendarShow: true
    })
  },
  checkDate() { // 判断是否选择了会议日期
    let formData = this.selectComponent('#meetingForm').data.formData
    let isDate = !!(formData.date && formData.date.length)
    if (!isDate) {
      wx.showToast({
        icon: 'none',
        title: '请选择会议日期',
      })
    }
    return isDate
  },
  commitWedding() { // 提交婚宴
    if (this.checkLogin()) {
      return
    }
    this.checkUserInfo()
      .then((res) => {
        if (!res.data) {
          wx.showToast({
            title: '请完善个人信息',
            icon: 'none',
          })
          return setTimeout(() => {
            wx.navigateTo({
              url: '/pages/user/userInfo/userInfo',
            })
          }, 2000);
        }
        let formItem = this.selectComponent('#weddingForm')
        let formData = formItem.data.formData
        if (!wx.checkRequired.call(this, formData, this.data.weddingFormList)) {
          return;
        }
        let params = {
          ...formData,
          startTime: wx.fixYear(formData.date[0]),
          endTime: wx.fixYear(formData.date[1]),
        }

        params.place = params.place.join('')
        params.tablesNumber = wx.$stringify(rnzs(params.tablesNumber)) // 容纳桌数
        params.priceRange = wx.$stringify(hyjgqj(params.priceRange)) // 价格区间
        params.hotelStar = jdxj(params.hotelStar) // 酒店星级
        params.detailedAddress = params.placeAddress

        console.log(params)
        wx.loadingAPI(wx.$post('/demand/addWeddingBanquet', params), '发布中')
          .then(res => {
            wx.showToast({
              title: '发布成功',
            })
            formItem.clearData()
            setTimeout(() => {
              if(wx.type == 1){
                wx.type = 2
                wx.showToast({title: '已切换身份', icon: 'none', duration: 2000})
              }
              wx.navigateTo({
                url: `/pages/order/order?index=1`
              })
            }, 1600);
          })
          .catch(error => {
            wx.showToast({
              icon: 'none',
              title: '发布失败',
            })
          })
      })
  },
  commitMeeting() { // 提交会议
    if (this.checkLogin()) {
      return
    }
    this.checkUserInfo()
      .then((res) => {
        if (!res.data) {
          wx.showToast({
            title: '请完善个人信息',
            icon: 'none',
            duration: 1500
          })
          return setTimeout(() => {
            wx.navigateTo({
              url: '/pages/user/userInfo/userInfo',
            })
          }, 1500);
        }
        let form = this.selectComponent('#meetingForm')
        form.getData()
          .then(formData => {
            formData.minpeopleNumber = formData.meetingPeople[0] // 最小
            formData.maxpeopleNumber = formData.meetingPeople[1] // 最大 后端要拿这个字段做筛选
            formData.meetingPeople = wx.$stringify(rs(formData.meetingPeople))
            console.log(formData.meetingPeople)
            let params = {
              ...formData,
              meetingStartTime: wx.fixYear(formData.date[0]),
              meetingEndTime: wx.fixYear(formData.date[1]),
              minpeopleNumber: formData.meetingPeople,
              demandMeetingVenue: this.checkIsScope(this.data.hcxqData), // 会场
              demandMeetingRepasts: this.checkIsScope(this.data.cyxqData), // 餐饮
              demandMeetingRooms: this.checkIsScope(this.data.kfxqData), // 客房
            }
            console.log(params)
            wx.loadingAPI(wx.$post('/demand/addDemand', params), '发布中')
              .then(res => {
                wx.showToast({
                  title: '发布成功',
                })
                form.clearData()
                this.clearXqData()
                setTimeout(() => {
                  if(wx.type == 1){
                    wx.type = 2
                    wx.showToast({title: '已切换身份', icon: 'none', duration: 2000})
                  }
                  wx.navigateTo({
                    url: `/pages/order/order?index=1`
                  })
                }, 1600);
              })
              .catch(error => {
                wx.showToast({
                  icon: 'none',
                  title: '发布失败',
                })
              })
          })
      })
  },
  // 当用户填写需求后，又更改了会议日期，需要过滤出还在日期范围内的需求
  checkIsScope(list) {
    if (list) {
      let formData = this.selectComponent('#meetingForm').data.formData
      let start = wx.fixYear(formData.date[0])
      let end = wx.fixYear(formData.date[1])
      let allDate = getAllDate(start, end)
      return list.filter(item => {
        return allDate.indexOf(item.dates) != -1
      })
    } else {
      return []
    }
  },
  checkUserInfo() {
    return wx.$post('/api/user/check')
  },
  goXq(type) { // 跳转会场需求
    let urls = [
      '/pages/release/hotelDemand/hotelDemand',
      '/pages/release/roomDemand/roomDemand',
      '/pages/release/eatDemand/eatDemand'
    ]
    let dataKeys = keys.map(item => item + 'Data')
    let formData = this.selectComponent('#meetingForm').data.formData
    if (this.checkDate()) {
      let start = wx.fixYear(formData.date[0])
      let end = wx.fixYear(formData.date[1])
      wx.navigateTo({
        url: urls[type],
        events: {
          pageData: data => {
            this.data[dataKeys[type]] = data
            let statusVlue = ''
            if (data.some(item => Object.keys(item).length > 1)) {
              statusVlue = '已填写'
            }
            this.data.meetingformList.forEach(item => {
              item.key === keys[type] && (item.value = statusVlue)
            })
            this.setData({
              meetingformList: this.data.meetingformList
            })
          }
        },
        success: res => {
          res.eventChannel.emit('postQuery', {
            start,
            end,
            data: this.data[dataKeys[type]]
          })
        }
      })
    }
  },
  clearXqData() { // 清除三个需求的关联数据
    let form = this.selectComponent('#meetingForm')
    let formList = form.data.formList
    formList.filter(item => keys.find(k => k == item.key)).forEach(item => item.value = '')
    form.setData({ // 清除【请填写】
      formList
    })
    keys.map(item => item + 'Data').forEach(key => { //
      delete this.data[key]
    })
  },
  checkLogin() {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      })
      return true
    }
  },
  onShow() {
    this.setData({
      isLogin: !!wx.getStorageSync('token')
    })
  },
  onReady() {
    this.setData({
      meetingformList: [{
          label: '开会城市',
          type: 'select',
          key: 'city',
          required: true,
          data: [{
            name: '南昌',
            value: '南昌',
          }, {
            name: '九江',
            value: '九江',
          }, {
            name: '上饶',
            value: '上饶',
          }, {
            name: '抚州',
            value: '抚州',
          }, {
            name: '宜春',
            value: '宜春',
          }, {
            name: '吉安',
            value: '吉安',
          }, {
            name: '赣州',
            value: '赣州',
          }, {
            name: '景德镇',
            value: '景德镇',
          }, {
            name: '萍乡',
            value: '萍乡',
          }, {
            name: '新余',
            value: '新余',
          }, {
            name: '鹰潭',
            value: '鹰潭',
          }]
        }, {
          label: '会议日期',
          type: 'timeScope',
          key: 'date',
          required: true,
        }, {
          label: '参会人数',
          type: 'select',
          key: 'meetingPeople',
          required: true,
          data: rs()
        },
        // {
        //   label: '位置要求',
        //   inputType: 'textarea',
        //   key: 'locationDemand',
        // }, 
        {
          label: '会场需求',
          type: 'event',
          key: 'hcxq',
          placeholder: '请选择',
          click: () => this.goXq(0)
        }, {
          label: '客房需求',
          type: 'event',
          key: 'kfxq',
          placeholder: '请选择',
          click: () => this.goXq(1)
        }, {
          label: '餐饮需求',
          type: 'event',
          key: 'cyxq',
          placeholder: '请选择',
          click: () => this.goXq(2)
        }, {
          label: '总预算',
          inputType: 'number',
          key: 'budget',
          company: '元'
        }, {
          label: '备注',
          inputType: 'textarea',
          placeholder: '其他场地要求',
          key: 'notes',
        }
      ]
    })
  }
})