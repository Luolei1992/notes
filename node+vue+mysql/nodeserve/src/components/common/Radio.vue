<template>
    <div>
      <div class="scrollPart" v-for="(item,idx) in this.type==1?anxiousQuestion:this.type==2?healthyQuestion:sleepQuestion" :key="item.question">
        <div class="detailQuestion">
            <p class="ques">{{(idx+1+'.'+item.question).replace("？","")}}</p>
            <ul class="ansList clearfix">
                <li v-for="part in item.options" :key="part.name" @click="selectRadio(item.question,part.name,part.score)">
                    <img :src="part.select?imgSelect:img" alt="" >
                    <span>{{part.name}}</span>
                </li>
            </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
    props:['type'],
    data(){
        return {
            dataLis:[],
            img:require('../../images/radio.png'),
            imgSelect:require('../../images/radio-active.png'),
        }
    },
    computed:{
        ...mapState({
            anxiousQuestion:state=>state.anxiousQuestion,
            healthyQuestion:state=>state.healthyQuestion,
            sleepQuestion:state=>state.sleepQuestion,
        })
    },
    methods:{
        ...mapActions([
            'setAnxiousQuestion',
            'setHealthyQuestion',
            'setSleepQuestion'
        ]),
        selectRadio(question,name,score){
            let list = []
            if(this.type == 1){
                list = this.anxiousQuestion;
                this.dataUpdate(list,question,name,score)
                this.setAnxiousQuestion(this.dataLis)
            }else if(this.type == 2){
                list = this.healthyQuestion;
                this.dataUpdate(list,question,name,score)
                this.setHealthyQuestion(this.dataLis)
            }else{
                list = this.sleepQuestion;
                this.dataUpdate(list,question,name,score)
                this.setSleepQuestion(this.dataLis)
            }
        },
        dataUpdate(list,question,name,score){
            // console.log(score,question)
            for(let i=0;i < list.length;i++){
                let tmp = list[i]
                if(tmp.question==question){
                    tmp = Object.assign(tmp, { answer: name,score:score })
                    for(let j = 0;j < tmp.options.length;j++){
                        let tmpSon = tmp.options[j]
                        if(tmpSon.name == name){
                            tmpSon = Object.assign(tmpSon, { select: true })
                        }else{
                            tmpSon = Object.assign(tmpSon, { select: false })
                        }
                    }
                }
                this.dataLis = list
            }
        }
    }
}
</script>
<style lang="less" scoped>
.detailQuestion {
    padding: .3rem .3rem 0 .3rem;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: .2rem;
    .ques {
        color: #333;
        font-weight: 800;
        padding-bottom: .4rem;
    }
    .ansList {
        padding-left: .25rem;
        box-sizing: border-box;
        img {
        width: .36rem;
        height: .36rem;
        position: relative;
        top: 3px;
        margin-right: .2rem;
        }
        li:nth-child(2n-1) {
            width: 46%;
            float: left;
            margin-bottom: .4rem;
        }
        li:nth-child(2n) {
            width: 54%;
            float: left;
            margin-bottom: .4rem;
        }
    }
}
</style>