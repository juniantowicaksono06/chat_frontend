<style lang="scss" scoped>
  #chat_wrapper {
    display: grid;
    grid-template-columns: 1fr 4fr;
  }
</style>
<template>
  <div id="chat_wrapper">
    <Sidebar/>
  </div>
</template>

<script>
import Sidebar from '../components/chat/Sidebar.vue'
export default {
  name: 'IndexPage',
  components: {
    Sidebar
  }
}
</script>
