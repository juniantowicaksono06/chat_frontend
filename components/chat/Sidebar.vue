<style lang="scss" scoped>
    div#sidebar {
        min-height: 100%;
        min-width: 100%;
        background-color: #111B21;
        color: #fff;
    }
    .chat-thumbs {
        width: 49px;
        height: 49px;
        border-radius: 100%;
        display: inline-block !important;
        position: relative;
        margin-right: 8px;
        position: relative;
        top: -3px;
    }
    .chat-list-item {
        padding-top: 0;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 10px;
    }
    .chat-list-item:hover {
        background-color: lightgray;
        cursor: pointer;
    }
    .chat-text {
        position: relative;
        top: 10px;
    }
</style>
<template>
    <div id="sidebar">
        <!-- CHAT LISTS -->
        <div v-for="list in chat_list" :key="list._id" class="mb-1 chat-list-item">
            <div class="d-inline">
                <img :src="list.profile_image" alt="" v-if="list.profile_image" class="chat-thumbs">
                <Avatar :username="list.fullname" v-else class="chat-thumbs" />
            </div>
            <div class="my-0 d-inline-block chat-text">
                <h5 class="mt-0 mb-0">{{ list.fullname }}</h5>
                <span>{{ list.last_chat }}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import Avatar from 'vue-avatar'
    export default {
        data() {
            return {
                chat_list: [
                    {
                        _id: 1,
                        fullname: 'Cat 1',
                        last_chat: 'Tes Chat'
                    },
                    {
                        _id: 2,
                        fullname: 'Cat 2',
                        last_chat: 'Tes Chat',
                        profile_image: 'https://preview.redd.it/mhxoztllwqd81.jpg?auto=webp&s=240c14d000bf5e1cd9fef8907227f7680357035c'
                    },
                    {
                        _id: 3,
                        fullname: 'Cat 3',
                        last_chat: 'Tes Chat',
                        profile_image: 'https://i.kym-cdn.com/photos/images/facebook/001/971/716/474.jpg'
                    }
                ]
            }
        },
        components: {
            Avatar
        }
    }
</script>