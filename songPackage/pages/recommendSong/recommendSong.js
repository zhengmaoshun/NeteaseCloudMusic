import PubSub from 'pubsub-js'
import request from "../../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'', //天
    month:'', //月
    recommendList:[],//推荐列表数据
    index:0,//点击音乐的下标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    //判断用户是否登陆
    if(!userInfo){
      wx.showToast({
        title:"请先登陆",
        icon:"none",
        success:()=>{
          //跳转至登陆页面
          wx.reLaunch({
            url:'/pages/login/login'
          })
        }
      })
    }

    //更新日期的状态数据
    this.setData({
      day: new Date().getDate(),
      month: new Date().getMonth()+1
    }),

    //获取每日推荐歌曲
    this.getRecommendSong()

    //订阅来自songDetail页面发布的消息
    PubSub.subscribe('switchType',(msg,type)=>{
      let {recommendList,index} = this.data;
      if(type==='pre'){//上一首
        (index===0) && (index=recommendList.length);
        index-=1
      }else{//下一首
        (index===recommendList.length-1) && (index=-1);
        index+=1
      }
      //更新下标
      this.setData({
        index
      })
      //根据下标去数组中找对应的musicId
      let musicId = recommendList[index].id;
      //将musicId回传给songDetail页面
      PubSub.publish('musicId',musicId);
    })
  },

  /* 
   * 获取每日推荐歌曲列表
   */
  async getRecommendSong(){
    let recommendListData = await request('/recommend/songs');
    this.setData({
      recommendList: recommendListData.recommend
    })
  },

  // 跳转到歌曲详情页页面
  toSongDetail(event){
    let {song,index} = event.currentTarget.dataset;
    this.setData({
      index
    })
    wx.navigateTo({
      // url: '/pages/songDetail/songDetail?song='+JSON.stringify(song), //这样传参在原生小程序中如果参数长度过长会自动截取掉
      url:'/songPackage/pages/songDetail/songDetail?musicId='+song.id
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