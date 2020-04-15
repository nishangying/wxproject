

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
      {
        title:'快递',
        phoneArr:[
          {name:'张三1',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三2',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三3',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三4',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三5',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三6',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三7',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三8',phone:'13928371654',fPhone:'139****1654'},
        ]
      },{
        title:'饮品',
        phoneArr:[
          {name:'张三1',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三2',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三3',phone:'13928371654',fPhone:'139****1654'},
        ]
      },{
        title:'出租车',
        phoneArr:[
          {name:'张三1',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三2',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三3',phone:'13928371654',fPhone:'139****1654'},
        ]
      },{
        title:'事业单位',
        phoneArr:[
          {name:'张三1',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三2',phone:'13928371654',fPhone:'139****1654'},
          {name:'张三3',phone:'13928371654',fPhone:'139****1654'},
        ]
      },
      
      
    ]
  },

  methods: {
    dial(e){
      console.log('dial')
      console.log(e)
      let id = e.currentTarget.dataset.id;
      // let phone = this.data.phoneArr[id].phone;
      let phone = e.currentTarget.dataset.id;
      console.log(phone)
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
