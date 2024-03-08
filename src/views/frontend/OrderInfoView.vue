<template>
    <LoadingComponent v-model:active="isLoading"></LoadingComponent>
    <div class="bg-wave">
        <div class="container">
            <div class="col-lg-10 mx-auto pb-72">
                <ProgessBarComponent></ProgessBarComponent>
                <div class="row justify-content-between gy-48 gy-lg-0">
                    <div class="col-lg-6">
                        <div class="table-responsive">
                            <table class="table table-borderless mb-0">
                                <thead
                                    class="border-bottom border-dark border-top-0 border-start-0 border-end-0 border-2 text-nowrap">
                                    <tr class="text-center">
                                        <th scope="col" class="bg-wave" style="width: 100px;">示意圖</th>
                                        <th scope="col" class="bg-wave">餐點名稱</th>
                                        <th scope="col" class="bg-wave">餐點數量</th>
                                        <th scope="col" class="bg-wave">單價</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center text-nowrap">
                                    <template v-for="item in cart.carts" :key="item.id">
                                        <tr class="align-middle border-bottom border-dark">
                                            <th scope="row" class="fw-normal bg-wave">
                                                <img :src="item.product.imageUrl" :alt="item.product.title"
                                                    style="width: 100px;height: 100px;">
                                            </th>
                                            <td class="bg-wave">{{ item.product.title }}</td>
                                            <td class="bg-wave">{{ item.qty }}</td>
                                            <td class="bg-wave">NT$ <span class="text-notoSans">{{ item.product.price
                                                    }}</span></td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <p class="text-end fw-bold fs-5 mt-16 mb-0"><span class="me-8">總計：</span>NT$ <span
                                class="text-notoSans">{{ Math.round(cart.final_total) }}</span></p>
                        <p class="text-end fw-bold text-danger" v-if="cart.final_total !== cart.total">(已使用優惠代碼)</p>
                    </div>
                    <div class="col-lg-5">
                        <div class="border border-gray bg-white rounded-2 p-20">
                            <h2 class="h4 text-center fw-bold mb-24">訂購資訊</h2>
                            <v-form ref="form" v-slot="{ errors }" @submit="submitOrder">
                                <div class="mb-16">
                                    <label for="name" class="form-label">姓名 <span class="text-danger">*</span></label>
                                    <v-field id="name" name="姓名" type="text" class="form-control border-gray"
                                        v-model="form.user.name" :class="{ 'is-invalid': errors['姓名'] }"
                                        placeholder="請輸入姓名" rules="required"></v-field>
                                    <error-message name="姓名" class="invalid-feedback fw-bold"></error-message>
                                </div>
                                <div class="mb-16">
                                    <label for="tel" class="form-label">手機 <span class="text-danger">*</span></label>
                                    <v-field id="tel" name="手機" type="tel" class="form-control border-gray"
                                        v-model="form.user.tel" :class="{ 'is-invalid': errors['手機'] }"
                                        placeholder="請輸入手機號碼" :rules="isPhone"></v-field>
                                    <error-message name="手機" class="invalid-feedback fw-bold"></error-message>
                                </div>
                                <div class="mb-16">
                                    <label for="email" class="form-label">Email <span
                                            class="text-danger">*</span></label>
                                    <v-field id="email" name="email" type="email" class="form-control border-gray"
                                        v-model="form.user.email" :class="{ 'is-invalid': errors['email'] }"
                                        placeholder="請輸入 Email" rules="email|required"></v-field>
                                    <error-message name="email" class="invalid-feedback fw-bold"></error-message>
                                </div>
                                <div class="mb-16">
                                    <label for="address" class="form-label">地址 <span
                                            class="text-danger">*</span></label>
                                    <v-field id="address" name="地址" type="text" class="form-control border-gray"
                                        v-model="form.user.address" :class="{ 'is-invalid': errors['地址'] }"
                                        placeholder="請輸入地址" rules="required" ref="address"></v-field>
                                    <error-message name="地址" class="invalid-feedback fw-bold"></error-message>
                                </div>
                                <div class="mb-24">
                                    <label for="備註" class="form-label">備註</label>
                                    <v-field as="textarea" id="備註" name="備註" class="form-control border-gray"
                                        v-model="form.message" :class="{ 'is-invalid': errors['備註'] }"
                                        style="height: 150px;"></v-field>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <RouterLink to="/cart" class="btn btn-outline-dark">回上一頁</RouterLink>
                                    <button type="submit" class="btn btn-primary text-white"
                                        :disabled="isFormComplete">送出訂單</button>
                                </div>
                            </v-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore.js';
import ProgessBarComponent from '@/components/ProgessBarComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

import { toast } from '@/methods/sweetalert';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
    components: {
        ProgessBarComponent,
        LoadingComponent,
    },
    data() {
        return {
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            isLoading: true,
        }
    },
    methods: {
        ...mapActions(cartStore, ['getCart']),
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '請輸入 09 開頭的手機號碼'
        },
        submitOrder() {
            axios.post(`${VITE_API}/api/${VITE_APIPATH}/order`, { "data": this.form })
                .then(res => {
                    const { orderId } = res.data;
                    toast('top', 'success', '訂單已成立');
                    localStorage.removeItem('pickUp');
                    setTimeout(() => {
                        this.getCart();
                        this.$router.push(`/payment/${orderId}`);
                    }, 1500);
                })
                .catch(err => {
                    toast('top', 'error', '表單送出失敗');
                });
        },
    },
    computed: {
        ...mapState(cartStore, ['cart']),
        isFormComplete() {
            const { user } = this.form;
            return !user.name || !user.email || !user.tel || !user.address;
        },
    },
    mounted() {
        const pickUp = localStorage.getItem('pickUp');
        if (pickUp === '自取') {
            this.form.user.address = '自取';
            this.$refs.address.$el.setAttribute('readonly', 'readonly');
        };
    },
    created() {
        setTimeout(() => this.isLoading = false, 400);
    },
    
}
</script>