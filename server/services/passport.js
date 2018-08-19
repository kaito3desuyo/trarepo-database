import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import TwitterStrategy from "passport-twitter"
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth"
require("dotenv").config()
import axios from "axios"
import bcrypt from "bcrypt"

passport.use(
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        (username, password, done) =>
            axios
                .get(`http://localhost:9000/api/v1/users/`, {
                    params: {
                        searchColumn: "email",
                        searchValue: username
                    }
                })
                .then(result => {
                    if (result.data.contents.length === 0) {
                        done({
                            code: 401,
                            subject: {
                                stack: null,
                                message: "User doesn't exist"
                            }
                        })
                    }
                    bcrypt.compare(
                        password,
                        result.data.contents[0].password,
                        (err, res) => {
                            if (!res) {
                                done({
                                    code: 401,
                                    subject: {
                                        stack: null,
                                        message: "Not match password"
                                    }
                                })
                            } else {
                                const response = {
                                    id: result.data.contents[0].id
                                }
                                done(null, response)
                            }
                        }
                    )
                })
                .catch(error => {
                    done({
                        code: error.response.data.statusCode,
                        subject: {
                            stack: error.stack,
                            message: error.response.data.message
                        }
                    })
                })
    )
)

passport.use(
    new TwitterStrategy(
        {
            consumerKey: process.env.TWITTER_API_KEY,
            consumerSecret: process.env.TWITTER_API_SECRET,
            callbackURL: "http://localhost:3000/api/auth/twitter/callback"
        },
        (token, tokenSecret, profile, done) => done(null, profile)
    )
)

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/google/callback"
        },
        (token, tokenSecret, profile, done) => {
            axios
                .post("http://localhost:9000/api/v1/users", {
                    name: profile.displayName,
                    provider: profile.provider,
                    userId: profile.id
                })
                .then(result => {
                    const response = { id: result.data.contents[0].id }
                    done(null, response)
                })
                .catch(error => {
                    done({
                        code: error.response.data.statusCode,
                        subject: {
                            stack: error.stack,
                            message: error.response.data.message
                        }
                    })
                })
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    axios
        .get(`http://localhost:9000/api/v1/users/${user.id}`, {
            params: {
                id: user.id
            }
        })
        .then(result => {
            done(null, result.data.contents)
        })
        .catch(error => {
            done({
                code: error.response.data.statusCode,
                subject: {
                    stack: error.stack,
                    message: error.response.data.message
                }
            })
        })
})

export default passport
