export const state = () => ({
    settings: {}
})


export const getters = {
    getSettings(state) {
        return state.settings
    }
}

export const mutations = {
    setSettings(state, value) {
        state.settings = value
    }
}