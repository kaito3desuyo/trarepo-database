<template>
	<div class="content">
		<h2>{{ title }}</h2>
		<h3>本人確認</h3>
		<p>確認コードを入力して、本人確認を完了させてください。</p>
		<form data-vv-scope="form1" @submit.prevent="checkIdentifyCode()">
			<b-field label="確認コード">
				<b-input v-validate="'required'" v-model="localAuth.identifyCode" data-vv-as="確認コード" name="identifyCode" type="text"/>
			</b-field>
			<button class="button is-primary">確認</button>
		</form>
		<h3>アカウント情報の入力</h3>
		<form data-vv-scope="form2" @submit.prevent="createUser()">
			<b-notification v-if="errors.any()" :closable="false" type="is-warning" has-icon>
				<span v-for="msg in errors.all()" :key="msg.id">{{ msg }}<br></span>
			</b-notification>
			<b-field label="お名前">
				<b-input v-validate="'required'" :disabled="!codeCheck" v-model="localAuth.form.name" data-vv-as="お名前" name="name" type="text"/>
			</b-field>
			<b-field label="メールアドレス">
				<p>{{ localAuth.form.email }}</p>
			</b-field>
			<b-field label="パスワード">
				<input v-validate="'required|confirmed:password_confirm'" :disabled="!codeCheck" v-model="localAuth.form.password" class="input" data-vv-as="パスワード" name="password" type="password">
			</b-field>
			<b-field label="確認のためもう一度">
				<input ref="password_confirm" :disabled="!codeCheck" v-model="localAuth.form.password_confirm" class="input" data-vv-as="パスワード（確認用）" type="password">
			</b-field>
			<button :disabled="!codeCheck" class="button is-primary">送信</button>
		</form>
	</div>
</template>

<script>
import { error, validate } from "../../../mixins/handler"
export default {
    mixins: [error, validate],
    data() {
        return {
            title: "サインアップ",
            codeCheck: false,
            localAuth: {
                identifyCode: null,
                email: null,
                form: {
                    name: null,
                    email: "本人確認終了後自動的に入力されます",
                    password: null,
                    password_confirm: null
                }
            }
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    methods: {
        async checkIdentifyCode() {
            try {
                await this.validateHandler("form1")
                await this.accessIdentifyCodeAPI()
            } catch (error) {
                this.errorHandler(error)
            }
        },
        async accessIdentifyCodeAPI() {
            return new Promise((resolve, reject) => {
                const loadingComponent = this.$loading.open()
                this.$axios
                    .post("/api/auth/local/codecheck", {
                        identifyCode: this.localAuth.identifyCode
                    })
                    .then(result => {
                        loadingComponent.close()
                        this.$dialog.alert(
                            "本人確認に成功しました。<br>続いてユーザー情報を入力してください。"
                        )
                        this.localAuth.form.email = result.data
                        this.codeCheck = true
                        resolve()
                    })
                    .catch(err => {
                        loadingComponent.close()
                        reject([err.response.data.message])
                    })
            })
        },
        async createUser() {
            try {
                await this.validateHandler("form2")
                await this.accessCreateUserAPI()
                this.$router.push("/")
            } catch (error) {
                this.errorHandler(error)
            }
        },
        async accessCreateUserAPI() {
            return new Promise((resolve, reject) => {
                const loadingComponent = this.$loading.open()
                this.$axios
                    .post("/api/auth/local/createuser", {
                        name: this.localAuth.form.name,
                        email: this.localAuth.form.email,
                        password: this.localAuth.form.password
                    })
                    .then(result => {
                        loadingComponent.close()
                        this.$dialog.alert(
                            "登録が完了しました。<br>ログイン画面でログインしてください。"
                        )
                        resolve()
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
