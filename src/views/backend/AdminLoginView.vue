<template>
    <div class="bg-primary vh-100 d-flex justify-content-center align-items-center">
        <div class="w-lg-50 w-xl-25 bg-white rounded-1 p-32">
            <div class="text-center mb-24">
                <h2 class="d-inline-block bg-dark text-white text-center p-16">泰汪泰式料理</h2>
            </div>
            <h3 class="h4 text-center mb-16">後台登入</h3>
            <div class="form-floating mb-16">
                <input type="email" class="form-control" id="floatingInput" placeholder="xxx@mail.com"
                    v-model="user.username">
                <label for="floatingInput">帳號</label>
            </div>
            <div class="form-floating mb-32">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="user.password">
                <label for="floatingPassword">密碼</label>
            </div>
            <button type="button" class="btn btn-dark btn-lg w-100 mb-16" @click="login">登入</button>
            <RouterLink to="/" class="btn btn-outline-gray btn-lg w-100">回到前台</RouterLink>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { toast } from '@/methods/sweetalert';

const { VITE_API } = import.meta.env;

export default {
    components: { RouterLink },
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        };
    },
    methods: {
        login() {
            axios.post(`${VITE_API}/admin/signin`, this.user)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
                    this.user = {
                        username: '',
                        password: '',
                    },
                    toast('top', 'success', res.data.message);
                    setTimeout(() => this.$router.push('/admin'), 1500);
                })
                .catch(err => {
                    toast('top', 'error', err.response.data.message);
                });
        },
    },
}
</script>