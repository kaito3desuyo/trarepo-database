module.exports = {
    srcDir: "client",
    head: {
        titleTemplate: "%s - TraRepo DataBase"
    },
    modules: ["nuxt-buefy", "@nuxtjs/axios"],
    plugins: ["~/plugins/vee-validate"],
    build: ["vee-validate", "axios"]
}
