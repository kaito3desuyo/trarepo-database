<template>
    <div>
        <custom-header/>
        <section class="section">
            <nuxt/>
        </section>
        <custom-footer/>
    </div>
</template>

<script>
import customHeader from "../components/header"
import customFooter from "../components/footer"

export default {
    components: {
        customHeader,
        customFooter
    }
}
</script>