<style lang="scss" scoped>
    .rounded {
        @include rounded-element
    }
    #login_wrapper {
        background-image: url('/img/bg-login.jpg');
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
    #register_btn {
        @include btn_padding_sm
    }
</style>
<template>
    <div id="login_wrapper" class="py-3">
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
                        <b-form @submit.stop.prevent="onSubmit">
                            <b-form-group>
                                <label for="username">Username</label>
                                <b-form-input v-model="$v.form.username.$model" placeholder="Enter Your Username" :state="validateState('username')" aria-describedby="input-error-username"></b-form-input>
                                <b-form-invalid-feedback
                                id="input-error-username"
                                >This is a required field</b-form-invalid-feedback>
                            </b-form-group>
                            <b-form-group>
                                <label for="password">Password</label>
                                <b-form-input type="password" v-model="$v.form.password.$model" placeholder="Enter Your Password" :state="validateState('password')" aria-describedby="input-error-password"></b-form-input>
                                <b-form-invalid-feedback
                                id="input-error-password"
                                >This is a required field</b-form-invalid-feedback>
                            </b-form-group>
                            <b-button block type="submit" variant="primary" class="rounded">Login</b-button>
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
        }
    }
</script>