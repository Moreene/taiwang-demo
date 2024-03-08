import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router';

const { VITE_API, VITE_APIPATH } = import.meta.env;

export default defineStore('productStore', {
    state: () => ({
        products: [],
        productDetail: {},
        sellProducts: [],
        isLoading: false,
    }),
    actions: {
        getProducts() {
            this.isLoading = true;
            axios.get(`${VITE_API}/api/${VITE_APIPATH}/products/all`)
                .then(res => {
                    this.products = res.data.products;
                    this.sellProducts = this.products.filter(item => item.hot);
                    this.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getProduct(id) {
            router.push(`/products/${id}`);
            this.isLoading = true;
            axios.get(`${VITE_API}/api/${VITE_APIPATH}/product/${id}`)
                .then(res => {
                    this.productDetail = res.data.product;
                    this.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
});