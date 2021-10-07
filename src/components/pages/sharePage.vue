<template>
    <div id="sharePage">
        <ViewTitle :titleContent = 'title'></ViewTitle>
        <ul>
            <li v-for="(i, k) in lis" :key = 'k'>
                <a :href = i.href class="imgHref">
                    <img :src="i.src" :title = i.title>
                </a>
                <b>{{i.title}}</b>
                <span class="spanContent">{{i.content}}</span>
                <a :href=i.href class="read">+ 阅读文章</a>
                <span class="star">
                    <span>{{i.star}}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script lang = "ts">
import ViewTitle from '../viewTitle.vue'
export default {
    props: {

    },
    data() {
        return {
            title: '技术分享',
            lis: [
                {
                    src: require('../../slide/item1.jpg'),
                    title: 'CSS 实现蜂窝形状',
                    content: 'css基础，动画及border的真实面目。方法一：将六边形看成三个矩形的旋转拼接，六边形每一个角为60°，根据计算可以得出高宽之间的关系为根号3 ： 1。方法二：利用border属性绘制， 中间一个矩形，在利用befor和after进行两边三角形的绘制',
                    href: '',
                    star: 3
                },{
                    src: require('../../slide/item1.jpg'),
                    title: 'CSS 实现蜂窝形状',
                    content: 'css基础，动画及border的真实面目。方法一：将六边形看成三个矩形的旋转拼接，六边形每一个角为60°，根据计算可以得出高宽之间的关系为根号3 ： 1。方法二：利用border属性绘制， 中间一个矩形，在利用befor和after进行两边三角形的绘制',
                    href: '',
                    star: 3
                },{
                    src: require('../../slide/item1.jpg'),
                    title: 'CSS 实现蜂窝形状',
                    content: 'css基础，动画及border的真实面目。方法一：将六边形看成三个矩形的旋转拼接，六边形每一个角为60°，根据计算可以得出高宽之间的关系为根号3 ： 1。方法二：利用border属性绘制， 中间一个矩形，在利用befor和after进行两边三角形的绘制',
                    href: '',
                    star: 3
                },{
                    src: require('../../slide/item1.jpg'),
                    title: 'CSS 实现蜂窝形状',
                    content: 'css基础，动画及border的真实面目。方法一：将六边形看成三个矩形的旋转拼接，六边形每一个角为60°，根据计算可以得出高宽之间的关系为根号3 ： 1。方法二：利用border属性绘制， 中间一个矩形，在利用befor和after进行两边三角形的绘制',
                    href: '',
                    star: 3
                },{
                    src: require('../../slide/item1.jpg'),
                    title: 'CSS 实现蜂窝形状',
                    content: 'css基础，动画及border的真实面目。方法一：将六边形看成三个矩形的旋转拼接，六边形每一个角为60°，根据计算可以得出高宽之间的关系为根号3 ： 1。方法二：利用border属性绘制， 中间一个矩形，在利用befor和after进行两边三角形的绘制',
                    href: '',
                    star: 3
                },{
                    src: require('../../slide/item1.jpg'),
                    title: 'CSS 实现蜂窝形状实现蜂窝形状实现蜂窝形状实现蜂窝形状实现蜂窝形状',
                    content: 'CSS基础，动画及border的真实面目。方法一：将六边形看成三个矩形的旋转拼接，六边形每一个角为60°，根据计算可以得出高宽之间的关系为根号3 ： 1。方法二：利用border属性绘制， 中间一个矩形，在利用befor和after进行两边三角形的绘制',
                    href: '',
                    star: 311
                }
            ]
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
        ViewTitle
    },
};
</script>

<style scoped lang="scss">

@media (min-width: 0px) {
    #sharePage {
        width: 100%;
        background: #fff;
        padding: 20px 2.3%;
        box-sizing: border-box;
        border-radius: 5px;
        ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;
            li {
                list-style: none;
                width: 33.33%;
                box-sizing: border-box;
                border-left: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                padding: 10px;
                transition: all 0.5s ease;
                &:hover {
                    box-shadow: 2px 2px 2px 2px #eee,
                    -2px -2px 2px 2px #eee,
                    -2px 2px 2px 2px #eee,
                    2px -2px 2px 2px #eee;
                    .read {
                        color: #20B2AA;
                    }
                }
                .imgHref {
                    width: 100%;
                    img {
                        width: 100%;
                        height: 100px;
                    }
                }
                b {
                    display: block;
                    height: 30px;
                    box-sizing: border-box;
                    margin: 5px auto;
                    text-align: left;
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;  
                }
                .spanContent {
                    text-align: left;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                    -webkit-line-clamp: 3; /** 显示的行数 **/
                    overflow: hidden;  /** 隐藏超出的内容 **/ 
                }
                .read {
                    margin-top: 14px;
                    font-size: 16px;
                    color: #096;
                    text-decoration: none;
                    float: left;
                }
                .star {
                    cursor: pointer;
                    span {
                        display: block;
                        float: right;
                        margin-top: 14px;
                        color: #999;
                        font-size: 14px;
                    }
                    
                }
            }   
        }
    }
}
@media (min-width: 576px) {
    #sharePage {
         ul {
             li {
                 padding: 15px;
             }
         }
    }
}
@media (min-width: 768px) {
    #sharePage {
         ul {
             li {
                 padding: 20px;
                  .imgHref {
                      img {
                          height: 160px;
                      }
                  }
             }
         }
    }
}
@media (min-width: 992px) {

}
@media (min-width: 1200px) {

}
</style>
