<template>
    <footer class="bg-dark pt-30 pt-md-50">
        <div class="container text-light">
            <div class="d-md-flex justify-content-md-between boreder border-bottom border-light pb-30 pb-md-50">
                <div class="d-flex align-items-center mb-30 mb-md-0">
                    <h4 class="mb-0">
                        <RouterLink to="/" class="primary-link">泰汪泰式料理</RouterLink>
                    </h4>
                </div>
                <ul class="list-unstyled mb-30 mb-md-0">
                    <li class="mb-8 mb-md-20">
                        <h5 class="mb-0">營業資訊</h5>
                    </li>
                    <li class="mb-8">時間：每天<span class="ms-8">11:00 ~ 21:00</span></li>
                    <li class="mb-8">電話：<a href="tel:+886-2-2618-0123" class="primary-link text-notoSans">（02）2618-0123</a>
                    </li>
                    <li>地址：<a href="#" class="primary-link">新北市八里區龍源里汪汪街666號</a></li>
                </ul>
                <div class="mb-30 mb-md-0">
                    <h5 class="mb-md-20">關注我們</h5>
                    <ul class="list-unstyled d-flex justify-content-md-around w-30 w-md-100">
                        <li class="me-16 me-md-0"><a href="#"><i class="bi bi-facebook primary-link fs-4"></i></a></li>
                        <li><a href="#"><i class="bi bi-instagram primary-link fs-4"></i></a></li>
                    </ul>
                </div>
                <div>
                    <RouterLink to="/adminLogin" class="border border-light primary-link admin p-5">登入後台</RouterLink>
                </div>
            </div>
            <div class="py-10 text-center">
                <p class="text-secondary fs-8 mb-0">本網站僅供個人作品使用，無任何商業用途</p>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
@import "@/assets/all.scss";

.primary-link.admin:hover {
    background: $light;
    color: $dark;
}
</style>