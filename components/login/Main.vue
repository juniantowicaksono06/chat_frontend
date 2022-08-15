<style lang="scss" scoped>
    #login_section {
        width: 100%;
        height: 100%;
    }
    #register_btn {
        @include btn_padding_sm
    }
</style>
<template>
    <div id="login_section" class="py-3">
        <div class="d-flex justify-content-end mr-3 mb-3">
            <nuxt-link to="/register/" class="text-white btn btn-primary rounded" id="register_btn">Create Account</nuxt-link>
        </div>
        <div class="container-fluid w-100">
            <div class="col-12 col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div class="card rounded">
                    <div class="card-header">
                        <h5 class="text-center mb-0">
                            Login Page
                        </h5>
                    </div>
                    <div class="card-body">
                        <!-- <img src="img/bg-login.jpg" alt=""> -->
                        <b-form @submit.stop.prevent="onSubmit" v-on:submit="actionLogin($event)">
                            <b-form-group>
                                <label for="username">Username</label>
                                <b-form-input v-model="$v.form.username.$model" placeholder="Enter Your Username" :state="validateState('username')" aria-describedby="input-error-username" autofocus></b-form-input>
                                <span v-if="!$v.form.username.required && $v.form.username.$dirty" class="text-danger">Username is required</span>
                            </b-form-group>
                            <b-form-group>
                                <label for="password">Password</label>
                                <b-form-input type="password" v-model="$v.form.password.$model" placeholder="Enter Your Password" :state="validateState('password')" aria-describedby="input-error-password"></b-form-input>
                                <span v-if="!$v.form.password.required && $v.form.password.$dirty" class="text-danger">Password is required</span>
                            </b-form-group>
                            <b-button block type="submit" variant="primary" class="rounded text-white">Login</b-button>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { validationMixin } from 'vuelidate'
    import { required, minLength } from 'vuelidate/lib/validators'
    import CryptoJS from 'crypto-js'
    import Swal from 'sweetalert2'
    export default {
        mixins: [validationMixin],
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        validations: {
            form: {
                username: {
                    required
                },
                password: {
                    required
                }
            }
        },
        methods: {
            actionLogin(event) {
                event.preventDefault()
                if (this.$v.form.$anyError) {
                    return 
                }
                this.$store.commit('loading/setLoading', true)
                let config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                let data = {
                    username: this.form.username,
                    password: this.form.password
                }
                this.$axios.$post('/api/auth/login', data, config)  
                .then((response) => {
                    const {statusCode, data} = response
                    if(statusCode == 200) {
                        // Do Something
                        const {token} = data              
                        const encrypt = CryptoJS.AES.encrypt(token, process.env.SALT_KEY).toString()

                        this.$cookies.set("credentials", encrypt, {
                            path: "/",
                            // maxAge: 60 * 60 * 12,
                        });
                        Swal.fire({
                            title: 'Login Success',
                            icon: 'success',
                            toast: true,
                            position: 'top-right',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    }
                    this.$store.commit('loading/setLoading', false)
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 3500)
                })
            },
            validateState(name) {
                const {$dirty, $error} = this.$v.form[name]
                return $dirty ? !$error : null
            },
            onSubmit() {
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    return;
                }
            }
        },
        head() {
            return {
                title: "Login Page"
            }
        },
    }
</script>