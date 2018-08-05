<template>
	<div>
		<custom-header/>
		<section class="section"> 
			<div class="container">
				<div class="columns">
					<div class="column">
						<nuxt/>
					</div>
					<side-menu/>
				</div>
			</div>
		</section>
		<custom-footer/>
	</div>
</template>

<script>
import customHeader from "../components/header"
import customFooter from "../components/footer"
import sideMenu from "../components/side-menu"

export default {
    components: {
        customHeader,
        customFooter,
        sideMenu
    }
}
</script>
