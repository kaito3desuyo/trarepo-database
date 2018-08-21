export default function({ $axios, store }) {
    $axios.setHeader("X-CSRF-Token", store.state.csrfToken)
}
