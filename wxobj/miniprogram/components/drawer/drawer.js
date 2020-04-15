

Component({
  properties: {
    
  },
  options: {
    styleIsolation: 'isolated'
  },

  data: {
    dataArr: [
     
    ]
  },

  methods: {
    

  },

  ready() {
    global.chatroom = this
    this.fatalRebuildCount = 0
  },
})
