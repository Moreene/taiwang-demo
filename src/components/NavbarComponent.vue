<template>
    <nav class="navbar navbar-expand-md bg-dark py-16 sticky-top">
        <div class="container">
            <h1 class="fs-4 mb-0 d-none d-md-block">
                <RouterLink to="/" class="primary-link">泰汪泰式料理</RouterLink>
            </h1>
            <!-- 手機版-漢堡 -->
            <div class="ham position-relative d-md-none" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" ref="ham" @click="toggleHam">
                <div class="ham-line position-absolute d-block top-50 start-50 translate-middle"></div>
            </div>
            <!-- 桌面版-nav -->
            <ul class="navbar-nav d-none d-md-block d-md-flex">
                <li class="nav-item">
                    <RouterLink to="/about" class="nav-link primary-link fs-6">關於我們</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/products" class="nav-link primary-link fs-6" :class="{ 'active': isLinkActive }">線上訂餐
                    </RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/faq" class="nav-link primary-link fs-6">常見問題</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/contact" class="nav-link primary-link fs-6">聯絡我們</RouterLink>
                </li>
            </ul>
            <!-- 手機版-title -->
            <h1 class="fs-4 mb-0 d-md-none">
                <RouterLink to="/" class="primary-link">泰汪泰式料理</RouterLink>
            </h1>
            <!-- 購物車 -->
            <div class="position-relative">
                <a class="btn btn-dark border-0 cart-link p-0 pe-8" data-bs-toggle="offcanvas" href="#offcanvasRight"
                    role="button" aria-controls="offcanvasRight"><i class="bi bi-cart3 fs-3"></i></a>
                <div
                    class="cart-num bg-danger text-white rounded-circle d-flex justify-content-center align-items-center position-absolute">
                    <span class="fs-8" v-if="cart.carts">{{ cart.carts.length }}</span>
                </div>
            </div>
        </div>
    </nav>
    <!-- 手機版-nav -->
    <div class="collapse navbar-collapse w-100 bg-dark d-md-none position-fixed z-99" id="navbarNav" ref="navbarNav"
        @click="hideNavbar">
        <ul class="navbar-nav text-center px-16">
            <li class="nav-item ">
                <RouterLink to="/about" class="nav-link mobile border-bottom border-secondary fs-5 px-16 py-16">關於我們
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/products" class="nav-link mobile border-bottom border-secondary fs-5 px-16 py-16">線上訂餐
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/faq" class="nav-link mobile border-bottom border-secondary fs-5 px-16 py-16">常見問題
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/contact" class="nav-link mobile fs-5 px-16 py-16">聯絡我們
                </RouterLink>
            </li>
        </ul>
    </div>
    <!-- 購物車offcanvas -->
    <CartComponent></CartComponent>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.cart-num {
    width: 22px;
    height: 22px;
    right: -5px;
    top: -5px;
}

.nav-link.mobile {
    color: $white;

    &.active{
        color: $white;
    }
}

// 漢堡選單樣式
.ham {
    width: 40px;
    height: 40px;
    cursor: pointer;

    &-line,
    &-line::before,
    &-line::after {
        position: absolute;
        content: '';
        width: 28px;
        height: 3px;
        background-color: $light;
        border-radius: 5px;
        transition: 0.3s;
    }

    &-line {
        &::before {
            top: -10px;
        }

        &::after {
            top: 10px;
        }
    }

    &.active {
        .ham-line {
            background-color: transparent;
            transition: 0.3s;

            &::before {
                top: 0;
                transform: rotate(45deg);
                transition: 0.3s;
            }

            &::after {
                top: 0;
                transform: rotate(-45deg);
                transition: 0.3s;
            }
        }
    }
}
</style>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore.js';
import CartComponent from '@/components/CartComponent.vue';

export default {
    components: {
        CartComponent,
    },
    methods: {
        ...mapActions(cartStore, ['getCart']),
        toggleHam() {
            this.$refs.ham.classList.toggle('active');
        },
        hideNavbar() {
            const navbar = this.$refs.navbarNav;
            if (navbar.classList.contains('show')) {
                navbar.classList.remove('show');
                this.$refs.ham.classList.remove('active');
            };
        },
    },
    computed: {
        ...mapState(cartStore, ['cart']),
        isLinkActive() {
            return this.$route.path.startsWith('/products') || this.$route.path.startsWith('/categories');
        },
    },
    created() {
        this.getCart();
    },
}
</script>