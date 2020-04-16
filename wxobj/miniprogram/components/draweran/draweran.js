

Component({
  properties: {
    isShow:{
      type:Boolean,//属性名
      value:false//属性初始值
    },
    hUnm:{
      type:Number,//属性名
      value:0//属性初始值
    }
  },
  data: {
    leftArr:["旅游","服饰","食品","住宿"],
    leftIndex:0,
    showModalStatus: false,
  },
  observers: {
    'isShow': function (isShow) {//  'params'是要监听的字段，（params）是已更新变化后的数据
      this.util("open");
    },
  },

  methods: {
    switchLeft(e){
      let index = e.currentTarget.dataset.id;
      this.setData({
        leftIndex:index,
      })
    },
    powerDrawer(e){
      let currentStatu = e.currentTarget.dataset.statu;
      this.util(currentStatu);
    },
    util: function(currentStatu){
      // 第1步：创建动画实例 
      var animation = wx.createAnimation({
        duration: 300,  //动画时长
        timingFunction: "linear", //线性
        delay: 0  //0则不延迟
      });
      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;
      // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
      animation.translateY(800).step();
      // 第4步：导出动画对象赋给数据对象储存
      this.setData({
        animationData: animation.export()
      })
      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function () {
        // 执行第二组动画：Y轴不偏移，停
        animation.translateY(0).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.setData({
          animationData: animation
        })
        //关闭抽屉
        if (currentStatu == "close") {
          this.setData({
              showModalStatus: false
            });
          //触发成功回调
          this.triggerEvent("onClose")
        }
      }.bind(this), 200)
    
      // 显示抽屉
      if (currentStatu == "open") {
        this.setData(
          {
            showModalStatus: true
          }
        );
      }
    },
    ready() {
      global.chatroom = this
      this.fatalRebuildCount = 0
    }
  }
  
})
