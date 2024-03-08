<template>
    <GoogleMap :api-key="apiKey" style="width: 100%;" :center="center" :zoom="15" class="google-map">
        <Marker :options="markerOptions" @click="showInfoWin">
            <InfoWindow :options="infoWindowOptions" :opened="infoWinOpen">
                <h2 class="bg-dark text-white p-24">泰汪泰式料理</h2>
                <h3 class="fs-7 text-center mb-0">營業時間：每天11:00~21:00</h3>
            </InfoWindow>
        </Marker>
    </GoogleMap>
</template>

<style lang="scss" scoped>
@import '../assets/all.scss';

.google-map {
    height: 250px;

    @include pad {
        height: 350px;
    }
}
</style>

<script>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';

export default {
    components: {
        GoogleMap,
        Marker,
        InfoWindow
    },
    data() {
        return {
            apiKey: import.meta.env.VITE_MAP,
            center: { lat: 25.126325, lng: 121.45365 },
            markerOptions: {
                position: { lat: 25.126325, lng: 121.45365 },
            },
            infoWindowOptions: {
                position: { lat: 25.126325, lng: 121.45365 },
            },
            infoWinOpen: false
        };
    },
    methods: {
        showInfoWin() {
            this.infoWinOpen = !this.infoWinOpen;
        },
    },
};
</script>
