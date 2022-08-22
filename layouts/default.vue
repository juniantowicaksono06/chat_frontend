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
    <Nuxt />
  </div>
</template>
<script>
import Sidebar from '../components/chat/Sidebar.vue'
export default {
    components: {
        Sidebar,
    },
    middleware: [
        'auth'
    ],
    beforeMount() {
        this.loadProfile()
        this.connectWs()
    },
    computed: {
        wsInstance() {
            return this.$wsInstance()
        }
    },
    methods: {
        connectWs() {
            this.$createWs()
            this.wsInstance.onopen = (event) => {
                this.wsInstance.send(JSON.stringify({
                    user_login: this.$store.state.user.data_user.username,
                }))
            }
        },
        loadProfile() {
            this.$axios.$get('/profile')
            .then(response => {
                const {statusCode, data} = response
                if(statusCode == 200) {
                    this.$store.commit('user/setDataUser', data)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>