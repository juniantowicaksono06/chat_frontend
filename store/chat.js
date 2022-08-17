export const state = () => ({
    chat_target: {}
})

export const mutations = {
    setChatTarget(state, value) {
        state.chat_target = value
    }
}