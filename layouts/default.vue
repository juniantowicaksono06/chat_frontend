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
            this.$axios.$get('/api/v1/profile')
            .then(response => {

            })
            .catch(error => {
                console.log(error)
            })
        }
    }
}
</script>