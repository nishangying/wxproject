

Component({
  data: {
    leftArr:[],
    leftIndex:0,
    rightObj:[],
    rightArr:[],
    isNoData:false,
    isShow:false,
    // form
    name:"",
    address:"",
    phone:"",
  },

  methods: {
    initData(){
     
    },
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
    },
    // onSub
    inputeNmae(e){
      this.setData({
        name: e.detail.value
      })
    },
    inputaddress(e) {
      this.setData({
        address: e.detail.value
      })
    },
    inputPhone(e) {
      this.setData({
        phone: e.detail.value
      })
    },

    onSub(){
      console.log(this.data.name)
      console.log(this.data.address)
      console.log(this.data.phone)
      const db = wx.cloud.database();
      db.collection('phonelist').add({
        data: {
          "name": this.data.name,
          "address": this.data.address,
          "phone": this.data.phone,
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id,
            count: 1
          })
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }
  },
  ready() {
    const db = wx.cloud.database();
    db.collection('phone').get({
      success: res => {
        console.log(res)
        this.setData({
          rightArr : res.data[0].rightArr[0].phoneArr,
          rightObj: res.data[0].rightArr,
          leftArr : res.data[0].leftArr,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
    // this.initData();
  },
})
