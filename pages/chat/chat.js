let SCROLL_TOP = 50000
/**
 * 聊天页面
 */
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputType: 'none',
        textMessage: '',
        scrollTop: 0,
        chatItems: [{
                avatar: '/images/hotel/hotel4.jpg',
                other: true,
                type: 'baojia',
                baojiaData: [{
                    name: '会议',
                    value: '12000'
                }, {
                    name: '客房',
                    value: '9800'
                }, {
                    name: '餐饮',
                    value: '8000'
                }],
                totalPrice: 300000
            },
            {
                "type": "text",
                other: true,
                avatar: '/images/hotel/hotel4.jpg',
                "content": "那这边给您再优惠1200，您看可以吗，已经是给您节日优惠价了"
            }, {
                "type": "text",
                avatar: '/images/avatar.jpg',
                "content": "可以，周末我去场地看看，到时候我联系你"
            }, {
                "type": "text",
                other: true,
                avatar: '/images/hotel/hotel4.jpg',
                "content": "好，就这么决定了"
            }, {
                "type": "text",
                other: true,
                avatar: '/images/hotel/hotel4.jpg',
                "content": "您可以直接点击屏幕上方的电话联系我这边，周末见！"
            }, {
                "type": "text",
                avatar: '/images/avatar.jpg',
                "content": "好，到时候我带几个朋友过来"
            }, {
                "type": "text",
                other: true,
                avatar: '/images/hotel/hotel4.jpg',
                "content": "没问题！"
            }
        ],
        latestPlayVoicePath: '',
        chatStatue: 'open',
        actions: [, {
            picName: 'take_photos',
            name: '拍摄',
            color: '#FD960D'
        }, {
            picName: 'choose_picture',
            name: '照片',
            color: '#07c160'
        }],
        list: [],
        showAction: false,
    },
    getImgs() {
        return this.data.list.filter(item => item.type === 1).map(item => item.content)
    },
    previewImage(e) {
        wx.previewImage({
            current: e.detail, // 当前显示图片的http链接
            urls: this.getImgs() // 需要预览的图片http链接列表
        })
    },
    sendMsg() {
        if (!this.data.textMessage) {
            return
        }
        let msgObj = {
            type: 0,
            content: this.data.textMessage,
        }
        this.setChatItems(msgObj)
        this.setData({
            textMessage: ''
        })
    },
    selectAction(e) {
        const {
            name
        } = e.detail
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'],
            sourceType: name === '照片' ? ['album'] : ['camera'],
            success: (res) => {
                console.log(res)
                wx.$uploadFile({
                    file: res.tempFiles[0],
                }).then(data => {
                    let url = data.data
                    this.setChatItems({
                        type: 1,
                        sysUser: wx.userInfo,
                        content: url,
                    })
                }, )
                // this.setChatItems({
                //     type: 'img',
                //     sysUser: wx.userInfo,
                //     content: res.tempFilePaths[0],
                // })
            }
        });
    },
    setChatItems(data) {
        wx.$post('/chat/addChatRecord', {
            beUserId: this.beUserId,
            chatId: this.chatId,
            content: data.content,
            type: data.type
        }).then(res => {
            // this.setData({
            //     list: [...this.data.list, {
            //         ...data,
            //         sysUser: wx.userInfo
            //     }],
            //     scrollTop: SCROLL_TOP += 300
            // })
        })
    },
    openAction() {
        console.log(123);

        this.setData({
            showAction: true
        })
    },
    closeAction() {
        this.setData({
            showAction: false
        })
    },
    inputFocus() {
        this.setData({
            inputType: 'text'
        })
    },
    inputBlur() {
        this.setData({
            inputType: 'none'
        })
    },
    inputInput(e) {
        this.setData({
            textMessage: e.detail.value
        })
    },
    // 获取历史记录
    getHistory(init, showLoading = true) {
        wx.loadingAPI(wx.$post('/chat/getChatRecordByChat', {
            chatId: this.chatId,
            current: 1,
            pageSize: 5000
        }), '加载中', showLoading).then(res => {
            if (!res.data.list.length) {
                this.timer = setTimeout(() => {
                    this.getHistory(true, false)
                }, 1000);
                return
            }
            this.pages = res.data.pages
            this.allList = res.data.list.map(item => {
                return {
                    ...item,
                    other: item.sysUser.id != wx.userInfo.id,
                }
            })
            this.setData({
                list: [...this.allList].splice(0, this.pageSize).reverse()
            })
            this.setData({
                scrollTop: SCROLL_TOP
            })
            if (init) {
                this.ajaxLunxun()
            }
        })
    },
    onLoad(options) {
        this.page = 1
        this.pageSize = 15
        this.beUserId = options.beUserId
        wx.$get('/chat/checkRoom', {
            beUserId: options.beUserId
        }).then(res => {
            let title = ''
            if (!res.data.sysUser) {
                title = '暂未获取到该用户信息'
            } else if (res.data.sysUser.id === wx.userInfo.id) {
                title = '不能同自己聊天'
            }
            if (title) {
                wx.delAPI(title)
                    .then(() => {
                        wx.navigateBack()
                    })
                return
            }
            this.chatId = res.data.chatId
            wx.setNavigationBarTitle({
                title: res.data.sysUser.contacts || res.data.sysUser.contacts //页面标题为路由参数
            })
            this.getHistory(true)
        })
    },
    loadMore(e) {
        // console.log(e);
        if (e.detail.scrollTop < 20) { //触发触顶事件
            if (this.throttle) { // 节流
                return
            }
            this.throttle = true
            var query = wx.createSelectorQuery();
            query.select('#chatView').boundingClientRect()
            query.exec(res => {
                // console.log(res);
                if (this.page <= (this.allList.length / this.pageSize)) {
                    console.log(this.page);
                    console.log([...this.allList].splice(this.pageSize * (this.page), this.pageSize).reverse());
                    this.setData({
                        list: [
                            ...[...this.allList].splice(this.pageSize * (this.page), this.pageSize).reverse(),
                            ...this.data.list
                        ]
                    })
                    this.page++
                    this.setData({
                        scrollTop: res[0].height
                    })
                    setTimeout(() => {
                        this.throttle = false
                    }, 500);
                }
            })
        }
    },
    ajaxLunxun() {
        wx.$post('/chat/getChatRecordByChat', {
            chatId: this.chatId,
            current: 1,
            pageSize: this.pageSize
        }).then(res => {
            // 没有历史纪录说明第一次访问，因为需要拿AllList对比记录做分页，下面逻辑就不执行了
            if (!this.allList.length) {
                return this.getHistory()
            }
            let list = res.data.list.map(item => {
                return {
                    ...item,
                    other: item.sysUser.id != wx.userInfo.id,
                }
            })
            let firstId = this.data.list[this.data.list.length - 1].recordId
            let index = list.findIndex(item => {
                return item.recordId === firstId
            })
            console.log(index);
            if (index > 0) {
                // 避免重复添加消息
                let newList = list.splice(0, index).filter(item => !this.data.list.filter(_item => _item.recordId === item.recordId).length)
                this.setData({
                    list: [...this.data.list, ...newList],
                    scrollTop: SCROLL_TOP += 1
                })
            }
            this.timer = setTimeout(() => {
                this.ajaxLunxun()
            }, 1000);
        })
    },
    onUnload() {
        clearTimeout(this.timer)
    },
    onShow() {
        if (!wx.getStorageSync('token')) {
            wx.navigateTo({
                url: '/pages/welcome/welcome'
            })
            return true
        }
    }

});