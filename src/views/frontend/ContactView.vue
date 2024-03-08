<template>
    <!-- Banner -->
    <BannerComponent>聯絡我們 / Contact Us</BannerComponent>
    <div class="container">
        <div class="py-72">
            <h2 class="h4 text-center">我們珍視您的意見，若對餐點有任何反饋</h2>
            <h2 class="h4 text-center mb-48">歡迎來信告知，我們在收到訊息後會盡速回覆</h2>
            <div class="row justify-content-around gy-48 gy-md-0">
                <!-- 聯絡我們 -->
                <div class="col-md-6 col-lg-5" @mouseover="addTitleColor('contact')"
                    @mouseout="removeTitleColor('contact')">
                    <h3 class="h5 fw-bold text-center border-bottom border-dark border-2 pb-16 mb-24" ref="contactUs">聯絡我們
                    </h3>
                    <p class="fs-6 mb-4">泰汪重視您對我們的任何問題及意見，</p>
                    <p class="fs-6 mb-24">您可以通過以下方式聯絡到我們。</p>
                    <p class="mb-8"><a href="https://www.google.com/maps/place/25%C2%B007'34.8%22N+121%C2%B027'13.1%22E/@25.1263298,121.4510751,17z/data=!3m1!4b1!4m4!3m3!8m2!3d25.126325!4d121.45365?authuser=0&entry=ttu" target="_blank" rel="noreferrer noopener" class="link-dark"><i
                                class="bi bi-geo-alt-fill text-danger me-8"></i>新北市八里區龍源里汪汪街666號</a></p>
                    <p class="mb-8"><a href="mailto:taiwang@mail.com" class="link-dark"><i
                                class="bi bi-envelope text-primary me-8"></i>taiwang@mail.com</a></p>
                    <p class="mb-48"><a href="tel:+886-2-2618-0123" class="link-dark"><i
                                class="bi bi-telephone me-8"></i>02-2618-0123</a></p>
                    <MapComponent></MapComponent>
                </div>
                <!-- 意見回饋 -->
                <div class="col-md-6 col-lg-5" @mouseover="addTitleColor" @mouseout="removeTitleColor">
                    <div class="h-100 d-flex flex-column">
                        <h3 class="h5 fw-bold text-center border-bottom border-dark border-2 pb-16 mb-24" ref="feedback">意見回饋</h3>
                        <v-form ref="form" v-slot="{ errors }" class="flex-grow-1 d-flex flex-column" @submit="submitForm">
                            <div class="mb-16">
                                <label for="name" class="form-label">姓名 <span class="text-danger">*</span></label>
                                <v-field id="name" name="姓名" type="text" class="form-control border-gray" v-model="name"
                                    :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required"></v-field>
                                <error-message name="姓名" class="invalid-feedback fw-bold"></error-message>
                            </div>
                            <div class="mb-16">
                                <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
                                <v-field id="email" name="email" type="email" class="form-control border-gray"
                                    v-model="email" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                                    rules="email|required"></v-field>
                                <error-message name="email" class="invalid-feedback fw-bold"></error-message>
                            </div>
                            <div class="mb-16">
                                <label for="主旨" class="form-label">主旨 <span class="text-danger">*</span></label>
                                <v-field id="主旨" name="主旨" type="text" class="form-control border-gray" v-model="title"
                                    :class="{ 'is-invalid': errors['主旨'] }" placeholder="請輸入主旨" rules="required"></v-field>
                                <error-message name="主旨" class="invalid-feedback fw-bold"></error-message>
                            </div>
                            <div class="mb-24">
                                <label for="內容" class="form-label">內容 <span class="text-danger">*</span></label>
                                <v-field as="textarea" id="內容" name="內容" class="form-control border-gray" v-model="content"
                                    :class="{ 'is-invalid': errors['內容'] }" placeholder="意見回饋" rules="required"
                                    style="height: 200px;"></v-field>
                                <error-message name="內容" class="invalid-feedback fw-bold"></error-message>
                            </div>
                            <div class="text-end mt-auto">
                                <button type="submit" class="btn btn-primary text-white w-25"
                                    :disabled="isFormComplete">提交</button>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';
import MapComponent from '@/components/MapComponent.vue';

import { toast } from '@/methods/sweetalert';

export default {
    components: {
        BannerComponent,
        MapComponent,
    },
    data() {
        return {
            name: '',
            email: '',
            title: '',
            content: '',
        }
    },
    methods: {
        addTitleColor(zone) {
            if (zone === 'contact') {
                this.$refs.contactUs.classList.add('text-primary');
            } else {
                this.$refs.feedback.classList.add('text-primary');
            };
        },
        removeTitleColor(zone) {
            if (zone === 'contact') {
                this.$refs.contactUs.classList.remove('text-primary');
            } else {
                this.$refs.feedback.classList.remove('text-primary');
            };
        },
        submitForm() {
            toast('top', 'success', '已成功提交回饋表單');
            this.$refs.form.resetForm();
        },
    },
    computed: {
        isFormComplete() {
            return !this.name && !this.email && !this.title && !this.content;
        },
    },
}
</script>