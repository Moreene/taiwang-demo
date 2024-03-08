<template>
    <VueLoading>
        <div class="loadingio-spinner-double-ring-f8bazgmdzyu">
            <div class="ldio-zbcpbdc1q1">
                <div></div>
                <div></div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </VueLoading>
</template>

<style scoped>
@keyframes ldio-zbcpbdc1q1 {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}

.ldio-zbcpbdc1q1 div {
    box-sizing: border-box !important
}

.ldio-zbcpbdc1q1>div {
    position: absolute;
    width: 138px;
    height: 138px;
    top: 31px;
    left: 31px;
    border-radius: 50%;
    border: 10px solid #000;
    border-color: #0a0a0a transparent #0a0a0a transparent;
    animation: ldio-zbcpbdc1q1 0.9615384615384615s linear infinite;
}

.ldio-zbcpbdc1q1>div:nth-child(2),
.ldio-zbcpbdc1q1>div:nth-child(4) {
    width: 114px;
    height: 114px;
    top: 43px;
    left: 43px;
    animation: ldio-zbcpbdc1q1 0.9615384615384615s linear infinite reverse;
}

.ldio-zbcpbdc1q1>div:nth-child(2) {
    border-color: transparent #f9ae5c transparent #f9ae5c
}

.ldio-zbcpbdc1q1>div:nth-child(3) {
    border-color: transparent
}

.ldio-zbcpbdc1q1>div:nth-child(3) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
}

.ldio-zbcpbdc1q1>div:nth-child(3) div:before,
.ldio-zbcpbdc1q1>div:nth-child(3) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    top: -10px;
    left: 54px;
    background: #0a0a0a;
    border-radius: 50%;
    box-shadow: 0 128px 0 0 #0a0a0a;
}

.ldio-zbcpbdc1q1>div:nth-child(3) div:after {
    left: -10px;
    top: 54px;
    box-shadow: 128px 0 0 0 #0a0a0a;
}

.ldio-zbcpbdc1q1>div:nth-child(4) {
    border-color: transparent;
}

.ldio-zbcpbdc1q1>div:nth-child(4) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
}

.ldio-zbcpbdc1q1>div:nth-child(4) div:before,
.ldio-zbcpbdc1q1>div:nth-child(4) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 10px;
    height: 10px;
    top: -10px;
    left: 42px;
    background: #f9ae5c;
    border-radius: 50%;
    box-shadow: 0 104px 0 0 #f9ae5c;
}

.ldio-zbcpbdc1q1>div:nth-child(4) div:after {
    left: -10px;
    top: 42px;
    box-shadow: 104px 0 0 0 #f9ae5c;
}

.loadingio-spinner-double-ring-f8bazgmdzyu {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
    background: rgba(NaN, NaN, NaN, 0);
}

.ldio-zbcpbdc1q1 {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
}

.ldio-zbcpbdc1q1 div {
    box-sizing: content-box;
}
</style>