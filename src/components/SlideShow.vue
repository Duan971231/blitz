<template>
    <div id="SlideSHow">
        <div class="slide_left">
            <Picture></Picture>
        </div>
        <div class="slide_right">
            <ul>
                <li>
                    <div>
                        <img src="../slide/1.jpg" alt="">
                    </div>
                </li>
                <li>
                    <div>
                        <img src="../slide/3.jpg" alt="">
                    </div>
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
            border-radius: 5px;
            .slide_left {
                height: 260px;
                div {
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
                    flex-direction: row;
                    li {
                        width: 100%;
                        height: 150px;
                        list-style: none;
                        flex: 1;
                        background-color: skyblue;
                        border-radius: 5px;
                        overflow: hidden;
                        div {
                            img {
                                height: 150px;
                                width: 100%;
                            }
                        }
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
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                    li {
                        height: 125px;
                        list-style: none;
                        flex: 1;
                        background-color: skyblue;
                        div {
                            img {
                                height: 125px;
                            }
                        }
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
