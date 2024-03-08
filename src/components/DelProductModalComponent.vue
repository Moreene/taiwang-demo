<template>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
        aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span><i class="bi bi-exclamation-circle"></i> {{ tempProduct.title }}</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        @click="$emit('clearInput')"></button>
                </div>
                <div class="modal-body text-center p-24">
                    <span class="fs-5">是否要刪除 "{{ tempProduct.title }}" ？</span>
                </div>
                <div class="modal-footer border-0 justify-content-center">
                    <button type="button" class="btn btn-outline-danger w-25" data-bs-dismiss="modal"
                        @click="$emit('clearInput')">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger w-25" @click="delProduct">
                        確認
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';

import { sweetalert } from '@/methods/sweetalert';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default {
    props: ['tempProduct'],
    data() {
        return {
            delProductModal: null,
        }
    },
    methods: {
        delProduct() {
            axios.delete(`${VITE_API}/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    sweetalert('success', res.data.message);
                    this.$emit('update');
                    this.$emit('clearInput');
                    this.delProductModal.hide();
                })
                .catch(err => {
                    sweetalert('error', err.response.data.message);
                });
        },
    },
    mounted() {
        this.delProductModal = new Modal(this.$refs.delProductModal, {
            keyboard: false,
            backdrop: 'static',
        });
    },
}
</script>