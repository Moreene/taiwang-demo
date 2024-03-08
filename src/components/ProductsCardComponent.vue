<template>
    <div class="card w-75 w-md-100 mx-auto">
        <div class="card-img-wrapper w-100 rounded-top overflow-hidden">
            <img :src="item.imageUrl" class="w-100 h-100 rounded-top" :alt="item.title">
        </div>
        <div class="py-16">
            <h2 class="fs-6 text-center">{{ item.title }}</h2>
            <p class="text-center text-danger fw-bold fs-6 mb-20">NT$ <span class="text-notoSans">
                    {{ item.price }}</span></p>
            <div class="text-center">
                <a href="#" class="btn btn-primary link-light me-8" @click.prevent="addCart(item.id)">加入購物車</a>
                <a href="#" class="btn btn-secondary px-16" @click.prevent="getProduct(item.id)"><i class="bi bi-search text-light"></i></a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    &-img-wrapper {
        height: 200px;

        img {
            transition: 0.6s ease-out;
        }
    }

    &:hover {
        img {
            transform: scale(1.1, 1.1);
            transition: 1s ease;
        }
    }
}
</style>

<script>
import { mapActions } from 'pinia';
import productStore from '@/stores/productStore.js';
import cartStore from '@/stores/cartStore.js';

export default {
    props: ['item'],
    methods: {
        ...mapActions(productStore, ['getProduct']),
        ...mapActions(cartStore, ['addCart']),
    },
}
</script>