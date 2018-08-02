<template>
<div class="container">
        <div class="columns">
            <div class="column">
                <div class="content">
                    <h2>{{title}}</h2>
                    <p>
                        TraRepo Projectにご興味をお持ち頂き、ありがとうざいます。<br>
                        ユーザー登録を行います。
                    </p>
                    <h3>各種アカウントで登録</h3>

                    <button class="button">
                        <span class="icon">
                            <i class="mdi mdi-twitter"></i>
                        </span>
                        　Twitterアカウントで登録
                    </button>
                    <a href="/api/auth/google" class="button">
                        <span class="icon">
                            <i class="mdi mdi-google"></i>
                        </span>
                        　Googleアカウントで登録
                    </a>
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
                </div>
            </div>
            <div class="column is-one-quarter">
                <div class="subtitle">メニュー</div>
                <aside class="menu">
                <p class="menu-label">
                    ユーザー 
                </p>
                <ul class="menu-list">
                    <li><nuxt-link to="/users/signup">ユーザー登録</nuxt-link></li>
                    <li><nuxt-link to="/users/login">ログイン</nuxt-link></li>
                </ul>
                </aside>
            </div>
        </div>
        
        
        <ul>
            <li>
                <nuxt-link to="/users">ユーザー</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title: "サインアップ"
        }
    },
    head () {
        return {
            title: this.title
        }
    }
}
</script>