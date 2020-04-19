//index.js
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


  onLoad: function() {
    const db = wx.cloud.database();
    this.getData();
  },
  getData:function(){
    const db = wx.cloud.database();
    db.collection('release_tab').get({
      success: res => {
        console.log(res)
        this.setData({
          contentArr: res.data,
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
    console.log(e)
    this.setData({
      textareaTxt: e.detail.value
    })
  },
  subBtn:function(){
    const db = wx.cloud.database();
    db.collection('release_tab').add({
      data: {
        "msg": this.data.textareaTxt,
        "imgUrl": this.data.uploadSrc,
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
        console.log(res)
        const filePath = res.tempFilePaths[0]
        // 上传图片
        const cloudPath = 'releaseImg/'+ 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            _this.setData({
              uploadSrc: filePath,
              uploadadd: false
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
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
  onPullDownRefresh () {
    console.log("下拉刷新")
    wx.stopPullDownRefresh()
  }
  

})