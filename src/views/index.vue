<template>
    <div id="index">
        <div class="index_left">
            <SlideShow></SlideShow>
        </div>
        <div class="index_right">
            <div class="test"></div>
        </div>
    </div>
</template>

<script>
import SlideShow from "../components/SlideShow.vue"
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
        SlideShow
    },
};
</script>

<style scoped lang="scss">
@media (min-width: 0px) {
    #index {
        display:flex;
        max-width: 1200px;
        margin: 70px auto;
        padding: 0 10px;
        .index_left {
            height: 2000px;
            background-color: #34aadc;
            flex: 1;
        }
        .index_right {
            height: 2000px;
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

@media  (min-width: 992px) {
    #index {
        .index_left {
            flex: 3;
        }
        .index_right {
            padding-left: 20px;
            flex: 1;
        }
    }
}
}
</style>
