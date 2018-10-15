<template>
    <div class="">
        <h1 class="hidden-sm hidden-xs">
            {{$lang.risk.a1}}
        </h1>
        <ul>
            <li>
                <p class="title">
                    {{$lang.risk.a2}}
                </p>
                <p class="msg">
                    {{$lang.risk.a3}}
                </p>
            </li>
            <li>
                <p class="title">
                    {{$lang.risk.a4}}
                </p>
                <p class="msg" v-html="$lang.risk.a5">
                </p>
            </li>
            <li>
                <p class="title">
                    {{$lang.risk.a14}}
                </p>
                <p class="msg">
                    {{$lang.risk.a15}}
                </p>
            </li>
            <li>
                <p class="title">
                    {{$lang.risk.a6}}
                </p>
                <p class="msg">
                    {{$lang.risk.a7}}
                </p>
                <p class="msg" v-html="$lang.risk.a8">
                </p>
            </li>
            <li>
                <p class="title">
                    {{$lang.risk.a9}}
                </p>
                <p class="msg">
                    {{$lang.risk.a10}}
                </p>
                <p class="msg">
                    {{$lang.risk.a11}}
                </p>
                <p class="msg">
                    {{$lang.risk.a12}}
                </p>
                <p class="msg">
                    {{$lang.risk.a13}}
                </p>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="less">
img {
    display: block;
    width: 90%;
    margin: 10px 0;
}
</style>
