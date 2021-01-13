// components/huiyi/huiyi.js
Component({
  /**
   * 组件的属性列表
   */

  options: {
    addGlobalClass: true,
  },
  properties: {
    data: Object,
    showBtn: {
      type: Boolean,
      value: true
    },
    gs: {
      type: Boolean,
      value: false
    },
  },
  
  observers: {
    data(data) {
      console.log(data);
      
      let _companyName = data.companyName
      if (_companyName && _companyName != '无') {
        _companyName = _companyName.substr(0, 2) + '****公司'
      }
      this.setData({
        _data: {
          ...data,
          _companyName,
          // _budget: numGetUnit(data.budget),
          // _budgetCompany: numGetUnit(data.budget, true),
        }
      })
    },
  },

  data: {
    isUser: false,
    statusText: '',
    tagType: 'success',
    _data: {}
  },

  attached() {
    this.setData({
      isUser: this.data.data.userId == wx.userInfo.id,
      statusText: wx.$getStatus(this.data.data.status),
      tagType: wx.$getStatusType(this.data.data.status),
    })
    console.log(this.data);
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/hunyanDetail/hunyanDetail?id=' + id,
      })
    },
  }
})