import request from "../../utils/request"
/**
 * 登陆逻辑
 *   前端验证
 *    1.收集表单项数据
 *    2.验证用户名密码是否合法
 *    3.前端验证不通过，提示用户，不发请求给后台
 *    4.前端验证通过，携带数据(账号,密码)发请求给后台
 *   后端验证
 *    1.验证用户是否存在
 *    2.用户不存在直接返回,告诉前端用户不存在
 *    3.用户存在需要验证密码是否正确
 *    4.密码不正确返回给前端提示用户密码不正确
 *    5.密码正确返回给前端数据，提示用户登录成功(会携带用户的相关信息)
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"", //手机号
    password:"", //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //表单项内容发生改变的回调
  handleInput(event){
    // let type=event.currentTarget.id; //传值
    let type=event.currentTarget.dataset.type;
    // console.log(type,event)
    this.setData({
      [type]:event.detail.value
    })
  },

  //登录的回调
  async login(){
    //1.收集表单项数据
    let {phone,password}=this.data;
    //2.前端验证
    /**
     * 手机号验证
     * 1.手机号是否为空
     * 2.手机号格式是否正确
     * 3.手机号格式正确,验证通过
     */
    //验证手机号是否为空
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon:"none"
      })
      return;
    }
    //验证手机号格式是否正确
    //定义正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式不正确',
        icon:"none"
      })
      return;
    }
    //验证密码是否为空
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon:"none"
      })
      return;
    }
    
    //后端验证
    let result = await request("/login/cellphone",{phone,password,isLogin:true})
    if(result.code===200){//登陆成功
      wx.showToast({
        title: '登陆成功'
      })

      //将用户的信息存储到本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))

      //用户登陆成功跳转到个人中心页面
      wx.reLaunch({
        url: '/pages/personal/personal',
      })

    }else if(result.code===400){
      wx.showToast({
        title: '手机号错误',
        icon:"none"
      })
    }else if(result.code===502){
      wx.showToast({
        title: '密码错误',
        icon:"none"
      })
    }else{
      wx.showToast({
        title: '登陆失败,请重新登陆',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})