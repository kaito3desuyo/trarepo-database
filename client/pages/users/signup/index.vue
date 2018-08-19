<template>
	<div class="content">
		<h2>{{ title }}</h2>
		<p>
			TraRepo Projectにご興味をお持ち頂き、ありがとうざいます。<br>
			ユーザー登録を行います。
		</p>
		<h3>各種アカウントで登録</h3>

		<button class="button">
			<b-icon icon="twitter"/>
			&nbsp;&nbsp;Twitterアカウントで登録
		</button>
		<a href="/api/auth/google" class="button">
			<b-icon icon="google"/>
			&nbsp;&nbsp;Googleアカウントで登録
		</a>
		<h3>メールアドレスで登録</h3>
		<p>メールアドレスを入力してください。<br>
			入力されたメールアドレスに確認用メールを送信します。</p>
		<form data-vv-scope="form1" @submit.prevent="sendEmail()">
			<b-field label="メールアドレス">
				<b-input v-validate="'required|email'" v-model="localAuth.email" data-vv-as="メールアドレス" name="email" type="email" placeholder="abc@example.ne.jp"/>
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
            title: "サインアップ",
            localAuth: {
                email: null
            }
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    methods: {
        async sendEmail() {
            try {
                await this.validateHandler("form1")
                await this.accessAPI()
                this.$dialog.alert(
                    "入力されたメールアドレスに確認コードを送信しました。<br>次の画面で受信したコードを入力し、本人確認を行ってください。"
                )
                this.$router.push("/users/signup/detail")
            } catch (error) {
                this.errorHandler(error)
            }
        },
        async accessAPI() {
            return new Promise((resolve, reject) => {
                this.$axios
                    .post("/api/auth/local/emailcheck", {
                        email: this.localAuth.email
                    })
                    .then(done => {
                        resolve(done)
                    })
                    .catch(err => {
                        reject([err.response.data.message])
                    })
            })
        }
    }
}
</script>
