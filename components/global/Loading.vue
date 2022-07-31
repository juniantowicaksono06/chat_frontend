<style lang="scss" scoped>
    #loading_wrapper {
        background-color: rgba(255,255,255,1);
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loading {
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
</style>
<template>
    <div id="loading_wrapper">
        <div class="w-100">
            <v-progress-circular
                indeterminate
                color="#ed4040"
                class="loading"
            ></v-progress-circular>
            <div class="mt-3">
                <h5 class="text-center">Loading Please Wait!</h5>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>