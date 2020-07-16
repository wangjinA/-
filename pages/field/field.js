const app = getApp();
import { rs } from '../../utils/config'
Page({
    data: {
        selectedNav: '00',
        width: app.systemInfo.windowWidth,
        keyword: '',
        val1: '南昌',
        val2: 0,
        val3: 0,
        menuOptions1: [{
            text: '不限区域',
            value: 0
        }, {
            text: '南昌',
            value: '南昌'
        }],
        menuOptions2: [{
            text: '容纳人数',
            value: 0
        },...rs().map(item => ({
            ...item,
            text: item.name,
        }))],
        current: 1,
        pageSize: 10,
    },
    optionChange1(e) {
        this.setData({
            val1: e.detail
        })
        this.getData(true)
    },
    optionChange2(e) {
        this.setData({
            val2: e.detail
        })
        this.getData(true)
    },
    searchData() {
        this.getData(true)
    },
    onChange(e) {
      this.setData({
        keyword: e.detail
      })
    },
    getData(isInit) {
        if(isInit){
            this.setData({
                current: 1
            })
        }
        let siteSearchVo = {
            key: this.data.keyword,
        }
        if(this.data.val1) {
            siteSearchVo.area = this.data.val1
        }
        if(this.data.val2) {
            siteSearchVo.minpeopleNumber = rs(this.data.val2)[0]
            siteSearchVo.maxpeopleNumber = rs(this.data.val2)[1]
        }
        wx.loadingAPI(wx.$post('/site/searchSite', {
            siteSearchVo
        })).then(data=>{
            if(this.data.current == 1){
                this.data.list = []
            }
            let list = [...this.data.list, ...data.data.list]
            this.setData({
                list
            })
        })
    },
    onReady() {
        this.getData(true)
    }
})