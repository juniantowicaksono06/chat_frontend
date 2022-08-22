<style lang="scss" scoped>
    div#sidebar {
        min-height: 100%;
        min-width: 100%;
        background-color: $dark-background-color-default;
        color: #fff;
        border-right: 1px solid darkgray;
    }
    .chat-list-item {
        padding-top: 0;
        padding-bottom: 5px;
        padding-right: 10px;
        padding-left: 10px;
    }
    .chat-list-item:hover {
        background-color: $dark-background-color-default-hover;
        cursor: pointer;
    }
    .chat-text {
        position: relative;
        top: 10px;
    }
    input {
        background-color: $dark-input-background;
        border: 1px solid $dark-input-background;
        color: #fff;
        margin-right: 10px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
    }
    input:focus {
        background-color: $dark-input-background;
        border: 1px solid $dark-input-background;
        color: #fff;
        outline: none;
        outline-style: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .label-search {
        background-color: $dark-input-background;
        color: #fff;
        border-top-left-radius: 50px !important;
        border-bottom-left-radius: 50px !important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        margin-right: -5px;;
    }
</style>
<template>
    <div id="sidebar">
        <!-- SEARCH CONTACT -->
        <div class="px-2 py-2">
            <b-input-group>
                <b-input-group-append>
                    <button class="btn label-search">@</button>
                </b-input-group-append>
                <b-form-input placeholder="Search..." v-model="search_text"></b-form-input>
            </b-input-group>
        </div>
        <!-- CHAT LISTS -->
        <div v-for="list in chat_list" :key="list._id" class="mb-1 chat-list-item mt-2 pt-3 pb-2" v-on:click="setChat(list)">
            <div class="d-flex">
                <div>
                    <img :src="list.profile_image" alt="" v-if="list.profile_image" class="chat-thumbs">
                    <Avatar :username="list.fullname" v-else class="chat-thumbs" />
                </div>
                <div class="mb-1">
                    <h5 class="mb-0">{{ list.fullname }}</h5>
                    <p class="mb-0" v-if="list.username">@{{ list.username }}</p>
                </div>
            </div>
            <!-- <div class="d-inline-block">
            </div>
            <div class="d-inline-block">
                <div class="mt-1">
                    <h5 class="mt-1">{{ list.fullname }}</h5>
                    <span>{{ list.fullname }}</span>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
    var time_out = null
    import Avatar from 'vue-avatar'
    export default {
        data() {
            return {
                chat_list: [
                ],
                search_text: ''
            }
        },
        watch: {
            'search_text': function() {
                this.searchUser()
            }
        },
        components: {
            Avatar
        },
        mounted() {

        },
        methods: {
            searchUser() {
                if(time_out != null) {
                    clearTimeout(time_out)
                }
                if(!this.search_text || this.search_text == '') {
                    this.chat_list = []
                    return
                }
                time_out = setTimeout(() => {
                    this.$axios.$get(`/user/${this.search_text}`)
                    .then(response => {
                        // console.log(response)
                        const {statusCode, data} = response
                        if(statusCode == 200) {
                            this.chat_list = data
                        }
                    })
                }, 300)
            },
            setChat(target) {
                this.$store.commit('chat/setChatTarget', target)
            }
        }
    }
</script>