<template>
    <LoadingComponent v-model:active="isLoading"></LoadingComponent>
    <!-- Banner -->
    <div class="banner bg-repeat-no bg-size-cover d-flex justify-content-center align-items-center">
        <div class="banner-box rounded-4 d-flex justify-content-center align-items-center">
            <div class="text-center">
                <h2 class="fw-bold">泰式美味線上點</h2>
                <h2 class="fw-bold mb-24">選擇泰汪，越吃越旺！</h2>
                <h3 class="fw-bold text-danger fs-5 mb-32">
                    <i class="bi bi-balloon fs-5 text-danger"></i>
                    線上訂餐，再享85折優惠
                    <i class="bi bi-balloon fs-5 text-danger"></i>
                </h3>
                <RouterLink to="/products" type="button" class="btn btn-secondary link-light w-50 py-8">點我訂餐
                </RouterLink>
            </div>
        </div>
    </div>
    <!-- 暢銷餐點 -->
    <div class="container">
        <div class="py-72">
            <h3 class="text-center fw-bold mb-16">暢銷餐點</h3>
            <SwiperComponent :products="sellProducts" class="mb-48"></SwiperComponent>
            <div class="text-center">
                <RouterLink to="/categories/recommendation" class="btn btn-secondary link-light px-52 py-8">
                    查看更多</RouterLink>
            </div>
        </div>
    </div>
    <!-- 訂購須知 -->
    <div class="bg-wave py-72">
        <div class="container">
            <h3 class="text-center fw-bold mb-32">訂購需知</h3>
            <div class="row gy-48 gy-lg-0">
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 rounded-1 border-gray p-20">
                        <h4 class="fs-6 fw-bold">慶祝開幕，全館免運費</h4>
                        <p>截至2024/12/31止，全館免運費，限制距離在15km以內才提供外送服務。</p>
                        <p>※ 外送路況多變，抵達時間可能會提前或延後15~20分鐘，還請體諒外送人員辛勞，謝謝您！</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 rounded-1 border-gray p-20">
                        <h4 class="fs-6 fw-bold">最低消費說明</h4>
                        <p>外送服務最低消費 500 元，才享有外送服務，請特別留意！</p>
                        <p>※ 以優惠折扣後金額計算</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 rounded-1 border-gray p-20">
                        <h4 class="fs-6 fw-bold">下單注意事項</h4>
                        <p>線上下單僅接收信用卡付款，無取貨付款的選項。</p>
                        <p>訂單送出後，恕無法取消或修改，下單前請務必確認餐點內容、自取或是外送服務。</p>
                    </div>
                </div>
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 rounded-1 border-gray p-20">
                        <h4 class="fs-6 fw-bold">其他說明</h4>
                        <p>總金額 2500 元 (含) 以上之大型訂單，請至少提前兩天直接來電訂購唷。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 美味分類 -->
    <div class="container">
        <div class="py-72">
            <h3 class="text-center fw-bold mb-32">美味分類</h3>
            <div class="row gy-48">
                <template v-for="(item, idx) in categories" :key="item.name">
                    <div class="col-6 col-md-3">
                        <div class="d-flex flex-column align-items-center">
                            <RouterLink :to="`/categories/${item.path}`" ref="tastyLinks" @mouseover="handleMouseOver(idx)"
                                @mouseout="handleMouseOut">
                                <div class="position-relative tasty-wrapper">
                                    <div class="tasty-overlay position-absolute w-100 h-100 top-0 start-0 z-1"></div>
                                    <div class="position-absolute w-100 top-50 translate-middle-y">
                                        <div class="d-flex justify-content-end">
                                            <div
                                                class="tasty-text bg-danger fs-5 fs-lg-4 fw-bold text-light text-align-start py-12 ps-8">
                                                {{ item.name }}
                                            </div>
                                        </div>
                                    </div>
                                    <img :src="item.imageUrl" :alt="item.name" class="w-100 h-100">
                                </div>
                            </RouterLink>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

// Banner
.banner {
    background-image: url("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    height: 450px;
    background-position-y: 45%;

    @include pad {
        height: 650px;
    }

    @include pc-lg {
        height: 720px;
    }

    &-box {
        width: 300px;
        height: 300px;
        background-color: rgba($color: $white, $alpha: 0.8);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);

        @include pad {
            width: 560px;
            height: 330px;
        }
    }
}

// 美味分類
.tasty {
    &-wrapper {
        width: 150px;
        height: 150px;

        @include pc {
            width: 200px;
            height: 200px;
        }
    }

    &-text {
        width: 100px;

        @include pc {
            width: 150px;
        }
    }

    &-overlay {
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
    }
}

.hovered .tasty-overlay {
    opacity: 1;
}
</style>

<script>
import { mapState } from 'pinia';
import productStore from '@/stores/productStore.js';
import categoryStore from '@/stores/categoryStore.js';
import SwiperComponent from '@/components/SwiperComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

import { RouterLink } from 'vue-router';

export default {
    components: {
        RouterLink,
        SwiperComponent,
        LoadingComponent
    },
    methods: {
        handleMouseOver(hoveredIdx) {
            const links = this.$refs.tastyLinks;
            links.forEach((link, index) => {
                if (index !== hoveredIdx) {
                    // 在Vue.js中，this.$refs 傳回的是一個包含了Vue實例的陣列，而不是原生的DOM元素
                    // 因此，需要使用$el屬性來存取實際的DOM元素
                    link.$el.classList.add("hovered");
                }
            });
        },
        handleMouseOut() {
            const links = this.$refs.tastyLinks;
            links.forEach(link => {
                link.$el.classList.remove("hovered");
            });
        },
    },
    computed: {
        ...mapState(productStore, ['sellProducts','isLoading']),
        ...mapState(categoryStore, ['categories']),
    }
}

</script>