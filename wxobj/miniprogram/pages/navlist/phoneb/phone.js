

Component({
  data: {
    leftArr:["政务","快递",],
    leftIndex:0,
    rightObj:[
      {
        phoneArr:[
          {name:'张三1',phone:"13928371654",fPhone:'139****1654'},
          {name:'张三1',phone:"13928371654",fPhone:'139****1654'},
          {name:'张三1',phone:"13928371654",fPhone:'139****1654'},
       
          {name:'张三1',phone:"13928371654",fPhone:'139****1654'},
        ]
      }
    ],
    rightArr:[],
    isNoData:false,
    isShow:false,
  },

  methods: {
    switchLeft(e){
      let index = e.currentTarget.dataset.id;
      let length = this.data.rightObj.length;
      this.setData({
        leftIndex:index,
      })
      if(index < length){
        this.setData({
          isNoData : false,
          rightArr:this.data.rightObj[index].phoneArr
        })
      }else{
        this.setData({
          isNoData : true,
          rightArr:[],
        })
      }
    },
    onPhone(e){
      let id = e.currentTarget.dataset.id;
      let phone = this.data.rightArr[id].phone;
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    },
    // onDarwer
    onDarwer(){
      if(this.data.isShow){
        this.setData({
          isShow : false,
        })
      }else{
        this.setData({
          isShow : true,
        })
      }
    },
    // onClose
    onClose(){
      this.setData({
        isShow : false,
      })
    },
    _onClose(){
      this.setData({
        isShow : false,
      })
    }
  },
  ready() {
    global.chatroom = this
    this.setData({
      rightArr : this.data.rightObj[0].phoneArr
    })
    this.fatalRebuildCount = 0
  },
})
