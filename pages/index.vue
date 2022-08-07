<style lang="scss" scoped>
  #chat_wrapper {
    display: grid;
    grid-template-columns: 2fr 6fr;
    min-height: 100%;
  }
</style>
<template>
  <div id="chat_wrapper">
    <Sidebar/>
    <Chat/>
  </div>
</template>

<script>
import Sidebar from '../components/chat/Sidebar.vue'
import Chat from '../components/chat/Chat.vue'
export default {
  name: 'IndexPage',
  components: {
    Sidebar,
    Chat
  }
}
</script>
