<template>
    <div class="banner-wrapper d-flex position-relative">
        <div class="position-absolute top-50 translate-middle-y ps-40 ps-md-80 ps-xxl-320 z-1">
            <div class="text-light banner-text">
                <slot></slot>
            </div>
            <img src="https://yehthaimei.com.tw/wp-content/uploads/2018/09/frill-free-img.png" alt="banner裝飾" class="banner-decoration" style="width: 250px;">
        </div>
        <div class="w-50 bg-dark-blue border-end border-gold border-3"></div>
        <div class="w-50 border-start border-gold border-3 position-relative">
            <div class="banner-overlay position-absolute top-0 start-0 w-100 h-100"></div>
            <div class="banner bg-repeat-no bg-size-cover w-100 h-100" :style="{ backgroundImage: img }"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/all.scss";

.banner {
    background-position-y: 35%;

    &-wrapper {
        height: 210px;

        @include pad {
            height: 280px;
        }
    }

    &-text {
        font-size: 28px;

        @include pad {
            font-size: 64px;
        }
    }

    &-overlay {
        background-color: rgba($color: $dark-blue, $alpha: 0.6);
    }
}
</style>

<script>
export default {
    data() {
        return {
            img: '',
        }
    },
    created() {
        this.img = this.$route.meta.BannerImage;
    },
}
</script>