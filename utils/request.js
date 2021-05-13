import config from "./config"
export default (url,data={},method="GET")=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host+url,
      // url:config.mobileHost+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>item.indexOf('MUSIC_U')!==-1):""
      },
      success:(res)=>{
        // console.log("请求成功的回调",res)
        if(data.isLogin){//登陆请求
          wx.setStorage({
            key:'cookies',
            data:res.cookies
          })
        }
        resolve(res.data)
      },
      fail:(err)=>{
        // console.log("请求失败的回调",err)
        reject(err)
      }
    })
  })
}

