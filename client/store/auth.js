export const state = () => ({
    loginedUser: null
})

export const mutations = {
    SET_USER: (state, user) => {
        state.loginedUser = user
    }
}

export const actions = {}
