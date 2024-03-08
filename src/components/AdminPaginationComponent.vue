<template>
    <nav class="d-flex justify-content-center" aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item" :class="{'disabled': pagination.current_page === 1}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitPages(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="item in pagination.total_pages" :key="item" :class="{'active': item === pagination.current_page}">
                <a class="page-link" href="#" @click.prevent="emitPages(item)">{{ item }}</a></li>
            <li class="page-item" :class="{'disabled': pagination.current_page === pagination.total_pages}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="emitPages(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ['pagination'],
    methods: {
        emitPages(item){
            window.scrollTo(0, 0);
            this.$emit('emit-pages',item);
        },
    },
}
</script>