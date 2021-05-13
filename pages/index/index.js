// pages/index/index.js
import request from "../../utils/request";
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bannerList: [], // 轮播图数据
		recommendList: [], //推荐歌单数据
		topList: [] //排行榜数据
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		// 轮播图请求数据
		let bannerListData = await request('/banner', {type: 2})
		this.setData({
			bannerList: bannerListData.banners
		})
		//推荐歌曲内容区请求数据
		let recommendListData = await request('/personalized', {limit: 30})
		this.setData({
			recommendList: recommendListData.result
		})
		//排行榜请求数据
		let index = 0
		let resultArr = []
		while (index < 5) {
			let topListData = await request('/top/list', {idx: index++})
			let topListItem = {
				name: topListData.playlist.name,
				tracks: topListData.playlist.tracks.slice(0, 3)
			}
			resultArr.push(topListItem)
			//更新数据如果放在外面会有白屏，用户体验不好，放在里面渲染次数多性能比较差，看如何取舍
			this.setData({
				topList:resultArr
			})
		}
	},
	//点击跳转到每日推荐页面的回调
	toRecommendSong(){
		wx.navigateTo({
			url: '/songPackage/pages/recommendSong/recommendSong',
		})
	},
	//跳转至other页面
	toOther(){
		wx.navigateTo({
			url: '/otherPackage/pages/other/other',
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