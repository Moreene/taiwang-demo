<template>
    <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content border-0">
                <div class="modal-header bg-primary text-white">
                    <h5 id="productModalLabel" class="modal-title">
                        <span>{{ product.title ? product.title : '新增餐點' }}</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="$emit('clearInput')"></button>
                </div>
                <!-- <v-form ref="form" :validation-schema="schema" v-slot="{ errors }" @submit="updateProduct"> -->
                <v-form ref="form" v-slot="{ errors }" @submit="updateProduct">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="mb-8">
                                    <div class="mb-16">
                                        <label for="imageUrl" class="form-label">新增主圖</label>
                                        <v-field id="imageUrl" name="主圖連結" type="text" class="form-control"
                                            v-model="product.imageUrl" :class="{ 'is-invalid': errors['主圖連結'] }"
                                            placeholder="請輸入圖片連結" rules="required"></v-field>
                                        <error-message name="主圖連結" class="invalid-feedback"></error-message>
                                    </div>
                                    <img class="modal-img w-100" :src="product.imageUrl" alt="主圖" v-if="product.imageUrl">
                                </div>
                                <!-- 如果product.imagesUrl不為空，顯示以下資訊 -->
                                <div class="mb-8" v-if="product.imagesUrl">
                                    <div class="mb-16" v-for="(item, idx) in product.imagesUrl" :key="'img' + idx">
                                        <label :for="'imageURL' + (idx + 1)" class="form-label">副圖{{ idx + 1 }}</label>
                                        <v-field :id="'imageURL' + (idx + 1)" :name="'副圖' + (idx + 1)" type="text"
                                            class="form-control" v-model="product.imagesUrl[idx]"
                                            :class="{ 'is-invalid': errors['副圖' + (idx + 1)] }" placeholder="請輸入副圖連結"
                                            rules="required"></v-field>
                                        <error-message :name="'副圖' + (idx + 1)"
                                            class="invalid-feedback"></error-message>
                                        <!-- v-if="item.length"：檢查目前item（圖像 URL）的屬性是否為真
                                        - 如果item是undefined或空字串，則條件計算結果為假，則不渲染影像 -->
                                        <img class="modal-img w-100" v-if="item.length" :src="item">
                                    </div>
                                    <!-- 若陣列為空或最後一個元素為真，則顯示「新增圖片」按鈕；否則，顯示“刪除圖片”按鈕 -->
                                    <div v-if="!product.imagesUrl.length || product.imagesUrl.at(-1).trim()">
                                        <button class="btn btn-outline-primary btn-sm d-block w-100"
                                            @click="product.imagesUrl.push('')">
                                            新增圖片
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-outline-danger btn-sm d-block w-100"
                                            @click="product.imagesUrl.pop()">
                                            刪除圖片
                                        </button>
                                    </div>
                                </div>
                                <!-- 如果product.imagesUrl為空，則顯示此按鈕，允許新增第一張圖像。 -->
                                <!-- product.imagesUrl=['']替換了數組引用 -->
                                <div v-else>
                                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                                        @click="product.imagesUrl = [product.imageUrl, '']">
                                        新增圖片
                                    </button>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="mb-16">
                                    <label for="title" class="form-label">餐點名稱</label>
                                    <v-field id="title" name="餐點名稱" type="text" class="form-control"
                                        v-model="product.title" :class="{ 'is-invalid': errors['餐點名稱'] }"
                                        placeholder="請輸入餐點名稱" rules="required"></v-field>
                                    <error-message name="餐點名稱" class="invalid-feedback"></error-message>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-16">
                                        <label for="select" class="form-label">餐點分類</label>
                                        <v-field as="select" id="select" name="餐點分類" class="form-select"
                                            v-model="product.category" :class="{ 'is-invalid': errors['餐點分類'] }"
                                            rules="required" placeholder="請選擇餐點分類">
                                            <option value="" disabled selected>請選擇餐點分類</option>
                                            <option value="開胃涼拌">開胃涼拌</option>
                                            <option value="大口吃肉">大口吃肉</option>
                                            <option value="大口吃菜">大口吃菜</option>
                                            <option value="泰鮮海鮮">泰鮮海鮮</option>
                                            <option value="來一點飯">來一點飯</option>
                                            <option value="冰涼泰飲">冰涼泰飲</option>
                                            <option value="泰式甜點">泰式甜點</option>
                                        </v-field>
                                        <error-message name="餐點分類" class="invalid-feedback"></error-message>
                                    </div>
                                    <div class="col-md-6 mb-16">
                                        <label for="unit" class="form-label">單位</label>
                                        <v-field id="unit" name="單位" type="text" class="form-control"
                                            v-model="product.unit" :class="{ 'is-invalid': errors['單位'] }"
                                            placeholder="請輸入單位" rules="required"></v-field>
                                        <error-message name="單位" class="invalid-feedback"></error-message>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 mb-16">
                                        <label for="origin_price" class="form-label">原價</label>
                                        <v-field id="origin_price" name="原價" type="number" min="0" class="form-control"
                                            v-model.number="product.origin_price"
                                            :class="{ 'is-invalid': errors['原價'] }" placeholder="請輸入原價"
                                            rules="required"></v-field>
                                        <error-message name="原價" class="invalid-feedback"></error-message>
                                    </div>
                                    <div class="col-md-6 mb-16">
                                        <label for="price" class="form-label">售價</label>
                                        <v-field id="price" name="售價" type="number" min="0" class="form-control"
                                            v-model.number="product.price" :class="{ 'is-invalid': errors['售價'] }"
                                            placeholder="請輸入售價" rules="required"></v-field>
                                        <error-message name="售價" class="invalid-feedback"></error-message>
                                    </div>
                                </div>
                                <div class="mb-16">
                                    <label class="form-label">餐點成分</label>
                                    <nav>
                                        <div class="nav nav-tabs flex-nowrap" id="nav-tab" role="tablist">
                                            <button class="nav-link link-dark active" id="meat-tab" data-bs-toggle="tab"
                                                data-bs-target="#meat" type="button" role="tab" aria-controls="meat"
                                                aria-selected="true">肉品</button>
                                            <button class="nav-link link-dark" id="seafood-tab" data-bs-toggle="tab"
                                                data-bs-target="#seafood" type="button" role="tab"
                                                aria-controls="seafood" aria-selected="false">海鮮</button>
                                            <button class="nav-link link-dark" id="vegetable-tab" data-bs-toggle="tab"
                                                data-bs-target="#vegetable" type="button" role="tab"
                                                aria-controls="vegetable" aria-selected="false">蔬果</button>
                                            <button class="nav-link link-dark" id="seasoning-tab" data-bs-toggle="tab"
                                                data-bs-target="#seasoning" type="button" role="tab"
                                                aria-controls="seasoning" aria-selected="false">調味</button>
                                            <button class="nav-link link-dark" id="rice-tab" data-bs-toggle="tab"
                                                data-bs-target="#rice" type="button" role="tab" aria-controls="rice"
                                                aria-selected="false">米飯</button>
                                            <button class="nav-link link-dark" id="others-tab" data-bs-toggle="tab"
                                                data-bs-target="#others" type="button" role="tab" aria-controls="others"
                                                aria-selected="false">其他</button>
                                        </div>
                                    </nav>
                                    <div class="tab-content" id="nav-tabContent">
                                        <div class="tab-pane show active pt-16 px-16" id="meat" role="tabpanel"
                                            aria-labelledby="meat-tab" tabindex="0">
                                            <div class="form-check form-check-inline" v-for="item in ingredient.meat"
                                                :key="item">
                                                <v-field name="ingredient" type="checkbox" class="form-check-input"
                                                    :value="item" :id="item" v-model="product.ingredient" :class="{ 'is-invalid': errors['ingredient'] }" rules="required"></v-field>
                                                <label class="form-check-label" :for="item">{{ item }}</label>
                                            </div>
                                        </div>
                                        <div class="tab-pane pt-16 px-16" id="seafood" role="tabpanel"
                                            aria-labelledby="seafood-tab" tabindex="0">
                                            <div class="form-check form-check-inline" v-for="item in ingredient.seafood"
                                                :key="item">
                                                <v-field name="ingredient" type="checkbox" class="form-check-input"
                                                    :value="item" :id="item" v-model="product.ingredient" :class="{ 'is-invalid': errors['ingredient'] }" rules="required"></v-field>
                                                <label class="form-check-label" :for="item">{{ item }}</label>
                                            </div>
                                        </div>
                                        <div class="tab-pane pt-16 px-16" id="vegetable" role="tabpanel"
                                            aria-labelledby="vegetable-tab" tabindex="0">
                                            <div class="form-check form-check-inline"
                                                v-for="item in ingredient.vegetable" :key="item">
                                                <v-field name="ingredient" type="checkbox" class="form-check-input"
                                                    :value="item" :id="item" v-model="product.ingredient" :class="{ 'is-invalid': errors['ingredient'] }" rules="required"></v-field>
                                                <label class="form-check-label" :for="item">{{ item }}</label>
                                            </div>
                                        </div>
                                        <div class="tab-pane pt-16 px-16" id="seasoning" role="tabpanel"
                                            aria-labelledby="seasoning-tab" tabindex="0">
                                            <div class="form-check form-check-inline"
                                                v-for="item in ingredient.seasoning" :key="item">
                                                <v-field name="ingredient" type="checkbox" class="form-check-input"
                                                    :value="item" :id="item" v-model="product.ingredient" :class="{ 'is-invalid': errors['ingredient'] }" rules="required"></v-field>
                                                <label class="form-check-label" :for="item">{{ item }}</label>
                                            </div>
                                        </div>
                                        <div class="tab-pane pt-16 px-16" id="rice" role="tabpanel" aria-labelledby="rice-tab"
                                            tabindex="0">
                                            <div class="form-check form-check-inline" v-for="item in ingredient.rice"
                                                :key="item">
                                                <v-field name="ingredient" type="checkbox" class="form-check-input"
                                                    :value="item" :id="item" v-model="product.ingredient" :class="{ 'is-invalid': errors['ingredient'] }" rules="required"></v-field>
                                                <label class="form-check-label" :for="item">{{ item }}</label>
                                            </div>
                                        </div>
                                        <div class="tab-pane pt-16 px-16" id="others" role="tabpanel"
                                            aria-labelledby="others-tab" tabindex="0">
                                            <div class="form-check form-check-inline" v-for="item in ingredient.others"
                                                :key="item">
                                                <v-field name="ingredient" type="checkbox" class="form-check-input"
                                                    :value="item" :id="item" v-model="product.ingredient" :class="{ 'is-invalid': errors['ingredient'] }" rules="required"></v-field>
                                                <label class="form-check-label" :for="item">{{ item }}</label>
                                            </div>
                                        </div>
                                        <error-message name="ingredient" class="invalid-feedback"><span class="text-danger" style="font-size: 14px;">至少選擇一種食材</span></error-message>
                                    </div>
                                </div>
                                <div class="mb-16">
                                    <label for="description" class="form-label">餐點描述</label>
                                    <v-field as="textarea" id="description" name="餐點描述" class="form-control"
                                        v-model="product.description" :class="{ 'is-invalid': errors['餐點描述'] }"
                                        placeholder="請輸入餐點描述" rules="required"></v-field>
                                    <error-message name="餐點描述" class="invalid-feedback"></error-message>
                                </div>
                                <div class="mb-16">
                                    <label for="note" class="form-label">餐點備註</label>
                                    <v-field id="note" name="餐點備註" type="text" class="form-control"
                                        v-model.number="product.note" :class="{ 'is-invalid': errors['餐點備註'] }"
                                        placeholder="請輸入餐點備註" rules="required"></v-field>
                                    <error-message name="餐點備註" class="invalid-feedback"></error-message>
                                </div>
                                <hr>
                                <div class="row mb-16">
                                    <div class="col-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="是" id="hotFood"
                                                v-model="product.hot">
                                            <label class="form-check-label" for="hotFood">
                                                暢銷餐點
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="是"
                                                id="recommendation" v-model="product.recommendation">
                                            <label class="form-check-label" for="recommendation">
                                                主廚推薦
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-primary w-20 me-16" data-bs-dismiss="modal"
                            @click="$emit('clearInput')">
                            取消
                        </button>
                        <button type="submit" class="btn btn-primary text-light w-20">
                            確認
                        </button>
                    </div>
                </v-form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-img{
    height: 200px;
}
</style>

<script>
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';

import { sweetalert } from '@/methods/sweetalert';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
    props: ['tempProduct', 'isNew'],
    data() {
        return {
            productModal: null,
            ingredient: {
                meat: ['雞肉', '雞腿', '豬肉', '松阪豬', '豬肋骨'],
                seafood: ['白蝦', '草蝦', '蛤蜊', '花枝', '中卷', '花枝漿', '鱸魚'],
                vegetable: ['辣椒', '大蒜', '薑', ' 香茅', '香菜', '紅蔥頭', '泰國茄子', '檸檬', '小番茄', '草菇', '蘑菇', '乾檸檬葉', '青木瓜', '玉米筍', '洋蔥', '小黃瓜', '青蔥', '青椒', '花椰菜', '胡蘿蔔', '紅甜椒', '高麗菜', '四季豆', '空心菜', '長豆', '芋頭', '地瓜', '椰子', '椰蓉肉', '紅石榴', '香蕉', '紅毛丹', '菠蘿蜜'],
                seasoning: ['糖', '魚露', '泰國蠔油', '乾蝦米', '蝦膏', '蝦醬', '米酒', '玉米粉', '白胡椒粉', '麵包粉', '花生'],
                rice: ['紅藜米', '茉莉香米'],
                others: ['椰奶', '椰漿', '牛奶', '煉乳', '淡奶', '麵粉', '鹹蛋', '蛋', '奶油', '錫蘭紅茶茶葉', '綠茶', '泰國神童牌紅糖水', '西米露'],
            },
            product: {},
        }
    },
    methods: {
        updateProduct() {
            const updateData = {
                ...this.product,
                hot: this.product.hot === true ? 1 : 0,
                recommendation: this.product.recommendation === true ? 1 : 0,
                is_enabled: this.product.is_enabled === true ? 1 : 0,
            };
            let url = `${VITE_API}/api/${VITE_APIPATH}/admin/product/${updateData.id}`;
            let http = 'put';
            if (this.isNew) {
                url = `${VITE_API}/api/${VITE_APIPATH}/admin/product`;
                http = 'post'
            };
            axios[http](url, { data: updateData })
                .then(res => {
                    sweetalert('success', res.data.message);
                    this.$emit('update');
                    this.$emit('clearInput');
                    this.productModal.hide();
                }).catch(err => {
                    sweetalert('error', err.response.data.message);
                });
        },
        resetForm() {
            this.$refs.form.resetForm();
        }
    },
    watch: {
        tempProduct() {
            this.product = this.tempProduct;
        },
    },
    mounted() {
        this.productModal = new Modal(this.$refs.productModal, {
            keyboard: false,
            backdrop: 'static'
        });
    },
}
</script>