<template>
    <nav aria-label="Page navigation" class="my-4 d-flex justify-content-center">
        <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 0 }" v-if="allData.length > 12">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">&laquo;</a>
            </li>
            <li class="page-item" v-for="n in pageNum" :key="n" :class="{ 'active': n === currentPage + 1 }">
                <a class="page-link" href="#" @click.prevent="goToPage(n - 1)">{{ n }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === pageNum - 1 }" v-if="allData.length > 12">
                <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">&raquo;</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ['products'],
    data() {
        return {
            allData: [],
            pageSize: 12,
            currentPage: 0
        }
    },
    methods: {
        updateShowData() {
            const totalPage = [];
            for (let i = 0; i < this.pageNum; i++) {
                totalPage[i] = this.allData.slice(this.pageSize * i, this.pageSize * (i + 1));
            };
            this.$emit('updateProducts', (totalPage[this.currentPage]));
        },
        goToPage(targetPage) {
            // 檢查索引是否在正確範圍內
            if (targetPage >= 0 && targetPage < this.pageNum) {
                this.currentPage = targetPage;
                window.scrollTo(0, 0);
                this.updateShowData();
            }
        },
        resetPage() {
            this.currentPage = 0;
            this.updateShowData();
        },
    },
    computed: {
        pageNum() {
            return Math.ceil(this.allData.length / this.pageSize);
        }
    },
    watch: {
        // 監視路由變化，取得對應tab篩選後的最新商品資料
        products: {
            handler(newVal) {
                this.allData = newVal;
                this.updateShowData();
            },
            immediate: true
        }
    },
}
</script>