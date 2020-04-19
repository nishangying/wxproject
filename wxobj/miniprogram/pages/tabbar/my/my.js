//index.js
const app = getApp()

Page({
  data: {
      userInfo:{},
  },

  onLoad: function() {
    console.log(app.globalData.guserInfo)
    this.setData({
      userInfo: app.globalData.guserInfo
    })
    
  },
  
  

    

})
