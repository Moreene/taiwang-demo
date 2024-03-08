<template>
    <LoadingComponent v-model:active="isLoading"></LoadingComponent>
    <!-- Banner -->
    <BannerComponent>線上訂餐 / Menu</BannerComponent>
    <!-- 商品 -->
    <div class="container">
        <div class="py-72 py-lg-90">
            <!-- 導航列 -->
            <div class="d-flex flex-column flex-lg-row justify-content-lg-between mb-48">
                <ul class="nav nav-underline flex-nowrap text-nowrap overflow-x-auto mb-16 mb-lg-0" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link fs-6" id="all-tab" type="button" role="tab" aria-controls="all"
                            data-bs-target="#all" aria-selected="true" @click="goTo('products', $event)"
                            :class="{ 'active': this.$route.path === '/products' }">所有餐點</button>
                    </li>
                    <template v-for="item in categories" :key="item">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link fs-6" :id="item.name + '-tab'" type="button" role="tab"
                                :aria-controls="item.name" :data-bs-target="'#' + item.name" aria-selected="false"
                                @click="goTo(item.path, $event)"
                                :class="{ 'active': this.$route.path === `/categories/${item.path}` }">
                                {{ item.name }}</button>
                        </li>
                    </template>
                </ul>
                <div class="w-75 w-md-50 w-lg-25 d-flex justify-content-lg-end">
                    <div class="w-75">
                        <input type="text" class="form-control rounded-0 border-top-0 border-start-0 border-end-0 "
                            placeholder="請輸入關鍵字..." v-model="keyWord" @input="getMatchProducts">
                    </div>
                </div>
            </div>
            <!-- 內容顯示 -->
            <div class="tab-content">
                <!-- 所有餐點 -->
                <div class="tab-pane show" id="all" role="tabpanel" aria-labelledby="all-tab" tabindex="0"
                    :class="{ 'active': this.$route.path === '/products' }">
                    <div class="row gy-48">
                        <template v-if="matchProducts.length">
                            <div class="col-md-4 col-lg-3 mb-48" v-for="item in matchProducts" :key="item.id">
                                <ProductsCardComponent :item="item"></ProductsCardComponent>
                            </div>
                            <PaginationComponent :products="matchProducts" @update-products="updateProducts" ref="pagination"></PaginationComponent>
                        </template>
                        <template v-else>
                            <div class="col-md-4 col-lg-3 mb-48" v-for="item in sliceProducts" :key="item.id">
                                <ProductsCardComponent :item="item"></ProductsCardComponent>
                            </div>
                            <PaginationComponent :products="products" @update-products="updateProducts" ref="pagination"></PaginationComponent>
                        </template>
                    </div>
                </div>
                <!-- 其他餐點 -->
                <RouterView :matchProducts="matchProducts"></RouterView>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import productStore from '@/stores/productStore.js';
import categoryStore from '@/stores/categoryStore.js';
import BannerComponent from '@/components/BannerComponent.vue';
import ProductsCardComponent from '@/components/ProductsCardComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
    components: {
        BannerComponent,
        ProductsCardComponent,
        PaginationComponent,
        LoadingComponent
    },
    data() {
        return {
            sliceProducts: [],
            keyWord: '',
            matchProducts: [],
        }
    },
    methods: {
        ...mapActions(productStore, ['getProducts']),
        updateProducts(data) {
            this.sliceProducts = data;
        },
        getMatchProducts() {
            if (this.keyWord.trim() !== '') {
                this.matchProducts = this.products.filter(item => item.title.match(this.keyWord));
            } else {
                this.matchProducts = [];
            };
        },
        goTo(path, e) {
            e.target.blur(); // 修改路由時，取消nav-link殘留的focus樣式
            this.resetPagination();
            if (path === 'products') {
                this.keyWord = '';
                this.matchProducts = [];
                this.$router.push('/products');
            } else {
                this.keyWord = '';
                this.matchProducts = [];
                this.$router.push(`/categories/${path}`);
            };
        },
        resetPagination() {
            this.$refs.pagination.resetPage();
        },
    },
    computed: {
        ...mapState(productStore, ['products', 'isLoading']),
        ...mapState(categoryStore, ['categories']),
        recommendation() {
            return this.products.filter(item => item.recommendation);
        },
    },
    created() {
        this.getProducts();
    },
}
</script>