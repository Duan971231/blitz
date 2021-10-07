<template>
    <div id="index">
        <div class="index_left">
            <SlideShow></SlideShow>
            <SharePage style="margin-top: 20px"></SharePage>
            <ProgramPage style="margin-top: 20px"></ProgramPage>
        </div>
        <div class="index_right">
            <div class="test"></div>
        </div>
    </div>
</template>

<script>
import SlideShow from "../components/SlideShow"
import SharePage from "../components/pages/sharePage"
import ProgramPage from '../components/pages/programPage'
export default {
    props: {

    },
    data() {
        return {

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
        SlideShow, SharePage, ProgramPage
    },
};
</script>

<style scoped lang="scss">
@media (min-width: 0px) {
    #index {
        display:flex;
        width: 100% ;
        .index_left {
            width: 100%;
        }
        .index_right {
            background-color: #5856d6;
            flex: 0;
            .test {
                height: 260px;
                background-color: #fff;
            }
        }
    }
}
@media (min-width: 576px) {

}
@media (min-width: 768px) {

}
@media  (min-width: 992px) {
    #index {
        .index_left {
            flex: 3;
        }
        .index_right {
            flex: 1;
        }
    }
}
</style>
