<template>
	<div class="content">
		<h2>{{ title }}</h2>
		<p>ユーザー登録情報の変更ができます。</p>
		<div class="columns">
			<div class="column">
				<b-collapse class="card">
					<div slot-scope="props" slot="trigger" class="card-header">
						<p class="card-header-title" style="margin:auto 0">
							アカウント情報
						</p>
						<a class="card-header-icon">
							<b-icon
								:icon="props.open ? 'menu-down' : 'menu-up'"/>
						</a>
					</div>
					<div class="card-content">
						<div class="content">
							<form data-vv-scope="form1">
								<b-field label="お名前">
									<b-input v-validate="'required'" v-if="account.edit" v-model="account.name" name="name" data-vv-as="お名前"/></b-input>
									<p v-if="!account.edit">{{ account.name }}</p>
								</b-field>
								<b-field label="メールアドレス">
									<b-input v-validate="'required|email'" v-if="account.edit" v-model="account.email" name="email" data-vv-as="メールアドレス"/></b-input>
									<p v-if="!account.edit">{{ account.email || "（未登録）" }}</p>
								</b-field>
								<b-field v-if="account.checkEmail" label="確認コード">
									<b-input v-validate="'required'" v-if="account.edit" v-model="account.identifyCode" name="checkCode" data-vv-as="確認コード"/></b-input>
								</b-field>
								<b-field label="パスワード">
									<b-input v-validate="'required'" v-if="account.edit && $store.state.auth.loginedUser.provider === 'local'" v-model="account.password" :disabled="!account.changePass" name="email" type="password" data-vv-as="パスワード"/></b-input>
									<p v-if="$store.state.auth.loginedUser.provider !== 'local'">（使用しません）</p>
									<p v-else-if="!account.edit">（安全のため表示しません）</p>
								</b-field>
								<button v-if="account.edit && $store.state.auth.loginedUser.provider === 'local'" class="button" type="button" @click="changePassword">パスワードを変更する</button>
							</form>
						</div>
					</div>
					<footer class="card-footer">
						<a v-if="!account.edit" class="card-footer-item" @click="account.edit = true">編集</a>
						<a v-if="account.edit" class="card-footer-item" @click="saveAccount">更新</a>
						<a v-if="account.edit" class="card-footer-item" @click="cancel">キャンセル</a>
					</footer>
				</b-collapse>
		
				<b-collapse class="card">
					<div slot-scope="props" slot="trigger" class="card-header">
						<p class="card-header-title" style="margin:auto 0">
							クライアント
						</p>
						<a class="card-header-icon">
							<b-icon
								:icon="props.open ? 'menu-down' : 'menu-up'"/>
						</a>
					</div>
					<div class="card-content">
						<div class="content">
							<b-table v-if="!clients.create.status" :data="clients.table.data" :columns="clients.table.columns" :selected.sync="clients.table.selected" focusable/>
							<form v-if="clients.create.status" data-vv-scope="form2">
								<b-field label="認可タイプ"/>
								<b-checkbox v-validate="'required'" v-model="clients.create.grant_types" name="grant_types" data-vv-as="認可タイプ" native-value="client_credentials">Client Credentials</b-checkbox>
								<b-field label="リダイレクトURL"/>
								<template v-for="(item, index) in clients.create.redirect_uris">
									<b-input v-validate="'required|url'" :key="index" v-model="clients.create.redirect_uris[index]" name="redirect_uris" placeholder="http://example.com" data-vv-as="リダイレクトURL"/>
								</template>
								<button class="button" type="button" @click="clients.create.redirect_uris.push(null)">+</button>
								<button class="button" type="button" @click="clients.create.redirect_uris.pop()">-</button>
							</form>
							{{ clients.table.selected }}
						</div>
					</div>
					<footer class="card-footer">
						<a v-if="!clients.create.status" class="card-footer-item" @click="clients.create.status = true">新規作成</a>
						<a v-if="clients.create.status" class="card-footer-item" @click="saveClient">登録</a>
						<a v-if="!clients.create.status" class="card-footer-item" @click="deleteClient">削除</a>
						<a v-if="clients.create.status" class="card-footer-item" @click="cancel">キャンセル</a>
					</footer>
				</b-collapse>
			</div>
		</div>
		<div class="tile is-ancestor">
            
			<div class="tile is-parent">
                
				<div class="tile is-child box">
					<span style="display: table">
						<b-icon icon="account" size="is-large"/>			
						<span class="subtitle" style="display: table-cell; vertical-align: middle">&nbsp;Account</span>
					</span>
					{{ $store.state }}
					<ul>
						<li>aaaaa</li>
					</ul>
					
				</div>
                
			</div>
			<div class="tile is-parent">
				<div class="tile is-child box">
					<p>kokoko</p>
				</div>
			</div>
			<div class="tile is-parent">
				<div class="tile is-child box">
					<p>kokoko</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { error, validate } from "../../../mixins/handler"
export default {
    mixins: [error, validate],
    data() {
        return {
            title: "マイページ",
            account: {
                edit: false,
                checkEmail: false,
                changePass: false,
                name: null,
                email: null,
                password: null,
                identifyCode: null
            },
            clients: {
                create: {
                    status: false,
                    grant_types: [],
                    redirect_uris: []
                },
                table: {
                    selected: null,
                    data: [],
                    columns: [
                        {
                            field: "grant_types",
                            label: "認可タイプ"
                        },
                        {
                            field: "client_id",
                            label: "クライアントID"
                        },
                        {
                            field: "client_secret",
                            label: "クライアントシークレット"
                        },
                        {
                            field: "redirect_uris",
                            label: "リダイレクトURL"
                        }
                    ]
                }
            }
        }
    },
    head() {
        return {
            title: this.title
        }
    },
    fetch({ store, redirect }) {
        if (!store.state.auth.loginedUser) {
            return redirect("/users/login")
        }
    },
    mounted() {
        this.account.id = this.$store.state.auth.loginedUser.id
        this.account.name = this.$store.state.auth.loginedUser.name
        this.account.email = this.$store.state.auth.loginedUser.email
        this.account.password = this.$store.state.auth.loginedUser.password
    },
    created() {
        this.$axios
            .get("/api/users/clients", {
                params: {
                    user_id: this.$store.state.auth.loginedUser.id
                }
            })
            .then(result => {
                for (const index in result.data) {
                    const data = {}
                    data.grant_types = ""
                    for (const index2 in result.data[index].data.grant_types) {
                        data.grant_types += `${
                            result.data[index].data.grant_types[index2]
                        }\n`
                    }
                    data.client_id = result.data[index].data.client_id
                    data.client_secret = result.data[index].data.client_secret
                    data.redirect_uris = ""
                    for (const index2 in result.data[index].data
                        .redirect_uris) {
                        data.redirect_uris += `${
                            result.data[index].data.redirect_uris[index2]
                        }\n`
                    }
                    this.clients.table.data.push(data)
                }
            })
    },
    methods: {
        changePassword() {
            this.account.changePass = true
            this.account.password = null
        },
        cancel() {
            window.location.href = "/users/mypage"
        },
        async saveAccount() {
            try {
                await this.validateHandler("form1")
                if (
                    this.account.email !==
                        this.$store.state.auth.loginedUser.email &&
                    !this.account.checkEmail
                ) {
                    await this.accessEmailAPI()
                    this.account.checkEmail = true
                    return
                }
                if (this.account.checkEmail) {
                    await this.accessIdentifyCodeAPI()
                }
                await this.accessUpdateUserAPI()
                window.location.href = "/users/mypage"
            } catch (error) {
                this.errorHandler(error)
            }
        },
        async saveClient() {
            try {
                await this.validateHandler("form2")
                await this.accessCreateClientAPI()
            } catch (error) {
                this.errorHandler(error)
            }
        },
        async accessEmailAPI() {
            return new Promise((resolve, reject) => {
                this.$axios
                    .post("/api/auth/local/emailcheck", {
                        email: this.account.email
                    })
                    .then(done => {
                        resolve(done)
                    })
                    .catch(err => {
                        reject([err.response.data.message])
                    })
            })
        },
        async accessIdentifyCodeAPI() {
            return new Promise((resolve, reject) => {
                this.$axios
                    .post("/api/auth/local/codecheck", {
                        identifyCode: this.account.identifyCode
                    })
                    .then(result => {
                        resolve()
                    })
                    .catch(err => {
                        reject([err.response.data.message])
                    })
            })
        },
        async accessUpdateUserAPI() {
            return new Promise((resolve, reject) => {
                this.$axios
                    .put("/api/users", {
                        id: this.account.id,
                        name: this.account.name,
                        email: this.account.email,
                        password: this.account.password
                    })
                    .then(result => {
                        resolve()
                    })
                    .catch(err => {
                        reject([err.response.data.message])
                    })
            })
        },
        async accessCreateClientAPI() {
            return new Promise((resolve, reject) => {
                this.$axios
                    .post("/api/users/clients", {
                        user_id: this.$store.state.auth.loginedUser.id,
                        grant_types: this.clients.create.grant_types,
                        redirect_uris: this.clients.create.redirect_uris
                    })
                    .then(result => {
                        resolve()
                    })
                    .catch(err => {
                        reject([err.response.data.message])
                    })
            })
        },
        deleteClient() {
            if (!this.clients.table.selected) {
                this.errorHandler(["削除対象のカラムが選択されていません"])
                return
            }
            this.$axios
                .delete("/api/users/clients", {
                    params: { id: this.clients.table.selected.client_id }
                })
                .then(result => {
                    window.location.href = "/users/mypage"
                })
                .catch(err => {
                    this.errorHandler([err.response.data.message])
                })
        }
    }
}
</script>
