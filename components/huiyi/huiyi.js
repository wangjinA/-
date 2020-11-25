// components/huiyi/huiyi.js
import { getStatus } from "../../utils/util";
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
  },

  data: {
    isUser: false,
    statusText: '',
    tagType: 'success'
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
        url: '/pages/robOrderDetail/robOrderDetail?id=' + id,
      })
    },
  }
})
