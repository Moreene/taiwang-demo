<template>
    <div class="bg-wave">
        <div class="container">
            <div class="col-lg-10 mx-auto pb-72">
                <ProgessBarComponent></ProgessBarComponent>
                <div class="bg-white border text-center p-32">
                    <h2 class="h1 mb-48 fw-bold">感謝您的訂購！</h2>
                    <h3 class="fs-3 position-relative order-info z-1 mb-20"><span
                            class="d-inline-block bg-white z-2 px-16">以下為您的訂單資訊</span></h3>
                    <div class="w-lg-75 w-xxl-50 mx-auto mb-48">
                        <div class="row fs-4">
                            <div class="col-md-5 col-xl-4">
                                <div class="text-md-end">
                                    訂單編號：
                                </div>
                            </div>
                            <div class="col-md-7 col-xl-8">
                                <div class="text-md-start text-notoSans">
                                    {{ orderNum }}
                                </div>
                            </div>
                        </div>
                        <div class="row fs-4">
                            <div class="col-md-5 col-xl-4">
                                <div class="text-md-end">
                                    成立時間：
                                </div>
                            </div>
                            <div class="col-md-7 col-xl-8">
                                <div class="text-md-start text-notoSans">
                                    {{ orderDate }}<span class="ms-16">{{ orderTime }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary btn-lg text-light" @click="backToFront">回到首頁</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/all.scss';

.order-info::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px;
    background-color: $dark;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;

    @include pad {
        width: 75%;
    }

    @include pc {
        width: 50%;
    }
}
</style>

<script>
import ProgessBarComponent from '@/components/ProgessBarComponent.vue';

import { formatDate, formatTime } from '@/methods/date';

export default {
    components: {
        ProgessBarComponent,
    },
    computed: {
        orderNum() {
            return localStorage.getItem('orderNum');
        },
        orderDate() {
            const today = formatDate(new Date());
            return today;
        },
        orderTime() {
            const time =  formatTime(new Date());
            return time;
        },
        backToFront() {
            localStorage.clear();
            this.$router.push('/');
        },
    },
}
</script>