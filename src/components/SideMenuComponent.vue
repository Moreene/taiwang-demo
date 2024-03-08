<template>
    <ul class="list-unstyled d-none d-xl-block position-fixed side-wrapper z-99">
        <li class="mb-16">
            <a href="#" class="side-menu w-100 d-flex align-items-center" @click.prevent="scrollTop">
                <span class="d-inline-block side-icon d-flex justify-content-center align-items-center">
                    <i class="bi bi-hand-index fs-2"></i></span>
                <span class="fs-2">回到頂部</span>
            </a>
        </li>
        <li class="mb-16">
            <RouterLink to="/products" class="side-menu w-100 d-flex align-items-center">
                <span class="d-inline-block side-icon d-flex justify-content-center align-items-center">
                    <i class="bi bi-cup-straw fs-2"></i></span>
                <span class="fs-2">線上訂餐</span>
            </RouterLink>
        </li>
        <li>
            <a href="tel:+886-2-2618-0123" class="side-menu w-100 d-flex align-items-center">
                <span class="d-inline-block side-icon d-flex justify-content-center align-items-center">
                    <i class="bi bi-telephone fs-2"></i></span>
                <span class="fs-2">聯絡我們</span>
            </a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/all.scss';

.side {
    &-wrapper {
        width: 190px;
        top: 300px;
        right: -140px;
    }

    &-menu {
        position: relative;
        right: 0px;
        height: 50px;
        background-color: $black;
        color: $white;
        transition: .5s ease;

        &:hover {
            right: 140px;
            background-color: $secondary;
            transition: .5s ease;
        }
    }

    &-icon {
        width: 50px;
        height: 50px;
    }
}
</style>

<script>
export default {
    methods: {
        scrollTop() {
            window.scrollTo(0, 0);
        },
    }
}
</script>