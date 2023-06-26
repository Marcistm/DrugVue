<template>
<div>
  <el-table :data="data" max-height="850">
    <el-table-column :key="i" v-for="i in (0,table[0].value.length)" :label="table[0].value[i-1].label" :prop="table[0].value[i-1].value">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="danger" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "Param",
  data(){
    return{
      filter_table:[
        {table:'Grug',value:[{label:'编号',value:'GrNo'},{label:'名称',value:'GrName'},{label:'类型',value:'GrType'},
            {label:'价格',value:'GrPrice'},{label:'保质期',value:'Gstodate'},{label:'时间',value:'GrDate'}]},
        {table:'Customer',value:[{label:'编号',value:'CusNo'},{label:'姓名',value:'CusName'},{label:'年龄',value:'Cusage'},
            {label:'电话',value:'CusTel'},]},
        {table:'Employee',value:[{label:'编号',value:'EmpNo'},{label:'姓名',value:'EmpName'},{label:'年龄',value:'Empage'},
            {label:'职位',value:'EmpType'},]},
        {
        table:'Supplier',value:[{label:'编号',value:'SupNo'},{label:'姓名',value:'SupName'},{label:'电话',value:'SupTel'},]
        }
      ],
      data:[],
      table:[],
      name:'',
    }
  },
  methods:{
    del(row){
      let path='http://127.0.0.1:5000/del'
      let params={table:this.name,no:row[this.table[0].value[0].value],col:this.table[0].value[0].value}
      axios.get(path,{params:params}).then(res=>{
        if (res.data.code===200) {
          this.$message.success('删除成功')
        }
      })
    },
    get_param(){
      let path='http://127.0.0.1:5000/get'
      let params={table:this.name}
      console.log(params)
      axios.get(path,{params:params}).then(res=>{
        this.data=res.data.data
      })
    }
  },
  mounted() {
    console.log(this.filter_table)
    this.name=this.$route.query.name
    console.log(this.name)
    this.table=this.$store.state.filter({table:this.name},this.filter_table)
    this.get_param()
  }
}
</script>

<style scoped>

</style>