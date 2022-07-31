<style lang="scss" scoped>
    #content_wrapper {
        background-image: url('/img/bg-login.jpg');
        width: 100%;
        min-height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>
<template>
    <div id="content_wrapper">
        <div id="swal2_container"></div>
        <div v-if="$store.state.loading.is_loading">
            <Loading />
        </div>
        <Nuxt/>
    </div>
</template>
<script>
import Loading from '../components/global/Loading.vue'
export default {
    data() {
        return {
        }
    },
    middleware: [
        'auth'
    ],
    mounted() {
    },
    components: {
        Loading
    }
}
</script>
