<style lang="scss" scoped>
</style>
<template>
    <Chat/>
</template>

<script>
import Chat from '../components/chat/Chat.vue'
export default {
  name: 'IndexPage',
  components: {
    Chat
  },
  head() {
    return {
      title: "Chating App"
    }
  }
}
</script>
