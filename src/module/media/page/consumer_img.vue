<template>
  <div class="note" :style ="note" >
      <div>
    <!--查询表单-->
    <el-form :model="params">
      姓名：
      <el-select v-model="params.name" placeholder="请选择姓名" >
        <el-option
          v-for="item in nameList"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;开始时间：
      <el-date-picker
        v-model="params.startTime"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="params.pickerOptions">
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;&nbsp;结束时间：
      <el-date-picker
        v-model="params.endTime"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="params.pickerOptions">
      </el-date-picker>
      <br/>
      类型：
      <el-select v-model="params.type" placeholder="请选择类型">
        <el-option
          v-for="item in typeList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;是否必须：
      <el-select v-model="params.isMust" placeholder="请选择是否必须">
        <el-option
          v-for="item in isMustList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <br/>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <span><h3></h3></span>
    </el-form>
    <!--</el-form>-->
    <div class="block">
      <span class="demonstration"></span>
      <el-span><h3>总消费：{{params.countTotal}}元</h3></el-span>
      <el-image :src="params.imgByNamePath" ></el-image>&nbsp;&nbsp;&nbsp;&nbsp;
      <el-image :src="params.imgByProductPath" ></el-image>
      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>

      <!--<el-image :src="src"></el-image>-->
    </div>
  </div>
  </div>
</template>
<script>
  import * as mediaApi from '../api/media'
  import utilApi from '@/common/utils';
  import HelloWorld from "../../../base/components/HelloWorld";
  export default{
    components: {HelloWorld},
    props: ['ischoose'],
    data(){
      return {
        note: {
          //backgroundImage: "url(/static/images/222.jpg)",
          //backgroundImage: "url(http://n.sinaimg.cn/sinacn10119/216/w440h576/20190524/a54a-hxntqyy2993105.jpg)",
          //backgroundImage: "url(http://y2.ifengimg.com/e7f199c1e0dbba14/2013/1104/rdn_5277a8c78ed04.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1035px auto",
          //marginTop: "25px",
          height: "1005px",
        },
        params:{
          name:'',
          product:'',
          type:'',
          isMust:'',
          imgByNamePath:'',
          imgByProductPath:'',
          countTotal:'',
          pickerOptions: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          startTime:'',
          endTime:''
        },
        listLoading:false,
        list:[],
      }

    },
    methods: {
      query() {
        this.params.imgByNamePath = "";
        this.params.imgByProductPath = "";
        mediaApi.media_img(this.params).then((res) => {
          this.params.imgByNamePath = res.imgByNamePath
          this.params.imgByProductPath = res.imgByProductPath
          this.params.countTotal = res.countTotal
        })
      },
      created() {
        //默认第一页
        //this.params.src = Number.parseInt(this.$route.query.path);

      },
    },
    mounted() {
      //默认查询页面
      //this.query();
      this.nameList = [
        {
          id:'',
          name:''
        },
        {
          id:'0',
          name:'黄先生'
        },
        {
          id:'1',
          name:'张漂亮'
        },
      ],
        this.isMustList = [
          {
            id:'',
            name:'全部'
          },
          {
            id:'0',
            name:'必须'
          },
          {
            id:'1',
            name:'非必须'
          },
        ],
        //初始化处理状态
        this.typeList = [
          {
            id:'',
            name:'全部'
          },
          {
            id:'0',
            name:'衣'
          },
          {
            id:'1',
            name:'食'
          },
          {
            id:'2',
            name:'住'
          },
          {
            id:'3',
            name:'行'
          },
          {
            id:'4',
            name:'玩'
          },
          {
            id:'5',
            name:'学习'
          },
          {
            id:'6',
            name:'生活用品'
          }
        ]
    }

  }
</script>
<style>

</style>
