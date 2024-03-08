<template>
    <LoadingComponent v-model:active="isLoading"></LoadingComponent>
    <div class="bg-wave">
        <div class="container">
            <div class="col-lg-10 mx-auto pb-72">
                <ProgessBarComponent></ProgessBarComponent>
                <div class="row gy-48 gy-lg-0">
                    <div class="col-lg-7" v-if="order && order.user">
                        <!-- 收件資訊 -->
                        <h2 class="h5 bg-gray text-light ps-12 py-16 mb-0">訂購資訊</h2>
                        <div class="border border-dark bg-white">
                            <div class="ps-12 py-16">
                                <div class="row">
                                    <label for="name" class="col-3 col-lg-2 col-form-label">姓名：</label>
                                    <div class="col-9 col-lg-10">
                                        <input type="text" class="form-control-plaintext" id="name" :value=order.user.name
                                            readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="tel" class="col-3 col-lg-2 col-form-label">手機：</label>
                                    <div class="col-9 col-lg-10">
                                        <input type="tel" class="form-control-plaintext" id="tel" :value=order.user.tel
                                            readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="email" class="col-3 col-lg-2 col-form-label">Email：</label>
                                    <div class="col-9 col-lg-10">
                                        <input type="email" class="form-control-plaintext" id="email"
                                            :value=order.user.email readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="address" class="col-3 col-lg-2 col-form-label">地址：</label>
                                    <div class="col-9 col-lg-10">
                                        <input type="text" class="form-control-plaintext" id="address"
                                            :value=order.user.address readonly>
                                    </div>
                                </div>
                                <div class="row">
                                    <label for="message" class="col-3 col-lg-2 col-form-label">備註：</label>
                                    <div class="col-9 col-lg-10">
                                        <input type="text" class="form-control-plaintext" id="message"
                                            :value="order.user.message ? order.user.message : '無'" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 訂購品項 -->
                        <h2 class="h5 bg-gray text-light ps-12 py-16 mb-0">訂購品項</h2>
                        <div class="border border-dark bg-white">
                            <div class="px-12 py-16">
                                <div class="table-responsive">
                                    <table class="table table-borderless mb-0">
                                        <thead
                                            class="border-bottom border-dark border-top-0 border-start-0 border-end-0 text-nowrap">
                                            <tr>
                                                <th scope="col">餐點名稱</th>
                                                <th scope="col">數量</th>
                                                <th scope="col">單價</th>
                                            </tr>
                                        </thead>
                                        <tbody class="text-nowrap border-bottom border-dark">
                                            <template v-for="item in order.products" :key="item.id">
                                                <tr class="align-middle">
                                                    <td>{{ item.product.title }}</td>
                                                    <td>{{ item.qty }}</td>
                                                    <td>NT$ <span class="text-notoSans">
                                                            {{ item.product.price }}</span></td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <p class="ps-12 mt-24 fs-6 fw-bold mb-4">總金額：NT$ <span class="text-notoSans">{{
                                    Math.round(order.total) }}</span><span class="text-danger fs-7"
                                        v-if="order.total !== originTotal">﹙已使用優惠折扣﹚</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- 信用卡資訊 -->
                    <div class="col-lg-5">
                        <h2 class="h5 bg-gray text-light ps-12 py-16 mb-0">信用卡資訊</h2>
                        <div class="border border-dark bg-white">
                            <v-form ref="form" class="px-12 py-16" v-slot="{ errors }" @submit="submitOrder">
                                <label for="cardNum1" class="form-label">信用卡卡號 <span class="text-danger">*</span></label>
                                <div class="d-flex align-items-center mb-20">
                                    <v-field id="cardNum1" name="cardNum1" type="text" class="form-control border-gray w-20"
                                        @keyup="setBlur($event)" :class="{ 'is-invalid': errors['cardNum1'] }"
                                        :rules="{ required: true, regex: /\d{4}/ }" maxlength="4"></v-field>
                                    <span class="px-6">-</span>
                                    <v-field name="cardNum2" type="text" class="form-control border-gray w-20"
                                        @keyup="setBlur($event)" :class="{ 'is-invalid': errors['cardNum2'] }"
                                        :rules="{ required: true, regex: /\d{4}/ }" maxlength="4"></v-field>
                                    <span class="px-6">-</span>
                                    <v-field name="cardNum3" type="text" class="form-control border-gray w-20"
                                        @keyup="setBlur($event)" :class="{ 'is-invalid': errors['cardNum3'] }"
                                        :rules="{ required: true, regex: /\d{4}/ }" maxlength="4"></v-field>
                                    <span class="px-6">-</span>
                                    <v-field name="cardNum4" type="text" class="form-control border-gray w-20"
                                        :class="{ 'is-invalid': errors['cardNum4'] }"
                                        :rules="{ required: true, regex: /\d/ }" maxlength="4"></v-field>
                                </div>
                                <label for="validDate" class="form-label">有效年月 <span class="text-danger">*</span></label>
                                <v-field id="validDate" name="validDate" type="month" class="form-control border-gray"
                                    :class="{ 'is-invalid': errors['validDate'] }" :rules="validDate"></v-field>
                                <error-message name="validDate" class="invalid-feedback"></error-message>
                                <label for="securityNum" class="form-label mt-20">安全碼 <span
                                        class="text-danger">*</span></label>
                                <v-field id="securityNum" name="securityNum" type="text" class="form-control border-gray"
                                    :class="{ 'is-invalid': errors['securityNum'] }" placeholder="請輸入卡片背面末3碼"
                                    :rules="securityNum" maxlength="3"></v-field>
                                <error-message name="securityNum" class="invalid-feedback"></error-message>
                                <div class="text-end mt-24">
                                    <button type="submit" class="btn btn-primary text-white">確認付款</button>
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
            order: {},
            isLoading: true,
        }
    },
    methods: {
        setBlur(e) {
            const maxLength = parseInt(e.target.getAttribute('maxlength'));
            if (e.target.value.length === maxLength) {
                let nextInput = e.target.nextElementSibling.nextElementSibling;
                nextInput.focus();
            };
        },
        sharedError(value) {
            return value ? value : '請輸入完整卡號';
        },
        validDate(value) {
            return value ? true : '請選擇有效年/月';
        },
        securityNum(value) {
            const num = /\d{3}/;
            return num.test(value) ? true : '請輸入卡片背面末3碼數字';
        },
        submitOrder() {
            axios.post(`${VITE_API}/api/${VITE_APIPATH}/pay/${this.$route.params.id}`)
                .then(res => {
                    toast('top', 'success', '已成功付款');
                    setTimeout(() => {
                        this.$router.push('/orderChecked');
                    }, 1500);
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
    computed: {
        originTotal() {
            if (this.order && this.order.products) {
                return Object.values(this.order.products).reduce((total, product) => total + product.total, 0);
            };
        },
    },
    created() {
        localStorage.setItem('orderNum', this.$route.params.id);
        axios.get(`${VITE_API}/api/${VITE_APIPATH}/order/${this.$route.params.id}`)
            .then(res => {
                this.order = res.data.order;
                this.isLoading = false;
            })
            .catch(err => {
                console.log(err);
            });
    },
}
</script>