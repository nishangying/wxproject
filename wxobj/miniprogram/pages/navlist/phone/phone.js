

Component({
  data: {
    leftArr:[],
    leftIndex:0,
    rightObj:[],
    rightArr:[],
    isNoData:false,
    isShow:false,
    checkObj:{},   //左边选中的对象
    checkTabIndex:0,
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
      let length = this.data.rightArr.length;
      this.setData({
        leftIndex:index,
      })
      let obj = this.data.leftArr[index];
      this.setData({
        checkObj: obj
      })
      console.log(this.data.checkObj)
      this.getData();
    },
    checkTab(e){
      let index = e.currentTarget.dataset.id;
      let obj = this.data.leftArr[index];
      this.setData({
        checkTabIndex :index,
        checkObj: obj,
      })
    },
    getData(){
      let tabName = this.data.checkObj.sign;
      const db = wx.cloud.database();
      db.collection(tabName).get({
        success: res => {
          console.log(res)
          this.setData({
            rightArr: res.data,
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
    onPhone(e){
      let id = e.currentTarget.dataset.id;
      let phone = this.data.rightArr[id].phone;
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    },
    // onDarwer
    onDarwer(){
      this.setData({
        checkTabIndex: 0,
      })
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
      let tabName = this.data.checkObj.sign;
      const db = wx.cloud.database();
      db.collection(tabName).add({
        data: {
          "name": this.data.name,
          "address": this.data.address,
          "phone": this.data.phone,
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.getData();
          this.setData({
            counterId: res._id,
            count: 1,
            leftIndex: this.data.checkTabIndex,
          })
          wx.showToast({
            title: '新增记录成功',
          })
          
          this.onClose();
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          this.onClose();
        }
      })
    }
  },
  ready() {
    const db = wx.cloud.database();
    db.collection('leftname').get({
      success: res => {
        console.log(res)
        this.setData({
          leftArr : res.data[4].leftArr,
          checkObj : res.data[4].leftArr[0],
        })
        this.getData();
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
})
