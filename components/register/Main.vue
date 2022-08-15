<style lang="scss" scoped>
    #login_wrapper {
        background-image: url('/img/bg-login.jpg');
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    #login_btn {
        @include transparent-element;
        @include btn_padding_sm
    }
</style>
<template>
    <div id="login_wrapper" class="py-3">
        <div class="d-flex justify-content-end mr-3 mb-3">
            <nuxt-link to="/login/" class="text-white btn rounded" id="login_btn">Login</nuxt-link>
        </div>
        <div class="container-fluid w-100">
            <div class="col-12 col-sm-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <div class="card rounded">
                    <div class="card-header">
                        <h5 class="text-center mb-0">
                            Register Page
                        </h5>
                    </div>
                    <div class="card-body">
                        <!-- <img src="img/bg-login.jpg" alt=""> -->
                        <b-form @submit.stop.prevent="onSubmit" v-on:submit="actionRegister">
                            <b-form-group>
                                <label for="username">Username</label>
                                <b-form-input v-model="$v.form.username.$model" placeholder="Enter Your Username" :state="validateState('username')" maxlength="16"></b-form-input>
                                <!-- <b-form-invalid-feedback
                                id="input-error-username"
                                >This is a required field</b-form-invalid-feedback> -->
                                <span v-if="!$v.form.username.minLength && $v.form.username.$dirty" class="text-danger">Username must be at least 3 characters</span>
                                <span v-else-if="!$v.form.username.maxLength && $v.form.username.$dirty" class="text-danger">Username max 16 characters</span>
                                <span v-else-if="!$v.form.username.required && $v.form.username.$dirty" class="text-danger">Username is required</span>
                                <span v-else-if="!$v.form.username.isUnique && !username_loading && $v.form.username.$dirty" class="text-danger">Username is already taken</span>
                            </b-form-group>
                            <b-form-group>
                                <label for="username">Email</label>
                                <b-form-input v-model="$v.form.email.$model" placeholder="Enter Your Email" :state="validateState('email')" maxlength="50"></b-form-input>
                                <span v-if="!$v.form.email.email && $v.form.email.$dirty" class="text-danger">Email is not valid</span>
                                <span v-else-if="!$v.form.email.maxLength && $v.form.email.$dirty" class="text-danger">Email max 50 characters</span>
                                <span v-else-if="!$v.form.email.required && $v.form.email.$dirty" class="text-danger">Email is required</span>
                            </b-form-group>
                            <b-form-group>
                                <label for="fullname">Full Name</label>
                                <b-form-input v-model="$v.form.fullname.$model" placeholder="Enter Your Username" :state="validateState('fullname')" maxlength="200"></b-form-input>
                                <span v-if="!$v.form.fullname.minLength && $v.form.fullname.$dirty" class="text-danger">Full Name must be at least 3 characters</span>
                                <span v-else-if="!$v.form.fullname.maxLength && $v.form.fullname.$dirty" class="text-danger">Full Name max 200 characters</span>
                                <span v-else-if="!$v.form.fullname.required && $v.form.fullname.$dirty" class="text-danger">Full Name is required</span>
                            </b-form-group>
                            <b-form-group>
                                <label for="password">Password</label>
                                <b-form-input type="password" v-model="$v.form.password.$model" placeholder="Enter Your Password" :state="validateState('password')" aria-describedby="input-error-password" maxlength="30"></b-form-input>
                                <span v-if="!$v.form.password.maxLength && $v.form.password.$dirty" class="text-danger">Password max 30 characters</span>
                                <span v-else-if="!$v.form.password.minLength && $v.form.password.$dirty" class="text-danger">Password must be at least 8 characters</span>
                                <span v-else-if="!$v.form.password.required && $v.form.password.$dirty" class="text-danger">Password is required</span>
                                <!-- <b-form-invalid-feedback
                                id="input-error-password"
                                >This is a required field</b-form-invalid-feedback> -->
                            </b-form-group>
                            <b-form-group>
                                <label for="password">Confirm Password</label>
                                <b-form-input type="password" v-model="$v.form.confirm_password.$model" placeholder="Enter Your Password" :state="validateState('confirm_password')" aria-describedby="input-error-confirm_password" maxlength="30"></b-form-input>
                                <span v-if="!$v.form.confirm_password.sameAsPassword && $v.form.confirm_password.$dirty" class="text-danger">Password is not same</span>
                                <span v-else-if="!$v.form.confirm_password.required && $v.form.confirm_password.$dirty" class="text-danger">Confirmation Password is required</span>
                            </b-form-group>
                            <b-button block class="rounded text-white" type="submit" variant="primary">Register</b-button>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { validationMixin } from 'vuelidate'
    import { required, minLength, email, maxLength, sameAs } from 'vuelidate/lib/validators'
    import Swal from 'sweetalert2'
    var timeout = null
    export default {
        mixins: [validationMixin],
        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    password: '',
                    fullname: '',
                    confirm_password: '',
                },
                username_loading: false
            }
        },
        mounted() {
            this.username_loading = false
        },
        validations: {
            form: {
                username: {
                    required,
                    async isUnique(value) {
                        if(value === '' || value.length < 3) return true
                        if(timeout != null) {
                            clearTimeout(timeout)
                        }
                        this.username_loading = true
                        const check = await new Promise((resolve, reject) => {
                            timeout = setTimeout(() => {
                                this.$axios.$get(`/api/auth/check-username/${value}`)
                                .then((response) => {
                                    resolve(true)
                                })
                                .catch(error => {
                                    resolve(false)
                                })
                            }, 1000)
                        })
                        this.username_loading = false
                        return check
                    },
                    minLength: minLength(3),
                    maxLength: maxLength(16)
                },
                email: {
                    required, email,
                    maxLength: maxLength(50)
                },
                fullname: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(50)
                },
                password: {
                    required,
                    minLength: minLength(8),
                    maxLength: maxLength(30)
                },
                confirm_password: {
                    required,
                    sameAsPassword: sameAs('password')  
                }
            }
        },
        methods: {
            validateState(name) {
                const {$dirty, $error} = this.$v.form[name]
                return $dirty ? !$error : null
            },
            onSubmit() {
                this.$v.form.$touch();
                if (this.$v.form.$anyError) {
                    return;
                }
            },
            actionRegister() {
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
                    fullname: this.form.fullname,
                    email: this.form.email,
                    password: this.form.password
                }
                this.$axios.$post('/api/auth/register', data, config)  
                .then((response) => {
                    const {statusCode, data} = response
                    if(statusCode == 201) {
                        this.$store.commit('loading/setLoading', false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Register success',
                            text: "You will be redirect to login page automatically",
                            showConfirmButton: false,
                            toast: true,
                            timer: 3000,
                            position: 'top-right'
                        })
                        setTimeout(() => {
                            this.$router.push('/login/')
                        }, 3500)
                    }
                })
                .catch((error) => {
                    this.$store.commit('loading/setLoading', false)
                })
            }
        },
        head() {
            return {
                title: "Register Page"
            }
        }
    }
</script>