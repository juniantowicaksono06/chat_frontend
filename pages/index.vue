<style lang="scss" scoped>
  #chat_wrapper {
    display: grid;
    grid-template-columns: 2fr 4fr;
    min-height: 100%;
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
