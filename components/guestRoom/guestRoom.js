Component({
  options:{
    addGlobalClass: true,
  },
  properties: {
    showSelect: {
      type: Boolean,
      value: false
    },
    data: Object
  },
  data: {

  },
  methods: {
    handlerClick(e) {
      this.triggerEvent('click', e)
    }
  }
})
