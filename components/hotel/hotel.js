Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: Object
  },
  data: {
  },
  methods: {
    hotelDetail() {
      wx.navigateTo({
        url: '/pages/hotel/hotelDetail/hotelDetail?id='+this.data.data.id,
      })
    }
  },
  created(e) {
    console.log(e)
  }
})