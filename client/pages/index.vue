<template>
	<div class="content">
		<h2>{{ title }}</h2>
		<p>TraRepo Databaseは、TraRepo ProjectのシンプルなWebフロントエンドです。</p>
		<h3>TraRepo Projectとは？</h3>
		<p>
			TraRepo Projectは、日本全国の公共交通機関のあらゆる情報をオープンデータとしてRESTfulなWeb APIとして提供し、
			様々なアプリケーションでご利用いただくことで、交通とITの融合を目指すプロジェクトです。<br>
		</p>
		<h3>ご利用方法</h3>
		<p>
			ご利用には、当サイトでのユーザー登録と、クライアントID及びクライアントシークレットの発行が必要です。<br>
			認証にはOpen ID Connect(OAuth 2.0)のClient Credentials認証技術を用いています。<br>
			詳しい接続方法につきましては、<nuxt-link to="/guide">デベロッパーガイド</nuxt-link>をご覧ください。
		</p>
		<h3>お知らせ</h3>
                
		{{ value }}
	</div>
</template>

<script>
export default {
    data() {
        return {
            title: "TOP"
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    computed: {
        value() {
            return this.$store.state.auth.loginedUser
        }
    }
}
</script>
