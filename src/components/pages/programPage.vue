<template>
    <div id="programPage">
        <ViewTitle :titleContent = 'title'></ViewTitle>
        <ul>
            <li v-for="(i, k) in lis" :key = 'k'>
                <a class="li_top">
                    <b>【热】</b>
                    <span class="title">{{i.title}}</span>
                </a>
                <div class="li_center">
                    <a href="" class="img_path">
                        <img :src="i.src" :title = i.title alt="">
                    </a>
                    <span class="program_content">{{i.content}}</span>
                    <div class="program_bottom">
                        <span class="bottom_from">{{i.from}}</span>
                        <span class="bottom_time">{{i.time}}</span>
                        <span class="bottom_look">{{i.look}}</span>
                        <span class="bottom_like">{{i.like}}</span>
                        <span class="bottom_btn">阅读文章</span>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script lang = "ts">
import ViewTitle from '../viewTitle.vue';
export default {
    props: {

    },
    data() {
        return {
            title: '程序人生',
            lis: [
                {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
                }, {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
                }, {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
                }, {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
                }, {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
                }, {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
                }, {
                    title: 'Computed和watch',
                    src: require('../../slide/4.jpg'),
                    content: 'Computed本质是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。 适用于计算比较消耗性能的计算场景。当表达式过于复杂时，在模板中放入过多逻辑会让模板难以维护，可以将复杂的逻辑放入计算属性中处理。',
                    from: '不吃茶的v李白',
                    time: '2021-10-07',
                    look: 521,
                    like: 57
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
         #programPage {
            background-color: #fff;
            padding: 20px 2.3%;
            border-radius: 5px;
            ul {
                width: 100%;
                padding: 0;
                margin: 0;
                li {
                    box-sizing: border-box;
                    width: 100%;
                    list-style: none;
                    padding-bottom: 20px;
                    padding-left: 2%;
                    padding-right: 2%;
                    border-bottom:1px solid #ddd;
                    margin-bottom: 20px;
                    &:Hover {
                        box-shadow: 0px 2px 4px -1px #CCC;
                        .li_top {
                            span {
                                color: #20B2AA;
                            }
                        }
                    }
                    .li_top {
                        cursor: pointer;
                        display: block;
                        text-align: left;
                        font-size: 18px;
                        height: 24px;
                        line-height: 24px;
                        margin-bottom: 10px;
                        b {
                            color: #F00;
                        }
                        span {
                            font-size: 18px;
                            font-weight: bold;
                            color: #333;
                        }
                    }
                    .li_center {
                        &::before {
                            display: table;
                            content: '';
                        }
                        &::after {
                            display: table;
                            content: '';
                            clear: both;
                        }
                        .img_path {
                            margin-right: 10px;
                            width: 23%;
                            float: left;
                            img {
                                width: 100%;
                            }
                        }
                        .program_content {
                            width: calc(77% - 10px);
                            line-height: 26px;
                            float: right;
                            text-align: justify;
                            word-break: break-all;
                            text-overflow: ellipsis;
                            display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
                            -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
                            -webkit-line-clamp: 3; /** 显示的行数 **/
                            overflow: hidden;  /** 隐藏超出的内容 **/ 
                        }
                        .program_bottom { 
                            width: 100%;
                            text-align: left;
                            float: left;
                            margin-top: 20px;
                            .bottom_from {
                                margin-right: 20px;
                            }
                            .bottom_time {
                                margin-right: 20px;
                            }
                            .bottom_look {
                                margin-right: 20px;
                            }
                            .bottom_like {
                                
                            }
                            .bottom_btn {
                                background-color: #66CDAA;
                                width: 80px;
                                height: 28px;
                                line-height: 28px;
                                color: #FFF;
                                text-align: center;
                                border-radius: 5px;
                                float: right;
                                cursor: pointer;
                            }
                        }
                    }

                }
            }
         }
    }
    @media (min-width: 576px) {
        
    }
    @media (min-width: 768px) {
        #programPage {
            ul {
                li {
                    .li_center {
                        .program_bottom {
                            width: calc(77% - 10px);
                        }
                    }
                }
            }
        }
    }
    @media  (min-width: 992px) {
        
    }
</style>
