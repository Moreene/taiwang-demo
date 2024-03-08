<template v-if="isShow">
    <nav class="navbar navbar-expand-md bg-dark py-16 fixed-top" data-bs-theme="dark">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-16 mb-md-0">
                    <li class="nav-item">
                        <RouterLink to="/admin/products" class="nav-link py-16 py-md-0 ps-0 fs-6">
                            <i class="bi bi-box-seam"></i> 餐點列表
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/orders" class="nav-link py-16 py-md-0 fs-6">
                            <i class="bi bi-box-seam"></i> 訂單列表
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/coupon" class="nav-link py-16 py-md-0 fs-6">
                            <i class="bi bi-box-seam"></i> 優惠列表
                        </RouterLink>
                    </li>
                </ul>
                <button type="button" class="btn btn-outline-light fs-6" @click="logout">登出</button>
            </div>
        </div>
    </nav>
    <RouterView></RouterView>
</template>

<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API } = import.meta.env;

export default {
    components: {
        RouterLink
    },
    methods: {
        checkLogin() {
            axios.post(`${VITE_API}/api/user/check`)
                .then(res => {
                    this.isShow = true;
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: '您沒有權限進入!',
                        showConfirmButton: true,
                    });
                    this.$router.push('/adminLogin');
                });
        },
        logout() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-primary text-light",
                    cancelButton: "btn btn-outline-danger me-16"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "即將登出後台!",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "不要登出",
                confirmButtonText: "是，我要登出",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "即將登出!",
                        icon: "success",
                        timer: 2000
                    });
                    setTimeout(() => {
                        axios.post(`${VITE_API}/logout`)
                            .then(res => {
                                document.cookie = `myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
                                this.$router.push('/adminLogin');
                            })
                            .catch(err => {
                                this.$swal({
                                    icon: "error",
                                    title: err.response.data.message,
                                    showConfirmButton: true,
                                });
                            });
                    }, 500);
                };
            });
        },
    },
    mounted() {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1",);
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },
}
</script>