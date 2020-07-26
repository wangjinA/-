const host = 'http://120.27.240.67:8888'
// const host = 'http://localhost:3000' 
const request = function(options) {
  return new Promise((resolve, reject) => {
    const { data, url} = options
    wx.request({
      url: host + url,
      data: {
        // type: wx.type && parseInt(wx.type),
        ...data,
      },
      header: {
        token: wx.getStorageSync('token'),
        // Accept: 'application / prs.lyg.v1 + json',
        'Content-Type': 'application/json',
        // Authorization: wx.getStorageSync('tokenType') + ' ' + wx.getStorageSync('token')
      },
      method: options.method || 'GET',
      dataType: 'json',
      responseType: 'text',
      success (res) {
        if (res.statusCode == 500 || res.statusCode == 400) {
          reject(res)
        } else {
          if(res.header.token){
            wx.setStorageSync('token', res.header.token)
          }
          resolve(res.data)
        }
      },
      fail: reject, 
      complete: function (res) {},
    })
  })
}
wx.$get = (url, data) => {
  return request({
    url,
    data
  })
}
wx.$post = (url, data) => {
  return request({
    url,
    data,
    method: 'POST'
  })
}

wx.$uploadFile = params => {
  wx.showLoading({
    title: '上传中',
  })
  let formData = Object.assign({
    token: wx.getStorageSync('token'),
  }, params.formData)
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: host + '/api/user/uploadFile',
      filePath: params.file.path,
      name: 'file',
      formData,
      success(res) {
        resolve(wx.$parse(res.data))
      },
      fail: reject,
      complete() {
        wx.hideLoading()
      }
    });
  })
}