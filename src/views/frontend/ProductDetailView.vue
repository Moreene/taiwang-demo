<template>
    <LoadingComponent v-model:active="isLoading"></LoadingComponent>
    <div class="py-72 py-lg-90">
        <div class="container">
            <!-- 麵包屑 -->
            <nav aria-label="breadcrumb" class="mb-24">
                <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                        <RouterLink to="/" class="link-gold">首頁</RouterLink>
                    </li>
                    <li class="breadcrumb-item">
                        <RouterLink to="/products" class="link-gold">線上訂餐</RouterLink>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{{ productDetail.category }}</li>
                </ol>
            </nav>
            <!-- 商品資訊 -->
            <div class="row flex-column flex-lg-row gy-48 gy-lg-0 mb-48">
                <div class="col-lg-6">
                    <img :src="productDetail.imageUrl" alt="主圖" class="w-100 main-img mb-24">
                    <div class="d-flex">
                        <template v-for="(item, index) in productDetail.imagesUrl" :key="index">
                            <a href="#" @click.prevent="showImage(index)">
                                <img :src="item" alt="副圖" class="sub-img me-16"></a>
                        </template>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h2 class="fw-bold mb-24"><span class="text-title d-inline-block position-relative z-1">{{ productDetail.title }}</span></h2>
                    <p class="fs-6 text-notoSans mb-32">{{ productDetail.description }}</p>
                    <p class="text-notoSans text-gray mb-48 mb-lg-72">食材：
                        <template v-for="(item, index) in productDetail.ingredient" :key="'食材'+ index">
                            <span class="text-notoSans text-gray">{{ item }}</span>
                            <span v-if="index < productDetail.ingredient.length - 1"
                                class="text-notoSans text-gray">、</span>
                        </template>
                    </p>
                    <p class="fs-4 text-notoSans">NT$ {{ productDetail.price }} <span class="fs-7">/ {{
                        productDetail.unit
                    }}</span></p>
                    <div class="d-flex">
                        <div class="input-group w-50 me-24">
                            <button
                                class="btn btn-secondary text-light d-flex justify-content-center align-items-center w-25"
                                type="button" @click="qty--" :disabled="qty <= 1"><i class="bi bi-dash"></i></button>
                            <input type="text" class="form-control text-center" min="1" v-model.number="qty" readonly>
                            <button
                                class="btn btn-secondary text-light d-flex justify-content-center align-items-center w-25"
                                type="button" @click="qty++"><i class="bi bi-plus"></i></button>
                        </div>
                        <button class="btn btn-outline-dark" @click="addCart(productDetail.id, qty)">加入購物車</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 注意事項 -->
        <div class="bg-wave py-24 mb-48">
            <div class="container">
                <div class="row gy-32 gy-lg-0">
                    <div class="col-lg-4">
                        <h3 class="h5 fw-bold"><i class="bi bi-highlighter"></i> 注意事項</h3>
                        <ul class="ps-28">
                            <li class="text-notoSans mb-4">{{ productDetail.note }}</li>
                            <li class="text-notoSans mb-4">請注意是否會對餐點的食材過敏，謝謝</li>
                        </ul>
                    </div>
                    <div class="col-lg-4">
                        <h3 class="h5 fw-bold"><i class="bi bi-highlighter"></i> 外送須知</h3>
                        <ul class="ps-28">
                            <li class="text-notoSans mb-4">截至2024/12/31止，每筆訂單皆免運費<br>- 限制距離15km以內</li>
                            <li class="text-notoSans mb-4">最低消費滿 500 元，才享有外送服務</li>
                            <li class="text-notoSans mb-4">餐點現點現做，收到後請即時享用</li>
                        </ul>
                    </div>
                    <div class="col-lg-4">
                        <h3 class="h5 fw-bold"><i class="bi bi-highlighter"></i> 付款方式</h3>
                        <ul class="ps-28">
                            <li class="text-notoSans">線上訂餐僅接受信用卡信上付款</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 相關商品 -->
        <div class="container">
            <h3 class="fw-bold mb-32 mb-lg-24">
            <span class="text-title d-inline-block position-relative z-1">還想要來點什麼嗎...</span></h3>
            <SwiperComponent :products="filterData" v-if="filterData.length > 4"></SwiperComponent>
            <template v-else>
                <div class="col-9 col-md-11 mx-auto">
                    <div class="row gy-48 gy-lg-0">
                        <div class="col-md-4 col-lg-3" v-for="item in filterData" :key="item.id">
                            <div class="card border-0">
                                <div
                                    class="card-img-top card-img-overlay position-absolute top-0 w-100 d-flex justify-content-center align-items-center">
                                    <a href="#" class="stretched-link" @click.prevent="getProduct(item.id)"><i
                                            class="bi bi-search fs-1 text-light"></i></a>
                                </div>
                                <img :src="item.imageUrl" class="card-img-top card-img" :alt="item.title">
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
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.main-img {
    height: 400px;
}

.sub-img {
    width: 120px;
    height: 120px;
}

.text-title::after {
    position: absolute;
    display: block;
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    background-color: $warning;
    z-index: -1;
}

.card {
    box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: 0.3);

    &:hover {
        .card-img-overlay {
            opacity: 1;
            height: 150px;
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
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore.js';
import cartStore from '@/stores/cartStore.js';
import SwiperComponent from '@/components/SwiperComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
    components: {
        SwiperComponent,
        LoadingComponent,
    },
    data() {
        return {
            qty: 1,
            filterData: [],
        };
    },
    methods: {
        ...mapActions(productStore, ['getProduct', 'getProducts']),
        ...mapActions(cartStore, ['addCart']),
        showImage(id) {
            this.productDetail.imageUrl = this.productDetail.imagesUrl[id];
        },
        getFilterData() {
            this.filterData = this.products.filter(item => item.category === this.productDetail.category);
        },
    },
    computed: {
        ...mapState(productStore, ['products', 'productDetail', 'isLoading']),
    },
    watch: {
        // 確保在數據加載完成後才執行 getFilterData()
        products: {
            handler() {
                this.getFilterData();
            },
        },
        productDetail: {
            handler() {
                this.getFilterData();
            },
        },
    },
    created() {
        this.getProducts();
        this.getProduct(this.$route.params.id);
    },
};
</script>