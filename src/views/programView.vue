<template>
    <div id="programView">
        <div class="program_left">
            <ProgramPage></ProgramPage>
            <div class="btns">
                <span class="btn_left">上一页</span>
                <span class="btn_list">1</span>
                <span class="btn_list">2</span>
                <span class="btn_left">下一页</span>
            </div>
        </div>
        <div class="program_right">

        </div>
    </div>
</template>

<script lang = "ts">
import { Component, Vue } from 'vue-property-decorator'
import ProgramPage from '../components/pages/programPage.vue'
@Component({
  components: {
    ProgramPage,
  },
})
export default class ProgramView extends Vue {

};
</script>

<style scoped lang="scss">
@media (min-width: 0px) {
    #programView {
        display:flex;
        width: 100%;
        .program_left {
            width: 100%;
            .btns {
                margin-top: 20px;
                height: 40px;
                .btn_left, .btn_right {
                    display: inline-block;
                    height: 40px;
                    width: 85px;
                    line-height: 40px;
                    background-color: #F7F7F7;
                    margin: 0 10px;
                    color: #333;
                    &:hover {
                        background-color: #333;
                        color: #f7f7f7;
                    }
                }
                .btn_list {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    background-color: #333;
                    color: #F7f7f7;
                }
                .btn_list+.btn_list {
                    margin-left: 10px;
                }
            }
        }
        .program_right {
            background-color: #5856d6;
            flex: 0;
        }
    }
}
@media (min-width: 576px) {

}
@media (min-width: 768px) {

}
@media  (min-width: 992px) {
    #programView {
        .program_left {
            flex: 3;
        }
        .program_right {
            flex: 1;
        }
    }
}
</style>
