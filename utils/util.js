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
  if(year === new Date().getFullYear() && notYear){
    arr.shift()
  }
  let time = arr.map(formatNumber).join('-')
  if(!notTime) {
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
    if(item.required) {
      if(item.type === 'timeScope'){
        if(!itemData || !itemData.length){
          isNull = true
        }
      }
      if(!itemData) {
        isNull = true
      }
    }

    if(item.addressRequired) {
      let addressData = formData[item.addressKey || item.key + 'Address']
      if(!addressData) {
        isNull = true
        label = item.addressLabel || '详细地址'
      }
    }
    

    if(isNull){
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

function loadingAPI(result, title='加载中') {
  wx.showLoading({
    title,
  })
  result.then(res => {
    wx.hideLoading()
  })
  .catch(err => {
    wx.hideLoading()
  })
  return result
}


function stringify(obj) {
  if(typeof obj !== 'object') return obj
  
  try {
    return obj ? JSON.stringify(obj) : obj
  } catch (error) {
    return obj
  }
}
function parse(str) {
  if(typeof str !== 'string') return str
  try {
    console.log(str);
    return str ? JSON.parse(str) : str  
  } catch (error) {
    return str
  }
}

function delAPI (title) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: title || '是否确认删除',
      success (res) {
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
  if(arr && arr.length) {
    if(arr[0] == 0) {
      return `${arr[1]}以下`
    }
    if(arr[1] == 0) {
      return `${arr[0]}以上`
    }
    return `${arr[0]} - ${arr[1]}`
  }
  return arr
}
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
