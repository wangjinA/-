// 滚动加载未做！！！！！！！！！！！！！！！！！！！！！


const app = getApp();
import { rs, address } from '../../utils/config'
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
        },...address.map((item, index) => ({
            text: item,
            value: item
        })) ],
        // menuOptions2: [{
        //     text: '最常举办类型',
        //     value: 0
        // }, ...hylx().map(item => ({text:item.name,...item}))],
        menuOptions2: [{
            text: '容纳人数',
            value: 0
        }, ...rs().map(item => ({text:item.name,...item}))],
        menuOptions3: [{ // 0 全部 1 会议 2 婚宴
            text: '类型',
            value: 0
        }, {
            text: '会议',
            value: 1
        }, {
            text: '婚宴',
            value: 2
        }],
        current: 1,
        pageSize: 10,
        list: []
    },
    optionChange1(e) {
        this.setData({
            val1: e.detail
        })
        this.getData()
    },
    optionChange2(e) {
        this.setData({
            val2: e.detail
        })
        this.getData()
    },
    optionChange3(e) {
        this.setData({
            val3: e.detail
        })
        this.getData()
    },
    searchData() {
        this.getData()
    },
    onChange(e) {
        if(!e.detail){
            this.getData()
        }
        this.setData({
        keyword: e.detail
        })
    },
    // 滚动加载
    loadmore(e) {
        console.log(e);
        this.getData(false);
    },
    getData(isInit = true) {
        if(isInit){
            this.data.current = 1
        }
        console.log(isInit)
        console.log(this.data.current)
        let siteSearchVo = {
            current: this.data.current++,
            pageSize: this.data.pageSize,
            key: this.data.keyword,
        }
        if(this.data.val1) {
            siteSearchVo.area = this.data.val1
        }
        if(this.data.val2) {
            siteSearchVo.minpeopleNumber = rs(this.data.val2)[0]
            siteSearchVo.maxpeopleNumber = rs(this.data.val2)[1]
        }
        siteSearchVo.undertakeType = this.data.val3
        wx.loadingAPI(wx.$post('/site/searchSite', siteSearchVo))
        .then(data=>{
            
            try {
                if(this.data.current == 2){
                    this.data.list = []
                }
            console.log(this.data.list);
            let list = [...this.data.list, ...data.data.list]
                this.setData({
                    list
                })
            } catch (error) {
                console.log(error);
                
            }
        })
    },
    onShow() {
        this.getData()
    }
})