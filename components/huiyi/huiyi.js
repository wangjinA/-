// components/huiyi/huiyi.js
import {
  numGetUnit
} from "../../utils/util";
Component({
  /**
   * 组件的属性列表
   */

  options: {
    addGlobalClass: true,
  },
  observers: {
    data(data) {
      let _companyName = data.companyName
      if (_companyName && _companyName != '无') {
        _companyName = _companyName.substr(0, 2) + '****公司'
      }
      console.log(_companyName);
      console.log(data.companyName);
      
      this.setData({
        _data: {
          ...data,
          _budget: numGetUnit(data.budget),
          _budgetCompany: numGetUnit(data.budget, true),
          _companyName
        }
      })
    },
  },
  properties: {
    data: Object,
    gs: {
      type: Boolean,
      value: false
    },
    showBtn: {
      type: Boolean,
      value: true
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
      // _data: {
      //   ...this.data.data,
      // }
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
        url: '/pages/robOrderDetail/robOrderDetail?id=' + id,
      })
    },
  }
})