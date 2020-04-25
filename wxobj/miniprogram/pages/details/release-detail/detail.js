var util = require('../../../utils/utils.js');
const app = getApp()

Page({
  data:{
    dataObj:{},
    isShow:false,
    comment:"",
    postTabName: 'release_tab',
    // postTabName:'re_comment',
    commentArr:[],
  },
  onLoad: function () {
    this.init();
  },
  init(){
    let _this = this;
    wx.getStorage({
      key: 'releaseObj',
      success(res) {
        _this.setData({
          dataObj:res.data
        })
        _this.getData();
      }
    }),
    wx.removeStorage({
      key: 'releaseObj',
      success(res) {
        console.log(res)
      }
    })
    
  },
  getData(){
    const db = wx.cloud.database();
    const countResult = db.collection("re_comment").count();
    console.log(this.data.dataObj._id)
    db.collection("re_comment").where({
      release_id: this.data.dataObj._id // 填入当前用户 openid
    }).get({
      success: res => {
        this.setData({
          commentArr: res.data.reverse(),
        })
        if (this.data.commentArr.length == 0) {
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
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  
  inputIpt(e){
    this.setData({
      comment: e.detail.value
    })
  },
  subBtn(){
    const posttime = util.formatTime(new Date(), 1);
    const db = wx.cloud.database();
    // db.collection("re_comment").add({
    //   data: {
    //     "release_id": this.data.dataObj._id,
    //     "comment": this.data.comment,
    //     "author": app.globalData.guserInfo.nickName,
    //     "authorImg": app.globalData.guserInfo.avatarUrl,
    //     "data": posttime
    //   },
    //   success: res => {
    //     console.log(res)
    //     this.getData();
    //     this.getNewDate();
    //     this.setData({
    //       comment: ''
    //     })
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '新增记录失败'
    //     })
    //     this.setData({
    //       comment: ''
    //     })
    //   }
    // })
    console.log(app.globalData.guserInfo)
    wx.cloud.callFunction({
      name: 'comment',
      data: {
       "release_id": this.data.dataObj._id,
        "comment": this.data.comment,
        "author": app.globalData.guserInfo.nickName,
        "authorImg": app.globalData.guserInfo.avatarUrl,
        "data": posttime
      },
      success: res => {
        this.getData();
        this.getNewDate();
        this.setData({
          comment: ''
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
      }
    })

  },
  getNewDate() {
    const db = wx.cloud.database();
    const countResult = db.collection("re_comment").count();
    db.collection("release_tab").where({
      _id: this.data.dataObj._id // 填入当前用户 openid
    }).get({
      success: res => {
        this.setData({
          dataObj: res.data[0],
        })
        console.log(res,'res')
        this.updatePen();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  updatePen(){
    console.log("调用了")
    let _this = this;
    console.log(_this.data.dataObj)
    let penCount = _this.data.dataObj.pen + 1;
    wx.cloud.callFunction({
      name: 'updatapen',
      data: {
        _id: _this.data.dataObj._id,
        pen: penCount,
      },
      success: res => {
        console.log('更新数据成功', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
      }
    })
    // const db = wx.cloud.database();
    // let _this = this;
    // let penCount = _this.data.dataObj.pen + 1;
    // console.log(_this.data.dataObj)
    // db.collection('release_tab').doc(_this.data.dataObj._id).update({
    //   data: {
    //     pen: penCount
    //   },
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail: err => {
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  }



})