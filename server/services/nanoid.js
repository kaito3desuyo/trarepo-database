import nanoid from "nanoid"
import nanoid_manual from "nanoid/generate"

export default {
    apiKey: () => {
        const code = nanoid()
        return code
    },
    identifyCode: () => {
        const code = nanoid_manual("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)
        return code
    }
}
