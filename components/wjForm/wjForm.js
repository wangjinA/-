// components/wjForm/wjForm.js
import {
  formatTime
} from '../../utils/util'

const timeScopeDefaultDate = [Date.now(), Date.now() + 3600 * 24 * 1000 * 2]

Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  observers: {
    formData(data) {
      console.log('formdata改变了!!!');
      console.log(data)
    },
    formList(list) {
      list.forEach(item => {
        if (item.type === 'event') {
          this[item.key] = item.click
        }
      })
    }
  },
  properties: {
    formList: Array,
    timeScopeDefaultDate: {
      type: Array,
      value: [...timeScopeDefaultDate]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    calendarShow: false,
    currentCalendarKey: '',
    formData: {},
    customItem: '全部',
    labelWidth: '200rpx',
    showRelation: false,
    pickerView: {
      selectData: [],
      rightSelectData: [], // 右边也是选择器的时候
      placeholder: '',
      currentKey: '',
      company: '',
      currentIndex: 0,
      title: '',
    },
    pickerViewValue: []
  },
  attached() {
    this.initFormData()
    this.setData({
      formList: [...this.data.formList]
    },)
  }, 
  methods: {
    initFormData() {
      this.data.formList.forEach(item => {
        // 地址选择器默认江西南昌
        if (item.type === 'city') {
          this.setFormData({
            [item.key]: ['江西省', '南昌市']
          })
        }
        if (item.type === 'relation') {
          item.list = [{...item}]
        }
      })
    },
    getData(bool) { // 是否需要判断必填字段
      if(wx.checkRequired(this.data.formData, this.data.formList)){
        return Promise.resolve(this.data.formData)
      }else {
        return Promise.reject()
      }
    },
    clearData() { // 清空formData数据
      this.setData({
        formData: {}
      })
      this.initFormData()
    },
    closeRelationItem(e) {
      const {
        item,
        index
      } = e.currentTarget.dataset
      console.log(index)
      // 删除列表项
      if(index > 0) {
        let formList = [...this.data.formList]
        formList.forEach(formItem => {
          formItem.key === item.key && formItem.list.splice(index, 1)
        })
        this.setData({
          formList
        })
      }
      this.data.formData[item.key].splice(index, 1)
      // 清除数据
      this.setFormData({
        [item.key]: this.data.formData[item.key]
      }).then(res => console.log(this.data.formData))
    },
    addRelationItem(e) {
      // 添加
      const {
        item,
        index
      } = e.target.dataset
      let formList = [...this.data.formList]
      formList[index].list.push({
        ...formList[index].list[0]
      }) // 克隆。
      console.log(formList);
      this.setData({
        formList: formList
      })
    },
    pickerViewInputChange(e) {
      let relationIndex = this.data.pickerView.currentIndex
      let value = e.detail
      this.setRelationData({
        value
      })
    },
    setRelationData(data) {
      let key = this.data.pickerView.currentKey
      let relationIndex = this.data.pickerView.currentIndex
      let item = this.data.formData[key]
      if (!item) {
        this.setFormData({
          [key]: []
        })
        item = []
      }
      if (!item[relationIndex]) {
        item[relationIndex] = {
          name: this.data.pickerView.selectData[0],
          value: '',
          ...data,
        }
      } else {
        Object.assign(item[relationIndex], data)
      }
      this.setFormData({
        [key]: item
      }).then(res => {
        console.log(this.data.formData);

      })
    },
    pickerViewChange(e) {
      const val = e.detail.value
      let currentKey = this.data.pickerView.currentKey
      let data = {
        name: this.data.pickerView.selectData[val[0]]
      }
      if (this.data.formList.filter(item => item.key === currentKey)[0].rightData) {
        data.value = this.data.pickerView.rightSelectData[val[1]]
      }
      this.setRelationData(data)
    },
    closeRelation() {
      clearTimeout(this.relationTimer)
      this.setData({
        showRelation: false
      })
    },
    openRelation(e) {
      const {
        item,
        index
      } = e.target.dataset
      let formDataItem = this.getFormDataItemByKey(item.key)[index]
      let formListItem = this.getFormListItemByKey(item.key)
      this.setData({
        pickerView: {
          currentKey: item.key,
          currentIndex: index,
          selectData: item.data,
          company: item.company,
          title: item.label,
          placeholder: item.placeholder,
          rightSelectData: item.rightData
        },
        showRelation: true,
      }, _ => {
        let relationItem = this.data.formData[item.key]
        relationItem = relationItem && relationItem[index]
        !relationItem && this.pickerViewChange({ // 首次打开默认选中第一个（判断没有数据的情况下）
          detail: {
            value: [0, 0]
          }
        })
        this.relationTimer = setTimeout(() => { // 设置默认选中项
          let pickerViewValue = []
          if(formDataItem){
            pickerViewValue = [
              this.getFormListItemByKey(item.key).data.indexOf(formDataItem.name)
            ]
            if(formListItem.rightData){
              pickerViewValue.push(this.getFormListItemByKey(item.key).rightData.indexOf(formDataItem.value))
            }else {
              pickerViewValue.push(0)
            }
          }
          this.setData({ pickerViewValue })
        }, 200);
      })
    },
    switchOnChange(e) {
      let key = e.target.dataset.key
      this.setFormData({
        [key]: e.detail
      }).then(res => {
        console.log(this.data)
        console.log(res)
      })
    },
    //  时间 -> 人数 -> 需求 
    bindRegionChange(e) {
      let key = e.target.dataset.key
      console.log('picker发送选择改变，携带值为', )
      this.setFormData({
        [key]: e.detail.value
      })
    },
    calendarConfirm(event) {
      const [start, end] = event.detail;
      // console.log(formatTime(start))
      // console.log(formatTime(end))
      this.setData({
        calendarShow: false,
      });
      this.setFormData({
        [this.data.currentCalendarKey]: [formatTime(start, true), formatTime(end, true)]
      })
    },
    calendarClose() {
      this.setData({
        calendarShow: false
      })
    },
    openCalendar(e) {
      let key = e.target.dataset.key
      this.setCalendarSelect(key)
      this.setData({
        currentCalendarKey: key,
        calendarShow: true
      })
    },
    setCalendarSelect(key) { // 解决：在多个日历的情况下，使用同一个日历组件，上一个选择完毕之后，下一个仍然是上一个选择好的日期
      if (key !== this.data.currentCalendarKey) {
        let calendar = this.selectComponent('#calendar')
        let currentCalendarData = this.data.formData[key]
        this.setData({
          timeScopeDefaultDate: currentCalendarData ? currentCalendarData.map(item => {
            if (item.length === 5) {
              item = `${new Date().getFullYear()}-${item}`
            }
            return new Date(item).getTime()
          }) : [...timeScopeDefaultDate]
        }, _ => {
          calendar.reset()
        })
      }
    },
    clickHandler(e) {
      console.log(e)
    },
    setFormData(obj) {
      return new Promise((resolve, reject) => {
        this.setData({
          formData: {
            ...this.data.formData,
            ...obj
          }
        }, resolve)
      })
    },
    getFormDataItemByKey(key) {
      return this.data.formData[key] || ''
    },
    getFormListItemByKey(key) {
      return this.data.formList.filter(item => item.key === key)[0] || ''
    },
    inputChange(e) {
      let key = e.target.dataset.key
      let value = e.detail
      this.setFormData({
        [key]: value
      })
    },
    dateChange(e) {
      let key = e.target.dataset.key
      let value = e.detail.value
      this.setFormData({
        [key]: value
      })
    },
    pickChange(e) {
      let key = e.target.dataset.key
      let pickIndex = e.detail.value // 选择器的下标
      let targetObj = this.data.formList.filter(item => item.key === key)[0].data // 选中的对象
      let value = targetObj[pickIndex].value
      this.setFormData({
        [key]: value
      })
    }
  }
})