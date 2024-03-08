<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header border-bottom">
            <h4 class="offcanvas-title" id="offcanvasRightLabel" v-if="cart.carts">購物車（{{ cart.carts.length }}）</h4>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column p-0">
            <div class="px-16">
                <p class="text-center fs-6 mt-48" v-if="cart.carts && !cart.carts.length">目前購物車內沒有任何餐點唷！</p>
                <!-- 加入商品 -->
                <template v-for="item in cart.carts" :key="item.id">
                    <div class="py-16 border-bottom">
                        <div class="d-flex">
                            <img :src="item.product.imageUrl" :alt="item.product.title" class="d-inline-block cart-img">
                            <div class="d-flex flex-column justify-content-between ms-16">
                                <div class="w-100">
                                    <h5 class="fs-6 d-flex justify-content-between align-items-center mb-0">
                                        {{ item.product.title }}
                                        <a href="#" @click.prevent="deleteItem(item)">
                                            <i class="bi bi-trash fs-5 link-gray"></i></a>
                                    </h5>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="input-group w-50 h-85 d-flex align-items-end">
                                        <button
                                            class="btn btn-secondary text-light d-flex justify-content-center align-items-center w-25 h-85"
                                            type="button" @click="decreaseCartNum(item)" :disabled="item.qty === 1"><i
                                                class="bi bi-dash"></i></button>
                                        <input type="text" class="form-control text-center h-85" min="1"
                                            v-model.number="item.qty" readonly>
                                        <button
                                            class="btn btn-secondary text-light d-flex justify-content-center align-items-center w-25 h-85"
                                            type="button" @click="increaseCartNum(item)"><i class="bi bi-plus"></i></button>
                                    </div>
                                    <p class="mb-0">NT$ <span class="text-notoSans">{{ item.product.price }}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 顯示總計金額 -->
            <div class="mt-auto border-top p-16">
                <div class="d-flex justify-content-between mb-8">
                    <p class="fs-6 mb-0">小計</p>
                    <p class="fs-6 fw-bold mb-0">NT$ <span class="text-notoSans">{{ cart.total }}</span></p>
                </div>
                <div class="d-flex justify-content-between mb-8">
                    <p class="fs-6 mb-0">運費</p>
                    <p class="fs-6 fw-bold mb-0">NT$ <span class="text-notoSans">0</span></p>
                </div>
                <div class="d-flex justify-content-between mb-24">
                    <p class="fs-6 mb-0">總計</p>
                    <p class="fs-6 fw-bold mb-0">NT$ <span class="text-notoSans">{{ cart.total }}</span></p>
                </div>
                <div class="text-center">
                    <button class="btn btn-primary link-light w-75 py-8" type="button" data-bs-dismiss="offcanvas"
                        :disabled="cart.carts && !cart.carts.length" @click="goToCart">前往結帳</button>
                </div>
            </div>
        </div>
    </div>
</template> 

<style lang="scss" scoped>
@import "@/assets/all.scss";

.cart-link:hover {
    i {
        color: $warning;
    }
}

.cart-img {
    width: 80px;
    height: 80px;
}
</style>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore.js';

export default {
    computed: {
        ...mapState(cartStore, ['cart']),
    },
    methods: {
        ...mapActions(cartStore, ['deleteItem', 'increaseCartNum', 'decreaseCartNum']),
        goToCart() {
            this.$router.push('/cart');
        },
    },
}
</script>