<template>
    <div class="footer">
        <p>Use of this Website constitutes acceptance of the Coinslot.com
            <router-link to="/terms" @click.native="scroll">Terms of Use</router-link>
            and
            <router-link to="/policy" @click.native="scroll">Privacy Policy</router-link>
        </p>
        <p>© Copyright 2018 . All Rights Reserved.</p>
    </div>
</template>

<script>
    export default {
        data(){
            return {}
        },
        watch: {},
        methods: {
            scroll(){
                window.scrollTo(0,0)
            }
        },
        computed: {},
        mounted(){

        }
    }
</script>
<style lang="less" scoped >
    @import "../styles/lib-public.less";

    .footer {
        position: relative;
        z-index: 5;
        background: #fff;
        border-top: 50px solid #eef1f9;
        text-align: center;
        padding: 54px 0 110px 0;
        color: #778ca3;
        p {
            line-height: 24px;
            font-size: 12px;
        }
    }
</style>
