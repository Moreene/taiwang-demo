<template>
    <div class="bg-light vh-100 d-flex justify-content-center align-items-center">
        <div class="container text-center">
            <h1 class="fw-bold mb-24 error-title">4 0 4</h1>
            <h1><i class="bi bi-exclamation-octagon fs-2"></i> 此頁面不存在，將在 {{ countdown }} 秒後導回首頁 <i class="bi bi-exclamation-octagon fs-2"></i> </h1>
        </div>
    </div>
</template>

<style scoped>
.error-title {
    font-size: 120px;
}
</style>

<script>
export default {
    data() {
        return {
            countdown: 5,
        }
    },
    methods: {
        startCountdown() {
            const interval = setInterval(() => {
                this.countdown--;
                if (this.countdown === 0) {
                    clearInterval(interval);
                    this.$router.push('/');
                };
            }, 1000);
        },
    },
    created() {
        this.startCountdown();
    },
}
</script>