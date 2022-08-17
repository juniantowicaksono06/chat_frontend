<style lang="scss" scoped>
</style>
<template>
    <Nuxt />
</template>
<script>
export default {
    middleware: [
        'auth'
    ],
    mounted() {
        this.loadProfile()
    },
    methods: {
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