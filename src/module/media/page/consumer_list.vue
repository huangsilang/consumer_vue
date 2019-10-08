<template>
  <div class="note" :style ="note" >
  <div>
    <!--查询表单-->
    <el-form :model="params">
      姓名：
      <el-select v-model="params.name" placeholder="请选择姓名" clearable>
        <el-option
          v-for="item in nameList"
          :key="item.id"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;&nbsp;购买产品：
      <el-input v-model="params.product" style="width:160px" clearable></el-input>
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

    </el-form>
    <!--列表-->
    <el-table :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column type="index" >
      </el-table-column>
      <!--<el-table-column prop="fileOriginalName" label="原始文件名称" width="220">-->
      <el-table-column prop="name" label="名字">
      </el-table-column>
      <el-table-column prop="product" label="购买产品" >
      </el-table-column>
      <el-table-column prop="howMuch" label="花费" >
      </el-table-column>
      <el-table-column prop="date" label="时间" :formatter="formatCreatetime">
      </el-table-column>
      <el-table-column prop="type" label="消费类型" :formatter="formatType">
      </el-table-column>
      <el-table-column prop="isMust" label="是否必须" :formatter="formatIsMust" >
      </el-table-column>
      <el-table-column prop="remark" label="备注" >
      </el-table-column>

      <el-table-column label="操作"  v-if="ischoose != true">
        <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="open(scope.row)" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="delete1(scope.row.id)" circle></el-button>
        </template>
       <!-- <template slot-scope="scope">
          <el-button
            size="small" type="primary" plain @click="process(scope.row.fileId)">开始处理
          </el-button>
        </template>-->
      </el-table-column>
      <!--<el-table-column label="选择" v-if="ischoose == true">
        <template slot-scope="scope">
        <el-button
          size="small" type="primary" plain @click="choose(scope.row)">选择</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <!--分页-->
    <el-col :span="24" class="toolbar">

      <el-pagination background layout="prev, pager, next" @current-change="changePage" :page-size="this.params.size"
                     :total="total" :current-page="this.params.page"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </div>
  </div>
</template>
<script>
  import * as mediaApi from '../api/media'
  import utilApi from '@/common/utils';
  import Cookies from 'js-cookie'
  export default{
    props: ['ischoose'],
    data(){
      return {
        params:{
          page:1,//页码
          size:10,//每页显示个数
          name:'',
          product:'',
          type:'',
          isMust:'',
          token:'',
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
        note: {
          //backgroundImage: "url(http://n.sinaimg.cn/sinacn10119/216/w440h576/20190524/a54a-hxntqyy2993105.jpg)",
          //backgroundImage: "url(http://pic.jinrishoufa.com/wp-content/uploads/2012/05/a20120522442.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1525px auto",
          //marginTop: "25px",
          height: "1005px",
        },

        listLoading:false,
        list:[],
        total:0,
        //processStatusList:[],

        //time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],

      }

    },
    methods:{
      open(mediaFile) {
        this.$prompt('请输入修改金额', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /([0-9]+\.[0-9]{2})[0-9]*/,
          inputErrorMessage: '金额不正确'
        }).then(({ value }) => {
          mediaApi.media_update(mediaFile.id,value).then((res)=>{
            console.log(res)
            if(res.success){
              this.$message.success('修改成功');
              this.query();
            }else{
              this.$message.error('操作失败，请刷新页面重试');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      formatCreatetime(row, column){
        var date = new Date(row.date);
        if (date) {
          return utilApi.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
      changePage(page){
        this.params.page = page;
        this.query()
      },
      delete1(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            mediaApi.media_delete(id).then((res)=>{
              console.log(res)
              if(res.success){
                this.query();
                this.$message.success('删除成功!');
              }else{
                this.$message.error('删除失败!');
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      query(){
        this.params.token=Cookies.get('token')
        mediaApi.media_list(this.params.page,this.params.size,this.params).then((res)=>{
          //this.total = res.queryResult.total
          this.total = res.list.totalElements
          this.list = res.list.content
        })
      },
      formatType(row,column){
        var type = row.type;
        if (type) {
          if(type == '0'){
            return "衣";
          }else if(type == '1'){
            return "食";
          }else if(type == '2'){
            return "住";
          }else if(type == '3'){
            return "行";
          }else if(type == '4'){
            return "玩";
          }else if(type == '5'){
            return "学习";
          }else if(type == '6'){
            return "生活用品";
          }
        }
      },
      formatIsMust(row,column){
        var isMust = row.isMust;
        if (isMust) {
          if(isMust == '0'){
            return "必须";
          }else if(isMust == '1'){
            return "非必须";
          }
        }
      }
    },
    created(){
        //默认第一页
      //this.params.page = Number.parseInt(this.$route.query.page||1);
    },
    mounted() {

      //默认查询页面
      this.query()
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
          name:'是'
        },
        {
          id:'1',
          name:'否'
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
