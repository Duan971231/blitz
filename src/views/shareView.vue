<template>
    <div id="shareView">
        <div class="share_left">
            <ViewPage></ViewPage>
        </div>
        <div class="share_right">

        </div>
    </div>
</template>

<script lang = "ts">
import ViewTitle from '../components/viewTitle.vue'
import ViewPage from '../components/pages/sharePage.vue'
export default {
    props: {

    },
    data() {
        return {
            title: '技术分享'
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
        ViewTitle, ViewPage
    },
};
</script>

<style scoped lang="scss">
    @media (min-width: 0px) {
        #shareView {
            display:flex;
            width: 100% ;
            .share_left {
                background-color: #34aadc;
                width: 100%;
            }
            .share_right {
                height: 2000px;
                background-color: #5856d6;
                flex: 0;
            }
        }
    }
    @media (min-width: 576px) {
        
    }
    @media (min-width: 768px) {
        
    }
    @media  (min-width: 992px) {
        #shareView {
            .share_left {
                flex: 3;
            }
            .share_right {
                box-sizing: border-box;
                flex: 1;
            }
        }
    }
</style>
