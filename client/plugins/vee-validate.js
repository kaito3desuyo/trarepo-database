import Vue from "vue"
import VeeValidate, { Validator } from "vee-validate"
import ja from "vee-validate/dist/locale/ja"
import { AsYouType } from "libphonenumber-js"

Validator.localize("ja", ja)
Validator.extend("phone", {
    getMessage: field => `${field}が正しくありません`,
    validate: value => value === new AsYouType("JP").input(value)
})

Vue.use(VeeValidate, { locale: ja })
