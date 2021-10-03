<template>
    <div id="SlideSHow">
        <div class="slide_left">
            <Picture></Picture>
        </div>
        <div class="slide_right">
            <ul>
                <li>
                    <div></div>
                </li>
                <li>
                    <div></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang = "ts">
import Picture from './Picture.vue'
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
        Picture
    },
};
</script>

<style scoped lang="scss">

    @media (min-width: 0) {
        #SlideSHow {
            height: 430px;
            background-color: pink;
            border-radius: 5px;
            .slide_left {
                height: 260px;
                div {
                    background-color: red;
                    width: 100%;
                    height: 100%;
                }
            }
            .slide_right {
                margin-top: 20px;
                height: 150px;
                ul {
                    display: flex;
                    padding: 0;
                    margin: 0;
                    height: 100%;
                    flex-direction: row;
                    li {
                        list-style: none;
                        flex: 1;
                        background-color: skyblue;
                    }
                    li+li {
                        margin-left: 10px;
                    }
                }
            }
        }
    }
    @media(min-width: 576px) {
        #SlideSHow {
            height: 260px;
            background-color: pink;
            border-radius: 5px;
            display: flex;
            flex-direction: row;

            .slide_left {
                flex: 7;
                padding-right: 15px;
                div {
                    background-color: red;
                    width: 100%;
                }
            }
            .slide_right {
                margin-top: 0;
                height: 260px;
                flex: 3;
                ul {
                    display: flex;
                    padding: 0;
                    margin: 0;
                    height: 100%;
                    flex-direction: column;
                    li {
                        list-style: none;
                        flex: 1;
                        background-color: skyblue;
                    }
                    li+li {
                        margin: 10px 0 0 0;
                    }
                }
            }
        }
    }
    @media (min-width: 768px) {
        
    }
    @media  (min-width: 992px) {
        
    }
</style>
