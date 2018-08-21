export const state = () => ({
    counter: 0,
    csrfToken: null
})

export const mutations = {
    SET_CSRF_TOKEN(state, csrfToken) {
        state.csrfToken = csrfToken
    },
    increment(state) {
        state.counter++
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (req.user) {
            commit("auth/SET_USER", req.user)
        }
        if (req.session) {
            commit("SET_CSRF_TOKEN", req.csrfToken())
        }
    }
}
