<template>
    <div id="Picture">
        <ul :style="{marginLeft: ul}">
            <li v-for="(i,k) in lis" :key="k"><a href=""><img :src="i.src" alt=""></a></li>
        </ul>
    </div>
</template>

<script lang = "ts">
export default {
    props: {

    },
    data() {
        return {
            ul: '-100%',
            lis: [
                {
                    src: require('../slide/1.jpg'),
                },{
                    src: require('../slide/2.jpg'),
                },{
                    src: require('../slide/3.jpg'),
                },{
                    src: require('../slide/4.jpg'),
                },
            ]
        };
    },
    methods: {
        init() {
            
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
    @media (min-width: 0px) {
        #Picture {
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 5px;
            ul {
                padding: 0;
                margin: 0;
                width: 400%;
                height: 100%;
                li {
                    list-style: none;
                    float: left;
                    width: 25%;
                    height: 100%;
                    a {
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }

        }
    }
    @media (min-width: 576px) {
        
    }
    @media (min-width: 768px) {
        
    }
    @media  (min-width: 992px) {
        
    }
</style>
