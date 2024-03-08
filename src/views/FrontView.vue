<template>
    <NavbarComponent></NavbarComponent>
    <RouterView></RouterView>
    <FooterComponent></FooterComponent>
    <SideMenuComponent></SideMenuComponent>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SideMenuComponent from '@/components/SideMenuComponent.vue';

export default {
    components: {
        NavbarComponent,
        FooterComponent,
        SideMenuComponent,
    },
}
</script>