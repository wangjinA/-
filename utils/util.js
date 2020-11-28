export function getAllDate(startDate, endDate) {
  Date.prototype.__format = function () {
    var s = '';
    var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
    var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
    s += this.getFullYear() + '-';
    s += mouth + "-";
    s
      += day;
    return (s);
  };

  function getAll(begin, end) {
    var arr = [];
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
    var unixDe = de.getTime() - 24 * 60 * 60 * 1000;
    for (var k = unixDb; k <= unixDe;) {
      k = k + 24 * 60 * 60 * 1000;
      arr.push((new Date(parseInt(k))).__format());
    }
    return arr;
  }
  return getAll(startDate, endDate)
}


export function formatTime(date = new Date(), notTime = false, notYear = true) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let arr = [year, month, day]
  if (year === new Date().getFullYear() && notYear) {
    arr.shift()
  }
  let time = arr.map(formatNumber).join('-')
  if (!notTime) {
    time += ` ${[hour, minute, second].map(formatNumber).join(':')}`
  }
  return time
}

export function fixYear(dateStr) {
  return dateStr.length == '5' ? `${(new Date).getFullYear()}-${dateStr}` : dateStr
}

export function formatSelectData(list) {
  return list.map(item => ({
    name: item,
    value: item
  }))
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function checkRequired(formData, formList) { // 提交判断required
  for (let i = 0; i < formList.length; i++) {
    let isNull = false
    const item = formList[i];
    const itemData = formData[item.key]
    let label = item.label
    if (item.required && !item.notChek) { // notChek 添加星号但是不判断
      if (item.type === 'timeScope') {
        if (!itemData || !itemData.length) {
          isNull = true
        }
      }
      if (!itemData) {
        isNull = true
      }
    }

    if (item.addressRequired) {
      let addressData = formData[item.addressKey || item.key + 'Address']
      if (!addressData) {
        isNull = true
        label = item.addressLabel || '详细地址'
      }
    }


    if (isNull) {
      wx.showToast({
        icon: 'none',
        title: `请完善${label}`,
        duration: 2100
      })
      return false
    }
  }
  return true
}

export function loadUserInfo() {
  return wx.$get('/api/user/getUserInfo')
    .then(res => {
      if (res.code == '20') { // token失效
        wx.clearStorageSync('token')
        return Promise.reject()
      } else {
        wx.userInfo = res.data.userInfo
        wx.hotelInfo = res.data.hotelInfo || {}
        wx.roles = res.data.roles || [] // 1管理 2会议 3婚宴
        wx.roleId = res.data.roles && res.data.roles[0] && res.data.roles[0].id
        wx.hotelId = res.data.userInfo && res.data.userInfo.hotelId
        return Promise.resolve()
      }
    })
}
wx.$loadUserInfo = loadUserInfo

export function getPosition() {
  return new Promise((resolve, rject) => {
    // 微信获得经纬度
    const getLocation = () => {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          console.log(JSON.stringify(res))
          // var latitude = res.latitude
          // var longitude = res.longitude
          // var speed = res.speed
          // var accuracy = res.accuracy;
          const longitude = res.longitude
          const latitude = res.latitude

          resolve({
            longitude,
            latitude
          })
        },
        fail: function (res) {
          resolve()
          console.log('fail' + JSON.stringify(res))
        }
      })
    }
    const getUserLocation = () => {
      wx.getSetting({
        success: (res) => {
          console.log("设置信息" + JSON.stringify(res))
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1500
                  })
                  reject()
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        getLocation();
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1500
                        })
                        reject()
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            //调用wx.getLocation的API
            getLocation();
          } else {
            //调用wx.getLocation的API
            getLocation();
          }
        }
      })
    }
    getUserLocation()
  })


}


function loadingAPI(result, title = '加载中', showLoading = true) {
  wx.showNavigationBarLoading()
  if (showLoading) {
    wx.showLoading({
      title,
    })
  }
  result.then(res => {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
    .catch(err => {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
    })
  return result
}


function stringify(obj) {
  if (typeof obj !== 'object') return obj

  try {
    return obj ? JSON.stringify(obj) : obj
  } catch (error) {
    return obj
  }
}

function parse(str) {
  if (typeof str !== 'string') return str
  try {
    console.log(str);
    return str ? JSON.parse(str) : str
  } catch (error) {
    return str
  }
}

function delAPI(title) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: title || '是否确认删除',
      success(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    })
  })
}

function getScope(arr) {
  if (arr && arr.length) {
    if (arr[0] == 0) {
      return `${arr[1]}以下`
    }
    if (arr[1] == 0) {
      return `${arr[0]}以上`
    }
    return `${arr[0]} - ${arr[1]}`
  }
  return arr
}

function getStatus(status) {
  // 1  有效 - 可以报价
  // 2  无效
  // 3  用户确认酒店报价
  // 4  酒店确认订单完成
  // 5  等待客户上传消费单
  // 6  酒店再次确定 - 完成结束
  // 7  酒店拒绝消费单
  let statusText = ''
  switch (status) {
    case 1:
      statusText = '等待接单'
      break;
    case 2:
      statusText = '失效订单'
      break;
    case 3:
      statusText = '用户确认报价'
      break;
    case 4:
      statusText = '酒店确认完成'
      break;
    case 5:
      statusText = '用户已上传消费单'
      break;
    case 6:
      statusText = '订单已完成'
      break;
    case 7:
      statusText = '酒店拒绝消费单'
      break;
    case 8:
      statusText = '订单已过期'
      break;
    case 9:
      statusText = '后台确认完成'
      break;
  }
  return statusText
}

function getStatusType(status) {
  // 1  有效 - 可以报价
  // 2  无效
  // 3  用户确认酒店报价
  // 4  酒店确认订单完成
  // 5  等待客户上传消费单
  // 6  酒店再次确定 - 完成结束
  // 7  酒店拒绝消费单
  let statusType = ''
  switch (status) {
    case 1:
      statusType = '等待接单'
      break;
    case 2:
      statusType = 'danger'
      break;
    case 3:
      statusType = 'warning'
      break;
    case 4:
      statusType = 'success'
      break;
    case 5:
      statusType = 'primary'
      break;
    case 6:
    case 9:
      statusType = 'success'
      break;
    case 7:
      statusType = 'danger'
      break;
    case 8:
      statusType = 'danger'
      break;
  }
  return statusType
}





function hideInfo(userInfo) {
  return {
    contacts: userInfo.contacts && userInfo.contacts[0] + '**',
    companyName: userInfo.companyName && userInfo.companyName.substr(0, 2) + '****',
    phone: userInfo.phone && userInfo.phone.substr(0, 3) + '****',
    finitude: userInfo.finitude && userInfo.finitude.substr(0, 2) + '****'
  }
}


function isEmail(s) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}
// function checkRole() {
//   let 
//   if(wx.roles.filter(item => item.id === 1).length)
//     itemList = ['会议订单', '婚宴订单'] 
//   else if (wx.roles.filter(item => item.id === 2).length){
//     check = 1
//   }else if(wx.roles.filter(item => item.id === 3).length){
//     check = 2
//   }
// }
wx.$isEmail = isEmail
wx.$hideInfo = hideInfo
wx.$getStatus = getStatus
wx.$getStatusType = getStatusType
wx.$getScope = getScope
wx.fixYear = fixYear
wx.getAllDate = getAllDate
wx.checkRequired = checkRequired
wx.$stringify = stringify
wx.$parse = parse
wx.formatTime = formatTime
wx.loadingAPI = loadingAPI
wx.delAPI = delAPI
export default {
  formatTime,
  formatSelectData,
  formatNumber
}
// module.exports = {
//   formatTime
// }