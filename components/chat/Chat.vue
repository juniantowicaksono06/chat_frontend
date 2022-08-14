<style lang="scss" scoped>
    div#chat_container, div#chat_container > div#chat_bg {
        height: 100%;
        width: 100%;
        background-color: $dark-background-color-default;
    }
    div#chat_container {
        position: relative;
        width: 100%;
    }
    div#chat_container > div#chat_bg {
        background-image: url('/img/bg-chat.png');
        opacity: 0.06;
        background-repeat: repeat;
    }
    div#chat_main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 9fr 1fr;
    }
    div#chat_input {
        padding: 10px;
        background-color: $dark-panel-background;
    }
    div#chat_input input {
        background-color: $dark-input-background;
        border: 1px solid $dark-input-background;
        border-radius: 50px;
        color: #fff;
        margin-right: 10px;
    }
    div#chat_content {
        color: #fff;
        padding: 10px 20px;
    }
    .btn-action {
        background-color: transparent;
        border: none;
    }
    .btn-action-icon {
        color: $dark-icon;
    }
    .self-chat-item {
        &__content {
            float: right;
            background-color: $dark-self-chat-item-color;
            padding: 10px;
            border-radius: 10px;
            &__text {
                white-space: pre-wrap;
            }
        }
        &__clearfix {
            clear: both;
        }
        margin-bottom: 10px;
    }
    .oponent-chat-item {
        &__content {
            float: left;
            background-color: $dark-oponent-chat-item-color;
            padding: 10px;
            border-radius: 10px;
            &__text {
                white-space: pre-wrap;
            }
        }
        &__clearfix {
            clear: both;
        }
        margin-bottom: 10px;
    }
</style>
<template>
    <div id="chat_container">
        <div id="chat_bg">
        </div>
        <div id="chat_main">
            <div id="chat_content">
                <div v-for="(chat, index) in chat_data" :key="`${chat['username']}-${index}`">
                    <div v-if="chat.from == getUser.username">
                        <div class="self-chat-item">
                            <div class="d-inline-block self-chat-item__content">
                                <span class="self-chat-item__content__text">{{ chat.message }}</span>
                            </div>
                        <div class="self-chat-item__clearfix"></div>
                    </div>                   
                    </div>
                    <div v-else>
                        <div class="oponent-chat-item">
                            <div class="d-inline-block oponent-chat-item__content">
                                <span class="oponent-chat-item__content__text">{{ chat.message }}</span>
                            </div>
                            <div class="oponent-chat-item__clearfix"></div>
                        </div>
                    </div>
                </div>
                <!-- <div class="self-chat-item">
                    <div class="d-inline-block self-chat-item__content">
                        <span class="self-chat-item__content__text">Wkwkwk aja 1
Tes</span>
                    </div>
                    <div class="self-chat-item__clearfix"></div>
                </div>
                <div class="oponent-chat-item">
                    <div class="d-inline-block oponent-chat-item__content">
                        <span class="oponent-chat-item__content__text">Wkwkwk aja</span>
                    </div>
                    <div class="oponent-chat-item__clearfix"></div>
                </div>
                <div class="oponent-chat-item">
                    <div class="d-inline-block oponent-chat-item__content">
                        <span class="oponent-chat-item__content__text">Wkwkwk aja 1
Tes</span>
                    </div>
                    <div class="oponent-chat-item__clearfix"></div>
                </div> -->
            </div>
            <div id="chat_input">
                <b-input-group>
                    <b-form-input v-model="text_message" placeholder="Type a message..." autofocus v-on:keypress.enter="sendMessage"></b-form-input>
                    <b-input-group-append>
                        <b-button class="btn-action" v-on:click="sendMessage">
                            <svg viewBox="0 0 24 24" width="24" height="24" class="btn-action-icon"><path fill="currentColor" d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            text_message: '',
            chat_data: [
                {
                    from: 'dika98',
                    message: 'Hello There'
                }
            ],
            ws: null
        }
    },
    computed: {
        getUser() {
            return this.$store.state.user.data_user
        }
    },
    mounted() {
        this.connectWs()
    },
    methods: {
        sendMessage() {
            this.ws.send(JSON.stringify({
                target: 'dika98', // Hardcode
                message: this.text_message
            }))
            this.chat_data.push({
                from: this.getUser.username,
                message: this.text_message
            })
            this.text_message = ''
        },
        connectWs() {
            if(this.ws == null) {
                this.ws = new WebSocket(process.env.WEBSOCKET_URL)
                this.ws.onopen = (event) => {
                    console.log(event)
                    // this.ws.send("TES SAJA WKWKWK")
                    // this.ws.send(JSON.stringify({
                    //     user_login: this.$store.state.user.data_user.username,
                    // }))
                }   
                this.ws.onmessage = (message) => {
                    const reply = JSON.parse(message.data)
                    if(reply) {
                        if(reply.type == 'message') {
                            this.chat_data.push(reply)
                        }
                    }
                    // console.log(message)
                }
            }
            else {
                console.warn("Socket already opened")
            }
        },
        send() {
            this.ws.send(JSON.stringify({
                'tes': "WKWKWK"
            }))
        },
        disconnectWs() {
            this.ws = null
        }
    }
}
</script>