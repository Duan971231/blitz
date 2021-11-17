<template>
    <div id="Picture">
        <ul :style="{marginLeft: ul + '%'}">
            <li v-for="(i,k) in lis" :key="k"><a :href="i.href"><img :src="i.src" :alt="i.alt" :title="i.title"></a></li>
        </ul>
    </div>
</template>

<script lang = "ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class Picture extends Vue{
    public  ul:number = 0;
    public lis:{id:number, src:string, title: string, alt:string, href:string}[] = [
        {
            id:0,
            src: require('../slide/1.jpg'),
            title: '1.jpg',
            alt: '图片加载失败',
            href: ''
        },{
            id: 1,
            src: require('../slide/2.jpg'),
            title: '2.jpg',
            alt: '图片加载失败',
            href: ''
        },{
            id: 2,
            src: require('../slide/3.jpg'),
            title: '3.jpg',
            alt: '图片加载失败',
            href: ''
        },{
            id: 3,
            src: require('../slide/4.jpg'),
            title: '4.jpg',
            alt: '图片加载失败',
            href: ''
        }];   
    public cur_id:number = 0;
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
