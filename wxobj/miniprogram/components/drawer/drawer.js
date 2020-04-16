

Component({
  properties: {
    isShow:{
      type:Boolean,//属性名
      value:false//属性初始值
    }
  },

  data: {
    dataArr: [
     
    ],
  },

  methods: {
    

  },

  ready() {
    global.chatroom = this
    this.fatalRebuildCount = 0
  },
})
