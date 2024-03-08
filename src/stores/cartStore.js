import { defineStore } from 'pinia';
import axios from 'axios';
import { toast } from '@/methods/sweetalert';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default defineStore('cartStore', {
    state: () => ({
        cart: [],
    }),
    actions: {
        // 取得所有購物車
        getCart() {
            this.isLoading = true;
            axios.get(`${VITE_API}/api/${VITE_APIPATH}/cart`)
                .then(res => {
                    this.cart = res.data.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 單一品項加入購物車
        addCart(id, qty = 1) {
            const cart = {
                qty,
                "product_id": id
            };
            axios.post(`${VITE_API}/api/${VITE_APIPATH}/cart`, { "data": cart })
                .then(res => {
                    toast('top', 'success', res.data.message);
                    this.getCart();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 刪除單一品項
        deleteItem(item) {
            const itemName = item.product.title
            axios.delete(`${VITE_API}/api/${VITE_APIPATH}/cart/${item.id}`)
                .then(res => {
                    toast('top', 'warning', `已刪除 "${itemName}"`);
                    this.getCart();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 透過 + 修改購物車數量
        increaseCartNum(item) {
            item.qty++;
            const cart = {
                "product_id": item.product_id,
                "qty": item.qty
            };
            axios.put(`${VITE_API}/api/${VITE_APIPATH}/cart/${item.id}`, { "data": cart })
                .then(res => {
                    toast('top', 'success', `已更新 ${item.product.title} 的數量`);
                    this.getCart();
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 透過 - 修改購物車數量
        decreaseCartNum(item) {
            item.qty--;
            const cart = {
                "product_id": item.product_id,
                "qty": item.qty
            };
            axios.put(`${VITE_API}/api/${VITE_APIPATH}/cart/${item.id}`, { "data": cart })
                .then(res => {
                    toast('top', 'success', `已更新 ${item.product.title} 的數量`);
                    this.getCart();
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
});