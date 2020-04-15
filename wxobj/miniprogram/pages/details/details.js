

Component({
  properties: {
    envId: String,
    collection: String,
    groupId: String,
    groupName: String,
    userInfo: Object,
    onGetUserInfo: {
      type: Function,
    },
    getOpenID: {
      type: Function,
    },
  },

  data: {
    dataArr:[
       
    ]
  },

  methods: {
    dial(e){
      console.log(e)
      let id = e.currentTarget.dataset.id;
      let phone = this.data.dataArr[id].phone;
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    }
    
  },

  ready() {
    global.chatroom = this
    this.fatalRebuildCount = 0
  },
})
