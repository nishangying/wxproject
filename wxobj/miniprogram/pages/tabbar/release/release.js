//index.js
var util = require('../../../utils/utils.js');
const app = getApp()

Page({
  data: {
    isShow:false,
    textareaTxt:'',
    uploadSrc:'',
    uploadadd:true,
    contentArr:[],
    isNoData:false,
    
  },

  getData:function(){
    const db = wx.cloud.database();
    db.collection('release_tab').get({
      success: res => {
        console.log(res)
        this.setData({
          contentArr: res.data.reverse(),
        })
        if (this.data.rightArr.length == 0) {
          this.setData({
            isNoData: true
          })
        } else {
          this.setData({
            isNoData: false
          })
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  onRelease:function(){
    this.setData({
      isShow: true,
      uploadSrc: '',
      uploadadd: true
    })
  },
  popupClose:function(){
    this.setData({
      isShow: false,
    })
  },
  inputtextarea(e) {
    this.setData({
      textareaTxt: e.detail.value
    })
  },
  subBtn:function(){
    const posttime = util.formatTime(new Date(), 1);
    const db = wx.cloud.database();
    db.collection('release_tab').add({
      data: {
        "msg": this.data.textareaTxt,
        "imgUrl": this.data.uploadSrc,
        "eye": 0,
        "pen":0,
        "authorName": app.globalData.guserInfo.nickName || "",
        "authorImg": app.globalData.guserInfo.avatarUrl || "",
        "data": posttime,
      },
      success: res => {
        this.getData();
        wx.showToast({
          title: '新增记录成功',
        })
        this.popupClose();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        this.popupClose();
      }
    })
  },

  doUpload: function () {
    var _this = this; 
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const dateName = new Date().getTime();
        const cloudPath = 'releaseImg/' + dateName + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            _this.setData({
              uploadSrc: app.globalData.uploadUrl + cloudPath,
              uploadadd: false
            })
          },
          fail: e => {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  // open
  open(e){
    // let _this = this;
    // let id = e.currentTarget.dataset.id;
    // let obj = this.data.contentArr[id];
    // const db = wx.cloud.database();
    // let count = obj.eye+1;
    // db.collection('release_tab').doc(obj._id).update({
    //   data:{
    //     eye: count
    //   },
    //   success(res){
    //     wx.setStorage({
    //       key: "releaseObj",
    //       data: obj
    //     })
    //     wx.navigateTo({
    //       url: '/pages/details/release-detail/detail',
    //     })
    //   },
    //   fail: err => {
    //       console.error('[数据库] [更新记录] 失败：', err)
    //   }

    // })
    let _this = this;
    let id = e.currentTarget.dataset.id;
    let obj = this.data.contentArr[id];
    let count = obj.eye + 1;
    wx.cloud.callFunction({
      name: 'updata',
      data: {
        _id: obj._id,
        eye: count,
      },
      success: res => {
        console.log('更新数据成功', res)
        wx.setStorage({
          key: "releaseObj",
          data: obj
        })
        wx.navigateTo({
          url: '/pages/details/release-detail/detail',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },
  onShow: function (options) {
    this.getData();
  },
})