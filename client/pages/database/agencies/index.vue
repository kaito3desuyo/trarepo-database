<template>
	<section>
		<div class="content">
			<h2>{{ title }}</h2>
		</div>
		<b-table 
			:data="data" 
			:columns="columns"
			:loading="loading" 
			:selected.sync="selected"
			:total="total"
			:per-page="perPage"
			paginated
			backend-pagination
			focusable>
			<template slot="footer">
				<div class="buttons is-right">
					<button class="button is-success">新規作成</button>
						
					<button class="button is-info">編集</button>
						
					<button class="button is-danger">削除</button>
				</div>
			</template>
		</b-table>
		<div class="content">
			<h3>新規追加</h3>
		</div>
		<section>
			<form data-vv-scope="createForm" @submit.prevent="createAgency()">
				<b-notification v-if="errors.any()" :closable="false" type="is-warning" has-icon>
					<span v-for="msg in errors.all()" :key="msg.id">{{ msg }}<br></span>
				</b-notification>
				
				<b-field label="国税庁法人番号APIより検索">
					<b-autocomplete
						v-model="create.search.name"
						:data="create.search.data"
						:loading="create.search.isFetching"
						placeholder="法人名称で検索できます"
						@input="getAsyncData"
						@select="(option) => {
							create.data.agencyNumber = option.corporateNumber[0];
							create.data.agencyOfficialName = option.name[0]
					}">
						<template slot-scope="props">
							<div class="content">
								<p>
									<strong>{{ props.option.name[0] }}</strong>&nbsp;<small>法人番号：{{ props.option.corporateNumber[0] }}</small>
									<br>
									<small>{{ props.option.prefectureName[0] }}{{ props.option.cityName[0] }}{{ props.option.streetNumber[0] }}</small>
								</p>
							</div>
						</template>
					</b-autocomplete>
				</b-field>
				検索結果から選びクリックすることで自動入力されます。
				<br>
				<br>

				<b-field :type="errors.has('agencyName', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyName', 'createForm')" label="法人番号">
					<b-input 
						v-validate="'required'" 
						v-model="create.data.agencyNumber" 
						data-vv-as="法人番号" 
						name="agencyName" 
						type="text"
						placeholder="自動入力されます"
						readonly             
					/>
				</b-field>		

				<b-field :type="errors.has('parentAgencyNumber', 'createForm') ? 'is-danger' : ''" :message="errors.first('parentAgencyNumber', 'createForm')" label="親法人番号">
					<b-input v-validate="'required'" v-model="create.data.parentAgencyNumber" data-vv-as="親法人番号" name="parentAgencyNumber" type="text"/>
				</b-field>

				<b-field :type="errors.has('agencyOfficialName', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyOfficialName', 'createForm')" label="法人の正式名称">
					<b-input v-validate="'required'" v-model="create.data.agencyOfficialName" data-vv-as="法人の正式名称" name="agencyOfficialName" type="text" placeholder="自動入力されます" readonly/>
				</b-field>

				<b-field :type="errors.has('agencyName', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyName', 'createForm')" label="法人通称">
					<b-input v-model="create.data.agencyName" data-vv-as="法人通称" name="agencyName" type="text"/>
				</b-field>

				<b-field :type="errors.has('agencyType', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyType', 'createForm')" label="法人タイプ">
					<b-select v-validate="'required'" v-model="create.data.agencyType" data-vv-as="法人タイプ" name="agencyType">
						<option value="null" disabled>▼選択してください</option>
						<option value="1">第一種鉄道事業者</option>
						<option value="2">第二種鉄道事業者</option>
						<option value="3">第三種鉄道事業者</option>
						<option value="4">一般乗合バス事業者</option>
						<option value="5">旅客船等運行事業者</option>
						<option value="6">航空運送事業者</option>
						<option value="7">その他</option>
					</b-select>
				</b-field>

				<b-field :type="errors.has('agencyUrl', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyUrl', 'createForm')" label="法人URL">
					<b-input v-validate="'url'" v-model="create.data.agencyUrl" data-vv-as="法人URL" name="agencyUrl" type="text" placeholder="http://www.example.com"/>
				</b-field>

				<b-field :type="errors.has('agencyPhone', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyPhone', 'createForm')" label="法人電話番号">
					<b-input v-validate="'phone'" v-model="create.data.agencyPhone" data-vv-as="法人電話番号" name="agencyPhone" type="text" placeholder="ハイフンを含めた10〜11桁"/>
				</b-field>
				
				<b-field :type="errors.has('agencyFareUrl', 'createForm') ? 'is-danger' : ''" :message="errors.first('agencyFareUrl', 'createForm')" label="法人運賃情報URL">
					<b-input v-validate="'url'" v-model="create.data.agencyFareUrl" data-vv-as="法人運賃情報URL" name="agencyFareUrl" type="text" placeholder="http://www.example.com"/>
				</b-field>

				<button class="button">登録</button>
			</form>
		</section>
	</section>
</template>

<script>
import { error, validate } from "../../../mixins/handler"
import debounce from "lodash/debounce"

export default {
    mixins: [error, validate],
    data() {
        return {
            title: "法人データベース / agencies",
            create: {
                status: false,
                data: {
                    agencyNumber: null,
                    parentAgencyNumber: null,
                    agencyOfficialName: null,
                    agencyName: null,
                    agencyType: null,
                    agencyUrl: null,
                    agencyPhone: null,
                    agencyFareUrl: null
                },
                search: {
                    name: null,
                    data: [],
                    selected: null,
                    isFetching: false
                }
            },
            data: [],
            columns: [
                {
                    field: "id"
                },
                {
                    field: "agencyNumber",
                    label: "法人番号"
                },
                {
                    field: "parentAgencyNumber",
                    label: "親法人番号"
                },
                {
                    field: "agencyOfficialName",
                    label: "正式名称"
                },
                {
                    field: "agencyName",
                    label: "通称"
                },
                {
                    field: "agencyType",
                    label: "タイプ"
                },
                {
                    field: "contact",
                    label: "お問い合わせ"
                }
            ],
            selected: null,
            total: 20,
            page: 1,
            perPage: 10,
            loading: false
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
    },
    created() {
        this.$axios.get("/api/agencies").then(result => {
            this.data = result.data
        })
    },
    methods: {
        async createAgency() {
            try {
                await this.validateHandler("createForm")
            } catch (error) {
                this.errorHandler(error)
            }
        },
        getAsyncData: debounce(function() {
            if (!this.create.search.name) {
                return
            }
            this.create.search.data = []
            this.create.search.isFetching = true
            this.$axios
                .get(
                    `${"/api/agencies/searchCorpNumAPI/" + "name/"}${
                        this.create.search.name
                    }`
                )
                .then(({ data }) => {
                    data.corporations.corporation.forEach(item =>
                        this.create.search.data.push(item)
                    )
                    this.create.search.isFetching = false
                })
                .catch(error => {
                    console.log(error)
                    this.create.search.isFetching = false
                    this.errorHandler([error.response.data.message])
                })
        }, 1000)
    }
}
</script>
