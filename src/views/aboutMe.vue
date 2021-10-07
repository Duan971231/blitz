<template>
    <div id="aboutMe">
        <ViewTitle :titleContent = "title"></ViewTitle>
        <ul>
            <li>段寒松, 重庆人</li>
            <li>男，1997年</li>
            <li>现居北京昌平</li>
            <li>是一名前端开发工程师</li>
            <li>是万千程序猿中的一只</li>
            <li>喜欢编程，喜欢探索新技术，大学生活迷茫过，失落过，还好没有放弃</li>
            <li>希望看到这里的你也不要轻易地放弃</li>
            <li>这条路上的你并不是孤军奋战，有千千万万的猿在陪你前行</li>
            <li>手机号：18512326932(微信同号)</li>
            <li>QQ: 1530904047</li>
        </ul>
        <p>
             本博客已经开源，源码上传到github。本博客采用php+mysql+apache+smarty、mvc架构模式。 前端采用响应式设计。h5+css3+js(jq,ajax,Bom,Dom),没有采用框架，后面可能会用vue或react做一套。如果有不清楚的欢迎来信。
        </p>
    </div>
</template>

<script lang = "ts">
import ViewTitle from '../components/viewTitle.vue'
export default {
    props: {

    },
    data() {
        return {
            title: '关于我'
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
        ViewTitle, 
    },
};
</script>

<style scoped lang="scss">

    @media (min-width: 0px) {
         #aboutMe {
            width: 100%;
            border-radius: 5px;
            background-color: #fff;
            padding: 20px 2.3%;
            box-sizing: border-box;
            ul{
                padding: 0 20px;
                margin: 0;
                li {
                    list-style: none;
                    display: block;
                    height: 60px;
                    line-height: 60px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;    
                }
            }
            p {
                background-color: #F6F6F4;
                color: #74768A;
                margin: 20px 60px;
                word-break: break-all;
                text-align: left;
                line-height: 34px;
                padding: 0 10px;
            }
            &::after {
                content: '';
                display: table;
            }
         }
    }
    @media (min-width: 576px) {
        
    }
    @media (min-width: 768px) {
        }
    @media  (min-width: 992px) {
        #aboutMe {
            padding: 20px 1.67%;
        }
        
    }
</style>
