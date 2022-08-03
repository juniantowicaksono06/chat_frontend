export const state = () => ({
    data_user: {}
})


export const getters = {
    getDataUser(state) {
        return state.data_user
    }
}

export const mutations = {
    setDataUser(state, value) {
        state.data_user = value
    }
}