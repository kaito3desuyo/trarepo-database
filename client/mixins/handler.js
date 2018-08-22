export const error = {
    methods: {
        errorHandler(err) {
            let msg = "エラーが発生しました。<ul>"
            for (const array in err) {
                msg += `<li>${err[array]}</li>`
            }
            msg += "</ul>"
            this.$dialog.alert({
                title: "エラー",
                message: msg,
                type: "is-danger",
                hasIcon: true,
                icon: "alert-outline",
                iconPack: "mdi"
            })
        }
    }
}

export const validate = {
    methods: {
        validateHandler(scope) {
            return new Promise((resolve, reject) => {
                this.$validator.validateAll(scope).then(result => {
                    if (result) {
                        resolve()
                        return
                    }
                    reject(this.errors.all())
                })
            })
        }
    }
}

export const confirm = {
    methods: {
        confirmHandler(inputMessage) {
            return new Promise((resolve, reject) => {
                this.$dialog.confirm({
                    title: "削除",
                    message: inputMessage,
                    confirmText: "削除する",
                    cancelText: "キャンセル",
                    type: "is-danger",
                    hasIcon: true,
                    onConfirm: () => resolve()
                })
            })
        }
    }
}
