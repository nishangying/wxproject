

Component({
  data: {
    leftArr:["旅游","服饰","食品","住宿"],
    leftIndex:0,
    showModalStatus: false
  },

  methods: {
    switchLeft(e){
      let index = e.currentTarget.dataset.id;
      console.log(e)
      this.setData({
        leftIndex:index,
      })
    },
    ready() {
      global.chatroom = this
      this.fatalRebuildCount = 0
    }
  }
  
})
