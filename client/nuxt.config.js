module.exports = {
    srcDir: "client",
    head: {
        titleTemplate: "%s - TraRepo DataBase"
    },
    modules: ["nuxt-buefy", "@nuxtjs/axios"],
    plugins: ["~/plugins/vee-validate", "~/plugins/axios"],
    build: ["vee-validate", "axios", "libphonenumber-js"]
}
