export const state = () => ({
    is_loading: false
})


export const getters = {
    getLoading(state) {
        return state.is_loading
    }
}

export const mutations = {
    setLoading(state, value) {
        state.is_loading = value
    }
}