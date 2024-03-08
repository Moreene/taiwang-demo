<template>
    <div class="swiper-wrapper">
        <div class="col-9 col-md-11 mx-auto">
            <div class="swiper-container">
                <!-- 在 swipe 加載之前，先確定當中商品數據已經加載完成再渲染 swiper -->
                <template v-if="products.length > 0">
                    <swiper :modules="modules" :navigation="navigation" :space-between="40" :loop="true"
                        :autoplay="{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }"
                        :breakpoints="swiperOptions.breakpoints" class="swiper p-16">
                        <swiper-slide v-for="item in products" :key="item.id">
                            <div class="card border-0 swiper-card">
                                <div
                                    class="card-img-top swiper-img-overlay position-absolute top-0 w-100 d-flex justify-content-center align-items-center">
                                    <a href="#" class="stretched-link" @click.prevent="getProduct(item.id)"><i
                                            class="bi bi-search fs-1 text-light"></i></a>
                                </div>
                                <img :src="item.imageUrl" class="card-img-top swiper-img" :alt="item.title">
                                <div class="card-body">
                                    <h2 class="fs-5 text-center">{{ item.title }}</h2>
                                    <p class="text-center text-danger fw-bold fs-6 mb-20">NT$ <span class="text-notoSans">
                                            {{ item.price }}</span></p>
                                    <div class="text-center">
                                        <a href="#" class="btn btn-primary link-light"
                                            @click.prevent="addCart(item.id)">加入購物車</a>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </template>
            </div>
        </div>
        <div class="swiper-button-prev"><i class="bi bi-arrow-left-circle-fill link-dark fs-2"></i></div>
        <div class="swiper-button-next"><i class="bi bi-arrow-right-circle-fill link-dark fs-2"></i></div>
    </div>
</template>

<style lang="scss" scoped>
.swiper {

    &-button-prev:after,
    &-button-next:after {
        content: '';
    }

    &-card {
        box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: 0.3);

        &:hover {
            .swiper-img-overlay {
                opacity: 1;
                height: 150px;
            }
        }
    }

    &-img {
        height: 150px;

        &-overlay {
            background-color: rgba($color: #000000, $alpha: 0.5);
            opacity: 0;
        }
    }
}
</style>

<script>
import { mapActions } from 'pinia';
import productStore from '@/stores/productStore.js';
import cartStore from '@/stores/cartStore.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default {
    props: ['products'],
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            modules: [Navigation, Autoplay],
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            swiperOptions: {
                breakpoints: {
                    1200: {
                        slidesPerView: 4
                    },
                    992: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 2
                    },
                    0: {
                        slidesPerView: 1
                    }
                }
            },
        }
    },
    methods: {
        ...mapActions(productStore, ['getProducts', 'getProduct']),
        ...mapActions(cartStore, ['addCart']),
    },
    mounted() {
        this.getProducts();
    },
}
</script>