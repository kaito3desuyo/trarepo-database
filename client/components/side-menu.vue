<template>
	<div class="column is-one-quarter">
		<div class="subtitle">メニュー</div>
		<aside class="menu">
			<p class="menu-label">
				ユーザー 
			</p>
			<ul class="menu-list">
				<template v-if="!this.$store.state.auth.loginedUser">
					<li><nuxt-link to="/users/signup">ユーザー登録</nuxt-link></li>
					<li><nuxt-link to="/users/login">ログイン</nuxt-link></li>
				</template>
				<template v-else>
					<li><nuxt-link to="/api/auth/logoff">ログアウト</nuxt-link></li>
				</template>
			</ul>
		</aside>
	</div>
</template>

<script>
export default {
    computed: {
        loginedUser() {
            return this.$store.state.auth.loginedUser
        }
    }
}
</script>
