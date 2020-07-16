
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
        //     {
        //     "type": "img",
        //     other: true,
        //     avatar: '/images/hotel/hotel4.jpg',
        //     "content": "亲，对这个报价是否有疑问呢？",
        //     img: '/images/hotel/hotel4.jpg'
        // }, {
        //     "type": "text",
        //     other: true,
        //     avatar: '/images/hotel/hotel4.jpg',
        //     "content": "亲，对这个报价是否有疑问呢？"
        // }, {
        //     "type": "text",
        //     avatar: '/images/avatar.jpg',
        //     "content": "有点太贵了。接受不了"
        // }, 
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
        }],
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
        showAction: false,
    },
    getImgs() {
        return this.data.chatItems.filter(item => item.type === 'img').map(item => item.img)
    },
    previewImage(e) {
        wx.previewImage({
            current: e.detail, // 当前显示图片的http链接
            urls: this.getImgs() // 需要预览的图片http链接列表
        })
    },
    sendMsg() {
        let msgObj = {
            type: 'text',
            content: this.data.textMessage,
            avatar: '/images/avatar.jpg',
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
                this.setChatItems({
                    type: 'img',
                    avatar: '/images/avatar.jpg',
                    img: res.tempFilePaths[0],
                })
            }
        });
    },
    setChatItems(data) {
        this.setData({
            chatItems: [...this.data.chatItems, data],
            scrollTop: SCROLL_TOP += 300
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },
    onReady() {
        this.setData({
            scrollTop: SCROLL_TOP
        })
    },

    
});