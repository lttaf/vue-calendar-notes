export default {
  data () {
    return {
      asyncDataStatus_ready: false // recommended format for mixin properties
    }
  },
  methods: {
    asyncDataStatus_fetched () {
      this.asyncDataStatus_ready = true
      this.$emit('ready')
    }
  }
}