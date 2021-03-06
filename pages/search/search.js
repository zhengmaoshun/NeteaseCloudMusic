import request from '../../utils/request'
let isSend = false;//函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:'',//placeholder的内容
    hotList:[],//热搜榜数据
    searchContent:'',//用户输入的表单项数据
    searchList:[],//关键字模糊匹配的数据
    historyList:[]//搜索历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取初始化的数据
    this.getInitData();
    //获取历史记录
    this.getSearchHistory();
  },
  //获取初始化的数据
  async getInitData(){
    let placeholderData = await request('/search/default');
    let hotListData = await request('/search/hot/detail');
    this.setData({
      placeholderContent:placeholderData.data.showKeyword,
      hotList:hotListData.data
    })
  },
  //获取本地历史记录的函数
  getSearchHistory(){
    let historyList = wx.getStorageSync('searchHistory');
    if(historyList){
      this.setData({
        historyList
      })
    }
  },
  //表单项内容发生改变的回调
  handleInputChange(event){
    // console.log(event)
    //更新seachContent的状态数据
    this.setData({
      searchContent:event.detail.value.trim()
    })

    if(isSend){
      return
    }
    isSend = true;
    this.getSearchList();
    //函数节流
    setTimeout(()=>{
      isSend=false;
    },300)
  },
  //获取搜索数据的功能函数
  async getSearchList(){
    if(!this.data.searchContent){
      this.setData({
        searchList:[]
      })
      return;
    }
    let {searchContent,historyList} = this.data;
    let searchListData = await request('/search',{keywords: searchContent, limit: 10});
    this.setData({
      searchList:searchListData.result.songs
    })
    //将搜索的关键字添加到搜索历史记录中
    if(historyList.indexOf(searchContent)!==-1){
      historyList.splice(historyList.indexOf(searchContent),1);
    }
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })
    //保存到local中，防止数据刷新历史记录没了
    wx.setStorageSync('searchHistory', historyList)
  },
  //清空搜索内容
  clearSearchContent(){
    this.setData({
      searchContent:'',
      searchList:[]
    })
  },
  //删除历史记录
  deleteSearchHistory(){
    wx.showModal({
      content: '确定删除吗？',
      success:(res)=>{
        if(res.confirm){
          this.setData({
            historyList:[]
          })
          //删除local中保存的历史记录
          wx.removeStorageSync('searchHistory');
        }
      }
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