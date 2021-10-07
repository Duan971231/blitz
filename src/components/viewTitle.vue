<template>
    <div id="viewTitle">
        <span>{{titleContent}}</span>
    </div>
</template>

<script lang = "ts">
export default {
    props: ["titleContent"],
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

    },
};
</script>

<style scoped lang="scss">
    #viewTitle {
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding-bottom: 20px;
        cursor: pointer;
        span {
            height: 40px;
            line-height: 40px;
            display: block;
            text-align: left;
            width: 100%;
            border-bottom: 1px solid #ddd;
            &::after {
                content: "";
                height: 0;
                display: block;
                width: 40px;
                border-top: 2px solid #000;
                transition: width 0.5s;
            }
            &:hover {
                &::after {
                    width: 70px;
                }
            }
        }
    }
</style>
