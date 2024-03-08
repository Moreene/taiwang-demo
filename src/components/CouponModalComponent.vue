<template>
    <div id="couponModal" ref="couponModal" class="modal fade" tabindex="-1" aria-labelledby="couponModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0">
                <div class="modal-header bg-primary text-white">
                    <h5 id="couponModalLabel" class="modal-title">
                        {{ coupon.title ? coupon.title : '建立優惠券' }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="$emit('clearInput')"></button>
                </div>
                <v-form ref="form" v-slot="{ errors }">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-16">
                                    <label for="title" class="form-label">優惠名稱</label>
                                    <v-field id="title" name="優惠名稱" type="text" class="form-control"
                                        v-model="coupon.title" :class="{ 'is-invalid': errors['優惠名稱'] }"
                                        placeholder="請輸入優惠名稱" rules="required"></v-field>
                                    <error-message name="優惠名稱" class="invalid-feedback"></error-message>
                                </div>
                                <div class="mb-16">
                                    <label for="code" class="form-label">優惠代碼</label>
                                    <v-field id="code" name="優惠代碼" type="text" class="form-control"
                                        v-model="coupon.code" :class="{ 'is-invalid': errors['優惠代碼'] }"
                                        placeholder="請輸入優惠代碼" rules="required"></v-field>
                                    <error-message name="優惠代碼" class="invalid-feedback"></error-message>
                                </div>
                                <div class="mb-16">
                                    <label for="percent" class="form-label">優惠%數</label>
                                    <v-field id="percent" name="優惠%數" type="number" class="form-control"
                                        v-model.number="coupon.percent" :class="{ 'is-invalid': errors['優惠%數'] }"
                                        placeholder="請輸入優惠%數" rules="required"></v-field>
                                    <error-message name="優惠%數" class="invalid-feedback"></error-message>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-16">
                                    <label for="date" class="form-label">到期日</label>
                                    <v-field id="date" name="到期日" type="date" class="form-control" v-model="date"
                                        :class="{ 'is-invalid': errors['到期日'] }" rules="required"></v-field>
                                    <error-message name="到期日" class="invalid-feedback"></error-message>
                                </div>
                                <div>
                                    <label for="time" class="form-label">到期時間</label>
                                    <v-field id="time" name="到期時間" type="time" class="form-control" v-model="time"
                                        :class="{ 'is-invalid': errors['到期時間'] }" rules="required"></v-field>
                                    <error-message name="到期時間" class="invalid-feedback"></error-message>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-primary w-25" data-bs-dismiss="modal"
                            @click="$emit('clearInput')">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary text-white w-25" @click="updateCoupon()">
                            確認
                        </button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';

import { sweetalert } from '@/methods/sweetalert';
import { formatDate, formatTime } from '@/methods/date';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
    props: ['tempCoupon', 'isNew'],
    data() {
        return {
            couponModal: null,
            coupon: {},
            date: '',
            time: '',
            uid: 0,
        }
    },
    methods: {
        createUid() {
            const dateTime = this.date + ' ' + this.time
            this.uid = Date.parse(dateTime);
        },
        updateCoupon() {
            this.createUid();
            const updateData = {
                ...this.coupon,
                is_enabled: this.coupon.is_enabled ? 1 : 0,
                due_date: this.uid,
            };

            let url = `${VITE_API}/api/${VITE_APIPATH}/admin/coupon/${updateData.id}`;
            let http = 'put';
            if (this.isNew) {
                url = `${VITE_API}/api/${VITE_APIPATH}/admin/coupon`;
                http = 'post'
            };
            axios[http](url, { data: updateData })
                .then(res => {
                    sweetalert('success', res.data.message);
                    this.$emit('update');
                    this.$emit('clearInput');
                    this.couponModal.hide();
                }).catch(err => {
                    sweetalert('error', err.response.data.message);
                });
        },
        resetForm() {
            this.$refs.form.resetForm();
        },
    },
    watch: {
        tempCoupon: {
            handler(newVal) {
                this.date = formatDate(newVal.due_date);
                this.time = formatTime(newVal.due_date)
                this.coupon = newVal;
            },
            deep: true
        },
    },
    mounted() {
        this.couponModal = new Modal(this.$refs.couponModal, {
            keyboard: false,
            backdrop: 'static',
        });
    },
}
</script>