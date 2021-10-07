<template>
    <div id="shareView">
        <div class="share_left">
            <ViewPage></ViewPage>
            <div class="btns">
                <span class="btn_left">上一页</span>
                    <span class="btn_list">1</span>
                    <span class="btn_list">2</span>
                <span class="btn_right">下一页</span>
            </div>
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
                width: 100%;
                .btns {
                    margin-top: 20px;
                    height: 40px;
                    .btn_left, .btn_right {
                        display: inline-block;
                        height: 40px;
                        width: 85px;
                        line-height: 40px;
                        background-color: #F7F7F7;
                        margin: 0 10px;
                        color: #333;
                        &:hover {
                            background-color: #333;
                            color: #f7f7f7;
                        }
                    }
                    .btn_list {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        line-height: 40px;
                        background-color: #333;
                        color: #F7f7f7;
                        &:hover {
                            
                        }
                    }
                    .btn_list+.btn_list {
                        margin-left: 10px;
                    }
                }
            }
            .share_right {
                height: 200px;
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
