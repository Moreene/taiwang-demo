<template>
    <VueLoading v-model:active="isLoading" loader="bars" color="#ff9900"></VueLoading>
    <div class="container py-144">
        <h2 class="fw-bold mb-32">優惠列表</h2>
        <div class="text-end mb-24">
            <button class="btn btn-primary text-light" @click.prevent="openModal('new', item)">
                建立新優惠
            </button>
        </div>
        <div class="table-responsive mb-16">
            <table class="table align-middle">
                <thead class="text-nowrap">
                    <tr class="text-nowrap text-center border-dark">
                        <th width="120">
                            優惠名稱
                        </th>
                        <th width="120">
                            優惠代碼
                        </th>
                        <th width="120">
                            優惠%數
                        </th>
                        <th width="120">
                            到期日
                        </th>
                        <th width="120">
                            到期時間
                        </th>
                        <th width="100">
                            是否啟用
                        </th>
                        <th width="120">
                            編輯
                        </th>
                        <th width="120">
                            刪除
                        </th>
                    </tr>
                </thead>
                <tbody class="text-nowrap text-center">
                    <tr v-for="(item, idx) in coupons" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.percent }}</td>
                        <td>{{ dueDate[idx] }}</td>
                        <td>{{ dueTime[idx] }}</td>
                        <td>
                            <div class="form-check form-switch d-flex justify-content-center">
                                <input class="form-check-input" type="checkbox" role="switch" style="height: 20px;"
                                    v-model="item.is_enabled" @change="toggleSwitch(item)">
                            </div>
                        </td>
                        <td>
                            <a href="#" class="link-primary" @click.prevent="openModal('edit', item)">
                                <i class="bi bi-pencil-square fs-5"></i></a>
                        </td>
                        <td>
                            <a href="#" class="link-danger" @click.prevent="openModal('delete', item)">
                                <i class="bi bi-trash3 fs-5"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 分頁 -->
    <AdminPaginationComponent :pagination="pagination" @emit-pages="getCoupons" v-if="pagination.total_pages > 1"></AdminPaginationComponent>
    <!-- 優惠券 -->
    <CouponModalComponent ref="modal" :temp-coupon="tempCoupon" :is-new="isNew" @clear-input="clearInput"
        @update="getCoupons"></CouponModalComponent>
    <!-- 刪除優惠券 -->
    <DelCouponModalComponent ref="delModal" :temp-coupon="tempCoupon" @clear-input="clearInput" @update="getCoupons"></DelCouponModalComponent>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import CouponModalComponent from '@/components/CouponModalComponent.vue';
import DelCouponModalComponent from '@/components/DelCouponModalComponent.vue';
import AdminPaginationComponent from '@/components/AdminPaginationComponent.vue';

import { sweetalert } from '@/methods/sweetalert';
import { formatDate, formatTime } from '@/methods/date';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
    components: {
        CouponModalComponent,
        DelCouponModalComponent,
        AdminPaginationComponent,
    },
    data() {
        return {
            coupons: [],
            tempCoupon: {},
            pagination: {},
            isNew: false,
            isLoading: false,
        }
    },
    methods: {
        getCoupons(page = 1) {
            this.isLoading = true;
            axios.get(`${VITE_API}/api/${VITE_APIPATH}/admin/coupons?page=${page}`)
                .then(res => {
                    this.pagination = res.data.pagination;
                    const apiData = res.data.coupons;
                    this.coupons = apiData.map(item => ({
                        ...item,
                        is_enabled: item.is_enabled === 1 ? true : false,
                    }));
                    this.isLoading = false;
                })
                .catch(err => {
                    sweetalert('error',err.response.data.message);
                });
        },
        toggleSwitch(item) {
            const originState = !item.is_enabled;
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-secondary text-light",
                    cancelButton: "btn btn-outline-secondary me-16"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: `是否要更新啟用狀態？`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "是, 我要更新",
                cancelButtonText: "我再想想",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    const newState = !originState;
                    const requestData = { 
                        ...item, 
                        is_enabled: newState ? 1 : 0 
                    }; 
                    axios.put(`${VITE_API}/api/${VITE_APIPATH}/admin/coupon/${item.id}`, { "data": requestData })
                        .then(res => {
                            swalWithBootstrapButtons.fire({
                                title: `已更新 ${item.title} 的啟用狀態`,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2000,
                            });
                        })
                        .catch(err => {
                            sweetalert('error','更新啟用狀態失敗');
                        });
                } else {
                    item.is_enabled = originState;
                };
            });
        },
        openModal(status, item) {
            if (status === 'new') {
                this.tempCoupon = {};
                this.isNew = true;
                this.$refs.modal.couponModal.show();
            } else if (status === 'edit') {
                this.tempCoupon = { ...item };
                this.isNew = false;
                this.$refs.modal.couponModal.show();
            }
            else if (status === 'delete') {
                this.tempCoupon = { ...item };
                this.isNew = false;
                this.$refs.delModal.delCouponModal.show();
            };
        },
        clearInput() {
            this.tempCoupon = { due_date: 0 };
            this.$refs.modal.resetForm();
        },
    },
    computed: {
        dueDate() {
            return this.coupons.map(item => {
                return formatDate(item.due_date);
            });
        },
        dueTime() {
            return this.coupons.map(item => {
                return formatTime(item.due_date);
            });
        },
    },
    mounted() {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.getCoupons();
    },
}
</script>