

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
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        },{
          start:"石泉",
          end:"西安",
          time:"15:30",
          date:'2020年04月20日',
          name:'张三',
          fPhone:"135****6655",
          phone:"13556566655",
        }
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
