<template>
	<div class="content">
		<h2>{{ title }}</h2>
		<h3>各種アカウントでログイン</h3>

		<button class="button">
			<b-icon icon="twitter"/>
			&nbsp;&nbsp;Twitterアカウントでログイン
		</button>
		<a href="/api/auth/google" class="button">
			<b-icon icon="google"/>
			&nbsp;&nbsp;Googleアカウントでログイン
		</a>
		<h3>メールアドレスでログイン</h3>
		<form data-vv-scope="form1" @submit.prevent="logIn()">
			<b-notification v-if="errors.any()" :closable="false" type="is-warning" has-icon>
				<span v-for="msg in errors.all()" :key="msg.id">{{ msg }}<br></span>
			</b-notification>
			<b-field label="メールアドレス">
				<b-input v-validate="'required|email'" v-model="localAuth.email" data-vv-as="メールアドレス" name="email" type="email" placeholder="abc@example.ne.jp"/>
			</b-field>
			<b-field label="パスワード">
				<b-input v-validate="'required'" v-model="localAuth.password" data-vv-as="パスワード" name="password" type="password" placeholder=""/>
			</b-field>
			<button class="button is-primary">送信</button>
		</form>
	</div>
</template>

<script>
import { error, validate } from "../../../mixins/handler"
export default {
    mixins: [error, validate],
    data() {
        return {
            title: "ログイン",
            localAuth: {
                email: null,
                password: null
            }
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    methods: {
        async logIn() {
            try {
                await this.validateHandler("form1")
                await this.accessAPI()
                window.location.href = "/"
            } catch (error) {
                this.errorHandler(error)
            }
        },
        async accessAPI() {
            return new Promise((resolve, reject) => {
                const loadingComponent = this.$loading.open()
                this.$axios
                    .post("/api/auth/login", {
                        email: this.localAuth.email,
                        password: this.localAuth.password
                    })
                    .then(done => {
                        loadingComponent.close()
                        resolve(done)
                    })
                    .catch(err => {
                        loadingComponent.close()
                        reject([err.response.data.message])
                    })
            })
        }
    }
}
</script>
