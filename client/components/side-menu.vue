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
					<li><nuxt-link to="/users/mypage">マイページ</nuxt-link></li>
					<li><a href="/api/auth/logoff">ログアウト</a></li>
				</template>
			</ul>
			<p class="menu-label">
				データベース
			</p>
			<ul class="menu-list">
				<li><nuxt-link to="/database/agencies">agencies（法人データ）</nuxt-link></li>
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
