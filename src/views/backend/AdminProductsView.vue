<template>
    <VueLoading v-model:active="isLoading" loader="bars" color="#ff9900"></VueLoading>
    <div class="container py-144">
        <h2 class="fw-bold mb-32">餐點列表</h2>
        <div class="text-end mb-24">
            <button class="btn btn-primary text-light" @click="openModal('new')">
                建立新餐點
            </button>
        </div>
        <div class="table-responsive mb-16">
            <table class="table align-middle">
                <thead class="text-nowrap">
                    <tr class="text-nowrap text-center border-dark">
                        <th width="120">
                            商品照
                        </th>
                        <th width="120">
                            分類
                        </th>
                        <th width="120">
                            餐點名稱
                        </th>
                        <th width="120">
                            原價
                        </th>
                        <th width="120">
                            售價
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
                    <tr v-for="item in products" :key="item.id">
                        <td><img :src="item.imageUrl" :alt="item.title" style="width: 160px; height: 120px;"></td>
                        <td>{{ item.category }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.origin_price }}</td>
                        <td>{{ item.price }}</td>
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

        <!-- 分頁 -->
        <AdminPaginationComponent :pagination="pagination" @emit-pages="getProduct"></AdminPaginationComponent>
        <!-- 新增/編輯餐點 -->
        <ProductModalComponent ref="modal" :temp-product="tempProduct" :is-new="isNew" @clear-input="clearInput" @update="getProduct"></ProductModalComponent>
        <!-- 刪除餐點 -->
        <DelProductModalComponent ref="delModal" :temp-product="tempProduct" @clear-input="clearInput" @update="getProduct"></DelProductModalComponent>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import DelProductModalComponent from '@/components/DelProductModalComponent.vue';
import AdminPaginationComponent from '@/components/AdminPaginationComponent.vue';

import { sweetalert } from '@/methods/sweetalert';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
    components: {
        ProductModalComponent,
        DelProductModalComponent,
        AdminPaginationComponent,
    },
    data() {
        return {
            products: [],
            pagination: {},
            tempProduct: {
                imagesUrl: []
            },
            isNew: false,
            isLoading: false,
        }
    },
    methods: {
        getProduct(page = 1) {
            this.isLoading = true;
            axios.get(`${VITE_API}/api/${VITE_APIPATH}/admin/products?page=${page}`)
                .then(res => {
                    const apiData = res.data.products;
                    this.products = apiData.map(product => ({
                        ...product,
                        hot: product.hot === 1 ? true : false,
                        recommendation: product.recommendation === 1 ? true : false,
                        is_enabled: product.is_enabled === 1 ? true : false,
                    }));
                    this.pagination = res.data.pagination;
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
                        hot: item.hot === true ? 1 : 0,
                        recommendation: item.recommendation === true ? 1 : 0,
                        is_enabled: newState ? 1 : 0 
                    }; 
                    axios.put(`${VITE_API}/api/${VITE_APIPATH}/admin/product/${item.id}`, { "data": requestData })
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
                this.tempProduct = {};
                this.isNew = true;
                this.$refs.modal.productModal.show();
            } else if (status === 'edit') {
                this.tempProduct = { ...item };
                this.isNew = false;
                this.$refs.modal.productModal.show();
            } else if (status === 'delete') {
                this.tempProduct = { ...item };
                this.isNew = false;
                this.$refs.delModal.delProductModal.show();
            };
        },
        clearInput() {
            this.tempProduct = {
                imagesUrl: []
            };
            this.$refs.modal.resetForm();
        },
    },
    mounted() {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.getProduct();
    },
}
</script>