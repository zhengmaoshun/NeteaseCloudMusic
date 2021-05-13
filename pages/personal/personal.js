import request from "../../utils/request"
let startY=0; //手指起始的坐标
let moveY=0; //手指移动的坐标
let moveDistance=0; //手指移动的距离
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform:"translateY(0)",
    coverTransition:"",
    userInfo:{},//用户信息
    recentPlayList:[],//用户播放记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取用户的存储信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
      //获取用户的最近播放记录
      this.getUserRecentPlatList(this.data.userInfo.userId);
    }
  },

  //获取用户播放记录的功能函数
  async getUserRecentPlatList(userId){
    let recentPlayListData= await request('/user/record',{uid:userId,type:0});
    let index=0;
    let recentPlayList = recentPlayListData.allData.splice(0,10).map(item=>{
      item.id=index++;
      return item;
    })
    this.setData({
      recentPlayList
    })
  },

  handleTouchStart(event){
    //手指一触摸就先移除过渡样式
    this.setData({
      coverTransition:""
    })
    startY=event.touches[0].clientY; //触摸的位置
  },
  handleTouchMove(event){
    moveY=event.touches[0].clientY; //滑动的位置
    moveDistance = moveY-startY; //滑动的距离
    if(moveDistance<=0){
      return;
    }
    if(moveDistance>=80){
      moveDistance=80;
    }
    //动态更新coverTransform的状态值
    this.setData({
      coverTransform:`translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd(){
    //动态更新coverTransform的状态值
    this.setData({
      coverTransform:"translateY(0rpx)",
      coverTransition:"transform 1s linear"
    })
  },

  //点击头像跳转到登陆界面
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
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