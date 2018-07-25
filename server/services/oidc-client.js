import Store from "data-store"

export default {
    token: () => {
        const store = new Store("oidcAccessToken", {
            path: "./.config/token.json"
        })
        const token = `${store.get("token_type")} ${store.get("access_token")}`
        return token
    },
    client: () => {
        const store = new Store("oidcClient", {
            path: "./.config/client.json"
        })
        return store.clone()
    }
}
