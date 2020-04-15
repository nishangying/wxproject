//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    popupArr:[
      '../../../images/true.png',
      '../../../images/true1.png',
      '../../../images/true2.png',
    ],
    listArr: [
      {
        name:'推荐',
        url:'../../../images/icon/shops.png',
        path:'/pages/navlist/shops/shops'
      },{
        name:'拼车',
        url:'../../../images/icon/car.png',
        path:'/pages/navlist/car/car'
      },{
        name:'租赁',
        url:'../../../images/icon/Lease.png',
        path:'/pages/navlist/lease/lease'
      },{
        name:'招聘',
        url:'../../../images/icon/recruit.png',
        path:'/pages/navlist/recruit/recruit'
      },{
        name:'电话',
        url:'../../../images/icon/telephone.png',
        path:'/pages/navlist/phone/phone'
      },
    ],
    autoplay: true,
    interval: 2500,
    duration: 700
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  goto:function(e){
    let id = e.currentTarget.dataset.id;
    console.log(id)
    let path = this.data.listArr[id].path
    wx.navigateTo({
          url:path,
        });
    // if(id == 0){
    //   wx.navigateTo({
    //     url:'/pages/extension/extension',
    //   });
    // }
    // if(id == 1){
    //   wx.navigateTo({
    //     url:'/pages/freeride/freeride',
    //   });
    // }
    // if(id == 2){
    //   wx.navigateTo({
    //     url:'/pages/hire/hire',
    //   });
    // }
    // if(id == 3){
    //   wx.navigateTo({
    //     url:'/pages/phone/phone',
    //     // events:{
    //     //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    //     //   acceptDataFromOpenedPage: function(data) {
    //     //     console.log(data)
    //     //   },
    //     //   someEvent: function(data) {
    //     //     console.log(data)
    //     //   }
    //     // },
    //     // success: function(res) {
    //     //   // 通过eventChannel向被打开页面传送数据
    //     //   console.log(res,'res')
    //     // }
    //   });
    // }
   
  },
  details:function(e){
    wx.navigateTo({
      url:'/pages/details/details',
    });
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function () {
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
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
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

})
